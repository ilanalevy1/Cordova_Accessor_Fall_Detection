var db = null;
var counter = 0;
var len = 0;

exports.setup = function() {


    document.addEventListener('deviceready', function() {
      db = window.sqlitePlugin.openDatabase({
        name: 'my.db',
        location: 'default',
      });
    });
this.input('xIn');
this.input('readNow');
//this.input('dataX');

}

exports.initialize = function() {
var self = this;

//this.addInputHandler("timeIn", changeDB.bind(this));
this.addInputHandler("xIn", handle.bind(this));

//this.addInputHandler("dataInX", changeDB.bind(this));
//window.setInterval(changeDB.bind(this), 0.5);
}

function handle() {
    counter++;
    var x = this.get('xIn');

    counter = counter % 10;
    if (counter == 0)
    {
        document.getElementById('status').querySelector(".msg").innerHTML = "xAccelTable1_1";
        changeDB(x);
    }
}


function changeDB(x) {

   checkLength(len);

db.transaction(function(tx) {
   tx.executeSql('CREATE TABLE IF NOT EXISTS xAccelTable1_1 (xAccel)');
   tx.executeSql('INSERT INTO xAccelTable1_1 (xAccel) VALUES (?)', [x]);
   tx.executeSql('SELECT * FROM xAccelTable1_1', [], function (tx, results) {
      len = results.rows.length;
      document.getElementById("demoX").innerHTML = x;
      document.getElementById("lenX").innerHTML = len;
    });
   }, function (error) {console.log('Write ERROR: ' + error.message);}, function(tx) {});
}

function checkLength(len) {
  if (len > 120){
    loseTable();
  }
  else if (len >= 100){
        loseRow();
        readDB();
  }
}

function loseRow () {
    db.transaction(function(tx) {
                tx.executeSql('DELETE FROM xAccelTable1_1 WHERE rowid IN (SELECT rowid FROM xAccelTable1_1 WHERE (xAccel > -100) LIMIT 10)');
        }, function(error) {alert(error.message);}, function(tx){});
}
function loseTable () {
    db.transaction(function(tx) {
                tx.executeSql('DELETE FROM xAccelTable1_1');
        }, function(error) {alert(error.message);}, function(tx){});
}

var sminX;
var smaxX;

function readDB () {
    db.transaction(function(tx){
        tx.executeSql('SELECT * FROM xAccelTable1_1 WHERE rowid IN (SELECT rowid FROM xAccelTable1_1 WHERE (xAccel > -100) LIMIT 20)', [], function (tx, results) {
            sminX = results.rows.item(0).xAccel;
            smaxX = results.rows.item(0).xAccel;

                for (var i = 1; i < results.rows.length; i++){
                    if (sminX > results.rows.item(i).xAccel)
                        sminX = results.rows.item(i).xAccel;
                    if (smaxX < results.rows.item(i).xAccel)
                        smaxX = results.rows.item(i).xAccel;
                    document.getElementById("sminX").innerHTML = sminX;
                    document.getElementById("smaxX").innerHTML = smaxX;
                }
            });
        }, function(error) {
            console.log('Transaction ERROR in read: ' + error.message);
        }, function(tx) {});
}