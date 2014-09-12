var botsworth = require('../index'),
	should    = require('should');

botsworth.initialize();

describe('facepunch', function() {
	describe('#message()', function() {
		it('should include the proper thread information', function(done) {
			botsworth.message("bbtest", "facepunch thread: http://facepunch.com/showthread.php?t=778487 about stuff", function(err, msg) {
				(err == null).should.equal(true);
				msg.indexOf('Rules for General Discussion').should.not.equal(-1);
				done();
			});
		});
		it('should error on an invalid thread', function(done) {
			botsworth.message("bbtest", "facepunch thread: http://facepunch.com/showthread.php?t=1 about stuff", function(err, msg) {
				err.should.not.equal(null);
				done();
			});
		});
	});
	describe('#command()', function() {
		it('should include the proper thread information', function(done) {
			botsworth.command("bbtest", "facepunch", "http://facepunch.com/showthread.php?t=778487", function(err, msg) {
				(err == null).should.equal(true);
				msg.indexOf('Rules for General Discussion').should.not.equal(-1);
				done();
			});
		});
		it('should error on an invalid thread', function(done) {
			botsworth.command("bbtest", "facepunch", "http://facepunch.com/showthread.php?t=1", function(err, msg) {
				err.should.not.equal(null);
				done();
			});
		});
		it('should error on an improper URL', function(done) {
			botsworth.command("bbtest", "facepunch", "http://notfacepunch.com/", function(err, msg) {
				err.should.not.equal(null);
				done();
			});
		});
	});
})