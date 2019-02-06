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
