/*
 * Original Source: https://github.com/Valve/fingerprintjs2/blob/master/fingerprint2.js
 * Copyright: Valentin Vasilyev (valentin.vasilyev@outlook.com)
 * License: MIT
 * Changes:
 *  - Wrapped in an ImprintJs promise
 */

(function(scope){

	'use strict';

	imprint.registerTest("webGl", function(){
		return new Promise(function(resolve) {
			try 
			{
				var fa2s = function(fa) {
					gl.clearColor(0.0, 0.0, 0.0, 1.0);
					gl.enable(gl.DEPTH_TEST);
					gl.depthFunc(gl.LEQUAL);
					gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
					return "[" + fa[0] + ", " + fa[1] + "]";
				};
				var maxAnisotropy = function(gl) {
				var anisotropy, ext = gl.getExtension("EXT_texture_filter_anisotropic") || gl.getExtension("WEBKIT_EXT_texture_filter_anisotropic") || gl.getExtension("MOZ_EXT_texture_filter_anisotropic");
					return ext ? (anisotropy = gl.getParameter(ext.MAX_TEXTURE_MAX_ANISOTROPY_EXT), 0 === anisotropy && (anisotropy = 2), anisotropy) : null;
				};

				var canvas = document.createElement("canvas");
				var gl = null;

				try 
				{
					gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
				} 
				catch(e) 
				{ 
					/* squelch */ 
				}

				if(!gl) 
					return resolve("");

				// WebGL fingerprinting is a combination of techniques, found in MaxMind antifraud script & Augur fingerprinting.
				// First it draws a gradient object with shaders and convers the image to the Base64 string.
				// Then it enumerates all WebGL extensions & capabilities and appends them to the Base64 string, resulting in a huge WebGL string, potentially very unique on each device
				// Since iOS supports webgl starting from version 8.1 and 8.1 runs on several graphics chips, the results may be different across ios devices, but we need to verify it.
				var result = [];
				var vShaderTemplate = "attribute vec2 attrVertex;varying vec2 varyinTexCoordinate;uniform vec2 uniformOffset;void main(){varyinTexCoordinate=attrVertex+uniformOffset;gl_Position=vec4(attrVertex,0,1);}";
				var fShaderTemplate = "precision mediump float;varying vec2 varyinTexCoordinate;void main() {gl_FragColor=vec4(varyinTexCoordinate,0,1);}";
				var vertexPosBuffer = gl.createBuffer();
				gl.bindBuffer(gl.ARRAY_BUFFER, vertexPosBuffer);
				
				var vertices = new Float32Array([-.2, -.9, 0, .4, -.26, 0, 0, .732134444, 0]);
				gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
				vertexPosBuffer.itemSize = 3;
				vertexPosBuffer.numItems = 3;
				
				var program = gl.createProgram(), vshader = gl.createShader(gl.VERTEX_SHADER);
				gl.shaderSource(vshader, vShaderTemplate);
				gl.compileShader(vshader);
				
				var fshader = gl.createShader(gl.FRAGMENT_SHADER);
				gl.shaderSource(fshader, fShaderTemplate);
				gl.compileShader(fshader);
				gl.attachShader(program, vshader);
				gl.attachShader(program, fshader);
				gl.linkProgram(program);
				gl.useProgram(program);
				program.vertexPosAttrib = gl.getAttribLocation(program, "attrVertex");
				program.offsetUniform = gl.getUniformLocation(program, "uniformOffset");
				gl.enableVertexAttribArray(program.vertexPosArray);
				gl.vertexAttribPointer(program.vertexPosAttrib, vertexPosBuffer.itemSize, gl.FLOAT, !1, 0, 0);
				gl.uniform2f(program.offsetUniform, 1, 1);
				gl.drawArrays(gl.TRIANGLE_STRIP, 0, vertexPosBuffer.numItems);

				if (gl.canvas != null) 
				{ 
					result.push(gl.canvas.toDataURL()); 
				}

				result.push("extensions:" + gl.getSupportedExtensions().join(";"));
				result.push("webgl aliased line width range:" + fa2s(gl.getParameter(gl.ALIASED_LINE_WIDTH_RANGE)));
				result.push("webgl aliased point size range:" + fa2s(gl.getParameter(gl.ALIASED_POINT_SIZE_RANGE)));
				result.push("webgl alpha bits:" + gl.getParameter(gl.ALPHA_BITS));
				result.push("webgl antialiasing:" + (gl.getContextAttributes().antialias ? "yes" : "no"));
				result.push("webgl blue bits:" + gl.getParameter(gl.BLUE_BITS));
				result.push("webgl depth bits:" + gl.getParameter(gl.DEPTH_BITS));
				result.push("webgl green bits:" + gl.getParameter(gl.GREEN_BITS));
				result.push("webgl max anisotropy:" + maxAnisotropy(gl));
				result.push("webgl max combined texture image units:" + gl.getParameter(gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS));
				result.push("webgl max cube map texture size:" + gl.getParameter(gl.MAX_CUBE_MAP_TEXTURE_SIZE));
				result.push("webgl max fragment uniform vectors:" + gl.getParameter(gl.MAX_FRAGMENT_UNIFORM_VECTORS));
				result.push("webgl max render buffer size:" + gl.getParameter(gl.MAX_RENDERBUFFER_SIZE));
				result.push("webgl max texture image units:" + gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS));
				result.push("webgl max texture size:" + gl.getParameter(gl.MAX_TEXTURE_SIZE));
				result.push("webgl max varying vectors:" + gl.getParameter(gl.MAX_VARYING_VECTORS));
				result.push("webgl max vertex attribs:" + gl.getParameter(gl.MAX_VERTEX_ATTRIBS));
				result.push("webgl max vertex texture image units:" + gl.getParameter(gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS));
				result.push("webgl max vertex uniform vectors:" + gl.getParameter(gl.MAX_VERTEX_UNIFORM_VECTORS));
				result.push("webgl max viewport dims:" + fa2s(gl.getParameter(gl.MAX_VIEWPORT_DIMS)));
				result.push("webgl red bits:" + gl.getParameter(gl.RED_BITS));
				result.push("webgl renderer:" + gl.getParameter(gl.RENDERER));
				result.push("webgl shading language version:" + gl.getParameter(gl.SHADING_LANGUAGE_VERSION));
				result.push("webgl stencil bits:" + gl.getParameter(gl.STENCIL_BITS));
				result.push("webgl vendor:" + gl.getParameter(gl.VENDOR));
				result.push("webgl version:" + gl.getParameter(gl.VERSION));

				try 
				{
					// Add the unmasked vendor and unmasked renderer if the debug_renderer_info extension is available
					var extensionDebugRendererInfo = gl.getExtension("WEBGL_debug_renderer_info");
					if (extensionDebugRendererInfo) 
					{
						result.push("webgl unmasked vendor:" + gl.getParameter(extensionDebugRendererInfo.UNMASKED_VENDOR_WEBGL));
						result.push("webgl unmasked renderer:" + gl.getParameter(extensionDebugRendererInfo.UNMASKED_RENDERER_WEBGL));
					}
				} 
				catch(e) 
				{ 
					/* squelch */ 
				}
				
				if (!gl.getShaderPrecisionFormat) 
					return resolve(result.join("~"));

				result.push("webgl vertex shader high float precision:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.HIGH_FLOAT ).precision);
				result.push("webgl vertex shader high float precision rangeMin:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.HIGH_FLOAT ).rangeMin);
				result.push("webgl vertex shader high float precision rangeMax:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.HIGH_FLOAT ).rangeMax);
				result.push("webgl vertex shader medium float precision:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.MEDIUM_FLOAT ).precision);
				result.push("webgl vertex shader medium float precision rangeMin:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.MEDIUM_FLOAT ).rangeMin);
				result.push("webgl vertex shader medium float precision rangeMax:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.MEDIUM_FLOAT ).rangeMax);
				result.push("webgl vertex shader low float precision:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.LOW_FLOAT ).precision);
				result.push("webgl vertex shader low float precision rangeMin:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.LOW_FLOAT ).rangeMin);
				result.push("webgl vertex shader low float precision rangeMax:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.LOW_FLOAT ).rangeMax);
				result.push("webgl fragment shader high float precision:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT ).precision);
				result.push("webgl fragment shader high float precision rangeMin:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT ).rangeMin);
				result.push("webgl fragment shader high float precision rangeMax:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT ).rangeMax);
				result.push("webgl fragment shader medium float precision:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.MEDIUM_FLOAT ).precision);
				result.push("webgl fragment shader medium float precision rangeMin:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.MEDIUM_FLOAT ).rangeMin);
				result.push("webgl fragment shader medium float precision rangeMax:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.MEDIUM_FLOAT ).rangeMax);
				result.push("webgl fragment shader low float precision:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.LOW_FLOAT ).precision);
				result.push("webgl fragment shader low float precision rangeMin:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.LOW_FLOAT ).rangeMin);
				result.push("webgl fragment shader low float precision rangeMax:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.LOW_FLOAT ).rangeMax);
				result.push("webgl vertex shader high int precision:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.HIGH_INT ).precision);
				result.push("webgl vertex shader high int precision rangeMin:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.HIGH_INT ).rangeMin);
				result.push("webgl vertex shader high int precision rangeMax:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.HIGH_INT ).rangeMax);
				result.push("webgl vertex shader medium int precision:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.MEDIUM_INT ).precision);
				result.push("webgl vertex shader medium int precision rangeMin:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.MEDIUM_INT ).rangeMin);
				result.push("webgl vertex shader medium int precision rangeMax:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.MEDIUM_INT ).rangeMax);
				result.push("webgl vertex shader low int precision:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.LOW_INT ).precision);
				result.push("webgl vertex shader low int precision rangeMin:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.LOW_INT ).rangeMin);
				result.push("webgl vertex shader low int precision rangeMax:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.LOW_INT ).rangeMax);
				result.push("webgl fragment shader high int precision:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_INT ).precision);
				result.push("webgl fragment shader high int precision rangeMin:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_INT ).rangeMin);
				result.push("webgl fragment shader high int precision rangeMax:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_INT ).rangeMax);
				result.push("webgl fragment shader medium int precision:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.MEDIUM_INT ).precision);
				result.push("webgl fragment shader medium int precision rangeMin:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.MEDIUM_INT ).rangeMin);
				result.push("webgl fragment shader medium int precision rangeMax:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.MEDIUM_INT ).rangeMax);
				result.push("webgl fragment shader low int precision:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.LOW_INT ).precision);
				result.push("webgl fragment shader low int precision rangeMin:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.LOW_INT ).rangeMin);
				result.push("webgl fragment shader low int precision rangeMax:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.LOW_INT ).rangeMax);
				
				return resolve(result.join("~"));
			} 
			catch (e) 
			{
				return resolve("");
			}
		});
	});

})(window);