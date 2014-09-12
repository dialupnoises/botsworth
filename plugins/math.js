var math   = require('mathjs');

function numberWithCommas(x) {
    var parts = x.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
}

exports.commands = ['math'];

exports.command = function(uniqueId, username, command, args, callback) {
	var expr = args.trim();
	try { var result = math.eval(expr); }
	catch(err) { return callback(err.toString(), null); }
	if(!result)
		return callback('Invalid input: ' + expr, null);
	callback(null, expr + ' = ' + numberWithCommas(result));
}