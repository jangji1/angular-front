var fs = require('fs');
var path = require('path');

var resources = [
  'node_modules/core-js/client/shim.min.js',
  'node_modules/zone.js/dist/zone.min.js',
  'src/app.css',
  'src/index-aot.html'
];

resources.map(function(f) {
  var path = f.split('/');
  var fileName = path[path.length-1];
  if('index-aot.html' === fileName){
    fileName = 'index.html';
  }
  var t = 'aot/' + fileName;
  fs.createReadStream(f).pipe(fs.createWriteStream(t));
});

var copyRecursiveSync = function(src, dest) {
  var exists = fs.existsSync(src);
  var stats = exists && fs.statSync(src);
  var isDirectory = exists && stats.isDirectory();
  
  if (exists && isDirectory) {
    
    if(!fs.existsSync(dest)){
      fs.mkdirSync(dest);
    }

    fs.readdirSync(src).forEach(function(childItemName) {
      copyRecursiveSync(path.join(src, childItemName),
                        path.join(dest, childItemName));
    });
  } else {
    fs.linkSync(src, dest);
  }
};


copyRecursiveSync('src/assets', 'aot/assets');
