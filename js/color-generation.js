/****************************************************
COLOR GENERATION
ALL JAVASRIPT RELATED TO GENERATING, SETTING, AND
UPDATING THE COLORS & COLOR ELEMENTS
****************************************************/


// GENERATE A NEW COLOR & UPDATE ALL ELEMENTS
function generateColor() {
  // GENERATE RANDOM RGB VALUES
  generateRandomColorValues();

	// USE THESE COLORS TO UPDATE APP
	setColors();

	// ADD NEW COLOR TO THE ARRAY
	updateColorArray();
}

// GENERATE RANDOM RGB VALUES
function generateRandomColorValues() {
	r = Math.round(Math.random() * (256));
	g = Math.round(Math.random() * (256));
	b = Math.round(Math.random() * (256));
}

// UPDATE APP WITH NEW COLOR VALUES
function setColors() {
	// SET ALL COLOR VARIABLES
	setColorValues();

	// UPDATE CSS COLOR STYLES
	setColorStyles();

	// SET CONTRAST COLOR STYLES
	setContrastStyles();
}

// UPDATE HEX AND HSL COLOR VALUES
function setColorValues() {

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
  document.getElementById('red-display').innerHTML = r + ', ';
	document.getElementById('green-display').innerHTML = g + ', ';
	document.getElementById('blue-display').innerHTML = b;

	// SET HEX DISPLAY
	document.getElementById('hex-value-display').innerHTML = hex;

	// SET HSL DISPLAY
	document.getElementById('hue-display').innerHTML = h + ', ';
	document.getElementById('saturation-display').innerHTML = s + ', ';
	document.getElementById('lightness-display').innerHTML = l;

	// SET RGB SLIDER POSITION AND READOUT
	redSlider.value = redSliderDisplay.innerHTML = r;
	greenSlider.value = greenSliderDisplay.innerHTML = g;
	blueSlider.value = blueSliderDisplay.innerHTML = b;
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
