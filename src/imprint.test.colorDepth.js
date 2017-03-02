(function(scope){

	'use strict';

	ImprintJs.registerTest("colorDepth", function(){
		return new Promise(function(resolve) {
			return resolve(screen.colorDepth || "");
		});
	});

})(window);