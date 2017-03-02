(function(scope){

	'use strict';

	ImprintJs.registerTest("language", function(){
		return new Promise(function(resolve) {
			return resolve(navigator.language || navigator.userLanguage || navigator.browserLanguage || navigator.systemLanguage || "");
		});
	});

})(window);