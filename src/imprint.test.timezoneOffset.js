(function(scope){

	'use strict';

	ImprintJs.registerTest("timezoneOffset", function(){
		return new Promise(function(resolve) {
			return resolve(new Date().getTimezoneOffset());
		});
	});

})(window);