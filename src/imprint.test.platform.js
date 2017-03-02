(function(scope){

	'use strict';

	ImprintJs.registerTest("platform", function(){
		return new Promise(function(resolve) {
			return resolve(navigator.platform || "");
		});
	});

})(window);