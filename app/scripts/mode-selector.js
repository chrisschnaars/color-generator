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
