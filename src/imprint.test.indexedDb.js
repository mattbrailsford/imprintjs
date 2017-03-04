(function(scope){

	'use strict';

	imprint.registerTest("indexedDb", function(){
		return new Promise(function(resolve) {
			try
			{
				return resolve(!!window.indexedDB);
			} 
			catch (e) 
			{
				return resolve(true); // SecurityError when referencing it means it exists
			}
		});
	});

})(window);