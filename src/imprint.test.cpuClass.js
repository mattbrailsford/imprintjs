(function(scope){

	'use strict';

	ImprintJs.registerTest("cpuClass", function(){
		return new Promise(function(resolve) {
			return resolve(navigator.cpuClass || "");
		});
	});

})(window);