/*
 * Core Estimator
 * CPU core estimation timing attack using web workers
 * A polyfill for navigator.hardwareConcurrency
 * 2014-05-27
 * 
 * Website: https://github.com/oftn-oswg/core-estimator
 * Copyright (c) Working Group contributors
 * License: MIT
 */
!function(a){function q(a,b,d,e){for(var f=[],g=a.length;g<b;g++)a.push(new Worker(o));r(function(g){for(var h,i=b,j=0;j<b;j++)a[j].onmessage=function(){i--,i||(d--,f.push(n.now()-h),d?g():e(f))};for(var j=0;j<b;j++)a[j].postMessage(c);h=n.now()})}function r(a){!function b(){a(b)}()}function s(a,b,c){function f(g,h){c&&c(d,e,g),a(1,function(){a(g,function(a){return a?(d=g,g+=h):(e=g,g-=h),e-d===1?b(d):h?void f(g,h>>1):b(e-1)})})}var d=1,e=1/0;!function g(h){c&&c(d,e,h),a(1,function(){a(h,function(a){if(a)d=h,g(2*h);else{if(e=h,1===d)return b(d);f(3*d/2,d/4)}})})}(2)}function t(a){var b=a.length;if(!b)return null;for(var c=1/0,d=-1/0,e=0,f=0,g=0;g<b;g++){var h=a[g];h<c&&(c=h),h>d&&(d=h),e+=h,f+=Math.pow(h,2)}var i=e/b,j=Math.pow(i,2),k=0,l=0;b>1&&(k=f/b-j,l=(f-b*j)/(b-1));var m={size:b,mean:i,uvariance:l};return m}function v(a,b){var c=Object.keys(u),d=c.reduce(function(a,c){return b<c?a:c}),e=c.reduce(function(a,c){return b>c?a:c}),f=e-d,g=w(u[d],u[e],(b-d)/f);return a<g}function w(a,b,c){return a+(b-a)*c}var b=20,c=4194304,d=navigator.hardwareConcurrency,e=document,f=(e.currentScript||e.scripts[e.scripts.length-1]).src.replace(/\/[^\/]+$/,"/");if(!d&&navigator.mimeTypes["application/x-pnacl"]){var g="http://www.w3.org/1999/xhtml",h=console.error.bind(console),i=[],j=function(a){var c,b=navigator.hardwareConcurrency=a.data;for(navigator.getHardwareConcurrency=function(a,c){a(b),c&&c.progress&&c.progress(b,b,b)};c=i.shift();)navigator.getHardwareConcurrency(c[0],c[1]);l.removeEventListener("load",k,!0),l.removeEventListener("message",j,!0),l.removeEventListener("error",h,!0),l.removeEventListener("crash",h,!0),e.documentElement.removeChild(l)},k=function(){m.postMessage(0)};navigator.getHardwareConcurrency=function(a,b){i.push([a,b])};var l=e.createElementNS(g,"div");l.addEventListener("load",k,!0),l.addEventListener("message",j,!0),l.addEventListener("error",h,!0),l.addEventListener("crash",h,!0);var m=e.createElementNS(g,"embed");return m.setAttribute("path",f+"nacl_module/pnacl/Release"),m.setAttribute("src",f+"nacl_module/pnacl/Release/cores.nmf"),m.setAttribute("type","application/x-pnacl"),l.appendChild(m),void e.documentElement.appendChild(l)}var n=a.performance||Date;n.now||(n.webkitNow?n.now=n.webkitNow:n.now=function(){return+new Date});var o=f+"workload.js",p=!1;d||(navigator.hardwareConcurrency=1,"undefined"==typeof Worker&&(d=!0)),navigator.getHardwareConcurrency=function(a,c){if(c=c||{},"use_cache"in c||(c.use_cache=!0),d||c.use_cache&&p)return void a(navigator.hardwareConcurrency);e.documentElement.style.cursor="progress";var h,f=[],i=[];s(function(a,c){q(f,a,b,function(b){if(1===a)Array.prototype.push.apply(i,b),h=t(i),c(!0);else{var d=t(b),e=d.uvariance/d.size,f=h.uvariance/h.size,g=(d.mean-h.mean)/Math.sqrt(e+f),j=Math.pow(e+f,2)/(Math.pow(d.uvariance,2)/(Math.pow(d.size,2)*(d.size-1))+Math.pow(h.uvariance,2)/(Math.pow(h.size,2)*(h.size-1)));c(v(g,j))}})},function(b){for(var c=0,d=f.length;c<d;c++)f[c].terminate();e.documentElement.style.cursor="",navigator.hardwareConcurrency=b,p=!0,a(b)},c.progress)};var u={1:63.66,2:9.925,3:5.841,4:4.604,5:4.032,6:3.707,7:3.499,8:3.355,9:3.25,10:3.169,11:3.106,12:3.055,13:3.012,14:2.977,15:2.947,16:2.921,17:2.898,18:2.878,19:2.861,20:2.845,21:2.831,22:2.819,23:2.807,24:2.797,25:2.787,26:2.779,27:2.771,28:2.763,29:2.756,30:2.75,32:2.738,34:2.728,36:2.719,38:2.712,40:2.704,42:2.698,44:2.692,46:2.687,48:2.682,50:2.678,55:2.668,60:2.66,65:2.654,70:2.648,80:2.639,100:2.626,150:2.609,200:2.601}}(self);

(function(scope){

	'use strict';

	ImprintJs.registerTest("processorCores", function(){
		return new Promise(function(resolve) {
			navigator.getHardwareConcurrency(function() {
				return resolve(navigator.hardwareConcurrency);
			}); 
		});
	});

})(window);