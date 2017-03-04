(function(scope){

	'use strict';

	imprint.registerTest("pixelRatio", function(){
		return new Promise(function(resolve) {
			return resolve(window.devicePixelRatio || "");
		});
	});

})(window);