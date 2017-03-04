(function(scope){

	'use strict';

	imprint.registerTest("platform", function(){
		return new Promise(function(resolve) {
			return resolve(navigator.platform || "");
		});
	});

})(window);