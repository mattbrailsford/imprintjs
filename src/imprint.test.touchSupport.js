(function(scope){

	'use strict';

	imprint.registerTest("touchSupport", function(){
		return new Promise(function(resolve) {
			
			var maxTouchPoints = 0;
			var touchEvent = false;

			if (typeof navigator.maxTouchPoints !== "undefined") 
			{
				maxTouchPoints = navigator.maxTouchPoints;
			} 
			else if (typeof navigator.msMaxTouchPoints !== "undefined") 
			{
				maxTouchPoints = navigator.msMaxTouchPoints;
			}

			try 
			{
				document.createEvent("TouchEvent");
				touchEvent = true;
			} 
			catch(e) 
			{ 
				/* squelch */ 
			}

			var touchStart = "ontouchstart" in window;

			return resolve([maxTouchPoints, touchEvent, touchStart].join("~"));

		});
	});

})(window);