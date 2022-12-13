// Saves options to chrome.storage
function save_options() {
    var wing = document.getElementById('wing').value;
    var floor = document.getElementById('floor').value;
    chrome.storage.sync.set({
        prefWing: wing,
        prefFloor: floor
    }, function () {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Instellingen opgeslagen.';
        setTimeout(function () {
            status.textContent = '';
        }, 10000);
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
document.getElementById('save').addEventListener('click', save_options);
