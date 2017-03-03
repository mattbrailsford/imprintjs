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
				//console.log(values);
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

