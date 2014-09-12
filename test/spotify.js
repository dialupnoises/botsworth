var botsworth = require('../index'),
	should    = require('should');

botsworth.initialize();

describe('Spotify', function() {
	describe('#message()', function() {
		it('should include the proper track information', function(done) {
			botsworth.message("bbtest", "spotify track: http://open.spotify.com/track/49IhSDdsyP6NclI4AZIlxb about stuff", function(err, msg) {
				(err == null).should.equal(true);
				msg.indexOf('Better in the Dark').should.be.greaterThan(0);
				done();
			});
		});
		it('should include the proper track information with a URI', function(done) {
			botsworth.message("bbtest", "spotify track: spotify:track:49IhSDdsyP6NclI4AZIlxb about stuff", function(err, msg) {
				(err == null).should.equal(true);
				msg.indexOf('Better in the Dark').should.be.greaterThan(0);
				done();
			});
		});
		it('should error on an invalid track', function(done) {
			botsworth.message("bbtest", "spotify track: http://open.spotify.com/track/NotReallyATrack about stuff", function(err, msg) {
				err.should.not.equal(null);
				done();
			});
		});
	});
	describe('#command()', function() {
		it('should include the proper track information', function(done) {
			botsworth.command("bbtest", "spotify", "http://open.spotify.com/track/49IhSDdsyP6NclI4AZIlxb", function(err, msg) {
				(err == null).should.equal(true);
				msg.indexOf('Better in the Dark').should.be.greaterThan(0);
				done();
			});
		});
		it('should error on an invalid track', function(done) {
			botsworth.command("bbtest", "spotify", "http://open.spotify.com/track/NotReallyATrack", function(err, msg) {
				err.should.not.equal(null);
				done();
			});
		});
		it('should error on an improper URL', function(done) {
			botsworth.command("bbtest", "spotify", "https://notaspotifyurl.com/", function(err, msg) {
				err.should.not.equal(null);
				done();
			});
		});
	});
})