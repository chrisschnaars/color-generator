// RANDOM COLOR GENERATOR
// CHRIS SCHNAARS

// ********************************
// GLOBAL VARIABLES
// ********************************

// Page Container Element
var pageContainer = document.querySelector('.container');
// RGB display
var rgbColorDisplay = document.getElementById('rgb-display');
var redDisplay = document.getElementById('red-display');
var greenDisplay = document.getElementById('green-display');
var blueDisplay = document.getElementById('blue-display');
// Hex display
var hexColorDisplay = document.getElementById('hex-display');
var hexDisplay = document.getElementById('hex-value-display');
// HSL displays
var hslColorDisplay = document.getElementById('hsl-display');
var hueDisplay = document.getElementById('hue-display');
var satDisplay = document.getElementById('saturation-display');
var lightDisplay = document.getElementById('lightness-display');
// Color Display Selector
var rgbSelector = document.getElementById('rgb-selector')
var hexSelector = document.getElementById('hex-selector')
var hslSelector = document.getElementById('hsl-selector')
// RGB Slider Controls
var redSlider = document.getElementById('red-control');
var greenSlider = document.getElementById('green-control');
var blueSlider = document.getElementById('blue-control');
// RGB Slider Value displays
var redSliderDisplay = document.getElementById('red-slider-display');
var greenSliderDisplay = document.getElementById('green-slider-display');
var blueSliderDisplay = document.getElementById('blue-slider-display');
// Copy CSS Button
var copyBtn = document.getElementById('copy-css-btn');
// var clipboard = new Clipboard('#copy-css-btn');
// RGB Color Variables -- Default Mode
var r;
var g;
var b;
// HEx Color Variable
var hex;
// HSL Color Variables
var h;
var s;
var l;
// Contract Color Variable - Either BLack or White dpending on WCAG contrast ratio
var cc;
// Color Modes
var modes = ['rgb', 'hex', 'hsl'];
var activeMode = modes[0];
// Array of Colors
var colors = [];
var colorsIndex = -1;	// counter for where user is in the array
// Onboarding Hints
// Each variable indicates whether keu has been used or not
var spacebarUsed = false;
var leftkeyUsed = false;
var rightkeyUsed = false;
var onboardStep = 0;

// ********************************
// EVENT LISTENERS
// ********************************

// Generate initial random color on load
window.onload = function() {
	setRandomColors();
	setTimeout(onboarding, 750);
}

// Key Press Events
// Spacebar: Generate random color
// Back/Next Button: Move through the color array
window.addEventListener('keydown', function(event) {
	// variable for key code
	var code;
	// cross-browser implementation of keycode value
  if (event.key !== undefined) {
    code = event.key;
  } else if (event.keyIdentifier !== undefined) {
    code = event.keyIdentifier;
  } else if (event.keyCode !== undefined) {
    code = event.keyCode;
  }
	// Spacebar: Generate new colors
	if (code == ' ' || code == 32) {
		// set random color with spacebar
		setRandomColors();
		// set the spacebar variable to true to hide onboarding hint
		if (!spacebarUsed && onboardStep === 1) {
			onboarding();
		}
	}

	// Left Arrow: display previous color in array
	if (code == 'ArrowLeft' || code == 37) {
		// display the previous color in the array
		displayPreviousColor();
		// set the left key variable to true to hide onboarding hint
		if (!leftkeyUsed && onboardStep === 2) {
			onboarding();
		}
	}

	// Right Arrow: display next color in array
	if (code == 'ArrowRight' || code == 39) {
		// display the next color in the array
		displayNextColor();
		// set the right key variable to true to hide onboarding hint
		if (!rightkeyUsed && onboardStep === 3) {
			onboarding();
		}
	}
})

// Move through the array with prev/next buttons

// Update color mode when user toggles selectors
rgbSelector.addEventListener('click', function(){
	updateMode('rgb');
}, false);
hexSelector.addEventListener('click', function(){
	updateMode('hex');
}, false);
hslSelector.addEventListener('click', function(){
	updateMode('hsl');
}, false);

// Update color when user changes RGB sliders
redSlider.addEventListener('input', updateColors);
greenSlider.addEventListener('input', updateColors);
blueSlider.addEventListener('input', updateColors);

// Copy css text
// copyBtn.addEventListener('click', copyCss);

// ********************************
// Setting Colors
// ********************************

