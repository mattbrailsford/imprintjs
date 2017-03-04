(function(scope){

	'use strict';

	ImprintJs.registerTest("screenResolution", function(){
		return new Promise(function(resolve) {
			var val = (screen.height > screen.width) 
				? [screen.height, screen.width] 
				: [screen.width, screen.height];
			return resolve(val.join("x"));
		});
	});

})(window);
