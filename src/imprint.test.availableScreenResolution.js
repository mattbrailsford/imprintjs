(function(scope){

	'use strict';

	ImprintJs.registerTest("availableScreenResolution", function(){
		return new Promise(function(resolve) {
			return resolve(screen.availWidth + "x" + screen.availHeight);
		});
	});

})(window);