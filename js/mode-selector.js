//-----------------------------------------------------------
//  MODE SELECTOR WIDGET
//-----------------------------------------------------------


// SETUP COLOR MODE SELECTOR
var modeSelector = document.getElementById('mode-selector')

// CHANGE EVENT LISTENER
modeSelector.addEventListener('change', updateMode);


// CHANGE COLOR DISPLAY MODE ON CLICK
function updateMode() {

	// FIND CURRENT MODE
	var m;
	if (document.getElementById('rgb').checked) {
		m = 'rgb';
	} else if (document.getElementById('hex').checked) {
		m = 'hex';
	} else {
		m = 'hsl';
	}

	// CHNAGE MODE DISPLAY BASED ON SELECTED MODE
	if (m === 'rgb') {
		// hide others
		hexColorDisplay.style.visibility = 'hidden';
		hslColorDisplay.style.visibility = 'hidden';
		// show rgb
		rgbColorDisplay.style.visibility = 'visible';
	} else if (m === 'hex') {
		console.log("true hex");
		// hide others
		rgbColorDisplay.style.visibility = 'hidden';
		hslColorDisplay.style.visibility = 'hidden';
		// show hex
		hexColorDisplay.style.visibility = 'visible';
	} else if (m === 'hsl') {
		// hide others
		rgbColorDisplay.style.visibility = 'hidden';
		hexColorDisplay.style.visibility = 'hidden';
		// show rgb
		hslColorDisplay.style.visibility = 'visible';
	}
}
