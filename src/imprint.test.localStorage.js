(function(scope){

	'use strict';

	imprint.registerTest("localStorage", function(){
		return new Promise(function(resolve) {
			try 
			{
				return resolve(!!window.localStorage);
			} 
			catch (e) 
			{
				return resolve(true); // SecurityError when referencing it means it exists
			}
		});
	});

})(window);