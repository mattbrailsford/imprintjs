(function(scope){

	'use strict';

	imprint.registerTest("processorCores", function(){
		return new Promise(function(resolve) {
			return resolve(navigator.hardwareConcurrency);
		});
	});

})(window);
