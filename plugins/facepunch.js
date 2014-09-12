var request = require('request');

var facepunchRegex = /facepunch.com\/showthread\.php.+?(\?|&)?t=(\d+)/;

function getThreadInfo(id, callback) {
	request('http://facepunch.com/showthread.php?t='+id, function(err, response, body) {
		if(err || response.statusCode != 200)
			return callback('Unable to get thread info.', null);
		if(/<div id="breadcrumb"><a href="forum\.php">.+?<\/a>\s+<div id="lastelement">\s+<span>Message<\/span>\s+<\/div><\/div>/.test(body))
			return callback('Thread does not exist.', null);
		var title = /<title>(.+?)<\/title>/.exec(body)[1];
		callback(null, 'Thread: ' + title.trim());
	});
}

function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

exports.commands = ['facepunch'];

exports.message = function(uniqueId, username, message, callback) {
	if(!facepunchRegex.test(message)) return;
	getThreadInfo(facepunchRegex.exec(message)[2], function(err, msg) {
		callback(err, msg);
	});
}

exports.command = function(uniqueId, username, command, args, callback) {
	if(!facepunchRegex.test(args)) return callback('Invalid thread URL.');
	getThreadInfo(facepunchRegex.exec(args)[2], callback);
}