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
this.input('zIn');
this.input('readNow');
}

exports.initialize = function() {
var self = this;
this.addInputHandler("zIn", handle.bind(this));
}

function handle() {
    counter++;
    var z = this.get('zIn');

    counter = counter % 10;
    if (counter == 0)
    {
        //document.getElementById('status').querySelector(".msg").innerHTML = "zAccelTable1_1";
        changeDB(z);
    }
}


function changeDB(z) {

   checkLength(len);

db.transaction(function(tx) {
   tx.executeSql('CREATE TABLE IF NOT EXISTS zAccelTable1_1 (zAccel)');
   tx.executeSql('INSERT INTO zAccelTable1_1 (zAccel) VALUES (?)', [z]);
   tx.executeSql('SELECT * FROM zAccelTable1_1', [], function (tx, results) {
      len = results.rows.length;
      document.getElementById("demoZ").innerHTML = z;
      document.getElementById("lenZ").innerHTML = len;
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
                tx.executeSql('DELETE FROM zAccelTable1_1 WHERE rowid IN (SELECT rowid FROM zAccelTable1_1 WHERE (zAccel > -100) LIMIT 10)');
        }, function(error) {alert(error.message);}, function(tx){});
}
function loseTable () {
    db.transaction(function(tx) {
                tx.executeSql('DELETE FROM zAccelTable1_1');
        }, function(error) {alert(error.message);}, function(tx){});
}

var sminZ;
var smaxZ;

function readDB () {
    db.transaction(function(tx){
        tx.executeSql('SELECT * FROM zAccelTable1_1 WHERE rowid IN (SELECT rowid FROM zAccelTable1_1 WHERE (zAccel > -100) LIMIT 20)', [], function (tx, results) {
            sminZ = results.rows.item(0).zAccel;
            smaxZ = results.rows.item(0).zAccel;

                for (var i = 1; i < results.rows.length; i++){
                    if (sminZ > results.rows.item(i).zAccel)
                        sminZ = results.rows.item(i).zAccel;
                    if (smaxZ < results.rows.item(i).zAccel)
                        smaxZ = results.rows.item(i).zAccel;
                    document.getElementById("sminZ").innerHTML = sminZ;
                    document.getElementById("smaxZ").innerHTML = smaxZ;
                }
            });
        }, function(error) {
            console.log('Transaction ERROR in read: ' + error.message);
        }, function(tx) {});
}