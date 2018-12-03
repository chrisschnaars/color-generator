
// ****************************************************
// TOGGLE SETTINS PANEL
// ****************************************************

function toggleSettings() {

  // SETTINGS PANEL DOM ELEMENT
  var settings = document.querySelector('.settings-container');

  // TOGGLE VISIBILITY CLASS
  if (panelHidden) {
    settings.style.display = "flex";
    rotateIcon();
    panelHidden = false;
  } else {
    settings.style.display = "none";
    rotateIcon();
    panelHidden = true;
  }
}

function rotateIcon() {
  var s = document.querySelector('.settings-icon');

  if (panelHidden) {
    s.classList.add('settings-icon-rotated');
  } else {
    s.classList.remove('settings-icon-rotated');
  }
}
