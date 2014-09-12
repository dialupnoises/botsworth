var converter = require('unitconvert')();

function numberWithCommas(x) {
    var parts = x.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
}

exports.commands = ['convert'];

exports.command = function(uniqueId, username, command, args, callback) {
	converter.convert(args, function(err, value, str) {
		return callback(err, args + ' = ' + numberWithCommas(value) + ' ' + str);
	});
}