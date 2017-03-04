(function(scope){

	'use strict';

	imprint.registerTest("adBlocker", function(){
		return new Promise(function(resolve) {
      var adsbox = document.createElement('div');
      adsbox.innerHTML = '&nbsp;';
      adsbox.className = 'adsbox';
      adsbox.style.display = 'block';
      adsbox.style.position = 'absolute';
      adsbox.style.top = '0px';
      adsbox.style.left = '-9999px';
      try
      { 
        // body may not exist, that's why we need try/catch
        document.body.appendChild(adsbox);
        window.setTimeout(function() {
          var result = adsbox.offsetHeight === 0;
          document.body.removeChild(adsbox);
          return resolve(result);
        }, 10);
      } catch (e) {
        return resolve(false);
      }
		});
	});

})(window);
