/****************************************************
COPY BUTTON WIDGET
COPY THE COLOR STYLE CSS
USING CLIPBOARD.JS
****************************************************/

// COPY CURRENT COLOR'S CSS VALUE TO CLIPBOARD
// USING CLIPBOARD.JS
function copyColorValue() {
  clipboard = new Clipboard('#copy-css-btn', {
      text: function() {
  			if (activeMode === modes[0]) {
  				return 'color: rgb(' + r + ', ' + g + ', ' + b + ');';
  			} else if (activeMode === modes[1]) {
          return 'color: ' + hex.toUpperCase(); + ';';
        } else if (activeMode === modes[2]) {
  				// REMOVE DEGREE SYMBOL FROM HUE VALUE
  				var n = h.length;
  				var hh = h.substring(0, n - 1);
          return 'color: hsl(' + hh + ', ' + s + ', ' + l + ');';
        }
      }
  });

  clipboard.on('success', function(e) {
  		console.log(e);
  		revealConfirmation();
  		setTimeout(hideConfirmation, 1400);
  });

  clipboard.on('error', function(e) {
  	console.log(e);
  });
}

// REVEAL COPY CONFIRMATION TEXT
function revealConfirmation() {
	console.log("show text now");
	// statusElement.style.opacity = 1;
  document.querySelector('.copy-btn-label').innerHTML = "Copied!"
}

// HIDE COPY CONFIRMATION TEXT
function hideConfirmation() {
	console.log("hide text now");
	// statusElement.style.opacity = 0;
  document.querySelector('.copy-btn-label').innerHTML = "Copy CSS"

}
