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

/****************************************************
COLOR GENERATION
ALL JAVASRIPT RELATED TO GENERATING, SETTING, AND
UPDATING THE COLORS & COLOR ELEMENTS
****************************************************/

// GENERATE A NEW COLOR & UPDATE ALL ELEMENTS
function generateColor () {
  // GENERATE RANDOM RGB VALUES
  generateRandomColorValues();

  // USE THESE COLORS TO UPDATE APP
  setColors();

  // ADD NEW COLOR TO THE ARRAY
  updateColorArray();
}

// GENERATE RANDOM RGB VALUES
function generateRandomColorValues () {
  r = Math.round(Math.random() * (256));
  g = Math.round(Math.random() * (256));
  b = Math.round(Math.random() * (256));
}

// UPDATE APP WITH NEW COLOR VALUES
function setColors () {
  // SET ALL COLOR VARIABLES
  setColorValues();

  // UPDATE CSS COLOR STYLES
  setColorStyles();

  // SET CONTRAST COLOR STYLES
  setContrastStyles();
}

// UPDATE HEX AND HSL COLOR VALUES
function setColorValues () {
  // CONVERT RGB AND SET HEXIDECIMAL
  hex = rgbToHex(r, g, b);

  // CONVERT RGB AND SET HSL
  var hslvalues = rgbToHsl(r, g, b);
  h = hslvalues[0];
  s = hslvalues[1];
  l = hslvalues[2];
}

// UPDATE COLOR STYLES
function setColorStyles () {
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

  // SET SLIDER ARIA
  redSlider.setAttribute('aria-valuenow', r);
  greenSlider.setAttribute('aria-valuenow', g);
  blueSlider.setAttribute('aria-valuenow', b);
}

// UPDATE COLOR & DISPLAYS WITH SLIDER
function updateColors () {
  // ADJUST COLOR VARIABLES FOR COLOR VALUE
  r = redSlider.value;
  g = greenSlider.value;
  b = blueSlider.value;

  // UPDATE ALL COLORS WITH NEW VALUES
  setColors(r, g, b);
}

/****************************************************
COLOR ARRAY
ALL JAVASRIPT FOR MANAGING AND UPDATING THE ARRAY OF
GENERATED COLORS
****************************************************/

// ADD NEW COLOR TO THE ARAAY
function updateColorArray () {
  // IF USER IN IN MIDDLE OF COLOR ARRAY
  // REMOVE ALL ELEMENTS BEYOND THEIR POSITION
  var l = colors.length - 1;
  if (colorsIndex < l) {
    colors.splice(colorsIndex + 1, l - colorsIndex);
  }

  // ADD NEW COLOR TO ARRAY
  colors.push([r, g, b]);
  colorsIndex++;
}

// SET COLOR TO PREVIOUS ONE IN ARRAY
function displayPreviousColor () {
  // CHECK TO SEE IF THERE'S A PREVIOUS COLOR
  if (colorsIndex > 0) {
    // VARIABLE FOR USER'S PREVIOUS ARRAY VALUE
    var i = colorsIndex - 1;

    // UPDATE COLOR VALUES WITH PREVIOUS COLOR
    r = colors[i][0];
    g = colors[i][1];
    b = colors[i][2];
    setColors();

    // UPDATE COLOR ARRAY INDEX
    colorsIndex--;
  }
}

// SET COLOR TO THE NEXT IN THE DISPLAY
function displayNextColor () {
  // CHECK TO SEE IF THERE'S A NEXT COLOR
  if (colorsIndex < colors.length - 1) {
    // VARIABLE FOR USER'S NEXT ARRAY VALUE
    var i = colorsIndex + 1;

    // UPDATE COLOR STYLES WITH NEXT COLOR IN ARRAY
    r = colors[i][0];
    g = colors[i][1];
    b = colors[i][2];
    setColors();

    // INCREASE COLOR ARRAY INDEX
    colorsIndex++;
  }
}

/****************************************************
COLOR CONTRAST
ALL JAVASRIPT RELATED TO CALCULATING COLOR CONTRAST
AND UPDATING STYLES
****************************************************/

// SET CONTRAST COLOR STYLES TO BLACK OR WHITE
// BASED ON HIGHEST CONTRAST TO GENERATED COLOR
function setContrastStyles () {
  // SET CONSTRASTING COLOR
  cc = checkContrast([r, g, b]);

  // SET GLOBAL FONT COLOR
  pageContainer.style.color = 'rgb(' + cc + ')';

  // SET GLOBAL BUTTON STYLES
  setButtonStyles();
}

