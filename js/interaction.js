/****************************************************
INTERACTION
SETTING UP ALL INTERACTIVE EVENTS
****************************************************/


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

		// HIDE RIGHT KEY TIP IF USER CREATES NEW COLOR
		if (!rightkeyUsed && onboardStep === 3) {
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

function setupListeners(type) {

	// RGB SLIDERS
	document.querySelector('.sliders').addEventListener('input', function(e) {
	  // console.log(e.target.id + " was clicked!");
		updateColors();
	});

	// MODE SELECTORS
	document.querySelector('.color-modes-container').addEventListener(type, function(e) {
		// console.log(e.target.id + "was clicked!");
		updateMode(e.target.id);
	}, false)

	// COPY BUTTON
	document.querySelector('#copy-css-btn').addEventListener(type, copyColorValue ,false)

	// SETTINGS TOGGLE
	document.querySelector('#settings-toggle').addEventListener(type, toggleSettings);

	// TOUCH EVENT
	if (type = 'touchstart') {

		document.querySelector('.display').addEventListener('touchstart', function(event) {
			// GENERATE COLOR
			generateColor();

			// ADVANCE ONBOARDING
			if (mobileOnboardStep < 2) {
				onboarding();
			}
		}, false);
	}
}
