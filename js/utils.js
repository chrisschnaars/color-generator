/****************************************************
CONVERTING RGB VALUES TO HEXIDECIMAL
****************************************************/

// BUILD HEXIDECIMAL VALUE
function rgbToHex(r, g, b) {
	var hx = '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
	return(hx);
}


// CONVERT EACH PART OF RGB VALUE TO HEX EQUIVALENT
function componentToHex(c) {
	var v = Number(c).toString(16);
	if (v.length < 2) {
		v = "0" + v;
	}
	return(v);
}


/****************************************************
CONVERTING RGB VALUES TO HSL
****************************************************/

// CONVERT RGB to HSL
// Found here: https://gist.github.com/mjackson/5311256
function rgbToHsl(r, g, b) {

	// DIVIDE EACH VALUE BY 255
	r /= 255, g /= 255, b /= 255;

	// FIND MIN AND MAX VALUES
	var max = Math.max(r, g, b);
	var min = Math.min(r, g, b);

	// SET VARIABLES
  var h1 = (max + min) / 2;
	var s1 = (max + min) / 2;
	var l1 = (max + min) / 2;

  if (max == min) {
    h1 = s1 = 0; // achromatic
  } else {
    var d = max - min;
    s1 = l1 > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r: h1 = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h1 = (b - r) / d + 2; break;
      case b: h1 = (r - g) / d + 4; break;
    }

    h1 *= 60;
  }

	// FORMAT VARIABLES
	h1 = Math.round(h1) + 'º';
	s1 = Math.round(s1 * 100) + '%';
	l1 = Math.floor(l1 * 100) + '%';

	// RETURN VALUES
  return [ h1, s1, l1 ];
}


// ****************************************************
// CALCULATE LUMINANCE
// ****************************************************

// CALCULATE LUMINENCE OF RGB VALUES
// https://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
function luminanace(r, g, b) {
    var a = [r, g, b].map(function (v) {
        v /= 255;
        return v <= 0.03928
            ? v / 12.92
            : Math.pow( (v + 0.055) / 1.055, 2.4 );
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}
