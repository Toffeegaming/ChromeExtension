// Inputs
let wing = document.getElementById("wing");
let floor = document.getElementById("floor");
let room = document.getElementById("classroom");
let submitButton = document.getElementById("submitButton");


// Check if the submit button exists
if(submitButton){
  // Click event listeners
  submitButton.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: openMirrowWindow()
    });
  });

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
}

// Saves options to chrome.storage
function save_options(wing = 'A', floor = 0) {
  chrome.storage.sync.set({
      prefWing: wing,
      prefFloor: floor
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
      prefWing: 'A',
      prefFloor: '0'
  }, function (items) {
      document.getElementById('wing').value = items.prefWing;
      document.getElementById('floor').value = items.prefFloor;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
