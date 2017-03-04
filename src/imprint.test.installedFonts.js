/**
 * JavaScript code to detect available availability of a
 * particular font in a browser using JavaScript and CSS.
 *
 * Author : Lalit Patel
 * Website: http://www.lalit.org/lab/javascript-css-font-detect/
 * License: Apache Software License 2.0
 *          http://www.apache.org/licenses/LICENSE-2.0
 * Version: 0.15 (21 Sep 2009)
 *          Changed comparision font to default from sans-default-default,
 *          as in FF3.0 font of child element didn't fallback
 *          to parent element if the font is missing.
 * Version: 0.2 (04 Mar 2012)
 *          Comparing font against all the 3 generic font families ie,
 *          'monospace', 'sans-serif' and 'sans'. If it doesn't match all 3
 *          then that font is 100% not available in the system
 * Version: 0.3 (24 Mar 2012)
 *          Replaced sans with serif in the list of baseFonts
 */
var FontDetector = function() {
	
    // a font will be compared against all the three default fonts.
    // and if it doesn't match all 3 then that font is not available.
    var baseFonts = ['monospace', 'sans-serif', 'serif'];

    //we use m or w because these two characters take up the maximum width.
    // And we use a LLi so that the same matching fonts can get separated
    var testString = "mmmmmmmmmmlli";

    //we test using 72px font size, we may use any size. I guess larger the better.
    var testSize = '201px';

    var h = document.getElementsByTagName("body")[0];

    // create a SPAN in the document to get the width of the text we use to test
    var s = document.createElement("span");
    s.style.fontSize = testSize;
    s.innerHTML = testString;
    var defaultWidth = {};
    var defaultHeight = {};
    for (var index in baseFonts) {
        //get the default width for the three base fonts
        s.style.fontFamily = baseFonts[index];
        h.appendChild(s);
        defaultWidth[baseFonts[index]] = s.offsetWidth; //width for the default font
        defaultHeight[baseFonts[index]] = s.offsetHeight; //height for the defualt font
        h.removeChild(s);
    }

    function detect(font) {
        var detected = true;
        for (var index in baseFonts) {
            s.style.fontFamily = font + ',' + baseFonts[index]; // name of the font along with the base font for fallback.
            h.appendChild(s);
            var matched = (s.offsetWidth != defaultWidth[baseFonts[index]] || s.offsetHeight != defaultHeight[baseFonts[index]]);
            h.removeChild(s);
            detected = detected && matched;
        }
        return detected;
    }

    this.detect = detect;
};

