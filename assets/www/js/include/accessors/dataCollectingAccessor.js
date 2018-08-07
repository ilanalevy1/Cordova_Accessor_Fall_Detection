//Test Accessor for Collecting Accelerometer Data from MSBand
//Author: Ilana Levy

'use strict';

exports.setup = function() {
//Set up connection with msband (msband.js in plugins folder)
    msband.initialize(function(result) {}, function() { alert("not Initialized"); });
    msband.connect(function(result) {}, function() { alert("not connected"); });

//establish inputs and outputs
    this.output('dataOutX');
    this.output('dataOutY');
    this.output('dataOutZ');
    this.output('dataOutRes');
    this.output('timeStamp');
};

exports.initialize = function() {

//must use variable to represent this or else msband throws an error
    var self = this;

/*format for getAccel(fn) asynchronous callback from:
    https://stackoverflow.com/questions/6847697/how-to-return-value-from-an-asynchronous-callback-function
*/
    function getAccel(fn) {
        msband.subscribe(function(result){ fn(result);}, function() {alert("notSubscribed");}, "ACCELEROMETER");
    }

    getAccel(function(result){
        //sends accelerometer data to outputs
        var x = result.X;
        var y = result.Y;
        var z = result.Z;
        self.send('dataOutX', x);
        self.send('dataOutY', y);
        self.send('dataOutZ', z);
        self.send('dataOutRes', Math.sqrt(x*x + y*y + z*z));
        self.send('timeStamp', result.timeStamp);

    });

};