// COMPARE CONTRAST BETWEEN GENERATED COLOR AND BLACK AND WHITE
// https://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef
function checkContrast (rgb) {
  // SET LUMINENCE VALUES FOR BLACK AND WHITE
  var blackL = 0;
  var whiteL = 1;

  // CALCULATE CONTRAST RATIO FOR BLACK AND WHITE
  var colorL = luminanace(rgb[0], rgb[1], rgb[2]);
  var blackContrast = (colorL + 0.05) / (blackL + 0.05);
  var whiteContrast = (whiteL + 0.05) / (colorL + 0.05);

  // COMPARE EACH CONTRAST RATIO AGAINST WCAG AA MINIMUM OF 4.5
  var minRatio = 4.5;

  // RETURN HIGHEST CONSTAST COLOR
  if (blackContrast > minRatio && blackContrast > whiteContrast) {
    // BLACK
    return ('0, 0, 0');
  } else if (whiteContrast > minRatio && whiteContrast > blackContrast) {
    // WHITE
    return ('255, 255, 255');
  }
}

// SET THE STYLES OF SELECTED AND UNSELECTED BUTTON BASED ON CONTRAST COLOR
function setButtonStyles () {
  // OPACITY VALUES FOR BUTTON STYLES
  var a1 = 0.08;
  var a2 = 0.16;
  var a3 = 0.25;

  // SET CUSTOM CSS PROPERTIES OF BUTTON STYLES
  document.documentElement.style.setProperty('--button-color-default', 'rgba(' + cc + ', ' + a1 + ')');
  document.documentElement.style.setProperty('--button-color-hover', 'rgba(' + cc + ', ' + a2 + ')');
  document.documentElement.style.setProperty('--button-color-active', 'rgba(' + cc + ', ' + a3 + ')');
}

/****************************************************
CONVERTING RGB VALUES TO HEXIDECIMAL
****************************************************/

// BUILD HEXIDECIMAL VALUE
function rgbToHex (r, g, b) {
  var hx = '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
  return (hx);
}

// CONVERT EACH PART OF RGB VALUE TO HEX EQUIVALENT
function componentToHex (c) {
  var v = Number(c).toString(16);
  if (v.length < 2) {
    v = '0' + v;
  }
  return (v);
}

/****************************************************
CONVERTING RGB VALUES TO HSL
****************************************************/

