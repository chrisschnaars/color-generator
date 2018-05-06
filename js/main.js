
// ****************************************************
// DOM ELEMENTS
// ****************************************************

// BACKGROUND DISPLAY ELEMENT
var pageContainer = document.querySelector('.container');

// RGB DISPLAY ELEMENTS
var rgbColorDisplay = document.getElementById('rgb-display');
var redDisplay = document.getElementById('red-display');
var greenDisplay = document.getElementById('green-display');
var blueDisplay = document.getElementById('blue-display');

// HEX DISPLAY ELEMENTWS
var hexColorDisplay = document.getElementById('hex-display');
var hexDisplay = document.getElementById('hex-value-display');

// HSL DISPLAY ELEMENTS
var hslColorDisplay = document.getElementById('hsl-display');
var hueDisplay = document.getElementById('hue-display');
var satDisplay = document.getElementById('saturation-display');
var lightDisplay = document.getElementById('lightness-display');

// COLOR DISPLAY ELEMENTS


// RGB SLIDER CONTROLS
var redSlider = document.getElementById('red-control');
var greenSlider = document.getElementById('green-control');
var blueSlider = document.getElementById('blue-control');

// RGB SLIDER READOUTS
var redSliderDisplay = document.getElementById('red-slider-display');
var greenSliderDisplay = document.getElementById('green-slider-display');
var blueSliderDisplay = document.getElementById('blue-slider-display');

// Copy CSS Button
var copyBtn = document.getElementById('copy-css-btn');

// ****************************************************
// GLOBAL VARIABLES
// ****************************************************

// RGB
var r;
var g;
var b;

// HEXIDECIMAL
var hex;

// HSL
var h;
var s;
var l;

// FONT COLOR (BLACK OR WHITE > BASED ON CONTRAST)
var cc;

// COLOR MODES
var modes = ['rgb', 'hex', 'hsl'];
var activeMode = modes[0];

// COLOR ARRAY
var colors = [];
var colorsIndex = -1;	// SET INITIAL POSITION OF ARRAY

// ONBOARDING HINT USAGE
// BOOLEANS INDICATE WHETHER HINT'S CONTENT HAS BEEN USED
var spacebarUsed = false;
var leftkeyUsed = false;
var rightkeyUsed = false;
var onboardStep = 0;


// ****************************************************
// INITIALIZATION & FIRST COLOR
// ****************************************************

window.onload = function() {
	// SETUP EVENT LISTENERS
	setupMouseEvents();

	// GENERATE INITIAL COLOR
	generateColor();

	// DISPLAY ONBOARDING
	setTimeout(onboarding, 350);
}


// ****************************************************
// MAIN COLOR GENERATION FUNCTION
// ****************************************************

// GENERATE RANDOM COLOR
function generateColor() {

	// GENERATE RANDOM RGB VALUES
	var r_ = Math.round(Math.random() * (256));
	var g_ = Math.round(Math.random() * (256));
	var b_ = Math.round(Math.random() * (256));

	// USE THESE COLORS TO UPDATE APP
	setColors(r_, g_, b_);

	// ADD NEW COLOR TO THE ARRAY
	updateColorArray();
}

// UPDATE APP WITH NEW COLOR VALUES
function setColors(r, g, b) {

	// SET ALL COLOR VARIABLES
	setColorValues(r, g, b);

	// UPDATE CSS COLOR STYLES
	setColorStyles();

	// SET CONTRAST COLOR STYLES
	setContrastStyles();

}


// UPDATE COLOR & DISPLAYS WITH SLIDER
function updateColors() {
	// ADJUST COLOR VARIABLES FOR COLOR VALUE
	r = redSlider.value;
	g = greenSlider.value;
	b = blueSlider.value;

	// UPDATE ALL COLORS WITH NEW VALUES
	setColors(r, g, b);
}





// Copy css text
// copyBtn.addEventListener('click', copyCss);





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