(function(scope){

	'use strict';

	imprint.registerTest("installedFonts", function(){
		return new Promise(function(resolve) {
			var fontDetective = new FontDetector();
            // Firefox doesn't like fonts ending in "bold", "heavy", "light", "transparent" or anything vaguely css related so we make sure the list doesn't contain any such fonts
            var fontArray = ["ADOBE CASLON PRO","ADOBE GARAMOND PRO","AVENIR","Adobe Fangsong Std","Adobe Ming Std","Agency FB","Aharoni","Amazone BT","AngsanaUPC","Antique Olive","Apple Chancery","Apple Color Emoji","Apple SD Gothic Neo","Arab","Arial Baltic","Arial CE","Arial CYR","Arial Greek","Arial MT","Arial Unicode MS","Arrus BT","AvantGarde Bk BT","AvantGarde Md BT","Ayuthaya","Baskerville Old Face","Bell MT","Benguiat Bk BT","Berlin Sans FB","BernhardFashion BT","BernhardMod BT","Big Caslon","Bitstream Vera Sans Mono","Bitstream Vera Serif","BlairMdITC TT","Bodoni 72 Smallcaps","Bodoni MT Poster Compressed","Boulder","Bradley Hand","Broadway","Browallia New","BrowalliaUPC","Calisto MT","Cambria Math","Centaur","Chalkboard","Chalkboard SE","Chalkduster","Charter BT","ChelthmITC Bk BT","Chiller","Comic Sans MS","Constantia","Copperplate","Corbel","Cordia New","CordiaUPC","Coronet","Courier New Baltic","Courier New CE","Courier New CYR","Courier New TUR","Cuckoo","DFKai-SB","DaunPenh","Dauphin","David","DejaVu LGC Sans Mono","Denmark","Desdemona","DokChampa","Dotum","Ebrima","Edwardian Script ITC","Eras Bold ITC","EucrosiaUPC","Euphemia","Eurostile","FRUTIGER","FangSong","Felix Titling","Forte","Fransiscan","FreesiaUPC","French Script MT","FrnkGothITC Bk BT","Fruitger","Futura Bk BT","Futura Md BT","Futura ZBlk BT","FuturaBlack BT","Galliard BT","Garamond","Gautami","Geeza Pro","Geneva","GeoSlab 703 Lt BT","Geometr231 BT","Geometr231 Hv BT","Gigi","Gill Sans","GoudyOLSt BT","GulimChe","GungSeo","Gurmukhi MN","Harlow Solid Italic","Heather","HeiT","High Tower Text","Hiragino Kaku Gothic ProN","Hiragino Mincho ProN","Hiragino Sans GB","Hoefler Text","Humanst521 BT","Humanst521 Lt BT","Impact","Imprint MT Shadow","Incised901 BT","Incised901 Lt BT","Informal Roman","Informal011 BT","IrisUPC","Kabel Bk BT","KacstOne","KaiTi","Khmer UI","Kokila","LUCIDA GRANDE","Latha","Leelawadee","Lohit Gujarati","Long Island","Lucida Calligraphy","Lucida Console","Lucida Sans","Lucida Sans Typewriter","Lydian BT","MS Gothic","MS Mincho","MS PGothic","MS Reference Sans Serif","MS Reference Specialty","MS Serif","MUSEO","MYRIAD","Malgun Gothic","Mangal","Marigold","Market","Marlett","Meiryo","Meiryo UI","Menlo","Microsoft PhagsPa","Microsoft Uighur","MingLiU","MingLiU_HKSCS","Minion","Miriam Fixed","Mona Lisa Solid ITC TT","Monaco","Monotype Corsiva","NEVIS","News Gothic","News GothicMT","NewsGoth BT","Nyala","Old Century","Old English Text MT","Onyx","Oriya Sangam MN","PMingLiU","Palatino","Parchment","Pegasus","Perpetua","Perpetua Titling MT","Pickwick","Poster","Pristina","Raavi","Rage Italic","Rockwell","Roman","Sakkal Majalla","Savoye LET","Sawasdee","Segoe UI Symbol","Serifa BT","Serifa Th BT","Showcard Gothic","Shruti","Signboard","SimHei","SimSun","SimSun-ExtB","Simplified Arabic","Simplified Arabic Fixed","Sinhala Sangam MN","Sketch Rockwell","Socket","Stencil","Styllo","Swis721 BlkEx BT","Swiss911 XCm BT","Symbol","Synchro LET","System","TRAJAN PRO","Technical","Teletype","Tempus Sans ITC","Thonburi","Times","Times New Roman Baltic","Times New Roman CYR","Times New Roman PS","Trebuchet MS","Tubular","Tunga","Tw Cen MT","TypoUpright BT","Ubuntu","Unicorn","Utopia","Viner Hand ITC","Vivaldi","Vrinda","Westminster","Wide Latin","Zurich BlkEx BT"];
            // Extend the fontArray to cover the following for a larger list of fonts, however it will take loger to calculate the fingerprint
            /*"ARCHER","ARNO PRO","Academy Engraved LET","Adobe Garamond","Adobe Hebrew","Algerian","AmerType Md BT","American Typewriter","Andale Mono","Andalus","Angsana New","Aparajita","Arabic Typesetting","Arial","Arial Hebrew","Arial TUR","Aurora Cn BT","Bandy","Bangla Sangam MN","Bank Gothic","BankGothic Md BT","Baskerville","Batang","BatangChe","Bauer Bodoni","Bembo","BinnerD","Blackadder ITC","Bodoni MT","Bradley Hand ITC","Braggadocio","Bremen Bd BT","Brush Script MT","CG Omega","CG Times","Calibri","Californian FB","Calligrapher","Cambria","Candara","CaslonOpnface BT","Castellar","Casual","Century","Century Gothic","Century Schoolbook","Cezanne","Charlesworth","Chaucer","Clarendon","CloisterBlack BT","Cochin","Colonna MT","Comic Sans","CopperplGoth Bd BT","Copperplate Gothic","Cornerstone","Courier New Greek","Curlz MT","DB LCD Temp","Didot","DilleniaUPC","DotumChe","Elephant","English 111 Vivace BT","Engravers MT","EngraversGothic BT","Eras Demi ITC","Estrangelo Edessa","Euphemia UCAS","Exotc350 Bd BT","FONTIN","Fixedsys","FrankRuehl","Freefrm721 Blk BT","Futura","Futura Lt BT","GOTHAM","Gabriola","GeoSlab 703 XBd BT","Geometr231 Lt BT","Georgia","Gill Sans MT","Gisha","Goudy Stout","GoudyHandtooled BT","Gujarati Sangam MN","Gulim","Gungsuh","GungsuhChe","Haettenschweiler","Harrington","Hei S","Heisei Kaku Gothic","Heiti SC","Heiti TC","Helvetica","Helvetica Neue","Herald","Humanst 521 Cn BT","Incised901 Bd BT","Iskoola Pota","JasmineUPC","Jazz LET","Jenson","Jester","Jokerman","Juice ITC","Kailasa","Kalinga","Kannada Sangam MN","Kartika","Kaufmann BT","Kaufmann Bd BT","Kino MT","KodchiangUPC","Korinna BT","Kozuka Gothic Pr6N","Kristen ITC","Krungthep","Lao UI","Letter Gothic","Levenim MT","LilyUPC","Lithograph","Loma","Lucida Handwriting","Lucida Sans Unicode","MS LineDraw","MS Outlook","MS PMincho","MS Sans Serif","MS UI Gothic","MT Extra","MV Boli","MYRIAD PRO","Maiandra GD","Malayalam Sangam MN","Marion","Marker Felt","Matisse ITC","Matura MT Script Capitals","Microsoft Himalaya","Microsoft JhengHei","Microsoft New Tai Lue","Microsoft Sans Serif","Microsoft Tai Le","Microsoft YaHei","Microsoft Yi Baiti","MingLiU-ExtB","MingLiU_HKSCS-ExtB","Minion Pro","Miriam","Mistral","Modern","Mongolian Baiti","MoolBoran","Mrs Eaves","NSimSun","Nadeem","Narkisim","News Gothic MT","Niagara Engraved","Niagara Solid","Noteworthy","OCR A Extended","Onyx BT","OzHandicraft BT","PMingLiU-ExtB","PRINCETOWN LET","PTBarnum BT","Palace Script MT","Palatino Linotype","Papyrus","Party LET","Plantagenet Cherokee","Playbill","Poor Richard","PosterBodoni BT","Pythagoras","Rachana","Ravie","Ribbon131 Bd BT","Rod","Santa Fe LET","Sceptre","Segoe Print","Segoe UI","Serifa","ShelleyVolante BT","Sherwood","Shonar Bangla","Skia","Small Fonts","Snap ITC","Snell Roundhand","Souvenir Lt BT","Staccato222 BT","Steamer","Storybook","Subway","Sylfaen","Tahoma","Tamil Sangam MN","Telugu Sangam MN","Terminal","Times New Roman","Times New Roman CE","Times New Roman Greek","Times New Roman TUR","TlwgMono","Traditional Arabic","Trajan","Tristan","Umpush","Univers","Utsaah","Vagabond","Vani","Verdana","Vijaya","VisualUI","WHITNEY","Webdings","ZWAdobeF","ZapfEllipt BT","ZapfHumnst BT","ZapfHumnst Dm BT","Zapfino","Zurich Ex BT"];*/
			var installedFontsArray = [];

			for (var i = 0; i < fontArray.length; i++) {
				if (fontDetective.detect(fontArray[i])) {
					installedFontsArray.push(fontArray[i]);
				}
			}

            //console.log(installedFontsArray.join(", "))
			
            return resolve(installedFontsArray.join("~"));
		});
	});

})(window);