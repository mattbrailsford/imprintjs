(function(scope){

	'use strict';

	imprint.registerTest("timezoneOffset", function(){
		return new Promise(function(resolve) {
			return resolve(new Date().getTimezoneOffset());
		});
	});

})(window);