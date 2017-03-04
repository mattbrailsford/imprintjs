/*
 * Original Source: https://github.com/Song-Li/cross_browser/blob/master/client/fingerprint/js/audio.js
 * Copyright: Yinzhi Cao, Song Li, Erik Wijmans
 * License: GNU v3
 * Changes:
 *  - Wrapped in an ImprintJs promise
 */

(function(scope){

	'use strict';

	imprint.registerTest("audio", function(){
		return new Promise(function(resolve) {
			try 
			{
				var audioCtx = new (window.AudioContext || window.webkitAudioContext),
					oscillator = audioCtx.createOscillator(),
					analyser = audioCtx.createAnalyser(),
					gainNode = audioCtx.createGain(),
					scriptProcessor = audioCtx.createScriptProcessor(4096,1,1);
				var destination = audioCtx.destination;
				var val = (audioCtx.sampleRate).toString() + '_' + destination.maxChannelCount + "_" + destination.numberOfInputs + '_' + destination.numberOfOutputs + '_' + destination.channelCount + '_' + destination.channelCountMode + '_' + destination.channelInterpretation;
				return resolve(val);
			} 
			catch (e) 
			{
				return resolve("");
			}
		});
	});

})(window);