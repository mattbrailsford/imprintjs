(function(scope){

	'use strict';

	ImprintJs.registerTest("userAgent", function(){
		return new Promise(function(resolve) {
			return resolve(navigator.userAgent);
		});
	});

})(window);