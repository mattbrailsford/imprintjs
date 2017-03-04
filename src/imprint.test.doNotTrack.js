(function(scope){

	'use strict';

	imprint.registerTest("doNotTrack", function(){
		return new Promise(function(resolve) {
			return resolve(navigator.doNotTrack || navigator.msDoNotTrack || window.doNotTrack || "");
		});
	});

})(window);