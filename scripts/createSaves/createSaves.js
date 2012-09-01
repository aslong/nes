// Generated by CoffeeScript 1.3.3
(function() {
  var DEFAULT_SAVE_FILE, argv, async, buildSavesDirectory, directory, exec, fs, path, _;

  fs = require('fs');

  _ = require('underscore');

  argv = require('optimist').argv;

  exec = require('child_process').exec;

  path = require('path');

  async = require('async');

  DEFAULT_SAVE_FILE = "" + __dirname + "/8KBsave.sav";

  directory = argv.d;

  console.log("About to build saves directory for the directory: " + directory);

  buildSavesDirectory = function() {
    var files, nesFiles, saves;
    files = require('findit').sync(directory);
    nesFiles = _.filter(files, function(filename) {
      return filename.toLowerCase().lastIndexOf("\.nes") >= 0;
    });
    saves = _.map(nesFiles, function(filename) {
      var saveFilePath;
      saveFilePath = "" + (filename.replace(directory, "" + directory + "/SAVES"));
      return "" + (saveFilePath.substr(0, saveFilePath.toLowerCase().lastIndexOf("\.nes"))) + ".SAV";
    });
    console.log("Found " + nesFiles.length + " nes games to make saves for");
    return async.forEachSeries(saves, function(filename, callback) {
      var cmd;
      cmd = "mkdir -p " + (JSON.stringify(path.dirname(filename))) + " && cp -n " + DEFAULT_SAVE_FILE + " " + (JSON.stringify(filename));
      return exec(cmd, function(error, stdout, stderr) {
        console.log("Created save file: " + filename);
        return callback();
      });
    });
  };

  buildSavesDirectory();

}).call(this);