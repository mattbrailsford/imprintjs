(function(scope){

	'use strict';

	imprint.registerTest("cpuClass", function(){
		return new Promise(function(resolve) {
			return resolve(navigator.cpuClass || "");
		});
	});

})(window);