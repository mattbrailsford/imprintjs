(function(scope){

	'use strict';

	ImprintJs.registerTest("cookies", function(){
		return new Promise(function(resolve) {
			return resolve(navigator.cookieEnabled);
		});
	});

})(window);