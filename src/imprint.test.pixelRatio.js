(function(scope){

	'use strict';

	ImprintJs.registerTest("pixelRatio", function(){
		return new Promise(function(resolve) {
			return resolve(window.devicePixelRatio || "");
		});
	});

})(window);