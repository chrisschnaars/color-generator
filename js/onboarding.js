// ****************************************************
// ONBOARDING DISPLAY
// ****************************************************

// ONBOARDING HINT USAGE
// BOOLEANS INDICATE WHETHER HINT'S CONTENT HAS BEEN USED
var spacebarUsed = false;
var leftkeyUsed = false;
var rightkeyUsed = false;

// COUNTER TO KEEP TRACK OF ONBOARDING STEPS
var onboardStep = 0;
var mobileOnboardStep = 0;

// TRASNITION DELAY TIME
var delayTime = 700;

// INCREMENT ONBOARDING TIPS
function onboarding() {
  // console.log("Onboarding in progress");

  // ONBOARDING MESSAGE DOM ELEMENTS
  var s = document.querySelector('.spacebar-hint');
  var l = document.querySelector('.leftkey-hint');
  var r = document.querySelector('.rightkey-hint');
  var t = document.querySelector('.touch-hint');

  // TOUCH SCREEN ONBOARDING
  if (touchDevice) {
    if (mobileOnboardStep === 0) {
      t.style.opacity = 1;
      mobileOnboardStep++;
    } else if (mobileOnboardStep === 1) {
      t.style.opacity = 0;
      setTimeout(showHeader, delayTime);
    }
  }

  // NON-TOUCH SCREEN ONBOARDING
  if (!touchDevice) {
    // EACH ONBOARDING STEP HIDES PREVIOUS ONE
  	if (onboardStep === 0) {	// initial spacebar tip
      s.style.opacity = 1;
  		onboardStep++;
  	} else if (onboardStep === 1) {	// left arrow tip
      s.style.opacity = 0;
  		setTimeout( function() {
        l.style.opacity = 1;
  		}, delayTime);
  		spacebarUsed = true;
  		onboardStep++;
  	} else if (onboardStep === 2) {	// right arrow tip
      l.style.opacity = 0;
  		setTimeout( function() {
        r.style.opacity = 1;
  		}, delayTime);
  		leftkeyUsed = true;
  		onboardStep++;
  	} else if (onboardStep === 3) {	// hide tips
      r.style.opacity = 0;
  		rightkeyUsed = true;
  		onboardStep++;
      showHeader();
  	}
  }
}

// MOBILE ONBOARDING
function mobileOnboarding() {
  var t = document.querySelector('.onboarding-container');
  var l = document.querySelector('.logo-container');
}

// SHOW THE HEADER ELEMENTS AFTER ONBOARDING FINISHES
function showHeader() {
  // HIDE ONBOARDING CONTAINER
  var o = document.querySelector('.onboarding-container');
  o.style.display = 'none';
  // META CONTAINER DOM ELEMENT
  var h = document.querySelector('.meta-container');
  h.style.opacity = 1;

}
