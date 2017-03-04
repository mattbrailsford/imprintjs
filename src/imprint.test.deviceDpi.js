(function(scope){

	'use strict';

	imprint.registerTest("deviceDpi", function(){
		return new Promise(function(resolve) {
			return resolve((screen.deviceXDPI || 0) + "x" + (screen.deviceYDPI || 0));
		});
	});

})(window);