// Method that generates random RGB values
// Used on initial load, and when user hits spacebar
function setRandomColors() {
	// create random r,g,b values
	r = Math.round(Math.random() * (256));
	g = Math.round(Math.random() * (256));
	b = Math.round(Math.random() * (256));

	// add color to the Array
	updateColorArray(r, g, b);

	// Update all color styles with new color
	updateColorStyles(r, g, b);
}

// Method to change colors when sliders are modified
function updateColors() {
	// update slider values/positions
	r = redSlider.value;
	g = greenSlider.value;
	b = blueSlider.value;

	// Update all color styles with new color
	updateColorStyles(r, g, b);
}

// Method to use new RGB values to update dynamic styles
function updateColorStyles(r, g, b) {

	// set background color
	pageContainer.style.backgroundColor = 'rgb(' + r + ',' + g + ',' + b + ')';

	// Calculate contrast ratio
	checkContrast([r, g, b]);

	// Convert new color to Hex and HSL
	convertColors(r, g, b);

	// update RGB displays
	redDisplay.innerHTML = r + ',';
	greenDisplay.innerHTML = g + ',';
	blueDisplay.innerHTML = b;

	// update HEX displays
	hexDisplay.innerHTML = hex;

	// update HSL displays
	hueDisplay.innerHTML = h + ', ';
	satDisplay.innerHTML = s + ', ';
	lightDisplay.innerHTML = l;

	// Update slider positions & dpslay
	redSlider.value = redSliderDisplay.innerHTML = r;
	greenSlider.value = greenSliderDisplay.innerHTML = g;
	blueSlider.value = blueSliderDisplay.innerHTML = b;
}

// ********************************
// Managing the Colors Array
// ********************************

// Method to add color to array
function updateColorArray(r, g, b) {
		// check to see if you're not at the end of the array
		var l = colors.length - 1;
		// if you're in the middle of array, remove all elements beyond current index
		if (colorsIndex < l) {
			colors.splice(colorsIndex + 1, l - colorsIndex)
		}
		// remove first color in array if length exceeds 20
		if (colors.length > 20) {
			colors.splice(0, 1);
		}
		// add color to array
		colors.push([r,g,b]);
		colorsIndex++;
}

// Method to display previous color in array
function displayPreviousColor() {
	// check to see there's a previous color in array
	if (colorsIndex > 0) {
		// set variable for previous array position
		var b = colorsIndex - 1;
		// update color styles with previous color
		updateColorStyles(colors[b][0], colors[b][1], colors[b][2]);
		// reduce global index
		colorsIndex--;
	}
}

// Method to display previous color in array
function displayNextColor() {
	// check to see there's a previous color in array
	if (colorsIndex < colors.length - 1) {
		// set variable for previous array position
		var b = colorsIndex + 1;
		// update color styles with previous color
		updateColorStyles(colors[b][0], colors[b][1], colors[b][2]);
		// reduce global index
		colorsIndex++;
	}
}


// ********************************
// Calculating Color Contrast Rato
// ********************************

// Method to calculate luminence of R, G, B values
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

// Method to check the contrast between two colors
// https://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef
function checkContrast(rgb) {
	// Global luminence values
	var blackL = 0;
	var whiteL = 1;

	// calculate black and white contrast values
	var colorL = luminanace(rgb[0], rgb[1], rgb[2]);
	var c1 = (colorL + 0.05) / (blackL + 0.05);
	var c2 = (whiteL + 0.05) / (colorL + 0.05);


	// Compare ratios against the WCAG minimum contrast ratio
	// 4.5 is the minimum contrast ratio
	var minRatio = 4.5

	// Set gloabl contrast color based on highest contrast ratio
	if (c1 > minRatio && c1 > c2) {
		// if black is higher contrast
		cc = '0, 0, 0';
	} else if (c2 > minRatio && c2 > c1) {
		// if white is higher contrast
		cc = '255, 255, 255';
	}
	// set styles
	setContrastStyles();
}

// Method to set color style based on highest ratio
// Color selection is a white or black RGB value
function setContrastStyles() {
	// Opacity value
	var a1 = 0.05;
	var a2 = 0.15;

	// set global font color
	pageContainer.style.color = 'rgb(' + cc + ')'

	// set background colors of all link containers
	var y = document.querySelectorAll('.unselected-link');
	for (i = 0; i < y.length; i++) {
		y[i].style.backgroundColor = 'rgba(' + cc + ', ' + a1 + ')';
	}

	// set backgroud color of active link container
	var z = document.querySelectorAll('.selected-link');
	for (i = 0; i < z.length; i++) {
		z[i].style.backgroundColor = 'rgba(' + cc + ', ' + a2 + ')';
	}

	// document.style.setProperty('--bgcolor', colorSelection);

}

