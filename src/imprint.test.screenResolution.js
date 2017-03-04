(function(scope){

	'use strict';

	imprint.registerTest("screenResolution", function(){
		return new Promise(function(resolve) {
			var val = (screen.height > screen.width) 
				? [screen.height, screen.width] 
				: [screen.width, screen.height];
			return resolve(val.join("x"));
		});
	});

})(window);
