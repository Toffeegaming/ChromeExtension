document.getElementById("submitButton").addEventListener("click", async () => {
  let [tab] = await browser.tabs.query({
    active: true,
    currentWindow: true,
  });
  browser.scripting
    .executeScript({
      target: { tabId: tab.id },
      func: openMirrowWindow(),
    })
    .then(console.log("Executed openMirrowWindow()"));
});

function sanitizeInput(input) {
  console.log("Sanitizing input: " + input);
  var input_regex = input.replace(/[^0-9]/g, "");
  var input_trim = input_regex.substring(0, 3); // Trim input so only the first 3 digits are used
  input_trim = input_trim === "" ? "001" : input_trim; // Check if input value is empty, if so give a default value, else pass input
  var input_sanitized = input_trim.padStart(3, "0");
  console.log("Sanitized input: " + input_sanitized);
  return input_sanitized;
}

function openMirrowWindow() {
  var wing = document.getElementById("wing").value;
  var floor = document.getElementById("floor").value;
  var room = document.getElementById("classroom").value;

  console.log(
    "Opening Mirrow window with wing: " +
      wing +
      ", floor: " +
      floor +
      ", room: " +
      room
  );

  save_options(wing, floor);
  room = sanitizeInput(room);

  url =
    "https://wepresent-" +
    wing +
    floor +
    "-" +
    room +
    "/cgi-bin/web_index.cgi?lang=en&src=AwBrowserSlide.html&screen=1";
  browser.tabs.create({ url: url });
  window.close();
}

function save_options(wing, floor) {
  console.log("Saving preferred wing and floor");
  browser.storage.sync
    .set({
      prefWing: wing,
      prefFloor: floor,
    })
    .then(() => {
      console.log("Saved " + wing + " as preferred wing");
      console.log("Saved " + floor + " as preferred floor");
    });
}

function restore_options() {
  console.log("Restoring preferred wing and floor");
  browser.storage.sync.get({ prefWing: "A", prefFloor: "0" }).then((items) => {
    document.getElementById("wing").value = items.prefWing;
    console.log("Got preferred wing: " + items.prefWing);
    document.getElementById("floor").value = items.prefFloor;
    console.log("Got preferred floor: " + items.prefFloor);
  });
}
document.addEventListener("DOMContentLoaded", restore_options);