// ********************************
// Calculate Color Contrast Rato
// ********************************

// Method to send RGB values to both converters
function convertColors(r, g, b) {
	rgbToHex(r, g, b);	// convert to Hexidecimal
	rgbToHsl(r, g, b);	// convert to HSL
}

// method to convert each portion of RGB value to hex
function componentToHex(c) {
	var h = Number(c).toString(16);
	if (h.length < 2) {
		h = "0" + h;
	}
	return(h);
}

// method to combine r,g,b hex conversions
function rgbToHex(r, g, b) {
	hex = '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
	return(hex);
}


// Algorithm for converting RGB to HSL
// Found here: https://gist.github.com/mjackson/5311256
function rgbToHsl(r, g, b) {
	r /= 255, g /= 255, b /= 255;
	// find the max value and min value
	var max = Math.max(r, g, b);
	var min = Math.min(r, g, b);

	// set variables
  h = (max + min) / 2;
	s = (max + min) / 2;
	l = (max + min) / 2;

  if (max == min) {
    h = s = 0; // achromatic
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }

    h *= 60;
  }

	// format variables for display
	h = Math.round(h) + 'º';
	s = Math.round(s * 100) + '%';
	l = Math.floor(l * 100) + '%'

  return [ h, s, l ];
}

// ********************************
// Updating Color Mode Display
// ********************************


// Method to change display mode based on user selection
function updateMode(mode) {

	//loop through color modes and select/deselct as needed
	for (var i = 0; i < modes.length; i++) {
			// var r = document.getElementById(modes[i] + '-radio');	// radio button
			// modes selector
			var l = document.getElementById(modes[i] + '-selector');	// radio label
			// display for each
			var d = document.getElementById(modes[i] + '-display')

			if (mode === modes[i]) {
				// show corresponding display
				d.style.visibility = 'visible';
				// // remove unselected
				l.classList.remove('unselected-link');
				// add selected link class
				l.classList.add('selected-link');
				// // mark as selelected
				// r.checked = true;
				activeMode = modes[i];
			} else {
				// hide corresponding display
				d.style.visibility = 'hidden';
				// remove unselected
				l.classList.remove('selected-link');
				// add unselected class to radio label
				l.classList.add('unselected-link');
				// // deeelect
				// r.checked = false;
			}

		}
		// reset contrast styles
		setContrastStyles();
}


// ********************************
// Copy CSS Text
// ********************************

// using clipboard.js
// copy css according to selected mode
var clipboard = new Clipboard('#copy-css-btn', {
        text: function() {
					if (activeMode === modes[0]) {
						return 'color: rgb(' + r + ', ' + g + ', ' + b + ');';
					} else if (activeMode === modes[1]) {
            return 'color: ' + hex.toUpperCase(); + ';';
          } else if (activeMode === modes[2]) {
            return 'color: hsl(' + h + ', ' + s + ', ' + l + ');';
          }
        }
    });

clipboard.on('success', function(e) {
        console.log(e);
    });

clipboard.on('error', function(e) {
        console.log(e);
    });


// ********************************
// Displaying the Onboarding Hints
// ********************************

function onboarding() {
	var s = document.getElementById('spacebar-hint');	// spacebar hint
	var l = document.getElementById('leftkey-hint');	// left arrow hint
	var r = document.getElementById('rightkey-hint');	// right arrow hint

	var delayTime = 700;
	// for each onboarding step
	// hide previous step and show new one
	if (onboardStep === 0) {	// initial spacebar tip
		s.style.opacity = 1;
		onboardStep++;
	} else if (onboardStep === 1) {	// left arrow tip
		s.style.opacity = 0;
		setTimeout( function() {
			l.style.opacity = 1;
		}, delayTime);
		spacebarUsed = true;
		onboardStep++;
	} else if (onboardStep === 2) {	// right arrow tip
		l.style.opacity = 0;
		setTimeout( function() {
			r.style.opacity = 1;
		}, delayTime);
		leftkeyUsed = true;
		onboardStep++;
	} else if (onboardStep === 3) {	// hide tips
		r.style.opacity = 0;
		rightkeyUsed = delayTime;
		onboardStep++;
	}
}
