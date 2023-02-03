function openMirrowWindow() {
  var wing = document.getElementById("wing").value;
  var floor = document.getElementById("floor").value;
  var room = sanitize(document.getElementById("classroom").value);
  saveOptions(wing, floor);
  console.log(
    "Opening Mirrow window with wing: " +
      wing +
      ", floor: " +
      floor +
      ", room: " +
      room
  );

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
document.querySelector("form").addEventListener("submit", openMirrowWindow);

function sanitize(input) {
  console.log("Sanitizing input: " + input);
  var input_regex = input.replace(/[^0-9]/g, "");
  var input_trim = input_regex.substring(0, 3); // Trim input so only the first 3 digits are used
  input_trim = input_trim === "" ? "001" : input_trim; // Check if input value is empty, if so give a default value, else pass input
  var input_sanitized = input_trim.padStart(3, "0");
  console.log("Sanitized input: " + input_sanitized);
  return input_sanitized;
}

function saveOptions(wing, floor) {
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

function restoreOptions() {
  console.log("Restoring options");
  browser.storage.sync.get({ prefWing: "A", prefFloor: "0", prefTheme: "none" }).then((items) => {
    // Wing
    document.getElementById("wing").value = items.prefWing;
    console.log("Got preferred wing: " + items.prefWing);
    // Floor
    document.getElementById("floor").value = items.prefFloor;
    console.log("Got preferred floor: " + items.prefFloor);
    // Theme
    document.querySelector(":root").style.setProperty("--button-animation", items.prefTheme)
    console.log("Got preferred theme: " + items.prefTheme);
  });
}
document.addEventListener("DOMContentLoaded", restoreOptions);
