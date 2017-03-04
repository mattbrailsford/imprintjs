(function(scope){

	'use strict';

	ImprintJs.registerTest("processorCores", function(){
		return new Promise(function(resolve) {
			return resolve(navigator.hardwareConcurrency);
		});
	});

})(window);
