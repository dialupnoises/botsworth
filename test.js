var botsworth = require('./index.js');

botsworth.initialize();

botsworth.command("cpancake", "cpancake", "math", '1 + 1 * 2', function(err, message) {
    console.log(err || message);
});