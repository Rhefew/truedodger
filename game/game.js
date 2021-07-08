
var Module;

if (typeof Module === 'undefined') Module = eval('(function() { try { return Module || {} } catch(e) { return {} } })()');

if (!Module.expectedDataFileDownloads) {
  Module.expectedDataFileDownloads = 0;
  Module.finishedDataFileDownloads = 0;
}
Module.expectedDataFileDownloads++;
(function() {
 var loadPackage = function(metadata) {

  var PACKAGE_PATH;
  if (typeof window === 'object') {
    PACKAGE_PATH = window['encodeURIComponent'](window.location.pathname.toString().substring(0, window.location.pathname.toString().lastIndexOf('/')) + '/');
  } else if (typeof location !== 'undefined') {
      // worker
      PACKAGE_PATH = encodeURIComponent(location.pathname.toString().substring(0, location.pathname.toString().lastIndexOf('/')) + '/');
    } else {
      throw 'using preloaded data can only be done on a web page or in a web worker';
    }
    var PACKAGE_NAME = 'game.data';
    var REMOTE_PACKAGE_BASE = 'game.data';
    if (typeof Module['locateFilePackage'] === 'function' && !Module['locateFile']) {
      Module['locateFile'] = Module['locateFilePackage'];
      Module.printErr('warning: you defined Module.locateFilePackage, that has been renamed to Module.locateFile (using your locateFilePackage for now)');
    }
    var REMOTE_PACKAGE_NAME = typeof Module['locateFile'] === 'function' ?
    Module['locateFile'](REMOTE_PACKAGE_BASE) :
    ((Module['filePackagePrefixURL'] || '') + REMOTE_PACKAGE_BASE);

    var REMOTE_PACKAGE_SIZE = metadata.remote_package_size;
    var PACKAGE_UUID = metadata.package_uuid;

    function fetchRemotePackage(packageName, packageSize, callback, errback) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', packageName, true);
      xhr.responseType = 'arraybuffer';
      xhr.onprogress = function(event) {
        var url = packageName;
        var size = packageSize;
        if (event.total) size = event.total;
        if (event.loaded) {
          if (!xhr.addedTotal) {
            xhr.addedTotal = true;
            if (!Module.dataFileDownloads) Module.dataFileDownloads = {};
            Module.dataFileDownloads[url] = {
              loaded: event.loaded,
              total: size
            };
          } else {
            Module.dataFileDownloads[url].loaded = event.loaded;
          }
          var total = 0;
          var loaded = 0;
          var num = 0;
          for (var download in Module.dataFileDownloads) {
            var data = Module.dataFileDownloads[download];
            total += data.total;
            loaded += data.loaded;
            num++;
          }
          total = Math.ceil(total * Module.expectedDataFileDownloads/num);
          if (Module['setStatus']) Module['setStatus']('Downloading data... (' + loaded + '/' + total + ')');
        } else if (!Module.dataFileDownloads) {
          if (Module['setStatus']) Module['setStatus']('Downloading data...');
        }
      };
      xhr.onerror = function(event) {
        throw new Error("NetworkError for: " + packageName);
      }
      xhr.onload = function(event) {
        if (xhr.status == 200 || xhr.status == 304 || xhr.status == 206 || (xhr.status == 0 && xhr.response)) { // file URLs can return 0
          var packageData = xhr.response;
          callback(packageData);
        } else {
          throw new Error(xhr.statusText + " : " + xhr.responseURL);
        }
      };
      xhr.send(null);
    };

    function handleError(error) {
      console.error('package error:', error);
    };

    function runWithFS() {

      function assert(check, msg) {
        if (!check) throw msg + new Error().stack;
      }
      Module['FS_createPath']('D:/projects/games/truedodger', '.git', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git', 'hooks', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git', 'info', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git', 'logs', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/logs', 'refs', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/logs/refs', 'heads', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/logs/refs', 'remotes', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/logs/refs/remotes', 'origin', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git', 'objects', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', '02', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', '03', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', '05', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', '06', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', '07', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', '0a', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', '0b', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', '0e', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', '0f', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', '10', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', '14', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', '15', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', '16', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', '18', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', '19', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', '1a', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', '26', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', '2b', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', '32', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', '34', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', '36', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', '37', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', '38', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', '3e', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', '3f', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', '40', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', '41', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', '43', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', '46', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', '4e', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', '4f', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', '50', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', '52', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', '53', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', '55', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', '56', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', '57', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', '5c', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', '5e', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', '60', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', '61', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', '66', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', '6a', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', '6c', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', '6d', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', '6e', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', '6f', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', '70', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', '75', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', '76', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', '7a', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', '7c', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', '7f', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', '80', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', '81', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', '85', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', '86', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', '87', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', '8a', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', '8b', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', '8d', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', '8e', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', '8f', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', '90', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', '91', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', '96', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', '97', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', '98', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', '99', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', '9a', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', '9c', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', 'a0', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', 'a1', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', 'a7', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', 'a8', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', 'a9', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', 'aa', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', 'ab', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', 'af', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', 'b6', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', 'b7', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', 'b8', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', 'b9', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', 'ba', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', 'bc', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', 'c0', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', 'c1', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', 'c3', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', 'c7', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', 'c9', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', 'cc', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', 'd0', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', 'd3', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', 'd6', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', 'd7', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', 'db', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', 'e2', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', 'e3', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', 'e4', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', 'e6', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', 'e8', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', 'ea', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', 'eb', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', 'ec', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', 'ee', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', 'f2', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', 'f6', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', 'f9', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', 'fa', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', 'fc', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', 'info', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/objects', 'pack', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git', 'refs', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/refs', 'heads', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/refs', 'remotes', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/refs/remotes', 'origin', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/.git/refs', 'tags', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger', '.vscode', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger', 'fonts', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger', 'libraries', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/libraries', 'anim8', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/libraries/anim8', '.git', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/libraries/anim8/.git', 'hooks', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/libraries/anim8/.git', 'info', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/libraries/anim8/.git', 'logs', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/libraries/anim8/.git/logs', 'refs', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/libraries/anim8/.git/logs/refs', 'heads', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/libraries/anim8/.git/logs/refs', 'remotes', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/libraries/anim8/.git/logs/refs/remotes', 'origin', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/libraries/anim8/.git', 'objects', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/libraries/anim8/.git/objects', 'info', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/libraries/anim8/.git/objects', 'pack', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/libraries/anim8/.git', 'refs', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/libraries/anim8/.git/refs', 'heads', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/libraries/anim8/.git/refs', 'remotes', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/libraries/anim8/.git/refs/remotes', 'origin', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/libraries/anim8/.git/refs', 'tags', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/libraries/anim8', 'spec', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/libraries/anim8/spec', 'anim8', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/libraries', 'sti', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/libraries/sti', '.git', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/libraries/sti/.git', 'hooks', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/libraries/sti/.git', 'info', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/libraries/sti/.git', 'logs', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/libraries/sti/.git/logs', 'refs', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/libraries/sti/.git/logs/refs', 'heads', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/libraries/sti/.git/logs/refs', 'remotes', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/libraries/sti/.git/logs/refs/remotes', 'origin', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/libraries/sti/.git', 'objects', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/libraries/sti/.git/objects', 'info', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/libraries/sti/.git/objects', 'pack', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/libraries/sti/.git', 'refs', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/libraries/sti/.git/refs', 'heads', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/libraries/sti/.git/refs', 'remotes', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/libraries/sti/.git/refs/remotes', 'origin', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/libraries/sti/.git/refs', 'tags', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/libraries/sti', 'doc', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/libraries/sti', 'spec', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/libraries/sti', 'sti', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/libraries/sti/sti', 'plugins', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/libraries/sti', 'tests', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/libraries/sti/tests', 'images', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/libraries/sti/tests', 'tmx', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/libraries/sti/tests', 'tsx', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/libraries/sti', 'tutorials', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/libraries/sti/tutorials', 'img', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/libraries', 'windfield', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/libraries/windfield', '.git', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/libraries/windfield/.git', 'hooks', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/libraries/windfield/.git', 'info', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/libraries/windfield/.git', 'logs', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/libraries/windfield/.git/logs', 'refs', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/libraries/windfield/.git/logs/refs', 'heads', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/libraries/windfield/.git/logs/refs', 'remotes', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/libraries/windfield/.git/logs/refs/remotes', 'origin', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/libraries/windfield/.git', 'objects', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/libraries/windfield/.git/objects', 'info', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/libraries/windfield/.git/objects', 'pack', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/libraries/windfield/.git', 'refs', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/libraries/windfield/.git/refs', 'heads', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/libraries/windfield/.git/refs', 'remotes', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/libraries/windfield/.git/refs/remotes', 'origin', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/libraries/windfield/.git/refs', 'tags', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/libraries/windfield', 'windfield', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/libraries/windfield/windfield', 'mlib', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger', 'maps', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger/maps', 'terrain', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger', 'music', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger', 'sprites', true, true);
      Module['FS_createPath']('D:/projects/games/truedodger', 'tiles', true, true);

      function DataRequest(start, end, crunched, audio) {
        this.start = start;
        this.end = end;
        this.crunched = crunched;
        this.audio = audio;
      }
      DataRequest.prototype = {
        requests: {},
        open: function(mode, name) {
          this.name = name;
          this.requests[name] = this;
          Module['addRunDependency']('fp ' + this.name);
        },
        send: function() {},
        onload: function() {
          var byteArray = this.byteArray.subarray(this.start, this.end);

          this.finish(byteArray);

        },
        finish: function(byteArray) {
          var that = this;

        Module['FS_createDataFile'](this.name, null, byteArray, true, true, true); // canOwn this data in the filesystem, it is a slide into the heap that will never change
        Module['removeRunDependency']('fp ' + that.name);

        this.requests[this.name] = null;
      }
    };

    var files = metadata.files;
    for (i = 0; i < files.length; ++i) {
      new DataRequest(files[i].start, files[i].end, files[i].crunched, files[i].audio).open('GET', files[i].filename);
    }


    var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    var IDB_RO = "readonly";
    var IDB_RW = "readwrite";
    var DB_NAME = "EM_PRELOAD_CACHE";
    var DB_VERSION = 1;
    var METADATA_STORE_NAME = 'METADATA';
    var PACKAGE_STORE_NAME = 'PACKAGES';
    function openDatabase(callback, errback) {
      try {
        var openRequest = indexedDB.open(DB_NAME, DB_VERSION);
      } catch (e) {
        return errback(e);
      }
      openRequest.onupgradeneeded = function(event) {
        var db = event.target.result;

        if(db.objectStoreNames.contains(PACKAGE_STORE_NAME)) {
          db.deleteObjectStore(PACKAGE_STORE_NAME);
        }
        var packages = db.createObjectStore(PACKAGE_STORE_NAME);

        if(db.objectStoreNames.contains(METADATA_STORE_NAME)) {
          db.deleteObjectStore(METADATA_STORE_NAME);
        }
        var metadata = db.createObjectStore(METADATA_STORE_NAME);
      };
      openRequest.onsuccess = function(event) {
        var db = event.target.result;
        callback(db);
      };
      openRequest.onerror = function(error) {
        errback(error);
      };
    };

    /* Check if there's a cached package, and if so whether it's the latest available */
    function checkCachedPackage(db, packageName, callback, errback) {
      var transaction = db.transaction([METADATA_STORE_NAME], IDB_RO);
      var metadata = transaction.objectStore(METADATA_STORE_NAME);

      var getRequest = metadata.get("metadata/" + packageName);
      getRequest.onsuccess = function(event) {
        var result = event.target.result;
        if (!result) {
          return callback(false);
        } else {
          return callback(PACKAGE_UUID === result.uuid);
        }
      };
      getRequest.onerror = function(error) {
        errback(error);
      };
    };

    function fetchCachedPackage(db, packageName, callback, errback) {
      var transaction = db.transaction([PACKAGE_STORE_NAME], IDB_RO);
      var packages = transaction.objectStore(PACKAGE_STORE_NAME);

      var getRequest = packages.get("package/" + packageName);
      getRequest.onsuccess = function(event) {
        var result = event.target.result;
        callback(result);
      };
      getRequest.onerror = function(error) {
        errback(error);
      };
    };

    function cacheRemotePackage(db, packageName, packageData, packageMeta, callback, errback) {
      var transaction_packages = db.transaction([PACKAGE_STORE_NAME], IDB_RW);
      var packages = transaction_packages.objectStore(PACKAGE_STORE_NAME);

      var putPackageRequest = packages.put(packageData, "package/" + packageName);
      putPackageRequest.onsuccess = function(event) {
        var transaction_metadata = db.transaction([METADATA_STORE_NAME], IDB_RW);
        var metadata = transaction_metadata.objectStore(METADATA_STORE_NAME);
        var putMetadataRequest = metadata.put(packageMeta, "metadata/" + packageName);
        putMetadataRequest.onsuccess = function(event) {
          callback(packageData);
        };
        putMetadataRequest.onerror = function(error) {
          errback(error);
        };
      };
      putPackageRequest.onerror = function(error) {
        errback(error);
      };
    };

    function processPackageData(arrayBuffer) {
      Module.finishedDataFileDownloads++;
      assert(arrayBuffer, 'Loading data file failed.');
      assert(arrayBuffer instanceof ArrayBuffer, 'bad input to processPackageData');
      var byteArray = new Uint8Array(arrayBuffer);
      var curr;

        // copy the entire loaded file into a spot in the heap. Files will refer to slices in that. They cannot be freed though
        // (we may be allocating before malloc is ready, during startup).
        if (Module['SPLIT_MEMORY']) Module.printErr('warning: you should run the file packager with --no-heap-copy when SPLIT_MEMORY is used, otherwise copying into the heap may fail due to the splitting');
        var ptr = Module['getMemory'](byteArray.length);
        Module['HEAPU8'].set(byteArray, ptr);
        DataRequest.prototype.byteArray = Module['HEAPU8'].subarray(ptr, ptr+byteArray.length);

        var files = metadata.files;
        for (i = 0; i < files.length; ++i) {
          DataRequest.prototype.requests[files[i].filename].onload();
        }
        Module['removeRunDependency']('datafile_game.data');

      };
      Module['addRunDependency']('datafile_game.data');

      if (!Module.preloadResults) Module.preloadResults = {};

      function preloadFallback(error) {
        console.error(error);
        console.error('falling back to default preload behavior');
        fetchRemotePackage(REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE, processPackageData, handleError);
      };

      openDatabase(
        function(db) {
          checkCachedPackage(db, PACKAGE_PATH + PACKAGE_NAME,
            function(useCached) {
              Module.preloadResults[PACKAGE_NAME] = {fromCache: useCached};
              if (useCached) {
                console.info('loading ' + PACKAGE_NAME + ' from cache');
                fetchCachedPackage(db, PACKAGE_PATH + PACKAGE_NAME, processPackageData, preloadFallback);
              } else {
                console.info('loading ' + PACKAGE_NAME + ' from remote');
                fetchRemotePackage(REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE,
                  function(packageData) {
                    cacheRemotePackage(db, PACKAGE_PATH + PACKAGE_NAME, packageData, {uuid:PACKAGE_UUID}, processPackageData,
                      function(error) {
                        console.error(error);
                        processPackageData(packageData);
                      });
                  }
                  , preloadFallback);
              }
            }
            , preloadFallback);
        }
        , preloadFallback);

      if (Module['setStatus']) Module['setStatus']('Downloading...');

    }
    if (Module['calledRun']) {
      runWithFS();
    } else {
      if (!Module['preRun']) Module['preRun'] = [];
      Module["preRun"].push(runWithFS); // FS is not initialized yet, wait for it
    }

  }
  loadPackage({"package_uuid":"f5fc2cac-f438-446e-bb45-40845ea66113","remote_package_size":16746245,"files":[{"filename":"D:\\projects\\games\\truedodger\\.git\\COMMIT_EDITMSG","crunched":0,"start":0,"end":29,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\config","crunched":0,"start":29,"end":269,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\description","crunched":0,"start":269,"end":342,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\HEAD","crunched":0,"start":342,"end":365,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\hooks\\applypatch-msg.sample","crunched":0,"start":365,"end":843,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\hooks\\commit-msg.sample","crunched":0,"start":843,"end":1739,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\hooks\\fsmonitor-watchman.sample","crunched":0,"start":1739,"end":6394,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\hooks\\post-update.sample","crunched":0,"start":6394,"end":6583,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\hooks\\pre-applypatch.sample","crunched":0,"start":6583,"end":7007,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\hooks\\pre-commit.sample","crunched":0,"start":7007,"end":8650,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\hooks\\pre-merge-commit.sample","crunched":0,"start":8650,"end":9066,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\hooks\\pre-push.sample","crunched":0,"start":9066,"end":10440,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\hooks\\pre-rebase.sample","crunched":0,"start":10440,"end":15338,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\hooks\\pre-receive.sample","crunched":0,"start":15338,"end":15882,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\hooks\\prepare-commit-msg.sample","crunched":0,"start":15882,"end":17374,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\hooks\\push-to-checkout.sample","crunched":0,"start":17374,"end":20157,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\hooks\\update.sample","crunched":0,"start":20157,"end":23807,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\index","crunched":0,"start":23807,"end":28125,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\info\\exclude","crunched":0,"start":28125,"end":28365,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\logs\\HEAD","crunched":0,"start":28365,"end":30314,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\logs\\refs\\heads\\master","crunched":0,"start":30314,"end":32263,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\logs\\refs\\remotes\\origin\\master","crunched":0,"start":32263,"end":33663,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\02\\83b47c9c73b89d90f01f3b29d1d9397f21bfcd","crunched":0,"start":33663,"end":40231,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\03\\68f5b9a56bc136cc8840e40e8e78c843449df1","crunched":0,"start":40231,"end":41027,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\05\\31c6b1f085920812d316434149d91b32bf40c8","crunched":0,"start":41027,"end":42947,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\05\\e312d41e3c487d221734e21b34c2e5c6163e71","crunched":0,"start":42947,"end":43243,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\06\\cb96f3b16eabddb2d48eb173eb42edf88de280","crunched":0,"start":43243,"end":48022,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\07\\f1ce5723805c12d4bb4bd4b948503be3fb29e6","crunched":0,"start":48022,"end":59011,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\0a\\1c20e93717909b385f2bb7a04ee52b10b9420c","crunched":0,"start":59011,"end":60931,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\0a\\9bbf56e440986ab7a0ae5057f5860fcd839ce0","crunched":0,"start":60931,"end":62366,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\0b\\cec4514b906b6588b3dce7085cd01d7d501cc3","crunched":0,"start":62366,"end":63452,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\0e\\7a9a4a79871bb713d1e1d1ca34586922aaf522","crunched":0,"start":63452,"end":63696,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\0f\\6a55e968366e79ab1a1d20eeedca9dfb8e745d","crunched":0,"start":63696,"end":64412,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\10\\0ff85b402ddd952ee14f0fd4e899ac7ee1fd3b","crunched":0,"start":64412,"end":4963984,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\10\\8aae0422208c8c0a04b72e540c78a6410cdfbf","crunched":0,"start":4963984,"end":4975180,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\14\\30cc0459dc6843288beadc79adbf6364c8329b","crunched":0,"start":4975180,"end":4975387,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\14\\d8fa187fc27890e76969d8f225305c89d17e27","crunched":0,"start":4975387,"end":4975560,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\15\\0cc6addaeb8ff3b4bef90eadb0f95f5bbe99f1","crunched":0,"start":4975560,"end":4976227,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\16\\a22884552d2b853026d1009a4a4872a38e3770","crunched":0,"start":4976227,"end":4980433,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\18\\f39971ff40d737d7364e1c54f56b98d62b5d64","crunched":0,"start":4980433,"end":4990748,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\19\\94aae2f334eb55c3bfb2c200b8134210616cf8","crunched":0,"start":4990748,"end":4990919,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\1a\\ca84feb75d4b852db3b349edf7edefa83c9fee","crunched":0,"start":4990919,"end":4991127,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\26\\52667e3be228090c39411884880e3b64685704","crunched":0,"start":4991127,"end":4991616,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\2b\\dea9c9122d799be2c258e69b8dbb4971ec09f7","crunched":0,"start":4991616,"end":4992991,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\32\\cecc1d95f278bdfe029e798085af192f669fa5","crunched":0,"start":4992991,"end":4993231,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\34\\5bcdde73c209d10702e90204c54594914538f7","crunched":0,"start":4993231,"end":5000354,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\36\\1673bc0211acdba260d6f6b5fbdc28a8aa6c0f","crunched":0,"start":5000354,"end":5029009,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\37\\88a86e48f4524dbb35783bd6cc78259ff8beb3","crunched":0,"start":5029009,"end":5029184,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\37\\f65c8dfd8f344f1965d21294d564024a209f1d","crunched":0,"start":5029184,"end":5039640,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\38\\f222f7fe358954d5938653cf0f2c5ec433faac","crunched":0,"start":5039640,"end":5046177,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\3e\\9fb50a2b123a5b047b392bcec1575a418e72f2","crunched":0,"start":5046177,"end":5046247,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\3f\\ee1fe5e8ba80c7a4bca8623fda513c45248f35","crunched":0,"start":5046247,"end":5046762,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\40\\b3ded2bb5f9556911b88c4978f05714dbe2840","crunched":0,"start":5046762,"end":5057303,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\41\\ceb1f3a4161ebc2b0e4ec3fdf609d014dc847a","crunched":0,"start":5057303,"end":5058701,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\43\\8bd3c5ed35ec4037379685e44f4d505f72a32f","crunched":0,"start":5058701,"end":5059072,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\46\\1746a2edf3b54aae56c18c55c9286176ad77b8","crunched":0,"start":5059072,"end":5061813,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\4e\\aeb1fe13e91f7fee8dd060b6c18740705b60bc","crunched":0,"start":5061813,"end":5182452,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\4e\\b835a87ce315c0785919643b33766a6c0a87e9","crunched":0,"start":5182452,"end":5184020,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\4f\\4f9c7ebdb23e95cdd9d295b0dcd99bc1f77807","crunched":0,"start":5184020,"end":5184340,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\50\\2b4c13be42aa9ca1e6be8e8847eaf19e903b7c","crunched":0,"start":5184340,"end":5190808,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\52\\ae08ea4e1e7cf606ab61c0102649efb0921882","crunched":0,"start":5190808,"end":5190941,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\53\\29fed97d233c2d85beef4586fce5954b30a323","crunched":0,"start":5190941,"end":5192742,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\55\\428307af8357ee383b18964bb8923d18cf58cd","crunched":0,"start":5192742,"end":5192794,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\56\\440a58d7eccd50e9ff6550a8125ffe8f6ee96c","crunched":0,"start":5192794,"end":5192998,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\57\\59c319e2d31b24d15bd2d588e40b74f57d9c36","crunched":0,"start":5192998,"end":5197708,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\5c\\01e0bd4ee7fe07f974be00ad46fc471580051c","crunched":0,"start":5197708,"end":5206342,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\5c\\110f1d54f9ae007dde6d64f4f8ceb28edd8700","crunched":0,"start":5206342,"end":5207122,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\5c\\4465d60332316b2793a80dbd0cf21ad79b1d20","crunched":0,"start":5207122,"end":5207246,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\5e\\1ef660465bf402d746624c691d4bd6b85af785","crunched":0,"start":5207246,"end":5207429,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\60\\c5c3251c9b697a6ad919f72e406c86a191918e","crunched":0,"start":5207429,"end":5207610,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\60\\f95186f97623467376d4900c9ad0c8bedcf9a0","crunched":0,"start":5207610,"end":5207817,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\61\\e493e4fdedd88c8e246a14f1e8346d003b766c","crunched":0,"start":5207817,"end":5216539,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\66\\641c15c6e48f6e233d68206f10f13064ffae9a","crunched":0,"start":5216539,"end":5518569,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\6a\\d182d3344357a656f4d539ed831aa39719b45c","crunched":0,"start":5518569,"end":5519755,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\6c\\1a32adc1d52b601824a93df6ebdbfdea7ad5ef","crunched":0,"start":5519755,"end":5519928,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\6d\\cdfaae84768037e8ed2bd69cc65b29fbf58300","crunched":0,"start":5519928,"end":5520038,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\6d\\e2421971ab314e6d16b1711fcb022b6c2b2719","crunched":0,"start":5520038,"end":5522994,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\6e\\244b99281d24dbb6ecc20aab829635c43eeab4","crunched":0,"start":5522994,"end":5932993,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\6f\\3b6a1f5224a22d82858da7cd07d98a68ab3de6","crunched":0,"start":5932993,"end":5951083,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\70\\912e646eedb2d14f78ae3f077686b6dc064261","crunched":0,"start":5951083,"end":5953890,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\75\\c1c81e60fe5d62c85d9e9f9b2cf16755c3544c","crunched":0,"start":5953890,"end":6083853,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\76\\c684bbe6e9b38d369140d346d77df378ca07ef","crunched":0,"start":6083853,"end":6094919,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\7a\\9dfa044d022f5ca8cf9191e37fef926dd67f77","crunched":0,"start":6094919,"end":6095226,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\7c\\4e104624c100c107dd42c9d0146ab6d9519919","crunched":0,"start":6095226,"end":6095520,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\7f\\d3e1eab5d2d63fa709966343a4679117701760","crunched":0,"start":6095520,"end":6098249,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\80\\ae3bbfbf4fe7a4711ec56a128280bc0642a673","crunched":0,"start":6098249,"end":6105669,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\81\\f353750adefd526030385ff8f013052103d507","crunched":0,"start":6105669,"end":6108989,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\85\\400d65c385cfd3f0c61d9d97acdf6ef0628e77","crunched":0,"start":6108989,"end":6118190,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\86\\ee40317be5063078e5e605bf0bd687e5c719fd","crunched":0,"start":6118190,"end":6127361,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\87\\47bf591b0d0f0c92fad6c33274b8cc8d64ae0e","crunched":0,"start":6127361,"end":6138046,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\8a\\593cc0e12790da7dd69a0d41682b682583e3c5","crunched":0,"start":6138046,"end":6146828,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\8b\\60d03464ebb8f619c94a908708d3b5850547bb","crunched":0,"start":6146828,"end":6220642,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\8d\\6ec0accc1500b956ad09977f60de3e080b76ed","crunched":0,"start":6220642,"end":6222230,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\8e\\09009479794422b3afcbc86ef2ce909d267542","crunched":0,"start":6222230,"end":6233775,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\8f\\11c6e9921de01761f36dd1316b9ab05bd3ab13","crunched":0,"start":6233775,"end":6240216,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\8f\\ba010b7db6e36bf98ce42461a17174207ccb48","crunched":0,"start":6240216,"end":6248609,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\90\\56e8c22f6055205c0475500d5d4493a5978477","crunched":0,"start":6248609,"end":6248774,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\90\\9b2b125b4a2586bfc85287549e32ade942ec3f","crunched":0,"start":6248774,"end":6253666,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\90\\be5c26c7bbf6cb1baf5760e64a3c5d6320b17c","crunched":0,"start":6253666,"end":6253942,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\90\\f0204f702c18fa6abb832b033fbf67ff24e30a","crunched":0,"start":6253942,"end":6256775,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\91\\58a0372022b7dd472845717d58b97bdf26ba3c","crunched":0,"start":6256775,"end":6258211,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\96\\28d6d8df9ec9b55e9144a4dd6c4cdc11468171","crunched":0,"start":6258211,"end":6261294,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\96\\5586d717018997303cc173d4c88b65f0e1acdc","crunched":0,"start":6261294,"end":6262673,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\96\\971688be5300dfc7002a9f0a40133f030d5bff","crunched":0,"start":6262673,"end":6264322,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\96\\9f7d8f1b78e1596bfd84f73a8779c6ce9bf532","crunched":0,"start":6264322,"end":6265409,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\97\\98b99b18a3049a2c4b190362c47a5968aa0d6b","crunched":0,"start":6265409,"end":6266872,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\97\\a09320bbbb9949279d9fa54f49e1116ade43aa","crunched":0,"start":6266872,"end":6276262,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\97\\f626f4d97adec26414f0b37c1f9b50d8cd4178","crunched":0,"start":6276262,"end":6277043,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\98\\044e935e515b6b7c5eb562ea880a7b7dc5179c","crunched":0,"start":6277043,"end":6303443,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\99\\a4ee62ef84f51569f2d798b8917dea603b6dc6","crunched":0,"start":6303443,"end":6310471,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\99\\b0317af288d29a6d70a2c59a5c799faebeff85","crunched":0,"start":6310471,"end":6319679,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\9a\\73fb4d0eb95b827af22f63887ea318fdb805a0","crunched":0,"start":6319679,"end":6329443,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\9c\\081db24f8879c675070282605c28f7d41286c1","crunched":0,"start":6329443,"end":6329640,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\9c\\5af6ce5761380819715733a6dc80b38f28cc4f","crunched":0,"start":6329640,"end":6329806,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\a0\\9172bad21b0922b300df724cc75ffa9a8df8b6","crunched":0,"start":6329806,"end":6329943,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\a0\\a568890ec732e8842c174b489fef718f8070eb","crunched":0,"start":6329943,"end":6332795,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\a1\\878b53971e6ac052b48ff6af1d796491b67f83","crunched":0,"start":6332795,"end":6551887,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\a7\\7d3a551d2a4d89908e0201cd8e1024af3dc6eb","crunched":0,"start":6551887,"end":6552853,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\a8\\d0e2320ba13529a7d6d780c82fda0ad2b5106c","crunched":0,"start":6552853,"end":6552911,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\a8\\d202c959dbecb4f8a1db00ce1ac72c0055a2ca","crunched":0,"start":6552911,"end":6561812,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\a9\\1de07f38fe06ec0d977cd9214af9931ff41b8b","crunched":0,"start":6561812,"end":6564321,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\aa\\2dbed32726cf92c7d84bf9085632751e49e764","crunched":0,"start":6564321,"end":6564560,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\ab\\09607679ccb7a20f0c93de70658826fd2e6dd5","crunched":0,"start":6564560,"end":6565272,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\af\\47e8a236a081526cb33364de309c1e549a2eaa","crunched":0,"start":6565272,"end":6574666,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\b6\\d09e28cc03a475c52f9a0328791c0ca89b32b4","crunched":0,"start":6574666,"end":6586915,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\b7\\d269a7f3c2aab108452092eb5f7c2235d8b82e","crunched":0,"start":6586915,"end":6595772,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\b8\\7d173d655d406a4fdc315528c64aaa5e20d20d","crunched":0,"start":6595772,"end":6595861,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\b9\\9568f5ecdf406a00091e8cb472936bbddf6811","crunched":0,"start":6595861,"end":6596601,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\ba\\4f8f06bb534471036e9085917e8ed84f1cbdd3","crunched":0,"start":6596601,"end":6596897,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\bc\\ed842fdd0bedae3208568d9ea225a5a0a91915","crunched":0,"start":6596897,"end":6667420,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\c0\\8490dd0b9abba45e320e454d06b414a357d985","crunched":0,"start":6667420,"end":6668154,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\c1\\07711aa6ad9f900d3d97233ad28423bb3e4de8","crunched":0,"start":6668154,"end":6696685,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\c3\\e74b7bca9b0d30236b2e19b9fe5a6c32ce6727","crunched":0,"start":6696685,"end":6697226,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\c7\\d2febdf58eb45b3811fc8c8afb3def2d549bc1","crunched":0,"start":6697226,"end":6699221,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\c9\\631ded03b797090e6d0ce385964f6ee7ecf1fa","crunched":0,"start":6699221,"end":6699385,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\cc\\90956d3404ef752e9197b4c82cd43d863e0c3b","crunched":0,"start":6699385,"end":6699872,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\d0\\51b4627e51364f080aea6a7f7c8d1183124f39","crunched":0,"start":6699872,"end":6709036,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\d3\\7c5129b6e94911b4de53ee8723aa05dc3c4a01","crunched":0,"start":6709036,"end":6710109,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\d3\\8e7b5b112d750d233620bafea0d59e1332b539","crunched":0,"start":6710109,"end":6710198,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\d6\\2aa310344b39d5ca3b7cb8bea4c01ff5276481","crunched":0,"start":6710198,"end":6710457,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\d6\\78345bd2d39b490b598f46ea24bd15302b9165","crunched":0,"start":6710457,"end":6711573,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\d6\\a34b8baf84aae4d174388140a874a13af084dc","crunched":0,"start":6711573,"end":6711625,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\d7\\324eee64df88713bbcd95411f454fc23125fd1","crunched":0,"start":6711625,"end":6720347,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\db\\fc5822a55119afb0fdcf2db5d59aa603df1f20","crunched":0,"start":6720347,"end":6720552,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\e2\\13d22ddca3fd83230219976b6d7e8605ce7c13","crunched":0,"start":6720552,"end":6720878,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\e3\\a60c71cd7d58a4347e9f42c55ec5557e368e98","crunched":0,"start":6720878,"end":6721056,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\e3\\ba833b92a00d13fa91daa29a5a3e09052b62ed","crunched":0,"start":6721056,"end":6723241,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\e3\\fb0aaa5b6740380188a2cd2cd3a34588aefa78","crunched":0,"start":6723241,"end":6723445,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\e4\\b2a73833a3de9ec8f0b547c03bfd5b15242054","crunched":0,"start":6723445,"end":6733930,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\e6\\92d2721d2e778ac10eb5e63454dc573f99dcf5","crunched":0,"start":6733930,"end":6734115,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\e8\\92555a5cb72c084a511e5ac0c2af205fb70a68","crunched":0,"start":6734115,"end":6734262,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\ea\\fd122f2f37cc471b88ac616fc5270377742bec","crunched":0,"start":6734262,"end":6734557,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\eb\\52695fafcb47f271ae250c2e55cd8c3f67ca38","crunched":0,"start":6734557,"end":6734903,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\ec\\76263583cc830d8fdaa13e1f89acf819ded122","crunched":0,"start":6734903,"end":6735275,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\ee\\4c4253e1e54390da4daf053df565d95044806e","crunched":0,"start":6735275,"end":6735570,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\f2\\5c0c71286ac1c5dbce3f2c01a1d78d19e05e37","crunched":0,"start":6735570,"end":6743006,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\f6\\06d22f6820e5fa63250f225d2542e0e19d70f1","crunched":0,"start":6743006,"end":6743734,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\f9\\3ef50ab5ad609b26c616e2a686bfa2b58aa585","crunched":0,"start":6743734,"end":6751143,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\fa\\1d794b95eb08e9b7e1e75be3aa0931acbd41ec","crunched":0,"start":6751143,"end":6751349,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\objects\\fc\\57815088ca88e24b57bc580790806f26bc1592","crunched":0,"start":6751349,"end":6756377,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\refs\\heads\\master","crunched":0,"start":6756377,"end":6756418,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.git\\refs\\remotes\\origin\\master","crunched":0,"start":6756418,"end":6756459,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.vscode\\launch.json","crunched":0,"start":6756459,"end":6756961,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\.vscode\\settings.json","crunched":0,"start":6756961,"end":6757020,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\enemies.lua","crunched":0,"start":6757020,"end":6759309,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\fonts\\ps2p.ttf","crunched":0,"start":6759309,"end":6841789,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\anim8\\.git\\config","crunched":0,"start":6841789,"end":6842082,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\anim8\\.git\\description","crunched":0,"start":6842082,"end":6842155,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\anim8\\.git\\HEAD","crunched":0,"start":6842155,"end":6842178,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\anim8\\.git\\hooks\\applypatch-msg.sample","crunched":0,"start":6842178,"end":6842656,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\anim8\\.git\\hooks\\commit-msg.sample","crunched":0,"start":6842656,"end":6843552,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\anim8\\.git\\hooks\\fsmonitor-watchman.sample","crunched":0,"start":6843552,"end":6848207,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\anim8\\.git\\hooks\\post-update.sample","crunched":0,"start":6848207,"end":6848396,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\anim8\\.git\\hooks\\pre-applypatch.sample","crunched":0,"start":6848396,"end":6848820,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\anim8\\.git\\hooks\\pre-commit.sample","crunched":0,"start":6848820,"end":6850463,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\anim8\\.git\\hooks\\pre-merge-commit.sample","crunched":0,"start":6850463,"end":6850879,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\anim8\\.git\\hooks\\pre-push.sample","crunched":0,"start":6850879,"end":6852253,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\anim8\\.git\\hooks\\pre-rebase.sample","crunched":0,"start":6852253,"end":6857151,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\anim8\\.git\\hooks\\pre-receive.sample","crunched":0,"start":6857151,"end":6857695,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\anim8\\.git\\hooks\\prepare-commit-msg.sample","crunched":0,"start":6857695,"end":6859187,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\anim8\\.git\\hooks\\push-to-checkout.sample","crunched":0,"start":6859187,"end":6861970,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\anim8\\.git\\hooks\\update.sample","crunched":0,"start":6861970,"end":6865620,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\anim8\\.git\\index","crunched":0,"start":6865620,"end":6866400,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\anim8\\.git\\info\\exclude","crunched":0,"start":6866400,"end":6866640,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\anim8\\.git\\logs\\HEAD","crunched":0,"start":6866640,"end":6866822,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\anim8\\.git\\logs\\refs\\heads\\master","crunched":0,"start":6866822,"end":6867004,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\anim8\\.git\\logs\\refs\\remotes\\origin\\HEAD","crunched":0,"start":6867004,"end":6867186,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\anim8\\.git\\objects\\pack\\pack-0038d44b3b948af42926f4523035fc3f49564b9f.idx","crunched":0,"start":6867186,"end":6878562,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\anim8\\.git\\objects\\pack\\pack-0038d44b3b948af42926f4523035fc3f49564b9f.pack","crunched":0,"start":6878562,"end":7998924,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\anim8\\.git\\packed-refs","crunched":0,"start":7998924,"end":8000217,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\anim8\\.git\\refs\\heads\\master","crunched":0,"start":8000217,"end":8000258,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\anim8\\.git\\refs\\remotes\\origin\\HEAD","crunched":0,"start":8000258,"end":8000290,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\anim8\\.travis.yml","crunched":0,"start":8000290,"end":8001049,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\anim8\\anim8.lua","crunched":0,"start":8001049,"end":8009843,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\anim8\\CHANGELOG.md","crunched":0,"start":8009843,"end":8010469,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\anim8\\MIT-LICENSE.txt","crunched":0,"start":8010469,"end":8011553,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\anim8\\README.md","crunched":0,"start":8011553,"end":8022502,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\anim8\\spec\\anim8\\animation_spec.lua","crunched":0,"start":8022502,"end":8031687,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\anim8\\spec\\anim8\\grid_spec.lua","crunched":0,"start":8031687,"end":8036668,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\anim8\\spec\\love-mocks.lua","crunched":0,"start":8036668,"end":8037407,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\show.lua","crunched":0,"start":8037407,"end":8041015,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\sti\\.git\\config","crunched":0,"start":8041015,"end":8041331,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\sti\\.git\\description","crunched":0,"start":8041331,"end":8041404,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\sti\\.git\\HEAD","crunched":0,"start":8041404,"end":8041427,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\sti\\.git\\hooks\\applypatch-msg.sample","crunched":0,"start":8041427,"end":8041905,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\sti\\.git\\hooks\\commit-msg.sample","crunched":0,"start":8041905,"end":8042801,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\sti\\.git\\hooks\\fsmonitor-watchman.sample","crunched":0,"start":8042801,"end":8047456,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\sti\\.git\\hooks\\post-update.sample","crunched":0,"start":8047456,"end":8047645,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\sti\\.git\\hooks\\pre-applypatch.sample","crunched":0,"start":8047645,"end":8048069,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\sti\\.git\\hooks\\pre-commit.sample","crunched":0,"start":8048069,"end":8049712,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\sti\\.git\\hooks\\pre-merge-commit.sample","crunched":0,"start":8049712,"end":8050128,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\sti\\.git\\hooks\\pre-push.sample","crunched":0,"start":8050128,"end":8051502,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\sti\\.git\\hooks\\pre-rebase.sample","crunched":0,"start":8051502,"end":8056400,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\sti\\.git\\hooks\\pre-receive.sample","crunched":0,"start":8056400,"end":8056944,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\sti\\.git\\hooks\\prepare-commit-msg.sample","crunched":0,"start":8056944,"end":8058436,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\sti\\.git\\hooks\\push-to-checkout.sample","crunched":0,"start":8058436,"end":8061219,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\sti\\.git\\hooks\\update.sample","crunched":0,"start":8061219,"end":8064869,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\sti\\.git\\index","crunched":0,"start":8064869,"end":8068224,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\sti\\.git\\info\\exclude","crunched":0,"start":8068224,"end":8068464,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\sti\\.git\\logs\\HEAD","crunched":0,"start":8068464,"end":8068669,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\sti\\.git\\logs\\refs\\heads\\master","crunched":0,"start":8068669,"end":8068874,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\sti\\.git\\logs\\refs\\remotes\\origin\\HEAD","crunched":0,"start":8068874,"end":8069079,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\sti\\.git\\objects\\pack\\pack-8aa9db7f8e4afa9b9e71196a989415ff6c5a8dc4.idx","crunched":0,"start":8069079,"end":8121923,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\sti\\.git\\objects\\pack\\pack-8aa9db7f8e4afa9b9e71196a989415ff6c5a8dc4.pack","crunched":0,"start":8121923,"end":10387379,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\sti\\.git\\packed-refs","crunched":0,"start":10387379,"end":10395951,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\sti\\.git\\refs\\heads\\master","crunched":0,"start":10395951,"end":10395992,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\sti\\.git\\refs\\remotes\\origin\\HEAD","crunched":0,"start":10395992,"end":10396024,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\sti\\CHANGELOG.md","crunched":0,"start":10396024,"end":10411420,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\sti\\doc\\config.ld","crunched":0,"start":10411420,"end":10411705,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\sti\\LICENSE.md","crunched":0,"start":10411705,"end":10413035,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\sti\\main.lua","crunched":0,"start":10413035,"end":10415104,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\sti\\README.md","crunched":0,"start":10415104,"end":10418071,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\sti\\spec\\map_spec.lua","crunched":0,"start":10418071,"end":10420603,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\sti\\sti\\graphics.lua","crunched":0,"start":10420603,"end":10422830,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\sti\\sti\\init.lua","crunched":0,"start":10422830,"end":10466157,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\sti\\sti\\plugins\\box2d.lua","crunched":0,"start":10466157,"end":10476215,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\sti\\sti\\plugins\\bump.lua","crunched":0,"start":10476215,"end":10482185,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\sti\\sti\\utils.lua","crunched":0,"start":10482185,"end":10487272,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\sti\\tests\\hex.lua","crunched":0,"start":10487272,"end":10491235,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\sti\\tests\\images\\grid.png","crunched":0,"start":10491235,"end":10496686,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\sti\\tests\\images\\hale_may_320.png","crunched":0,"start":10496686,"end":10551498,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\sti\\tests\\images\\hex1.png","crunched":0,"start":10551498,"end":10562008,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\sti\\tests\\images\\iso.png","crunched":0,"start":10562008,"end":10575762,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\sti\\tests\\iso.lua","crunched":0,"start":10575762,"end":10579548,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\sti\\tests\\objects.lua","crunched":0,"start":10579548,"end":10596434,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\sti\\tests\\ortho-inf.lua","crunched":0,"start":10596434,"end":10610128,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\sti\\tests\\ortho.lua","crunched":0,"start":10610128,"end":10614448,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\sti\\tests\\stag.lua","crunched":0,"start":10614448,"end":10616530,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\sti\\tests\\tmx\\hex.tmx","crunched":0,"start":10616530,"end":10618615,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\sti\\tests\\tmx\\iso.tmx","crunched":0,"start":10618615,"end":10619911,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\sti\\tests\\tmx\\objects.tmx","crunched":0,"start":10619911,"end":10625719,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\sti\\tests\\tmx\\ortho-inf.tmx","crunched":0,"start":10625719,"end":10633373,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\sti\\tests\\tmx\\ortho.tmx","crunched":0,"start":10633373,"end":10635274,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\sti\\tests\\tmx\\stag.tmx","crunched":0,"start":10635274,"end":10636142,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\sti\\tests\\tsx\\grid.tsx","crunched":0,"start":10636142,"end":10636379,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\sti\\tests\\tsx\\may.tsx","crunched":0,"start":10636379,"end":10636620,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\sti\\tutorials\\01-introduction-to-sti.md","crunched":0,"start":10636620,"end":10649928,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\sti\\tutorials\\img\\tiled-01.png","crunched":0,"start":10649928,"end":10755063,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\sti\\tutorials\\img\\tiled-02.png","crunched":0,"start":10755063,"end":10801360,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\sti\\tutorials\\img\\tiled-03.png","crunched":0,"start":10801360,"end":10850163,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\sti\\tutorials\\img\\tiled-04.png","crunched":0,"start":10850163,"end":10888194,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\sti\\tutorials\\img\\tiled-05.png","crunched":0,"start":10888194,"end":10908897,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\windfield\\.git\\config","crunched":0,"start":10908897,"end":10909199,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\windfield\\.git\\description","crunched":0,"start":10909199,"end":10909272,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\windfield\\.git\\HEAD","crunched":0,"start":10909272,"end":10909295,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\windfield\\.git\\hooks\\applypatch-msg.sample","crunched":0,"start":10909295,"end":10909773,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\windfield\\.git\\hooks\\commit-msg.sample","crunched":0,"start":10909773,"end":10910669,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\windfield\\.git\\hooks\\fsmonitor-watchman.sample","crunched":0,"start":10910669,"end":10915324,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\windfield\\.git\\hooks\\post-update.sample","crunched":0,"start":10915324,"end":10915513,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\windfield\\.git\\hooks\\pre-applypatch.sample","crunched":0,"start":10915513,"end":10915937,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\windfield\\.git\\hooks\\pre-commit.sample","crunched":0,"start":10915937,"end":10917580,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\windfield\\.git\\hooks\\pre-merge-commit.sample","crunched":0,"start":10917580,"end":10917996,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\windfield\\.git\\hooks\\pre-push.sample","crunched":0,"start":10917996,"end":10919370,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\windfield\\.git\\hooks\\pre-rebase.sample","crunched":0,"start":10919370,"end":10924268,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\windfield\\.git\\hooks\\pre-receive.sample","crunched":0,"start":10924268,"end":10924812,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\windfield\\.git\\hooks\\prepare-commit-msg.sample","crunched":0,"start":10924812,"end":10926304,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\windfield\\.git\\hooks\\push-to-checkout.sample","crunched":0,"start":10926304,"end":10929087,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\windfield\\.git\\hooks\\update.sample","crunched":0,"start":10929087,"end":10932737,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\windfield\\.git\\index","crunched":0,"start":10932737,"end":10933385,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\windfield\\.git\\info\\exclude","crunched":0,"start":10933385,"end":10933625,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\windfield\\.git\\logs\\HEAD","crunched":0,"start":10933625,"end":10933816,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\windfield\\.git\\logs\\refs\\heads\\master","crunched":0,"start":10933816,"end":10934007,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\windfield\\.git\\logs\\refs\\remotes\\origin\\HEAD","crunched":0,"start":10934007,"end":10934198,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\windfield\\.git\\objects\\pack\\pack-985abb38464f4cef0230c4988c8fa42dc33bc88a.idx","crunched":0,"start":10934198,"end":10943922,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\windfield\\.git\\objects\\pack\\pack-985abb38464f4cef0230c4988c8fa42dc33bc88a.pack","crunched":0,"start":10943922,"end":14656970,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\windfield\\.git\\packed-refs","crunched":0,"start":14656970,"end":14657084,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\windfield\\.git\\refs\\heads\\master","crunched":0,"start":14657084,"end":14657125,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\windfield\\.git\\refs\\remotes\\origin\\HEAD","crunched":0,"start":14657125,"end":14657157,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\windfield\\README.md","crunched":0,"start":14657157,"end":14687339,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\windfield\\windfield\\init.lua","crunched":0,"start":14687339,"end":14726552,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\windfield\\windfield\\mlib\\Changes.txt","crunched":0,"start":14726552,"end":14741987,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\windfield\\windfield\\mlib\\LICENSE.md","crunched":0,"start":14741987,"end":14742859,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\windfield\\windfield\\mlib\\mlib.lua","crunched":0,"start":14742859,"end":14783515,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\libraries\\windfield\\windfield\\mlib\\README.md","crunched":0,"start":14783515,"end":14825923,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\main.lua","crunched":0,"start":14825923,"end":14836549,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\maps\\1.tsx","crunched":0,"start":14836549,"end":14836703,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\maps\\2.tsx","crunched":0,"start":14836703,"end":14836928,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\maps\\BG.png","crunched":0,"start":14836928,"end":15058944,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\maps\\dodger.tmx","crunched":0,"start":15058944,"end":15064076,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\maps\\map.lua","crunched":0,"start":15064076,"end":15074117,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\maps\\terrain\\1.png","crunched":0,"start":15074117,"end":15085161,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\maps\\terrain\\10.png","crunched":0,"start":15085161,"end":15091708,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\maps\\terrain\\11.png","crunched":0,"start":15091708,"end":15102371,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\maps\\terrain\\12.png","crunched":0,"start":15102371,"end":15111744,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\maps\\terrain\\13.png","crunched":0,"start":15111744,"end":15120357,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\maps\\terrain\\14.png","crunched":0,"start":15120357,"end":15129537,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\maps\\terrain\\15.png","crunched":0,"start":15129537,"end":15137909,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\maps\\terrain\\16.png","crunched":0,"start":15137909,"end":15147278,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\maps\\terrain\\17.png","crunched":0,"start":15147278,"end":15154677,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\maps\\terrain\\18.png","crunched":0,"start":15154677,"end":15157718,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\maps\\terrain\\2.png","crunched":0,"start":15157718,"end":15159882,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\maps\\terrain\\3.png","crunched":0,"start":15159882,"end":15170849,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\maps\\terrain\\4.png","crunched":0,"start":15170849,"end":15179999,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\maps\\terrain\\5.png","crunched":0,"start":15179999,"end":15181170,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\maps\\terrain\\6.png","crunched":0,"start":15181170,"end":15190050,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\maps\\terrain\\7.png","crunched":0,"start":15190050,"end":15200513,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\maps\\terrain\\8.png","crunched":0,"start":15200513,"end":15207029,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\maps\\terrain\\9.png","crunched":0,"start":15207029,"end":15214163,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\messages.lua","crunched":0,"start":15214163,"end":15214387,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\music\\background.wav","crunched":0,"start":15214387,"end":15557839,"audio":true},{"filename":"D:\\projects\\games\\truedodger\\sprites\\BG.png","crunched":0,"start":15557839,"end":15680305,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\sprites\\bg_night.png","crunched":0,"start":15680305,"end":16090248,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\sprites\\bg_pixel.png","crunched":0,"start":16090248,"end":16121870,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\sprites\\enemies.png","crunched":0,"start":16121870,"end":16123689,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\sprites\\fly1.png","crunched":0,"start":16123689,"end":16125403,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\sprites\\fly2.png","crunched":0,"start":16125403,"end":16126471,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\sprites\\ground1.png","crunched":0,"start":16126471,"end":16127892,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\sprites\\ground2.png","crunched":0,"start":16127892,"end":16129472,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\sprites\\ground3.png","crunched":0,"start":16129472,"end":16131404,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\sprites\\logo.png","crunched":0,"start":16131404,"end":16136978,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\sprites\\logo_night.png","crunched":0,"start":16136978,"end":16142463,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\sprites\\truedodger.png","crunched":0,"start":16142463,"end":16147395,"audio":false},{"filename":"D:\\projects\\games\\truedodger\\tiles\\day.svg","crunched":0,"start":16147395,"end":16746245,"audio":false}]});

})();
