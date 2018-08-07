cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
  {
    "id": "cordova-plugin-msband.MSBand",
    "file": "plugins/cordova-plugin-msband/www/msband.js",
    "pluginId": "cordova-plugin-msband",
    "clobbers": [
      "msband"
    ]
  },
  {
    "id": "cordova-sqlite-storage.SQLitePlugin",
    "file": "plugins/cordova-sqlite-storage/www/SQLitePlugin.js",
    "pluginId": "cordova-sqlite-storage",
    "clobbers": [
      "SQLitePlugin"
    ]
  },
  {
    "id": "cordova-plugin-nano-sqlite.nSQLite",
    "file": "plugins/cordova-plugin-nano-sqlite/plugin.js",
    "pluginId": "cordova-plugin-nano-sqlite",
    "clobbers": [
      "nSQLite"
    ]
  }
];
module.exports.metadata = 
// TOP OF METADATA
{
  "cordova-plugin-msband": "0.0.3",
  "cordova-sqlite-storage": "2.3.0",
  "cordova-plugin-nano-sqlite": "1.3.0",
  "cordova-plugin-whitelist": "1.3.3"
};
// BOTTOM OF METADATA
});