
// ****************************************************
// DOM ELEMENTS
// ****************************************************

// BACKGROUND DISPLAY ELEMENT
const pageContainer = document.querySelector('.page-container');

// RGB DISPLAY ELEMENTS
const rgbColorDisplay = document.getElementById('rgb-display');
// const redDisplay = document.getElementById('red-display');
// const greenDisplay = document.getElementById('green-display');
// const blueDisplay = document.getElementById('blue-display');

// HEX DISPLAY ELEMENTWS
const hexColorDisplay = document.getElementById('hex-display');
// const hexDisplay = document.getElementById('hex-value-display');

// HSL DISPLAY ELEMENTS
const hslColorDisplay = document.getElementById('hsl-display');
// const hueDisplay = document.getElementById('hue-display');
// const satDisplay = document.getElementById('saturation-display');
// const lightDisplay = document.getElementById('lightness-display');

// RGB SLIDER CONTROLS
const redSlider = document.getElementById('red-control');
const greenSlider = document.getElementById('green-control');
const blueSlider = document.getElementById('blue-control');

// RGB SLIDER READOUTS
const redSliderDisplay = document.getElementById('red-slider-display');
const greenSliderDisplay = document.getElementById('green-slider-display');
const blueSliderDisplay = document.getElementById('blue-slider-display');

// Copy CSS Button
const statusElement = document.querySelector('.copy-confirm');

// SETTINGS PANEL VISIBILITY STATUS
var panelHidden = true;

// TOUCH DEVICE FLAG
var touchDevice = false;


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


// ****************************************************
// INITIALIZATION & FIRST COLOR GENERATION
// ****************************************************

window.onload = function() {

	// SET INITIAL MODE
	updateMode(modes[0]);

	// GENERATE INITIAL COLOR
	generateColor();

	// DEVICE TYPE SETUP
	if ("ontouchstart" in document.documentElement) {
		// TOGGLE TOUCH FLAG
		touchDevice = true;
		// SETUP TOUCH EVENTS
		setupListeners('touchstart');
  } else {
		// SETUP EVENT LISTENERS
		setupListeners('click');
  }

	// START ONBOARDING
	setTimeout(onboarding, 350);

}
