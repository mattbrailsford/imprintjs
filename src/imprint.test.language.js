(function(scope){

	'use strict';

	imprint.registerTest("language", function(){
		return new Promise(function(resolve) {
			return resolve(navigator.language || navigator.userLanguage || navigator.browserLanguage || navigator.systemLanguage || "");
		});
	});

})(window);