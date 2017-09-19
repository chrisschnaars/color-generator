// Color Display Selector
var modeSelector = document.getElementById('mode-selector')

// event listener for color mode radio seection
modeSelector.addEventListener('change', updateMode);

// method to change display mode based on user selection
function updateMode() {
	// find which is changed
	var m;

	if (document.getElementById('rgb').checked) {
		m = 'rgb';
	} else if (document.getElementById('hex').checked) {
		m = 'hex';
	} else {
		m = 'hsl';
	}

	console.log("mode = " + m);

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
