var botsworth = require('../index'),
	should    = require('should');

botsworth.initialize();

describe('Youtube', function() {
	describe('#message()', function() {
		it('should include the proper video information', function(done) {
			botsworth.message("bbtest", "youtube video: https://www.youtube.com/watch?v=UO_jneJGrpQ about stuff", function(err, msg) {
				(err == null).should.equal(true);
				msg.indexOf('Clyde the Hedgehog').should.be.greaterThan(0);
				done();
			});
		});
		it('should error on an invalid video', function(done) {
			botsworth.message("bbtest", "youtube video: https://www.youtube.com/watch?v=NotValidVid about stuff", function(err, msg) {
				err.should.not.equal(null);
				done();
			});
		});
	});
	describe('#command()', function() {
		it('should include the proper video information', function(done) {
			botsworth.command("bbtest", "youtube", "https://www.youtube.com/watch?v=UO_jneJGrpQ", function(err, msg) {
				(err == null).should.equal(true);
				msg.indexOf('Clyde the Hedgehog').should.be.greaterThan(0);
				done();
			});
		});
		it('should error on an invalid video', function(done) {
			botsworth.command("bbtest", "youtube", "https://www.youtube.com/watch?v=NotValid", function(err, msg) {
				err.should.not.equal(null);
				done();
			});
		});
		it('should error on an improper URL', function(done) {
			botsworth.command("bbtest", "youtube", "https://notayoutubelink.com/", function(err, msg) {
				err.should.not.equal(null);
				done();
			});
		});
	});
})