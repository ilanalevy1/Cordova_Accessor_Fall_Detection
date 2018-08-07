var app = {
    // Register an event handler that is invoked when the device is ready.
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
       //document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

//    onDeviceReady: function(){
//        msband.initialize(function(result) {}, function() { alert("not Initialized"); });
//        msband.connect(function(result) {}, function() { alert("not Connected"); });
//        msband.isConnected(function() {}, function() { alert("isNotConnected"); });
//
//        msband.subscribe(function(result) {
//           document.getElementById("demoX").innerHTML = "Current X Acceleration:     " + result.X.toFixed(3);
//           document.getElementById("demoY").innerHTML = "Current Y Acceleration:     " + result.Y.toFixed(3);
//           document.getElementById("demoZ").innerHTML = "Current Z Acceleration:     " + result.Z.toFixed(3);
//           }, function() { alert("notSubscribed"); }, "ACCELEROMETER");
//    }

//    // Start swarmlet when the device is ready.
    onDeviceReady: function() {
        var topLevel = instantiateAccessor('MyTopLevel', 'Swarmlet', getAccessorCode);
        topLevel.initialize();
        this.updateStatus('Executing'); // FIXME: handle wrap up
    },

    // Update Status
    updateStatus: function(id) {
        document.getElementById('status').querySelector(".msg").innerHTML = id;
    }
};

app.initialize();
