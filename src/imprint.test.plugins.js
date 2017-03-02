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