(function(scope){

	'use strict';

	ImprintJs.registerTest("screenResolution", function(){
		return new Promise(function(resolve) {
			return resolve(screen.width + "x" + screen.height);
		});
	});

})(window);