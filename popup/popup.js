//////// popup behavior ////////
function initializePopup() {
    document.getElementById("planimeter-toggle-key").innerHTML = controls.toggleMeasurements.toUpperCase();
    document.getElementById("planimeter-read-key").innerHTML = controls.readMeasurements.toUpperCase();
    _updateTips();
}

function _updateTips() {
    document.getElementById("planimeter-measuring-tip").innerHTML = bMeasuring
        ? "ON"
        : "OFF";
    document.getElementById("planimeter-measuring-verb").innerHTML = bMeasuring
        ? "disable"
        : "enable";
}