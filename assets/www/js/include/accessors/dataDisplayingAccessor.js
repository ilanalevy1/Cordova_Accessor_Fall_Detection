exports.setup = function() {

    this.input('dataInX');
    this.input('dataInY');
    this.input('dataInZ');
    this.input('timeStampIn');

};
exports.initialize = function() {

    this.addInputHandler("dataInX", display.bind(this));
    this.addInputHandler("dataInY", display.bind(this));
    this.addInputHandler("dataInZ", display.bind(this));
    this.addInputHandler("timeStampIn", display.bind(this));

};
function display() {

    var currentAccelX = this.get('dataInX');
    var currentAccelY = this.get('dataInY');
    var currentAccelZ = this.get('dataInZ');
    var currentTime = this.get('timeStampIn');

    document.getElementById("displayX").innerHTML = "X Acceleration:     " + currentAccelX.toFixed(5);
    document.getElementById("displayY").innerHTML = "Y Acceleration:     " + currentAccelY.toFixed(5);
    document.getElementById("displayZ").innerHTML = "Z Acceleration:     " + currentAccelZ.toFixed(5);
    document.getElementById("ts").innerHTML = "Current Time:     " + currentTime % 1000000;
}