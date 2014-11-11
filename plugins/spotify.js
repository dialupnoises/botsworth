var request = require('request');

var spotifyRegex = /https?:\/\/open\.spotify\.com\/track\/(.+?)(\s|$)/;
var spotifyUriRegex = /spotify:track:(.+?)(\s|$)/;

function getSpotifyInfo(id, callback) {
	request('http://ws.spotify.com/lookup/1/.json?uri=spotify:track:'+id, function(err, response, body) {
		if(err || response.statusCode != 200 && response.statusCode != 400)
			return callback('Unable to find track info.', null);
		if(response.statusCode == 400)
			return callback('Track not found.', null);
		var t = JSON.parse(body)['track'];
		var name = t.name;
		var length = Math.floor(t.length / 60) + ':' + pad(Math.round(t.length % 60), 2);
		var artists = "";
		t.artists.forEach(function(artist) {
			artists += artist.name + ', ';
		});
		artists = artists.substr(0, artists.length - 2);
		var popularity = new Array(Math.round(t.popularity * 10) + 1).join('|');
		if(popularity.length < 10)
			popularity += new Array(10 - Math.round(t.popularity * 10)).join('.');
		callback(null, 'Track: ' + name + ' by ' + artists + ' - ' + length + ' [' + popularity + ']');
	});
}

function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

exports.commands = ['spotify'];

exports.message = function(uniqueId, username, message, callback) {
	if(!spotifyRegex.test(message) && !spotifyUriRegex.test(message)) return callback(null, null);
	var id = (spotifyRegex.test(message) ? spotifyRegex : spotifyUriRegex).exec(message)[1];
	getSpotifyInfo(id, function(err, msg) {
		callback(err, msg);
	});
}

exports.command = function(uniqueId, username, command, args, callback) {
	if(!spotifyRegex.test(args) && !spotifyUriRegex.test(args)) return callback('Invalid URL provided.');
	var id = (spotifyRegex.test(args) ? spotifyRegex : spotifyUriRegex).exec(args)[1];
	getSpotifyInfo(id, callback);
}