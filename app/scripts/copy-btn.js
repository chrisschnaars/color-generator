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
