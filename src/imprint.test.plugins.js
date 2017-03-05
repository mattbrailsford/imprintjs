/*
 * Original Source: https://github.com/Valve/fingerprintjs2/blob/master/fingerprint2.js
 * Copyright: Valentin Vasilyev (valentin.vasilyev@outlook.com)
 * License: MIT
 * Changes:
 *  - Wrapped in an ImprintJs promise
 */

(function(scope){

	'use strict';

	imprint.registerTest("plugins", function(){
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
				results = names.map(function(name) 
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

				var plugins = [];

				for(var i = 0, l = navigator.plugins.length; i < l; i++) {
					plugins.push(navigator.plugins[i]);
				}

				// sorting plugins only for those user agents, that we know randomize the plugins
				// every time we try to enumerate them
				if(navigator.userAgent.match(/palemoon/i)) {
					plugins = plugins.sort(function(a, b) {
						if(a.name > b.name){ return 1; }
						if(a.name < b.name){ return -1; }
						return 0;
					});
				}

				var t = plugins.map(function (p) {
					var mimeTypes = [];
					for(var i = 0; i < p.length; i++){
						var mt = p[i];
						mimeTypes.push([mt.type, mt.suffixes].join("~"));
					}
					results.push([p.name, p.description, mimeTypes.join(",")].join("::"));
				});
			}

			return resolve(results.join("~"));

		});
	});

})(window);
