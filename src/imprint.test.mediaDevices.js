(function(scope){

	'use strict';

	imprint.registerTest("mediaDevices", function(){
		return new Promise(function(resolve) {

			if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
			  return resolve(cd || "");
			}

			navigator.mediaDevices.enumerateDevices()
				.then(function(devices) {
					var results = devices.map(function(device){
						return device.kind + ":" + device.label + " id = " + device.deviceId;
					});
					return resolve(results.join(","));
				})
				.catch(function(err) {
					return resolve("");
				});		
		});
	});

})(window);
