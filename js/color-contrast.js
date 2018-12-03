/****************************************************
COLOR CONTRAST
ALL JAVASRIPT RELATED TO CALCULATING COLOR CONTRAST
AND UPDATING STYLES
****************************************************/


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


// COMPARE CONTRAST BETWEEN GENERATED COLOR AND BLACK AND WHITE
// https://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef
function checkContrast(rgb) {

  // SET LUMINENCE VALUES FOR BLACK AND WHITE
	var blackL = 0;
	var whiteL = 1;

	// CALCULATE CONTRAST RATIO FOR BLACK AND WHITE
	var colorL = luminanace(rgb[0], rgb[1], rgb[2]);
	var blackContrast = (colorL + 0.05) / (blackL + 0.05);
	var whiteContrast = (whiteL + 0.05) / (colorL + 0.05);
  // console.log(blackContrast, whiteContrast);

	// COMPARE EACH CONTRAST RATIO AGAINST WCAG AA MINIMUM OF 4.5
	var minRatio = 4.5;

	// RETURN HIGHEST CONSTAST COLOR
	if (blackContrast > minRatio && blackContrast > whiteContrast) {
		// BLACK
		return('0, 0, 0');
	} else if (whiteContrast > minRatio && whiteContrast > blackContrast) {
		// WHITE
		return('255, 255, 255');
	}

}

// SET THE STYLES OF SELECTED AND UNSELECTED BUTTON BASED ON CONTRAST COLOR
function setButtonStyles() {

	// OPACITY VALUES FOR BUTTON STYLES
	var a1 = 0.08;
	var a2 = 0.16;
	var a3 = 0.25;

	// SET CUSTOM CSS PROPERTIES OF BUTTON STYLES
  document.documentElement.style.setProperty('--button-color-default', 'rgba(' + cc + ', ' + a1 + ')')
	document.documentElement.style.setProperty('--button-color-hover', 'rgba(' + cc + ', ' + a2 + ')')
	document.documentElement.style.setProperty('--button-color-active', 'rgba(' + cc + ', ' + a3 + ')')
}
