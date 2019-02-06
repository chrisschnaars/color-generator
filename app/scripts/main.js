// ****************************************************
// DOM ELEMENTS
// ****************************************************

// BACKGROUND DISPLAY ELEMENT
let pageContainer = document.querySelector('.page-container');

// RGB SLIDER CONTROLS
let redSlider = document.getElementById('red-control');
let greenSlider = document.getElementById('green-control');
let blueSlider = document.getElementById('blue-control');

// RGB SLIDER READO     UTS
let redSliderDisplay = document.getElementById('red-slider-display');
let greenSliderDisplay = document.getElementById('green-slider-display');
let blueSliderDisplay = document.getElementById('blue-slider-display');

// Copy CSS Button
let statusElement = document.querySelector('.copy-confirm');

// SETTINGS PANEL VISIBILITY STATUS
var panelHidden = true;

// TOUCH DEVICE FLAG
var touchDevice;

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
		// TOGGLE TOUCH FLAG
		touchDevice = false;
		// SETUP EVENT LISTENERS
		setupListeners('click');
  }
}
