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
