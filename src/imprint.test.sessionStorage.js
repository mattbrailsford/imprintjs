(function(scope){

	'use strict';

	imprint.registerTest("sessionStorage", function(){
		return new Promise(function(resolve) {
			try 
			{
				return resolve(!!window.sessionStorage);
			} 
			catch (e) 
			{
				return resolve(true); // SecurityError when referencing it means it exists
			}
		});
	});

})(window);