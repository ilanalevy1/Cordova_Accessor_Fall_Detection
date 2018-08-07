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
this.input('yIn');
this.input('readNow');
}

exports.initialize = function() {
var self = this;
this.addInputHandler("yIn", handle.bind(this));
}

function handle() {
    counter++;
    var y = this.get('yIn');

    counter = counter % 10;
    if (counter == 0)
    {
        //document.getElementById('status').querySelector(".msg").innerHTML = "yAccelTable1_1";
        changeDB(y);
    }
}


function changeDB(y) {

   checkLength(len);

db.transaction(function(tx) {
   tx.executeSql('CREATE TABLE IF NOT EXISTS yAccelTable1_1 (yAccel)');
   tx.executeSql('INSERT INTO yAccelTable1_1 (yAccel) VALUES (?)', [y]);
   tx.executeSql('SELECT * FROM yAccelTable1_1', [], function (tx, results) {
      len = results.rows.length;
      document.getElementById("demoY").innerHTML = y;
      document.getElementById("lenY").innerHTML = len;
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
                tx.executeSql('DELETE FROM yAccelTable1_1 WHERE rowid IN (SELECT rowid FROM yAccelTable1_1 WHERE (yAccel > -100) LIMIT 10)');
        }, function(error) {alert(error.message);}, function(tx){});
}
function loseTable () {
    db.transaction(function(tx) {
                tx.executeSql('DELETE FROM yAccelTable1_1');
        }, function(error) {alert(error.message);}, function(tx){});
}

var sminY;
var smaxY;

function readDB () {
    db.transaction(function(tx){
        tx.executeSql('SELECT * FROM yAccelTable1_1 WHERE rowid IN (SELECT rowid FROM yAccelTable1_1 WHERE (yAccel > -100) LIMIT 20)', [], function (tx, results) {
            sminY = results.rows.item(0).yAccel;
            smaxY = results.rows.item(0).yAccel;

                for (var i = 1; i < results.rows.length; i++){
                    if (sminY > results.rows.item(i).yAccel)
                        sminY = results.rows.item(i).yAccel;
                    if (smaxY < results.rows.item(i).yAccel)
                        smaxY = results.rows.item(i).yAccel;
                    document.getElementById("sminY").innerHTML = sminY;
                    document.getElementById("smaxY").innerHTML = smaxY;
                }
            });
        }, function(error) {
            console.log('Transaction ERROR in read: ' + error.message);
        }, function(tx) {});
}