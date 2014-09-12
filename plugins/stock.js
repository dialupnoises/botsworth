var request = require('request');

function getStockPrice(symbol, callback) {
    request('http://finance.yahoo.com/d/quotes.csv?e=.csv&f=n0l1&s=' + encodeURIComponent(symbol), function (err, res, body) {
        if (err || res.statusCode != 200)
            return callback('Unable to get stock price for ' + symbol + '.');
        var parts = body.split(',');
        if(parts[0].trim() == '"' + symbol + '"' && parts[1].trim() == '0.00')
            return callback('Unable to get stock price for ' + symbol + '.', null);
        callback(null, 'Stock: ' + JSON.parse(parts[0]) + ' - $' + parts[1].trim());
    });
}

function numberWithCommas(x) {
    var parts = x.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
}

exports.commands = ['stock'];

exports.message = function (uniqueId, username, message, callback) {
    if (message.substr(0,1) == '$' && message.substr(1).length > 0)
        getStockPrice(message.substr(1), function (err, msg) {
            callback(err, msg);
        });
}

exports.command = function (uniqueId, username, command, args, callback) {
    if (args.length > 0)
        getStockPrice(args, function (err, msg) {
            callback(err, msg);
        });
}