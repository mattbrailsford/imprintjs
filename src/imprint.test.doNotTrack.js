(function(scope){

	'use strict';

	ImprintJs.registerTest("doNotTrack", function(){
		return new Promise(function(resolve) {
			return resolve(navigator.doNotTrack || navigator.msDoNotTrack || window.doNotTrack || "");
		});
	});

})(window);