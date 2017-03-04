<img height="150"  src="assets/imprintjs.png" style="margin-bottom: 20px;" alt="ImprintJS Logo" title="ImprintJS">

# ImprintJS
A javascript library for generating browser fingerprints.

[Demo](https://mattbrailsford.github.io/imprintjs/default.html)

## Installation
Simply include `imprint.min.js` in your HTML page. It has no other dependencies.

    <script type="text/javascript" src="imprint.min.js"></script>

## Usage
To create a fingerprint, instantiate a new instance of the `ImprintJs` class and call `getFingerprint` passing in a list of tests you wish to run. The `getFingerprint` method returns a javascript [Promise](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise) which once all tests have run, returns the generated fingerprint.

    <script type="text/javascript">
        
        var browserTests = [
            "audio",
            "availableScreenResolution",
            "canvas",
            "colorDepth",
            "cookies",
            "cpuClass",
            "deviceDpi",
            "doNotTrack",
            "indexedDb",
            "installedFonts",
            "language",
            "localIp",
            "localStorage",
            "pixelRatio",
            "platform",
            "plugins",
            "processorCores",
            "screenResolution",
            "sessionStorage",
            "timezoneOffset",
            "touchSupport",
            "userAgent",
            "webGl"
        ];
    
        new ImprintJs().getImprint(browserTests).then(function(val){
          console.log(val);
        });

    </script>

### Supported Tests
Out of the box, ImprintJS comes with the following tests
* audio
* availableScreenResolution
* canvas
* colorDepth
* cookies
* cpuClass
* deviceDpi
* doNotTrack
* indexedDb
* installedFonts
* installedLanguages [buggy]
* language
* localIp
* localStorage
* pixelRatio
* platform
* plugins
* processorCores
* publicIp [external request]
* screenResolution
* sessionstorage
* timezoneOffset
* touchSupport
* userAgent
* webGl

### Custom Tests
If you'd like to add your own custom test, you can register a new test like so

    ImprintJs.registerTest("testAlias", function(){
		return new Promise(function(resolve) {
		    var value = ""; // Some code to perform a test
			return resolve(value);
		});
	});

All tests must have an alias, and a factory method that creates a javascript Promise that performs the actual test. We use promises to allow for async tests. On completion, the promise should always resolve. If a value cannot be determined, simply resolve with an empty string.

## Acknowledgement
ImprintJS is based heavily on code from a number of libraries, namely
* [FingerprintJs2](https://github.com/Valve/fingerprintjs2)
* [ClientJs](https://github.com/jackspirou/clientjs)
* [Cross browser fingerprinting](https://github.com/Song-Li/cross_browser)

ImprintJS logo modified from fingerprint icon by Lloyd Humphreys from the Noun Project
