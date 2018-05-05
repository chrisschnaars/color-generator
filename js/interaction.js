
// ****************************************************
// KEYPRESS EVENTS
// ****************************************************

// KEYPRESS EVENT SETUP
window.addEventListener('keydown', function(event) {

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
	if (code == ' ' || code == 32) {

		// GENERATE A NEW COLOR
		generateColor();

		// HIDE SPACEBAR ONBOARDING HINT IF THIS IS FIRST TIME
		if (!spacebarUsed && onboardStep === 1) {
			onboarding();
		}
	}

	// LEFT ARROW DISPLAYS PREVIOUS COLOR IN ARRAY
	if (code == 'ArrowLeft' || code == 37) {

		// DISPLAY THE PREVOUS COLOR IN THE ARRAY
		displayPreviousColor();

		// HIDE LEFT KEY ONBOARDING HINT IF ITS FIRST TIME
		if (!leftkeyUsed && onboardStep === 2) {
			onboarding();
		}
	}

	// RIGHT ARROW DISPLAYS NEXT COLOR IN ARRAY
	if (code == 'ArrowRight' || code == 39) {

		// DISPLAY NEXT COLOR ARRAY
		displayNextColor();

		// HIDE RIGHT KEY ONBOARDING HINT IF ITS FIRST TIME
		if (!rightkeyUsed && onboardStep === 3) {
			onboarding();
		}
	}
});


// ****************************************************
// MOUSE EVENTS
// ****************************************************

function setupMouseEvents() {

  // CLICK EVENTS FOR MODE SELECTORS
  document.querySelector('#rgb-selector').addEventListener('click', function(){
  	updateMode('rgb');
  }, false);

  document.querySelector('#hex-selector').addEventListener('click', function(){
  	updateMode('hex');
  }, false);

  document.querySelector('#hsl-selector').addEventListener('click', function(){
  	updateMode('hsl');
  }, false);

  // RGB SLIDER CHANGE EVENTS
  redSlider.addEventListener('input', updateColors);
  greenSlider.addEventListener('input', updateColors);
  blueSlider.addEventListener('input', updateColors);


}
