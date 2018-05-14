
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
	var hslvalues = rgbToHsl(r, g, b);
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
	cc = checkContrast([r, g, b]);

	// SET GLOBAL FONT COLOR
	pageContainer.style.color = 'rgb(' + cc + ')';

  // SET GLOBAL BUTTON STYLES
  setButtonStyles();

}


// ADD NEW COLOR TO THE ARAAY
function updateColorArray() {

	// IF USER IN IN MIDDLE OF COLOR ARRAY
	// REMOVE ALL ELEMENTS BEYOND THEIR POSITION
	var l = colors.length - 1;
	if (colorsIndex < l) {
		colors.splice(colorsIndex + 1, l - colorsIndex);
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

	// CHECK TO SEE IF THERE'S A NEXT COLOR
	if (colorsIndex < colors.length - 1) {

    console.log("there's a next color");
		// VARIABLE FOR USER'S NEXT ARRAY VALUE
		var b = colorsIndex + 1;
    console.log(b);

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

	// LOOP THROUGH MODEs ARRAY AND SELECT/DESELECT AS NEEDED
	for (var i = 0; i < modes.length; i++) {

			// GET SELECTOR DOM ELEMENT FOR EACH MODE
			var l = document.getElementById(modes[i] + '-selector');	// radio label
			// GET COLOR READOUT DOM ELEMENT FOR EACH MODE
			var d = document.getElementById(modes[i] + '-display')

      // LOOP THROUGH MODES TO FIND WHAT WAS SELECTED
			if (mode === modes[i]) {
        // FOR THE SELECTED MODE
				// TOGGLE CORRESPONDING DISPLAY TO DISPLAY
				d.style.visibility = 'visible';
				// REMOVE UNSELECTED CLASS
				// l.classList.remove('unselected-link');
				// ADD SELECTED CLASS
				l.classList.add('btn-selected');
				// SET AS ACTIVE
				activeMode = modes[i];
			} else {
        // FOR THE UNSELECTED MODES
				// HIDE THEIR DISPLAY
				d.style.visibility = 'hidden';
				// REMOVE SELECTED CLASS
				l.classList.remove('btn-selected');
				// ADD UNSELECTED CLASS
				// l.classList.add('unselected-link');
			}

		}
		// reset contrast styles
		// setContrastStyles();
    setButtonStyles();
}
