var exec = require('child_process').exec;

exec('node dbCreate && node dbGet', function(){
    console.log('Finish');
});