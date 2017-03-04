(function(scope){

	'use strict';

	imprint.registerTest("publicIp", function(){
		return new Promise(function(resolve) {
			var xmlHttp = new XMLHttpRequest();
			xmlHttp.onreadystatechange = function() { 
				if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
					resolve(xmlHttp.responseText);
			}
			xmlHttp.open("GET", "https://api.ipify.org", true); // true for asynchronous 
			xmlHttp.send(null);	
		});
	});

})(window);