var fs = require('fs');

fs.rename('src/main.ts.aot', 'src/main-aot.ts', function (err, data) {
    if (err) throw err;
    console.log(data);
});

if('undefined' !== process.argv[2]){
    fs.rename('src/app/config/' + process.argv[2] + '.config.ts', 'src/app/config/config.ts', function (err, data) {
        if (err) throw err;
        console.log(data);
    });
}