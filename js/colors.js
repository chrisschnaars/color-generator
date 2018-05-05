
// ****************************************************
// COLOR GENERATION
// ****************************************************

// GENERATE RANDOM RGB VALUES AND UPDATE VARIABLES
function setColorValues(r_, g_, b_) {

  // SET RGB VALUES
  r = r_;
  b = b_;
  g = g_;

	// CONVERT RGB AND SET HEXIDECIMAL
	hex = rgbToHex(r, g, b);

	// CONVERT RGB AND SET HSL
	var hslvalues = rgbToHsl();
	h = hslvalues[0];
	s = hslvalues[1];
	l = hslvalues[2];

}


// UPDATE COLOR STYLES
function setColorStyles() {

	// PAGE BACKGROUND COLOR
	pageContainer.style.backgroundColor = 'rgb(' + r + ',' + g + ',' + b + ')';

	// SET RGB DISPLAY
	redDisplay.innerHTML = r + ',';
	greenDisplay.innerHTML = g + ',';
	blueDisplay.innerHTML = b;

	// SET HEX DISPLAY
	hexDisplay.innerHTML = hex;

	// SET HSL DISPLAY
	hueDisplay.innerHTML = h + ', ';
	satDisplay.innerHTML = s + ', ';
	lightDisplay.innerHTML = l;

	// SET RGB SLIDER POSITION AND READOUT
	redSlider.value = redSliderDisplay.innerHTML = r;
	greenSlider.value = greenSliderDisplay.innerHTML = g;
	blueSlider.value = blueSliderDisplay.innerHTML = b;

}


// SET CONTRAST COLOR STYLES TO BLACK OR WHITE
// BASED ON HIGHEST CONTRAST TO GENERATED COLOR
function setContrastStyles() {

	// SET CONSTRASTING COLOR
	var cc = checkContrast([r, g, b]);

	// SET OPACITY VALUES FOR BUTTON STYLES
	var a1 = 0.05;
	var a2 = 0.15;

	// SET GLOBAL FONT COLOR
	pageContainer.style.color = 'rgb(' + cc + ')'

	// SET BACKGROUND COLOR STYLES OF UNSELECTED BUTTON
	var y = document.querySelectorAll('.unselected-link');
	for (i = 0; i < y.length; i++) {
		y[i].style.backgroundColor = 'rgba(' + cc + ', ' + a1 + ')';
	}

	// SET BACKGROUND COLOR STYLE OF SELECTED BUTTON
	var z = document.querySelectorAll('.selected-link');
	for (i = 0; i < z.length; i++) {
		z[i].style.backgroundColor = 'rgba(' + cc + ', ' + a2 + ')';
	}

}


// ADD NEW COLOR TO THE ARAAY
function updateColorArray() {

	// IF USER IN IN MIDDLE OF COLOR ARRAY
	// REMOVE ALL ELEMENTS BEYOND THEIR POSITION
	var l = colors.length - 1;
	if (colorsIndex < l) {
		colors.splice(colorsIndex + 1, l - colorsIndex)
	}

	// // REMOVE COLORS IN ARRAY IF LENGTH EXCEEDS 20
	// if (colors.length > 20) {
	// 	colors.splice(0, 1);
	// }

	// ADD NEW COLOR TO ARRAY
	colors.push([r, g, b]);
	colorsIndex++;
}


// ****************************************************
// MANAGING THE COLOR ARRAY
// ****************************************************

// SET COLOR TO PREVIOUS ONE IN ARRAY
function displayPreviousColor() {

	// CHECK TO SEE IF THERE'S A PREVIOUS COLOR
	if (colorsIndex > 0) {

		// VARIABLE FOR USER'S PREVIOUS ARRAY VALUE
		var b = colorsIndex - 1;

    // UPDATE COLOR VALUES WITH PREVIOUS COLOR
		setColors(colors[b][0], colors[b][1], colors[b][2]);

		// UPDATE COLOR ARRAY INDEX
		colorsIndex--;
	}
}

// Method to display previous color in array
function displayNextColor() {

	// HECK TO SEE IF THERE'S A NEXT COLOR
	if (colorsIndex < colors.length - 1) {

		// VARIABLE FOR USER'S NEXT ARRAY VALUE
		var b = colorsIndex + 1;

		// UPDATE COLOR STYLES WITH NEXT COLOR IN ARRAY
		setColors(colors[b][0], colors[b][1], colors[b][2]);

		// INCREASE COLOR ARRAY INDEX
		colorsIndex++;
	}
}


// ****************************************************
// UPDATE MODE DISPLAY
// ****************************************************

// UPDATE MODE DISPLAY BASED ON USER SELECTION
function updateMode(mode) {

	// LOOP THROUGH MODE SELECTORS AND SELECT/DESELECT AS NEEDED
	for (var i = 0; i < modes.length; i++) {
			// var r = document.getElementById(modes[i] + '-radio');	// radio button
			// modes selector
			var l = document.getElementById(modes[i] + '-selector');	// radio label
			// display for each
			var d = document.getElementById(modes[i] + '-display')

			if (mode === modes[i]) {
				// show corresponding display
				d.style.visibility = 'visible';
				// remove unselected
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
