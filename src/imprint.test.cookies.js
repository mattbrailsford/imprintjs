(function(scope){

	'use strict';

	imprint.registerTest("cookies", function(){
		return new Promise(function(resolve) {
			return resolve(navigator.cookieEnabled);
		});
	});

})(window);