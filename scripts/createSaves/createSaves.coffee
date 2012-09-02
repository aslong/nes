fs = require('fs')
_  = require('underscore')
argv = require('optimist').argv
exec = require('child_process').exec
path = require('path')
async = require('async')

DEFAULT_SAVE_FILE = "#{__dirname}/32KBsave.sav"

directory = argv.d
console.log "About to build saves directory for the directory: #{directory}"

buildSavesDirectory = () ->
  files = require('findit').sync(directory)

  # Get all the game files
  nesFiles = _.filter(files, (filename) -> filename.toLowerCase().lastIndexOf("\.nes") >= 0)
  
  saves = _.map nesFiles, (filename) -> 
    saveFilePath = "#{filename.replace(directory, "#{directory}/SAVES")}"
    "#{saveFilePath.substr(0, saveFilePath.toLowerCase().lastIndexOf("\.nes"))}.SAV"
  
  console.log("Found #{nesFiles.length} nes games to make saves for")

  async.forEachSeries saves, (filename, callback) ->
    cmd = "mkdir -p #{JSON.stringify(path.dirname(filename))} && cp -n #{DEFAULT_SAVE_FILE} #{JSON.stringify(filename)}"
    exec cmd, (error, stdout, stderr) ->
      console.log("Created save file: #{filename}")
      callback()

buildSavesDirectory()
