(function(scope){

	'use strict';

	imprint.registerTest("colorDepth", function(){
		return new Promise(function(resolve) {
			return resolve(screen.colorDepth || "");
		});
	});

})(window);