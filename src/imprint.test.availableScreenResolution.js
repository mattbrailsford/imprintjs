(function(scope){

	'use strict';

	imprint.registerTest("availableScreenResolution", function(){
		return new Promise(function(resolve) {
			var val = (screen.availHeight > screen.availWidth) 
				? [screen.availHeight, screen.availWidth] 
				: [screen.availWidth, screen.availHeight];
			return resolve(val.join("x"));
		});
	});

})(window);
