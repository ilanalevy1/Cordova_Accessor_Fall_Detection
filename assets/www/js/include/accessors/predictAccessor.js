exports.setup = function() {
this.input('predictionString');
}

exports.initialize = function() {
this.addInputHandler('predictionString', predict.bind(this));
}

function predict () {

}