// CONVERT RGB to HSL
// Found here: https://gist.github.com/mjackson/5311256
function rgbToHsl (r, g, b) {
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
      case r: h1 = (g - b) / d + (g < b ? 6 : 0); break
      case g: h1 = (b - r) / d + 2; break
      case b: h1 = (r - g) / d + 4; break
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
function luminanace (r, g, b) {
  var a = [r, g, b].map(function (v) {
    v /= 255;
    return v <= 0.03928
      ? v / 12.92
      : Math.pow((v + 0.055) / 1.055, 2.4)
  })
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}


// ****************************************************
// TOGGLE SETTINS PANEL
// ****************************************************

function toggleSettings () {
  // SETTINGS PANEL DOM ELEMENT
  var settings = document.querySelector('.settings-container');
  var settingsButton = document.querySelector('#settings-toggle');

  // TOGGLE VISIBILITY CLASS
  if (panelHidden) {
    settings.style.display = 'flex';
    settingsButton.setAttribute('aria-label', 'Close Settings Panel');
    rotateIcon();
    panelHidden = false;
  } else {
    settings.style.display = 'none';
    settingsButton.setAttribute('aria-label', 'Open Settings Panel');
    rotateIcon();
    panelHidden = true;
  }
}

function rotateIcon () {
  var s = document.querySelector('.settings-icon');

  if (panelHidden) {
    s.classList.add('settings-icon-rotated');
  } else {
    s.classList.remove('settings-icon-rotated');
  }
}

/****************************************************
INTERACTION
SETTING UP ALL INTERACTIVE EVENTS
****************************************************/

// ****************************************************
// KEYPRESS EVENTS
// ****************************************************

// KEYPRESS EVENT SETUP
window.addEventListener('keydown', function (event) {
  // KEY CODE VARIABLE
  var code;

  // CROSS-BROWSER IMPLEMENTATION OF KEY CODE
  if (event.key !== undefined) {
    code = event.key;
  } else if (event.keyIdentifier !== undefined) {
    code = event.keyIdentifier;
  } else if (event.keyCode !== undefined) {
    code = event.keyCode;
  }

  // SPACEBAR GENERATES A NEW COLOR
  if (code === ' ' || code === 32) {
    // GENERATE A NEW COLOR
    generateColor();
  }

  // LEFT ARROW DISPLAYS PREVIOUS COLOR IN ARRAY
  if (code == 'ArrowLeft' || code === 37) {
    // DISPLAY THE PREVOUS COLOR IN THE ARRAY
    displayPreviousColor();
  }

  // RIGHT ARROW DISPLAYS NEXT COLOR IN ARRAY
  if (code === 'ArrowRight' || code === 39) {
    // DISPLAY NEXT COLOR ARRAY
    displayNextColor();
  }
})

// ****************************************************
// MOUSE EVENTS
// ****************************************************

function setupListeners(type) {
  // RGB SLIDERS
  document.querySelector('.sliders').addEventListener('input', function() {
    updateColors();
  });

  // MODE SELECTORS
  document.querySelector('.color-modes-container').addEventListener(type, function (e) {
    updateMode(e.target.id);
  }, false);

  // COPY BUTTON
  document.querySelector('#copy-css-btn').addEventListener(type, copyColorValue, false);

  // SETTINGS TOGGLE
  document.querySelector('#settings-toggle').addEventListener(type, toggleSettings);

  // TOUCH EVENT
  if (type = 'touchstart') {
    document.querySelector('.display').addEventListener('touchstart', function() {
      // GENERATE COLOR
      generateColor();
    })
  }

  // ABOUT BUTTON - SHOW ABOUT MODAL
  document.querySelector("#about-modal-open").addEventListener("click", function() {
    document.querySelector("#about-modal").style.backgroundColor = 'rgb(' + r + ',' + g + ',' + b + ')';
    document.querySelector("#about-modal").classList.add("visible");
  }, false)

  // CLOSE ABOUT TOGGLE
  // ABOUT BUTTON - SHOW ABOUT MODAL
  document.querySelector("#about-modal-close").addEventListener("click", function() {
    document.querySelector("#about-modal").classList.remove("visible");
  }, false)
}

/****************************************************
MODE SELECTOR WIDGET
CONTROLLING THE DISPLAY OF EACH COLOR MODE
****************************************************/

// UPDATE MODE DISPLAY BASED ON USER SELECTION
function updateMode(mode) {

  // LOOP THROUGH MODES ARRAY AND SELECT/DESELECT AS NEEDED
  for (var i = 0; i < modes.length; i++) {
    // DOM ELEMENT FOR EACH MODE DISPLAY
    var d = document.getElementById(modes[i] + '-display');
    // DOM ELEMENT FOR EACH MODE BUTTON
    var l = document.getElementById(modes[i]);

    // LOOP THROUGH MODES TO FIND WHAT WAS SELECTED
    if (mode === modes[i]) {
      // FOR THE SELECTED MODE
      // TOGGLE CORRESPONDING DISPLAY TO DISPLAY
      d.classList.add('active-display');
      // ADD SELECTED CLASS
      l.classList.add('btn-selected');
      // UPDATE ARIA PRESSED STATE
      l.setAttribute('aria-pressed', 'true');
      // SET AS ACTIVE
      activeMode = modes[i];
    } else {
      // FOR THE UNSELECTED MODES
      // HIDE THEIR DISPLAY
      d.classList.remove('active-display');
      // REMOVE SELECTED CLASS
      l.classList.remove('btn-selected');
      // UPDATE ARIA PRESSED STATE
      l.setAttribute('aria-pressed', 'false');
    }
  }
}

/****************************************************
COPY BUTTON WIDGET
COPY THE COLOR STYLE CSS
USING CLIPBOARD.JS
****************************************************/

// COPY CURRENT COLOR'S CSS VALUE TO CLIPBOARD
// USING CLIPBOARD.JS
function copyColorValue() {
  var clipboard = new ClipboardJS('#copy-css-btn', {
    text: function() {
      // RGB
      if (activeMode === modes[0]) {
				return 'color: rgb(' + r + ', ' + g + ', ' + b + ');';
			}

      // HEX
      if (activeMode === modes[1]) {
        return 'color: ' + hex.toUpperCase(); +';';
      }

      // HSL
      if (activeMode === modes[2]) {
				// REMOVE DEGREE SYMBOL FROM HUE VALUE
				var n = h.length;
				var hh = h.substring(0, n - 1);
        return 'color: hsl(' + hh + ', ' + s + ', ' + l + ');';
      }
    }
  })

  // SHOW CONFIRMATION ON SUCCESS
  clipboard.on('success', function (e) {
  		console.log(e);
      toggleConfirmationMessage();
  		revealConfirmation();
  		setTimeout(hideConfirmation, 1400);
  })

  // LOG ERROR
  clipboard.on('error', function (e) {
  	console.log(e);
  })

}

function toggleConfirmationMessage() {
  
}

// REVEAL COPY CONFIRMATION TEXT
function revealConfirmation () {
  console.log('show text now');
  document.querySelector('.copy-btn-label').innerHTML = 'Copied!';
}

// HIDE COPY CONFIRMATION TEXT
function hideConfirmation () {
  console.log('hide text now');
  document.querySelector('.copy-btn-label').innerHTML = 'Copy CSS';
}
