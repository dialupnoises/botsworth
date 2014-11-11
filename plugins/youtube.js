var request = require('request');

var youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/;

function getYoutubeInfo(id, callback) {
	request('https://gdata.youtube.com/feeds/api/videos/'+id+'?v2&prettyprint=true&alt=json', function(err, response, body) {
		if(err || response.statusCode != 200 && response.statusCode != 400)
			return callback('Unable to find video info.', null);
		if(response.statusCode == 400)
			return callback('Video not found.', null);
		var v = JSON.parse(body)['entry'];
		var rating = Math.round(v['gd$rating'].average);
		var stars = new Array(rating + 1).join('★');
		if(rating < 5)
			stars += new Array(6 - rating).join('☆');
		callback(null, 'Video: ' + 
			v.title['$t'] + ' by ' + v.author[0].name['$t'] + ' [' + stars + ']'
		);
	});
}

function numberWithCommas(x) {
    var parts = x.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
}

exports.commands = ['youtube'];

exports.message = function(uniqueId, username, message, callback) {
	console.log(message);
	if(!youtubeRegex.test(message)) return callback(null, null);
	getYoutubeInfo(youtubeRegex.exec(message)[1], function(err, msg) {
		callback(err, msg);
	});
}

exports.command = function(uniqueId, username, command, args, callback) {
	if(!youtubeRegex.test(args))
		return callback('Invalid YouTube URL.', null);
	getYoutubeInfo(youtubeRegex.exec(args)[1], callback);
}