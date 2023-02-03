function updateTheme(e) {
  var targetTheme = e.target.value;
  document.querySelector(":root").style.setProperty("--animation", targetTheme);
  browser.storage.sync.set({ prefTheme: targetTheme }).then(() => {
    console.log("Saved " + targetTheme + " as preferred theme");
  });
}
document.querySelector("#theme").addEventListener("change", updateTheme);

function restoreOptions() {
  console.log("Restoring options");
  browser.storage.sync.get({ prefTheme: "none"}).then((items) => {
    document.getElementById("theme").value = items.prefTheme;
    document.querySelector(":root").style.setProperty("--animation", items.prefTheme)
    console.log("Got preferred theme: " + items.prefTheme);
  });
}
document.addEventListener("DOMContentLoaded", restoreOptions);
