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
this.input('yIn');
this.input('zIn');
this.input('resIn');
this.input('readNow');


this.output('cvfast');
this.output('smin');
this.output('smax');


//this.input('dataX');

}
var self;
exports.initialize = function() {
self = this;

//this.addInputHandler("timeIn", changeDB.bind(this));
this.addInputHandler("xIn", handle.bind(this));
this.addInputHandler("yIn", handle.bind(this));
this.addInputHandler("zIn", handle.bind(this));
this.addInputHandler("resIn", handle.bind(this));
this.addInputHandler("readNow", readDB.bind(this));

//this.addInputHandler("dataInX", changeDB.bind(this));
//window.setInterval(changeDB.bind(this), 0.5);
}

function handle() {
    counter++;
    var x = this.get('xIn');
    var y = this.get('yIn');
    var z = this.get('zIn');
    var res = this.get('resIn');

    counter = counter % 14;
    if (counter == 0)
    {
        document.getElementById('demoX').innerHTML = "X-Acceleration:      " + x;
        changeDB(x, y, z, res);
        //this.send('readNow', 'go');
    }
}


function changeDB(x, y, z, res) {


db.transaction(function(tx) {
   tx.executeSql('CREATE TABLE IF NOT EXISTS AccelTable1_0 (xAccel, yAccel, zAccel, res)');
   tx.executeSql('INSERT INTO AccelTable1_0 (xAccel, yAccel, zAccel, res) VALUES (?, ?, ?, ?)', [x, y, z, res]);
   tx.executeSql('SELECT * FROM AccelTable1_0', [], function (tx, results) {
      len = results.rows.length;
      //document.getElementById("demoY").innerHTML = results.rows.item(len - 1).xAccel;
      document.getElementById("demoZ").innerHTML = "X-Acceleration:      " + x;
      document.getElementById("timeStamp").innerHTML = "Size of Database (rows):      " + len;
    });
   }, function (error) {console.log('Write ERROR: ' + error.message);}, function(tx) {});

   checkLength(len);
   /*tx.executeSql('CREATE TABLE IF NOT EXISTS DemoTable (ID INTEGER PRIMARY KEY AUTOINCREMENT, ACCEL INTEGER)');
   tx.executeSql('INSERT INTO DemoTable (SCORE) VALUES (?)', [x]);
   tx.executeSql('SELECT * FROM DemoTable', [], function (tx, results) {
      len = results.rows.length;
      document.getElementById("demoY").innerHTML = results.rows.item(len - 1).score;
      document.getElementById("demoZ").innerHTML = x;
      document.getElementById("timeStamp").innerHTML = len;
    });
  }, function(error) {
    console.log('Transaction ERROR: ' + error.message);
  }, function(tx) {});
  //document.getElementById("demoZ").innerHTML = len;
  checkLength(len);
*/

}

function checkLength(len) {
  if (len > 120){
    loseTable();
  }
  else if (len > 100){
    //var i;
    //for(i = len; i > 20; i--)
        loseRow();
        self.send('readNow', 'go');
  }
}

function loseRow () {
    db.transaction(function(tx) {
                tx.executeSql('DELETE FROM AccelTable1_0 WHERE rowid IN (SELECT rowid FROM AccelTable1_0 WHERE (xAccel > -100) LIMIT 10)');
        }, function(error) {alert(error.message);}, function(tx){});
}
function loseTable () {
    db.transaction(function(tx) {
                tx.executeSql('DELETE FROM AccelTable1_0');
        }, function(error) {alert(error.message);}, function(tx){});
}

var sminX;
var smaxX;
var sminY;
var smaxY;
var sminZ;
var smaxZ;
var sminRes;
var smaxRes;

function readDB () {
    db.transaction(function(tx){
        tx.executeSql('SELECT * FROM AccelTable1_0 WHERE rowid IN (SELECT rowid FROM AccelTable1_0 WHERE (xAccel > -100) LIMIT 20)', [], function (tx, results) {
            sminX = results.rows.item(0).xAccel;
            smaxX = results.rows.item(0).xAccel;
            sminY = results.rows.item(0).yAccel;
            smaxY = results.rows.item(0).yAccel;
            sminZ = results.rows.item(0).zAccel;
            smaxZ = results.rows.item(0).zAccel;
            sminRes = results.rows.item(0).res;
            smaxRes = results.rows.item(0).res;


                for (var i = 1; i < results.rows.length; i++){
                    var currentRow = results.rows.item(i);
                    if (sminX > currentRow.xAccel) sminX = currentRow.xAccel;
                    if (smaxX < currentRow.xAccel) smaxX = currentRow.xAccel;
                    if (sminY > currentRow.yAccel) sminY = currentRow.yAccel;
                    if (smaxY < currentRow.yAccel) smaxY = currentRow.yAccel;
                    if (sminZ > currentRow.zAccel) sminZ = currentRow.zAccel;
                    if (smaxZ < currentRow.zAccel) smaxZ = currentRow.zAccel;
                    if (sminRes > currentRow.res) sminRes = currentRow.res;
                    if (smaxRes < currentRow.res) smaxRes = currentRow.res;
                }
                var cvfast = Math.sqrt(((smaxX - sminX) * (smaxX - sminX)) + ((smaxY - sminY) * (smaxY - sminY)) + ((smaxZ - sminZ) * (smaxZ - sminZ)));
                self.send('cvfast', cvfast);
                self.send('smin', sminRes);
                self.send('smax', smaxRes);
                    document.getElementById("sminX").innerHTML = "Smin X:     " + sminX;
                    document.getElementById("smaxX").innerHTML = "Smax X:     " + smaxX;
            });
        }, function(error) {
            console.log('Transaction ERROR in read: ' + error.message);
        }, function(tx) {});
}