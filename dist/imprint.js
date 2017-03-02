/*
 * Promise Polyfill
 * Lightweight ES6 Promise polyfill for the browser and node. 
 * Adheres closely to the spec. It is a perfect polyfill IE, Firefox 
 * or any other browser that does not support native promises.
 * 
 * Website: https://github.com/taylorhakes/promise-polyfill
 * Copyright: (c) 2014 Taylor Hakes
 * Copyright: (c) 2014 Forbes Lindesay
 * License: MIT
 */
!function(e){function n(){}function t(e,n){return function(){e.apply(n,arguments)}}function o(e){if("object"!=typeof this)throw new TypeError("Promises must be constructed via new");if("function"!=typeof e)throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=void 0,this._deferreds=[],s(e,this)}function i(e,n){for(;3===e._state;)e=e._value;return 0===e._state?void e._deferreds.push(n):(e._handled=!0,void o._immediateFn(function(){var t=1===e._state?n.onFulfilled:n.onRejected;if(null===t)return void(1===e._state?r:u)(n.promise,e._value);var o;try{o=t(e._value)}catch(i){return void u(n.promise,i)}r(n.promise,o)}))}function r(e,n){try{if(n===e)throw new TypeError("A promise cannot be resolved with itself.");if(n&&("object"==typeof n||"function"==typeof n)){var i=n.then;if(n instanceof o)return e._state=3,e._value=n,void f(e);if("function"==typeof i)return void s(t(i,n),e)}e._state=1,e._value=n,f(e)}catch(r){u(e,r)}}function u(e,n){e._state=2,e._value=n,f(e)}function f(e){2===e._state&&0===e._deferreds.length&&o._immediateFn(function(){e._handled||o._unhandledRejectionFn(e._value)});for(var n=0,t=e._deferreds.length;n<t;n++)i(e,e._deferreds[n]);e._deferreds=null}function c(e,n,t){this.onFulfilled="function"==typeof e?e:null,this.onRejected="function"==typeof n?n:null,this.promise=t}function s(e,n){var t=!1;try{e(function(e){t||(t=!0,r(n,e))},function(e){t||(t=!0,u(n,e))})}catch(o){if(t)return;t=!0,u(n,o)}}var a=setTimeout;o.prototype["catch"]=function(e){return this.then(null,e)},o.prototype.then=function(e,t){var o=new this.constructor(n);return i(this,new c(e,t,o)),o},o.all=function(e){var n=Array.prototype.slice.call(e);return new o(function(e,t){function o(r,u){try{if(u&&("object"==typeof u||"function"==typeof u)){var f=u.then;if("function"==typeof f)return void f.call(u,function(e){o(r,e)},t)}n[r]=u,0===--i&&e(n)}catch(c){t(c)}}if(0===n.length)return e([]);for(var i=n.length,r=0;r<n.length;r++)o(r,n[r])})},o.resolve=function(e){return e&&"object"==typeof e&&e.constructor===o?e:new o(function(n){n(e)})},o.reject=function(e){return new o(function(n,t){t(e)})},o.race=function(e){return new o(function(n,t){for(var o=0,i=e.length;o<i;o++)e[o].then(n,t)})},o._immediateFn="function"==typeof setImmediate&&function(e){setImmediate(e)}||function(e){a(e,0)},o._unhandledRejectionFn=function(e){"undefined"!=typeof console&&console&&console.warn("Possible Unhandled Promise Rejection:",e)},o._setImmediateFn=function(e){o._immediateFn=e},o._setUnhandledRejectionFn=function(e){o._unhandledRejectionFn=e},"undefined"!=typeof module&&module.exports?module.exports=o:e.Promise||(e.Promise=o)}(this);

/*
 * ImprintJs
 */
