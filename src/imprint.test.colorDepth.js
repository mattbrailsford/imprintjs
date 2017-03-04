(function(scope){

	'use strict';

	imprint.registerTest("colorDepth", function(){
		return new Promise(function(resolve) {
			var cd = screen.colorDepth;

			// Some browsers return 24 rather than 32 as 32 is really
			// 24 bit color depth + 8 bits alpha, so they see the alpha
			// as not really being "color" so report 24 instead. 
			// For consistancy, treat all 32 color depths as 24.
			if (cd === 32) {
				cd = 24;
			}

			return resolve(cd || "");
		});
	});

})(window);
