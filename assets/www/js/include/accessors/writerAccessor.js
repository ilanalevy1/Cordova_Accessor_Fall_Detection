var fall = false;

exports.setup = function () {
this.input('smin');
this.input('smax');
this.input('cvfast');
this.input('resultant');
this.output('predictionString')
}

exports.initialize = function() {
this.addInputHandler("smin", makestring.bind(this));
this.addInputHandler("smax", makestring.bind(this));
this.addInputHandler("cvfast", makestring.bind(this));
this.addInputHandler("resultant", makestring.bind(this));
}

function makestring() {
    var smin = this.get('smin');
    var smax = this.get('smax');
    var cvfast = this.get('cvfast');
    var res = this.get('resultant');

    var final = "";
    final = String(res) + "," + String(cvfast) + "," + String(smax) + "," + String(smin) + "," + fall;
    fall = !fall;
    this.send('predictionString', final);
}