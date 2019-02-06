
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
