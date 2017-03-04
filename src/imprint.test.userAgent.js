(function(scope){

	'use strict';

	imprint.registerTest("userAgent", function(){
		return new Promise(function(resolve) {
			return resolve(navigator.userAgent);
		});
	});

})(window);