(function(scope) {

  	'use strict';

	// Test holder
	var _tests = {};

	var ImprintJs = function() {
		return this;
	};

	ImprintJs.prototype = {

		// ----------------------
		// Private methods
		// ----------------------

		_x64Add: function(m, n) {
		m = [m[0] >>> 16, m[0] & 0xffff, m[1] >>> 16, m[1] & 0xffff];
		n = [n[0] >>> 16, n[0] & 0xffff, n[1] >>> 16, n[1] & 0xffff];
		var o = [0, 0, 0, 0];
		o[3] += m[3] + n[3];
		o[2] += o[3] >>> 16;
		o[3] &= 0xffff;
		o[2] += m[2] + n[2];
		o[1] += o[2] >>> 16;
		o[2] &= 0xffff;
		o[1] += m[1] + n[1];
		o[0] += o[1] >>> 16;
		o[1] &= 0xffff;
		o[0] += m[0] + n[0];
		o[0] &= 0xffff;
		return [(o[0] << 16) | o[1], (o[2] << 16) | o[3]];
		},

		_x64Multiply: function(m, n) {
		m = [m[0] >>> 16, m[0] & 0xffff, m[1] >>> 16, m[1] & 0xffff];
		n = [n[0] >>> 16, n[0] & 0xffff, n[1] >>> 16, n[1] & 0xffff];
		var o = [0, 0, 0, 0];
		o[3] += m[3] * n[3];
		o[2] += o[3] >>> 16;
		o[3] &= 0xffff;
		o[2] += m[2] * n[3];
		o[1] += o[2] >>> 16;
		o[2] &= 0xffff;
		o[2] += m[3] * n[2];
		o[1] += o[2] >>> 16;
		o[2] &= 0xffff;
		o[1] += m[1] * n[3];
		o[0] += o[1] >>> 16;
		o[1] &= 0xffff;
		o[1] += m[2] * n[2];
		o[0] += o[1] >>> 16;
		o[1] &= 0xffff;
		o[1] += m[3] * n[1];
		o[0] += o[1] >>> 16;
		o[1] &= 0xffff;
		o[0] += (m[0] * n[3]) + (m[1] * n[2]) + (m[2] * n[1]) + (m[3] * n[0]);
		o[0] &= 0xffff;
		return [(o[0] << 16) | o[1], (o[2] << 16) | o[3]];
		},

		_x64Rotl: function(m, n) {
		n %= 64;
		if (n === 32) {
			return [m[1], m[0]];
		}
		else if (n < 32) {
			return [(m[0] << n) | (m[1] >>> (32 - n)), (m[1] << n) | (m[0] >>> (32 - n))];
		}
		else {
			n -= 32;
			return [(m[1] << n) | (m[0] >>> (32 - n)), (m[0] << n) | (m[1] >>> (32 - n))];
		}
		},

		_x64LeftShift: function(m, n) {
		n %= 64;
		if (n === 0) {
			return m;
		}
		else if (n < 32) {
			return [(m[0] << n) | (m[1] >>> (32 - n)), m[1] << n];
		}
		else {
			return [m[1] << (n - 32), 0];
		}
		},

		_x64Xor: function(m, n) {
		return [m[0] ^ n[0], m[1] ^ n[1]];
		},

		_x64Fmix: function(h) {
		h = this._x64Xor(h, [0, h[0] >>> 1]);
		h = this._x64Multiply(h, [0xff51afd7, 0xed558ccd]);
		h = this._x64Xor(h, [0, h[0] >>> 1]);
		h = this._x64Multiply(h, [0xc4ceb9fe, 0x1a85ec53]);
		h = this._x64Xor(h, [0, h[0] >>> 1]);
		return h;
		},

		_x64hash128: function (key, seed) {
		key = key || "";
		seed = seed || 0;
		var remainder = key.length % 16;
		var bytes = key.length - remainder;
		var h1 = [0, seed];
		var h2 = [0, seed];
		var k1 = [0, 0];
		var k2 = [0, 0];
		var c1 = [0x87c37b91, 0x114253d5];
		var c2 = [0x4cf5ad43, 0x2745937f];
		for (var i = 0; i < bytes; i = i + 16) {
			k1 = [((key.charCodeAt(i + 4) & 0xff)) | ((key.charCodeAt(i + 5) & 0xff) << 8) | ((key.charCodeAt(i + 6) & 0xff) << 16) | ((key.charCodeAt(i + 7) & 0xff) << 24), ((key.charCodeAt(i) & 0xff)) | ((key.charCodeAt(i + 1) & 0xff) << 8) | ((key.charCodeAt(i + 2) & 0xff) << 16) | ((key.charCodeAt(i + 3) & 0xff) << 24)];
			k2 = [((key.charCodeAt(i + 12) & 0xff)) | ((key.charCodeAt(i + 13) & 0xff) << 8) | ((key.charCodeAt(i + 14) & 0xff) << 16) | ((key.charCodeAt(i + 15) & 0xff) << 24), ((key.charCodeAt(i + 8) & 0xff)) | ((key.charCodeAt(i + 9) & 0xff) << 8) | ((key.charCodeAt(i + 10) & 0xff) << 16) | ((key.charCodeAt(i + 11) & 0xff) << 24)];
			k1 = this._x64Multiply(k1, c1);
			k1 = this._x64Rotl(k1, 31);
			k1 = this._x64Multiply(k1, c2);
			h1 = this._x64Xor(h1, k1);
			h1 = this._x64Rotl(h1, 27);
			h1 = this._x64Add(h1, h2);
			h1 = this._x64Add(this._x64Multiply(h1, [0, 5]), [0, 0x52dce729]);
			k2 = this._x64Multiply(k2, c2);
			k2 = this._x64Rotl(k2, 33);
			k2 = this._x64Multiply(k2, c1);
			h2 = this._x64Xor(h2, k2);
			h2 = this._x64Rotl(h2, 31);
			h2 = this._x64Add(h2, h1);
			h2 = this._x64Add(this._x64Multiply(h2, [0, 5]), [0, 0x38495ab5]);
		}
		k1 = [0, 0];
		k2 = [0, 0];
		switch(remainder) {
			case 15:
			k2 = this._x64Xor(k2, this._x64LeftShift([0, key.charCodeAt(i + 14)], 48));
			case 14:
			k2 = this._x64Xor(k2, this._x64LeftShift([0, key.charCodeAt(i + 13)], 40));
			case 13:
			k2 = this._x64Xor(k2, this._x64LeftShift([0, key.charCodeAt(i + 12)], 32));
			case 12:
			k2 = this._x64Xor(k2, this._x64LeftShift([0, key.charCodeAt(i + 11)], 24));
			case 11:
			k2 = this._x64Xor(k2, this._x64LeftShift([0, key.charCodeAt(i + 10)], 16));
			case 10:
			k2 = this._x64Xor(k2, this._x64LeftShift([0, key.charCodeAt(i + 9)], 8));
			case 9:
			k2 = this._x64Xor(k2, [0, key.charCodeAt(i + 8)]);
			k2 = this._x64Multiply(k2, c2);
			k2 = this._x64Rotl(k2, 33);
			k2 = this._x64Multiply(k2, c1);
			h2 = this._x64Xor(h2, k2);
			case 8:
			k1 = this._x64Xor(k1, this._x64LeftShift([0, key.charCodeAt(i + 7)], 56));
			case 7:
			k1 = this._x64Xor(k1, this._x64LeftShift([0, key.charCodeAt(i + 6)], 48));
			case 6:
			k1 = this._x64Xor(k1, this._x64LeftShift([0, key.charCodeAt(i + 5)], 40));
			case 5:
			k1 = this._x64Xor(k1, this._x64LeftShift([0, key.charCodeAt(i + 4)], 32));
			case 4:
			k1 = this._x64Xor(k1, this._x64LeftShift([0, key.charCodeAt(i + 3)], 24));
			case 3:
			k1 = this._x64Xor(k1, this._x64LeftShift([0, key.charCodeAt(i + 2)], 16));
			case 2:
			k1 = this._x64Xor(k1, this._x64LeftShift([0, key.charCodeAt(i + 1)], 8));
			case 1:
			k1 = this._x64Xor(k1, [0, key.charCodeAt(i)]);
			k1 = this._x64Multiply(k1, c1);
			k1 = this._x64Rotl(k1, 31);
			k1 = this._x64Multiply(k1, c2);
			h1 = this._x64Xor(h1, k1);
		}
		h1 = this._x64Xor(h1, [0, key.length]);
		h2 = this._x64Xor(h2, [0, key.length]);
		h1 = this._x64Add(h1, h2);
		h2 = this._x64Add(h2, h1);
		h1 = this._x64Fmix(h1);
		h2 = this._x64Fmix(h2);
		h1 = this._x64Add(h1, h2);
		h2 = this._x64Add(h2, h1);
		return ("00000000" + (h1[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (h1[1] >>> 0).toString(16)).slice(-8) + ("00000000" + (h2[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (h2[1] >>> 0).toString(16)).slice(-8);
		},

		// ----------------------
		// Public methods
		// ----------------------

		getImprint: function(sources){
			var self = this;
			return Promise.all(sources.map(function(x){
				if (!_tests.hasOwnProperty(x))
					throw "No test registered with the alias " + x;
				return _tests[x]();
			})).then(function(values){
				return self._x64hash128(values.join(""));
			})
		}

	}

	ImprintJs.registerTest = function(alias, test)
	{
		// Add test factory to tests collection
		_tests[alias] = test;
	}

	// Export the ImprintJs class
	if (typeof module === 'object' && typeof exports !== "undefined") {
		module.exports = ImprintJs;
	}

	scope.ImprintJs = ImprintJs;

})(window);


// https://github.com/Song-Li/cross_browser/blob/master/client/fingerprint/js/audio.js

(function(scope){

	'use strict';

	ImprintJs.registerTest("audio", function(){
		return new Promise(function(resolve) {
			try 
			{
				var audioCtx = new (window.AudioContext || window.webkitAudioContext),
					oscillator = audioCtx.createOscillator(),
					analyser = audioCtx.createAnalyser(),
					gainNode = audioCtx.createGain(),
					scriptProcessor = audioCtx.createScriptProcessor(4096,1,1);
				var destination = audioCtx.destination;
				var val = (audioCtx.sampleRate).toString() + '_' + destination.maxChannelCount + "_" + destination.numberOfInputs + '_' + destination.numberOfOutputs + '_' + destination.channelCount + '_' + destination.channelCountMode + '_' + destination.channelInterpretation;
				return resolve(val);
			} 
			catch (e) 
			{
				return resolve("");
			}
		});
	});

})(window);
(function(scope){

	'use strict';

	ImprintJs.registerTest("availableScreenResolution", function(){
		return new Promise(function(resolve) {
			return resolve(screen.availWidth + "x" + screen.availHeight);
		});
	});

})(window);
(function(scope){

	'use strict';

	ImprintJs.registerTest("canvas", function(){
		new Promise(function(resolve) {

			var result = [];

			// Very simple now, need to make it more complex (geo shapes etc)
			var canvas = document.createElement("canvas");
			canvas.width = 2000;
			canvas.height = 200;
			canvas.style.display = "inline";

			var ctx = canvas.getContext("2d");

			// detect browser support of canvas winding
			// http://blogs.adobe.com/webplatform/2013/01/30/winding-rules-in-canvas/
			// https://github.com/Modernizr/Modernizr/blob/master/feature-detects/canvas/winding.js
			ctx.rect(0, 0, 10, 10);
			ctx.rect(2, 2, 6, 6);
			result.push("canvas winding:" + ((ctx.isPointInPath(5, 5, "evenodd") === false) ? "yes" : "no"));

			ctx.textBaseline = "alphabetic";
			ctx.fillStyle = "#f60";
			ctx.fillRect(125, 1, 62, 20);
			ctx.fillStyle = "#069";

			// https://github.com/Valve/fingerprintjs2/issues/66
			ctx.font = "11pt no-real-font-123";
			ctx.fillText("Cwm fjordbank glyphs vext quiz, \ud83d\ude03", 2, 15);
			ctx.fillStyle = "rgba(102, 204, 0, 0.2)";
			ctx.font = "18pt Arial";
			ctx.fillText("Cwm fjordbank glyphs vext quiz, \ud83d\ude03", 4, 45);

			// canvas blending
			// http://blogs.adobe.com/webplatform/2013/01/28/blending-features-in-canvas/
			// http://jsfiddle.net/NDYV8/16/
			ctx.globalCompositeOperation = "multiply";
			ctx.fillStyle = "rgb(255,0,255)";
			ctx.beginPath();
			ctx.arc(50, 50, 50, 0, Math.PI * 2, true);
			ctx.closePath();
			ctx.fill();
			ctx.fillStyle = "rgb(0,255,255)";
			ctx.beginPath();
			ctx.arc(100, 50, 50, 0, Math.PI * 2, true);
			ctx.closePath();
			ctx.fill();
			ctx.fillStyle = "rgb(255,255,0)";
			ctx.beginPath();
			ctx.arc(75, 100, 50, 0, Math.PI * 2, true);
			ctx.closePath();
			ctx.fill();
			ctx.fillStyle = "rgb(255,0,255)";

			// canvas winding
			// http://blogs.adobe.com/webplatform/2013/01/30/winding-rules-in-canvas/
			// http://jsfiddle.net/NDYV8/19/
			ctx.arc(75, 75, 75, 0, Math.PI * 2, true);
			ctx.arc(75, 75, 25, 0, Math.PI * 2, true);
			ctx.fill("evenodd");

			result.push("canvas fp:" + canvas.toDataURL());

			return resolve(result.join("~"));
		});
	});

})(window);
(function(scope){

	'use strict';

	ImprintJs.registerTest("colorDepth", function(){
		return new Promise(function(resolve) {
			return resolve(screen.colorDepth || "");
		});
	});

})(window);
(function(scope){

	'use strict';

	ImprintJs.registerTest("cookies", function(){
		return new Promise(function(resolve) {
			return resolve(navigator.cookieEnabled);
		});
	});

})(window);
(function(scope){

	'use strict';

	ImprintJs.registerTest("cpuClass", function(){
		return new Promise(function(resolve) {
			return resolve(navigator.cpuClass || "");
		});
	});

})(window);
(function(scope){

	'use strict';

	ImprintJs.registerTest("deviceDpi", function(){
		return new Promise(function(resolve) {
			return resolve(screen.deviceXDPI + "x" + screen.deviceYDPI);
		});
	});

})(window);
(function(scope){

	'use strict';

	ImprintJs.registerTest("doNotTrack", function(){
		return new Promise(function(resolve) {
			return resolve(navigator.doNotTrack || navigator.msDoNotTrack || window.doNotTrack || "");
		});
	});

})(window);
(function(scope){

	'use strict';

	ImprintJs.registerTest("indexedDb", function(){
		return new Promise(function(resolve) {
			try
			{
				return resolve(!!window.indexedDB);
			} 
			catch (e) 
			{
				return resolve(true); // SecurityError when referencing it means it exists
			}
		});
	});

})(window);
/**
 * JavaScript code to detect available availability of a
 * particular font in a browser using JavaScript and CSS.
 *
 * Author : Lalit Patel
 * Website: http://www.lalit.org/lab/javascript-css-font-detect/
 * License: Apache Software License 2.0
 *          http://www.apache.org/licenses/LICENSE-2.0
 * Version: 0.15 (21 Sep 2009)
 *          Changed comparision font to default from sans-default-default,
 *          as in FF3.0 font of child element didn't fallback
 *          to parent element if the font is missing.
 * Version: 0.2 (04 Mar 2012)
 *          Comparing font against all the 3 generic font families ie,
 *          'monospace', 'sans-serif' and 'sans'. If it doesn't match all 3
 *          then that font is 100% not available in the system
 * Version: 0.3 (24 Mar 2012)
 *          Replaced sans with serif in the list of baseFonts
 */
var FontDetector=function(){function i(b){var c=!1;for(var h in a){e.style.fontFamily=b+","+a[h],d.appendChild(e);var i=e.offsetWidth!=f[a[h]]||e.offsetHeight!=g[a[h]];d.removeChild(e),c=c||i}return c}var a=["monospace","sans-serif","serif"],b="mmmmmmmmmmlli",c="72px",d=document.getElementsByTagName("body")[0],e=document.createElement("span");e.style.fontSize=c,e.innerHTML=b;var f={},g={};for(var h in a)e.style.fontFamily=a[h],d.appendChild(e),f[a[h]]=e.offsetWidth,g[a[h]]=e.offsetHeight,d.removeChild(e);this.detect=i};


(function(scope){

	'use strict';

	ImprintJs.registerTest("installedFonts", function(){
		return new Promise(function(resolve) {
			var fontDetective = new FontDetector();
			var fontArray = ["Abadi MT Condensed Light", "Adobe Fangsong Std", "Adobe Hebrew", "Adobe Ming Std", "Agency FB", "Aharoni", "Andalus", "Angsana New", "AngsanaUPC", "Aparajita", "Arab", "Arabic Transparent", "Arabic Typesetting", "Arial Baltic", "Arial Black", "Arial CE", "Arial CYR", "Arial Greek", "Arial TUR", "Arial", "Batang", "BatangChe", "Bauhaus 93", "Bell MT", "Bitstream Vera Serif", "Bodoni MT", "Bookman Old Style", "Braggadocio", "Broadway", "Browallia New", "BrowalliaUPC", "Calibri Light", "Calibri", "Californian FB", "Cambria Math", "Cambria", "Candara", "Castellar", "Casual", "Centaur", "Century Gothic", "Chalkduster", "Colonna MT", "Comic Sans MS", "Consolas", "Constantia", "Copperplate Gothic Light", "Corbel", "Cordia New", "CordiaUPC", "Courier New Baltic", "Courier New CE", "Courier New CYR", "Courier New Greek", "Courier New TUR", "Courier New", "DFKai-SB", "DaunPenh", "David", "DejaVu LGC Sans Mono", "Desdemona", "DilleniaUPC", "DokChampa", "Dotum", "DotumChe", "Ebrima", "Engravers MT", "Eras Bold ITC", "Estrangelo Edessa", "EucrosiaUPC", "Euphemia", "Eurostile", "FangSong", "Forte", "FrankRuehl", "Franklin Gothic Heavy", "Franklin Gothic Medium", "FreesiaUPC", "French Script MT", "Gabriola", "Gautami", "Georgia", "Gigi", "Gisha", "Goudy Old Style", "Gulim", "GulimChe", "GungSeo", "Gungsuh", "GungsuhChe", "Haettenschweiler", "Harrington", "Hei S", "HeiT", "Heisei Kaku Gothic", "Hiragino Sans GB", "Impact", "Informal Roman", "IrisUPC", "Iskoola Pota", "JasmineUPC", "KacstOne", "KaiTi", "Kalinga", "Kartika", "Khmer UI", "Kino MT", "KodchiangUPC", "Kokila", "Kozuka Gothic Pr6N", "Lao UI", "Latha", "Leelawadee", "Levenim MT", "LilyUPC", "Lohit Gujarati", "Loma", "Lucida Bright", "Lucida Console", "Lucida Fax", "Lucida Sans Unicode", "MS Gothic", "MS Mincho", "MS PGothic", "MS PMincho", "MS Reference Sans Serif", "MS UI Gothic", "MV Boli", "Magneto", "Malgun Gothic", "Mangal", "Marlett", "Matura MT Script Capitals", "Meiryo UI", "Meiryo", "Menlo", "Microsoft Himalaya", "Microsoft JhengHei", "Microsoft New Tai Lue", "Microsoft PhagsPa", "Microsoft Sans Serif", "Microsoft Tai Le", "Microsoft Uighur", "Microsoft YaHei", "Microsoft Yi Baiti", "MingLiU", "MingLiU-ExtB", "MingLiU_HKSCS", "MingLiU_HKSCS-ExtB", "Miriam Fixed", "Miriam", "Mongolian Baiti", "MoolBoran", "NSimSun", "Narkisim", "News Gothic MT", "Niagara Solid", "Nyala", "PMingLiU", "PMingLiU-ExtB", "Palace Script MT", "Palatino Linotype", "Papyrus", "Perpetua", "Plantagenet Cherokee", "Playbill", "Prelude Bold", "Prelude Condensed Bold", "Prelude Condensed Medium", "Prelude Medium", "PreludeCompressedWGL Black", "PreludeCompressedWGL Bold", "PreludeCompressedWGL Light", "PreludeCompressedWGL Medium", "PreludeCondensedWGL Black", "PreludeCondensedWGL Bold", "PreludeCondensedWGL Light", "PreludeCondensedWGL Medium", "PreludeWGL Black", "PreludeWGL Bold", "PreludeWGL Light", "PreludeWGL Medium", "Raavi", "Rachana", "Rockwell", "Rod", "Sakkal Majalla", "Sawasdee", "Script MT Bold", "Segoe Print", "Segoe Script", "Segoe UI Light", "Segoe UI Semibold", "Segoe UI Symbol", "Segoe UI", "Shonar Bangla", "Showcard Gothic", "Shruti", "SimHei", "SimSun", "SimSun-ExtB", "Simplified Arabic Fixed", "Simplified Arabic", "Snap ITC", "Sylfaen", "Symbol", "Tahoma", "Times New Roman Baltic", "Times New Roman CE", "Times New Roman CYR", "Times New Roman Greek", "Times New Roman TUR", "Times New Roman", "TlwgMono", "Traditional Arabic", "Trebuchet MS", "Tunga", "Tw Cen MT Condensed Extra Bold", "Ubuntu", "Umpush", "Univers", "Utopia", "Utsaah", "Vani", "Verdana", "Vijaya", "Vladimir Script", "Vrinda", "Webdings", "Wide Latin", "Wingdings"];
			var installedFontsArray = [];

			for (var i = 0; i < fontArray.length; i++) {
				if (fontDetective.detect(fontArray[i])) {
					installedFontsArray.push(fontArray[i]);
				}
			}

			return resolve(installedFontsArray.join("~"));
		});
	});

})(window);
(function(scope){

	'use strict';

	ImprintJs.registerTest("language", function(){
		return new Promise(function(resolve) {
			return resolve(navigator.language || navigator.userLanguage || navigator.browserLanguage || navigator.systemLanguage || "");
		});
	});

})(window);
(function(scope){

	'use strict';

	ImprintJs.registerTest("localIp", function(){
		return new Promise(function(resolve) {
			try 
			{
				var RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;   //compatibility for firefox and chrome
				var pc = new RTCPeerConnection({iceServers:[]}), noop = function(){};      
				pc.createDataChannel("");    //create a bogus data channel
				pc.createOffer(pc.setLocalDescription.bind(pc), noop);    // create offer and set local description
				pc.onicecandidate = function(ice) //listen for candidate events
				{  
					pc.onicecandidate = noop;

					if(!ice || !ice.candidate || !ice.candidate.candidate)  
					{
						return resolve("");
					} 

					var val = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(ice.candidate.candidate)[1];
					return resolve(val);			
				};
			} 
			catch (e) 
			{
				return resolve("");
			}
		});
	});

})(window);
(function(scope){

	'use strict';

	ImprintJs.registerTest("localStorage", function(){
		return new Promise(function(resolve) {
			try 
			{
				return resolve(!!window.localStorage);
			} 
			catch (e) 
			{
				return resolve(true); // SecurityError when referencing it means it exists
			}
		});
	});

})(window);
(function(scope){

	'use strict';

	ImprintJs.registerTest("pixelRatio", function(){
		return new Promise(function(resolve) {
			return resolve(window.devicePixelRatio || "");
		});
	});

})(window);
(function(scope){

	'use strict';

	ImprintJs.registerTest("platform", function(){
		return new Promise(function(resolve) {
			return resolve(navigator.platform || "");
		});
	});

})(window);
(function(scope){

	'use strict';

	ImprintJs.registerTest("plugins", function(){
		return new Promise(function(resolve) {
			
			var results = [];

			// IE
			if((Object.getOwnPropertyDescriptor && Object.getOwnPropertyDescriptor(window, "ActiveXObject")) || ("ActiveXObject" in window)) 
			{
				var names = [
					"AcroPDF.PDF", // Adobe PDF reader 7+
					"Adodb.Stream",
					"AgControl.AgControl", // Silverlight
					"DevalVRXCtrl.DevalVRXCtrl.1",
					"MacromediaFlashPaper.MacromediaFlashPaper",
					"Msxml2.DOMDocument",
					"Msxml2.XMLHTTP",
					"PDF.PdfCtrl", // Adobe PDF reader 6 and earlier, brrr
					"QuickTime.QuickTime", // QuickTime
					"QuickTimeCheckObject.QuickTimeCheck.1",
					"RealPlayer",
					"RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)",
					"RealVideo.RealVideo(tm) ActiveX Control (32-bit)",
					"Scripting.Dictionary",
					"SWCtl.SWCtl", // ShockWave player
					"Shell.UIHelper",
					"ShockwaveFlash.ShockwaveFlash", //flash plugin
					"Skype.Detection",
					"TDCCtl.TDCCtl",
					"WMPlayer.OCX", // Windows media player
					"rmocx.RealPlayer G2 Control",
					"rmocx.RealPlayer G2 Control.1"
				];

				// starting to detect plugins in IE
				results = this.map(names, function(name) 
				{
					try 
					{
						new ActiveXObject(name); // eslint-disable-no-new
						return name;
					} 
					catch(e) 
					{
						return null;
					}
				});

			}

			// None IE
			if(navigator.plugins) {
				for (var i = 0; i < navigator.plugins.length; i++) {
					results.push(navigator.plugins[i].name);
				}
			}

			return resolve(results.join("~"));

		});
	});

})(window);
/*
 * Core Estimator
 * CPU core estimation timing attack using web workers
 * A polyfill for navigator.hardwareConcurrency
 * 2014-05-27
 * 
 * Website: https://github.com/oftn-oswg/core-estimator
 * Copyright (c) Working Group contributors
 * License: MIT
 */
!function(a){function q(a,b,d,e){for(var f=[],g=a.length;g<b;g++)a.push(new Worker(o));r(function(g){for(var h,i=b,j=0;j<b;j++)a[j].onmessage=function(){i--,i||(d--,f.push(n.now()-h),d?g():e(f))};for(var j=0;j<b;j++)a[j].postMessage(c);h=n.now()})}function r(a){!function b(){a(b)}()}function s(a,b,c){function f(g,h){c&&c(d,e,g),a(1,function(){a(g,function(a){return a?(d=g,g+=h):(e=g,g-=h),e-d===1?b(d):h?void f(g,h>>1):b(e-1)})})}var d=1,e=1/0;!function g(h){c&&c(d,e,h),a(1,function(){a(h,function(a){if(a)d=h,g(2*h);else{if(e=h,1===d)return b(d);f(3*d/2,d/4)}})})}(2)}function t(a){var b=a.length;if(!b)return null;for(var c=1/0,d=-1/0,e=0,f=0,g=0;g<b;g++){var h=a[g];h<c&&(c=h),h>d&&(d=h),e+=h,f+=Math.pow(h,2)}var i=e/b,j=Math.pow(i,2),k=0,l=0;b>1&&(k=f/b-j,l=(f-b*j)/(b-1));var m={size:b,mean:i,uvariance:l};return m}function v(a,b){var c=Object.keys(u),d=c.reduce(function(a,c){return b<c?a:c}),e=c.reduce(function(a,c){return b>c?a:c}),f=e-d,g=w(u[d],u[e],(b-d)/f);return a<g}function w(a,b,c){return a+(b-a)*c}var b=20,c=4194304,d=navigator.hardwareConcurrency,e=document,f=(e.currentScript||e.scripts[e.scripts.length-1]).src.replace(/\/[^\/]+$/,"/");if(!d&&navigator.mimeTypes["application/x-pnacl"]){var g="http://www.w3.org/1999/xhtml",h=console.error.bind(console),i=[],j=function(a){var c,b=navigator.hardwareConcurrency=a.data;for(navigator.getHardwareConcurrency=function(a,c){a(b),c&&c.progress&&c.progress(b,b,b)};c=i.shift();)navigator.getHardwareConcurrency(c[0],c[1]);l.removeEventListener("load",k,!0),l.removeEventListener("message",j,!0),l.removeEventListener("error",h,!0),l.removeEventListener("crash",h,!0),e.documentElement.removeChild(l)},k=function(){m.postMessage(0)};navigator.getHardwareConcurrency=function(a,b){i.push([a,b])};var l=e.createElementNS(g,"div");l.addEventListener("load",k,!0),l.addEventListener("message",j,!0),l.addEventListener("error",h,!0),l.addEventListener("crash",h,!0);var m=e.createElementNS(g,"embed");return m.setAttribute("path",f+"nacl_module/pnacl/Release"),m.setAttribute("src",f+"nacl_module/pnacl/Release/cores.nmf"),m.setAttribute("type","application/x-pnacl"),l.appendChild(m),void e.documentElement.appendChild(l)}var n=a.performance||Date;n.now||(n.webkitNow?n.now=n.webkitNow:n.now=function(){return+new Date});var o=f+"workload.js",p=!1;d||(navigator.hardwareConcurrency=1,"undefined"==typeof Worker&&(d=!0)),navigator.getHardwareConcurrency=function(a,c){if(c=c||{},"use_cache"in c||(c.use_cache=!0),d||c.use_cache&&p)return void a(navigator.hardwareConcurrency);e.documentElement.style.cursor="progress";var h,f=[],i=[];s(function(a,c){q(f,a,b,function(b){if(1===a)Array.prototype.push.apply(i,b),h=t(i),c(!0);else{var d=t(b),e=d.uvariance/d.size,f=h.uvariance/h.size,g=(d.mean-h.mean)/Math.sqrt(e+f),j=Math.pow(e+f,2)/(Math.pow(d.uvariance,2)/(Math.pow(d.size,2)*(d.size-1))+Math.pow(h.uvariance,2)/(Math.pow(h.size,2)*(h.size-1)));c(v(g,j))}})},function(b){for(var c=0,d=f.length;c<d;c++)f[c].terminate();e.documentElement.style.cursor="",navigator.hardwareConcurrency=b,p=!0,a(b)},c.progress)};var u={1:63.66,2:9.925,3:5.841,4:4.604,5:4.032,6:3.707,7:3.499,8:3.355,9:3.25,10:3.169,11:3.106,12:3.055,13:3.012,14:2.977,15:2.947,16:2.921,17:2.898,18:2.878,19:2.861,20:2.845,21:2.831,22:2.819,23:2.807,24:2.797,25:2.787,26:2.779,27:2.771,28:2.763,29:2.756,30:2.75,32:2.738,34:2.728,36:2.719,38:2.712,40:2.704,42:2.698,44:2.692,46:2.687,48:2.682,50:2.678,55:2.668,60:2.66,65:2.654,70:2.648,80:2.639,100:2.626,150:2.609,200:2.601}}(self);

(function(scope){

	'use strict';

	ImprintJs.registerTest("processorCores", function(){
		return new Promise(function(resolve) {
			navigator.getHardwareConcurrency(function() {
				return resolve(navigator.hardwareConcurrency);
			}); 
		});
	});

})(window);
(function(scope){

	'use strict';

	ImprintJs.registerTest("publicIp", function(){
		return new Promise(function(resolve) {
			var xmlHttp = new XMLHttpRequest();
			xmlHttp.onreadystatechange = function() { 
				if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
					resolve(xmlHttp.responseText);
			}
			xmlHttp.open("GET", "https://api.ipify.org", true); // true for asynchronous 
			xmlHttp.send(null);	
		});
	});

})(window);
(function(scope){

	'use strict';

	ImprintJs.registerTest("screenResolution", function(){
		return new Promise(function(resolve) {
			return resolve(screen.width + "x" + screen.height);
		});
	});

})(window);
(function(scope){

	'use strict';

	ImprintJs.registerTest("sessionStorage", function(){
		return new Promise(function(resolve) {
			try 
			{
				return resolve(!!window.sessionStorage);
			} 
			catch (e) 
			{
				return resolve(true); // SecurityError when referencing it means it exists
			}
		});
	});

})(window);
(function(scope){

	'use strict';

	ImprintJs.registerTest("timezoneOffset", function(){
		return new Promise(function(resolve) {
			return resolve(new Date().getTimezoneOffset());
		});
	});

})(window);
(function(scope){

	'use strict';

	ImprintJs.registerTest("touchSupport", function(){
		return new Promise(function(resolve) {
			
			var maxTouchPoints = 0;
			var touchEvent = false;

			if (typeof navigator.maxTouchPoints !== "undefined") 
			{
				maxTouchPoints = navigator.maxTouchPoints;
			} 
			else if (typeof navigator.msMaxTouchPoints !== "undefined") 
			{
				maxTouchPoints = navigator.msMaxTouchPoints;
			}

			try 
			{
				document.createEvent("TouchEvent");
				touchEvent = true;
			} 
			catch(e) 
			{ 
				/* squelch */ 
			}

			var touchStart = "ontouchstart" in window;

			return resolve([maxTouchPoints, touchEvent, touchStart].join("~"));

		});
	});

})(window);
(function(scope){

	'use strict';

	ImprintJs.registerTest("userAgent", function(){
		return new Promise(function(resolve) {
			return resolve(navigator.userAgent);
		});
	});

})(window);
(function(scope){

	'use strict';

	ImprintJs.registerTest("webGl", function(){
		return new Promise(function(resolve) {
			try 
			{
				var fa2s = function(fa) {
					gl.clearColor(0.0, 0.0, 0.0, 1.0);
					gl.enable(gl.DEPTH_TEST);
					gl.depthFunc(gl.LEQUAL);
					gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
					return "[" + fa[0] + ", " + fa[1] + "]";
				};
				var maxAnisotropy = function(gl) {
				var anisotropy, ext = gl.getExtension("EXT_texture_filter_anisotropic") || gl.getExtension("WEBKIT_EXT_texture_filter_anisotropic") || gl.getExtension("MOZ_EXT_texture_filter_anisotropic");
					return ext ? (anisotropy = gl.getParameter(ext.MAX_TEXTURE_MAX_ANISOTROPY_EXT), 0 === anisotropy && (anisotropy = 2), anisotropy) : null;
				};

				var canvas = document.createElement("canvas");
				var gl = null;

				try 
				{
					gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
				} 
				catch(e) 
				{ 
					/* squelch */ 
				}

				if(!gl) 
					return resolve("");

				// WebGL fingerprinting is a combination of techniques, found in MaxMind antifraud script & Augur fingerprinting.
				// First it draws a gradient object with shaders and convers the image to the Base64 string.
				// Then it enumerates all WebGL extensions & capabilities and appends them to the Base64 string, resulting in a huge WebGL string, potentially very unique on each device
				// Since iOS supports webgl starting from version 8.1 and 8.1 runs on several graphics chips, the results may be different across ios devices, but we need to verify it.
				var result = [];
				var vShaderTemplate = "attribute vec2 attrVertex;varying vec2 varyinTexCoordinate;uniform vec2 uniformOffset;void main(){varyinTexCoordinate=attrVertex+uniformOffset;gl_Position=vec4(attrVertex,0,1);}";
				var fShaderTemplate = "precision mediump float;varying vec2 varyinTexCoordinate;void main() {gl_FragColor=vec4(varyinTexCoordinate,0,1);}";
				var vertexPosBuffer = gl.createBuffer();
				gl.bindBuffer(gl.ARRAY_BUFFER, vertexPosBuffer);
				
				var vertices = new Float32Array([-.2, -.9, 0, .4, -.26, 0, 0, .732134444, 0]);
				gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
				vertexPosBuffer.itemSize = 3;
				vertexPosBuffer.numItems = 3;
				
				var program = gl.createProgram(), vshader = gl.createShader(gl.VERTEX_SHADER);
				gl.shaderSource(vshader, vShaderTemplate);
				gl.compileShader(vshader);
				
				var fshader = gl.createShader(gl.FRAGMENT_SHADER);
				gl.shaderSource(fshader, fShaderTemplate);
				gl.compileShader(fshader);
				gl.attachShader(program, vshader);
				gl.attachShader(program, fshader);
				gl.linkProgram(program);
				gl.useProgram(program);
				program.vertexPosAttrib = gl.getAttribLocation(program, "attrVertex");
				program.offsetUniform = gl.getUniformLocation(program, "uniformOffset");
				gl.enableVertexAttribArray(program.vertexPosArray);
				gl.vertexAttribPointer(program.vertexPosAttrib, vertexPosBuffer.itemSize, gl.FLOAT, !1, 0, 0);
				gl.uniform2f(program.offsetUniform, 1, 1);
				gl.drawArrays(gl.TRIANGLE_STRIP, 0, vertexPosBuffer.numItems);

				if (gl.canvas != null) 
				{ 
					result.push(gl.canvas.toDataURL()); 
				}

				result.push("extensions:" + gl.getSupportedExtensions().join(";"));
				result.push("webgl aliased line width range:" + fa2s(gl.getParameter(gl.ALIASED_LINE_WIDTH_RANGE)));
				result.push("webgl aliased point size range:" + fa2s(gl.getParameter(gl.ALIASED_POINT_SIZE_RANGE)));
				result.push("webgl alpha bits:" + gl.getParameter(gl.ALPHA_BITS));
				result.push("webgl antialiasing:" + (gl.getContextAttributes().antialias ? "yes" : "no"));
				result.push("webgl blue bits:" + gl.getParameter(gl.BLUE_BITS));
				result.push("webgl depth bits:" + gl.getParameter(gl.DEPTH_BITS));
				result.push("webgl green bits:" + gl.getParameter(gl.GREEN_BITS));
				result.push("webgl max anisotropy:" + maxAnisotropy(gl));
				result.push("webgl max combined texture image units:" + gl.getParameter(gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS));
				result.push("webgl max cube map texture size:" + gl.getParameter(gl.MAX_CUBE_MAP_TEXTURE_SIZE));
				result.push("webgl max fragment uniform vectors:" + gl.getParameter(gl.MAX_FRAGMENT_UNIFORM_VECTORS));
				result.push("webgl max render buffer size:" + gl.getParameter(gl.MAX_RENDERBUFFER_SIZE));
				result.push("webgl max texture image units:" + gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS));
				result.push("webgl max texture size:" + gl.getParameter(gl.MAX_TEXTURE_SIZE));
				result.push("webgl max varying vectors:" + gl.getParameter(gl.MAX_VARYING_VECTORS));
				result.push("webgl max vertex attribs:" + gl.getParameter(gl.MAX_VERTEX_ATTRIBS));
				result.push("webgl max vertex texture image units:" + gl.getParameter(gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS));
				result.push("webgl max vertex uniform vectors:" + gl.getParameter(gl.MAX_VERTEX_UNIFORM_VECTORS));
				result.push("webgl max viewport dims:" + fa2s(gl.getParameter(gl.MAX_VIEWPORT_DIMS)));
				result.push("webgl red bits:" + gl.getParameter(gl.RED_BITS));
				result.push("webgl renderer:" + gl.getParameter(gl.RENDERER));
				result.push("webgl shading language version:" + gl.getParameter(gl.SHADING_LANGUAGE_VERSION));
				result.push("webgl stencil bits:" + gl.getParameter(gl.STENCIL_BITS));
				result.push("webgl vendor:" + gl.getParameter(gl.VENDOR));
				result.push("webgl version:" + gl.getParameter(gl.VERSION));

				try 
				{
					// Add the unmasked vendor and unmasked renderer if the debug_renderer_info extension is available
					var extensionDebugRendererInfo = gl.getExtension("WEBGL_debug_renderer_info");
					if (extensionDebugRendererInfo) 
					{
						result.push("webgl unmasked vendor:" + gl.getParameter(extensionDebugRendererInfo.UNMASKED_VENDOR_WEBGL));
						result.push("webgl unmasked renderer:" + gl.getParameter(extensionDebugRendererInfo.UNMASKED_RENDERER_WEBGL));
					}
				} 
				catch(e) 
				{ 
					/* squelch */ 
				}
				
				if (!gl.getShaderPrecisionFormat) 
					return resolve(result.join("~"));

				result.push("webgl vertex shader high float precision:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.HIGH_FLOAT ).precision);
				result.push("webgl vertex shader high float precision rangeMin:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.HIGH_FLOAT ).rangeMin);
				result.push("webgl vertex shader high float precision rangeMax:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.HIGH_FLOAT ).rangeMax);
				result.push("webgl vertex shader medium float precision:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.MEDIUM_FLOAT ).precision);
				result.push("webgl vertex shader medium float precision rangeMin:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.MEDIUM_FLOAT ).rangeMin);
				result.push("webgl vertex shader medium float precision rangeMax:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.MEDIUM_FLOAT ).rangeMax);
				result.push("webgl vertex shader low float precision:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.LOW_FLOAT ).precision);
				result.push("webgl vertex shader low float precision rangeMin:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.LOW_FLOAT ).rangeMin);
				result.push("webgl vertex shader low float precision rangeMax:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.LOW_FLOAT ).rangeMax);
				result.push("webgl fragment shader high float precision:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT ).precision);
				result.push("webgl fragment shader high float precision rangeMin:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT ).rangeMin);
				result.push("webgl fragment shader high float precision rangeMax:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT ).rangeMax);
				result.push("webgl fragment shader medium float precision:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.MEDIUM_FLOAT ).precision);
				result.push("webgl fragment shader medium float precision rangeMin:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.MEDIUM_FLOAT ).rangeMin);
				result.push("webgl fragment shader medium float precision rangeMax:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.MEDIUM_FLOAT ).rangeMax);
				result.push("webgl fragment shader low float precision:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.LOW_FLOAT ).precision);
				result.push("webgl fragment shader low float precision rangeMin:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.LOW_FLOAT ).rangeMin);
				result.push("webgl fragment shader low float precision rangeMax:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.LOW_FLOAT ).rangeMax);
				result.push("webgl vertex shader high int precision:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.HIGH_INT ).precision);
				result.push("webgl vertex shader high int precision rangeMin:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.HIGH_INT ).rangeMin);
				result.push("webgl vertex shader high int precision rangeMax:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.HIGH_INT ).rangeMax);
				result.push("webgl vertex shader medium int precision:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.MEDIUM_INT ).precision);
				result.push("webgl vertex shader medium int precision rangeMin:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.MEDIUM_INT ).rangeMin);
				result.push("webgl vertex shader medium int precision rangeMax:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.MEDIUM_INT ).rangeMax);
				result.push("webgl vertex shader low int precision:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.LOW_INT ).precision);
				result.push("webgl vertex shader low int precision rangeMin:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.LOW_INT ).rangeMin);
				result.push("webgl vertex shader low int precision rangeMax:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.LOW_INT ).rangeMax);
				result.push("webgl fragment shader high int precision:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_INT ).precision);
				result.push("webgl fragment shader high int precision rangeMin:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_INT ).rangeMin);
				result.push("webgl fragment shader high int precision rangeMax:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_INT ).rangeMax);
				result.push("webgl fragment shader medium int precision:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.MEDIUM_INT ).precision);
				result.push("webgl fragment shader medium int precision rangeMin:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.MEDIUM_INT ).rangeMin);
				result.push("webgl fragment shader medium int precision rangeMax:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.MEDIUM_INT ).rangeMax);
				result.push("webgl fragment shader low int precision:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.LOW_INT ).precision);
				result.push("webgl fragment shader low int precision rangeMin:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.LOW_INT ).rangeMin);
				result.push("webgl fragment shader low int precision rangeMax:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.LOW_INT ).rangeMax);
				
				return resolve(result.join("~"));
			} 
			catch (e) 
			{
				return resolve("");
			}
		});
	});

})(window);