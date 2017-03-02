(function(scope){

	'use strict';

	ImprintJs.registerTest("deviceDpi", function(){
		return new Promise(function(resolve) {
			return resolve(screen.deviceXDPI + "x" + screen.deviceYDPI);
		});
	});

})(window);