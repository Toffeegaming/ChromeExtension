// Inputs
let wing = document.getElementById("wing");
let floor = document.getElementById("floor");
let room = document.getElementById("classroom");
let submitButton = document.getElementById("submitButton");


// Detect browser
let browserName;
let userAgent = navigator.userAgent;


if(userAgent.match(/chrome|chromium|crios/i)) {
  browserName = "chrome";
} else if(userAgent.match(/firefox|fxios/i)) {
  browserName = "firefox";
}  else if(userAgent.match(/safari/i)) {
  browserName = "safari";
}else if(userAgent.match(/opr\//i)) {
  browserName = "opera";
} else if(userAgent.match(/edg/i)) {
  browserName = "edge";
} else {
  browserName="No browser detection";
}


if(submitButton){
  if (browserName == "chrome") {
    // Click event listeners
    submitButton.addEventListener("click", async () => {
      let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: openMirrowWindow()
      });
    });
  } else { // Browser is Firefox TODO: remove
    // Click event listeners
    submitButton.addEventListener("click", async () => {
      let [tab] = await browser.tabs.query({ active: true, currentWindow: true });
      browser.scripting.executeScript({
        target: { tabId: tab.id },
        function: openMirrowWindow()
      });
    });
  }

  // Keypress event listener
  room.addEventListener("keypress", function(event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      document.getElementById("submitButton").click();
    }
  });
}


// Open the mirror window
function openMirrowWindow() {
  var wing = document.getElementById('wing').value;
  var floor = document.getElementById('floor').value;
  save_options(wing, floor)

  /* TODO: remove this block in favor of an automated dropdown*/
  var room_raw = room.value.replace(/[^0-9]/g, ''); // Sanitize input
  var room_trim = room_raw.substring(0,3); // Trim input so only the first 3 digits are used
  room_trim = (room_trim === "") ? "001" : room_trim; // Check if input value is empty, if so give a default value, else pass input

  url = "https://wepresent-" + wing + floor + "-" + room_trim + "/cgi-bin/web_index.cgi?lang=en&src=AwBrowserSlide.html&screen=1";
  window.open(url);
  window.close()
}


var save_options;
var restore_options;
if(browserName == "chrome") {
  // Saves options to chrome.storage
  function save_options() {
    chrome.storage.sync.set({
      prefWing: document.getElementById('wing').value,
      prefFloor: document.getElementById('floor').value
    });
  }

  function restore_options() {
    chrome.storage.sync.get({
      prefWing: 'A',
      prefFloor: '0'
    }, function (items) {
      document.getElementById('wing').value = items.prefWing;
      document.getElementById('floor').value = items.prefFloor;
    });
  }
} else { // Browser is Firefox TODO: remove
  // Saves options to browser.storage
  function save_options() {
    browser.storage.sync.set({
      prefWing: document.getElementById('wing').value,
      prefFloor: document.getElementById('floor').value
    });
  }

  function restore_options() {
    browser.storage.sync.get({
      prefWing: 'A',
      prefFloor: '0'
    }, function (items) {
      document.getElementById('wing').value = items.prefWing;
      document.getElementById('floor').value = items.prefFloor;
    });
  }
}
document.addEventListener('DOMContentLoaded', restore_options);
