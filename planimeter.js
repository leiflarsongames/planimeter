const prefix = "[planimeter]";

let bMeasuring = false;
let samples = [];

const controls = {
    toggleMeasurements: "m",
    readMeasurements:   "b",
}

const keyActions = [
    (event) => {if (event.key === controls.readMeasurements) readMeasurements(); },
    (event) => {if (event.key === controls.toggleMeasurements) toggleMeasurements(event); },
]

const clickActions = [
    (event) => {if (bMeasuring) measurePosition(event); },
]

// runs this behavior
bindActions(); // creates event listeners
sayControls(); // writes the controls to the console.


//////// behavior functions ////////

function bindActions() {
    // TODO adjust if needed to be able to access the game's canvas!
    keyActions.forEach( (action) => {
        document.querySelector("body")
            .addEventListener("keypress", (event) => { action(event) })
    });
    clickActions.forEach( (action) => {
        document.querySelector("body")
            .addEventListener("click", (event) => { action(event) })
    });
}

function sayControls() {
    console.log(
        `${prefix} CONTROLS`
        + `\n | Press [${controls.toggleMeasurements}] to enable/disable measurement. (currently ${bMeasuring ? "ON" : "OFF"})`
        + `\n | With measurements enabled, click anywhere to add a point.`
        + `\n | Press [${controls.readMeasurements}] to read out the enclosing area of all points.`
        + '\n'
        + `\nFilter for ${prefix} to see only output from this extension.`
    );
}

//////// controlled functions ////////

function toggleMeasurements() {
    bMeasuring = !bMeasuring;
    console.log( bMeasuring
        ? `${prefix} measurements are ON.`
        : `${prefix} measurements are OFF.`
    );

}

function measurePosition(event)
{
    const pos = _getMousePosition(event);
    console.log(`${prefix} pos = <${pos.x}, ${pos.y}>`);
    samples.push(pos);
}

function readMeasurements()
{
    const dims = _calculateRectangularBoundingArea(samples);
    // guard against invalid data
    if (dims === null) {
        console.log(`${prefix} DIMENSIONS = (0 x 0)`);
        alert(`${prefix} Measurement has no area. \nHINT: ${bMeasuring 
            ? `Add more points.`
            : `Turn ON measurements with the [${controls.toggleMeasurements}] key.`
        }`);
        return;
    }

    console.log(`${prefix} DIMENSIONS = (${dims.x} x ${dims.y})\n\t= ${dims.x * dims.y}px total`);
    alert(`${prefix} dimensions = (${dims.x} x ${dims.y})\n\t= ${dims.x * dims.y}px total`);
    _clearMeasurements();
}

//////// helper methods ////////

function _clearMeasurements() { samples = []; }

/**
 * @param positions an array of `{x, y}` positions.
 * @returns {{x, y}|null} the dimensions of the smallest x-y aligned rectangle which contains all given positions.
 *      Returns `null` when positions is length 0 or the rectangle has no area.
 * @private
 */
function _calculateRectangularBoundingArea(positions) {
    if (positions === null
        || positions === undefined
        || typeof positions !== typeof []
        || positions.length <= 1
        )
    { return null; }

    let yMin = Number.MAX_VALUE;
    let yMax = Number.MIN_VALUE;
    let xMin = Number.MAX_VALUE;
    let xMax = Number.MIN_VALUE;

    for (let i = 0; i < samples.length; i++) {
        if (yMin > samples[i].y) {yMin = samples[i].y;}
        if (yMax < samples[i].y) {yMax = samples[i].y;}
        if (xMin > samples[i].x) {xMin = samples[i].x;}
        if (xMax < samples[i].x) {xMax = samples[i].x;}
    }

    const dims = {
        x: (xMax - xMin),
        y: (yMax - yMin),
    }

    if (dims.x === 0 || dims.y === 0) { return null; }
    return dims;
}

/**
 * @param event a mouse click event.
 * @returns {{x: number, y: number}} current mouse position.
 * @private
 */
function _getMousePosition(event) {
    return {
        x: event.clientX,
        y: event.clientY
    }
}

