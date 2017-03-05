<img height="100"  src="assets/logo2.png" style="margin-bottom: 20px;" alt="ImprintJS Logo" title="ImprintJS">

A javascript library for [browser fingerprinting](https://en.wikipedia.org/wiki/Device_fingerprint).

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
    
        imprint.test(browserTests).then(function(result){
          console.log(result);
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
* sessionStorage
* timezoneOffset
* touchSupport
* userAgent
* webGl

### Custom Tests
If you'd like to add your own custom test, you can register a new test like so

    imprint.registerTest("testAlias", function(){
		return new Promise(function(resolve) {
		    var value = ""; // Some code to perform a test
			return resolve(value);
		});
	});

All tests must have an alias, and a factory method that creates a javascript Promise that performs the actual test. We use promises to allow for async tests. On completion, the promise should always resolve. If a value cannot be determined, simply resolve with an empty string.

## Known issues
* Some versions of Firefox for Android report inccorrect screen.height / screen.width values as they subtract the browser chrome when they shouldnt do resulting in inconsistant screenResolution test values. No current workaround. [Issue 1120452](https://bugzilla.mozilla.org/show_bug.cgi?id=1120452)
* Firefox for Android reports a color depth of 24 instead of 32 as they percieve the last 8 bits as being alpha and so shouldn't be concidered as part of the color depth. As a workaround, we treat all 32 bit colorDepths as 24 bit. [Issue 424386](https://bugzilla.mozilla.org/show_bug.cgi?id=424386)

## Acknowledgement
ImprintJS is based heavily on code from a number of libraries, namely
* [FingerprintJs2](https://github.com/Valve/fingerprintjs2)
* [ClientJs](https://github.com/jackspirou/clientjs)
* [Cross browser fingerprinting](https://github.com/Song-Li/cross_browser)

ImprintJS logo modified from fingerprint icon by [Lloyd Humphreys from the Noun Project](https://thenounproject.com/Lloyd/)
