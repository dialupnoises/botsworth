var botsworth = require('../index'),
	should    = require('should');

botsworth.initialize();

describe('Convert', function() {
	describe('#command()', function() {
		it('should return the proper value', function(done) {
			botsworth.command("bbtest", "convert", "1 meter to yards", function(err, msg) {
				(err == null).should.equal(true);
				msg.indexOf('1.09361').should.be.greaterThan(0);
				done();
			});
		});
		it('should error on an invalid equation', function(done) {
			botsworth.command("bbtest", "math", "1 error to error", function(err, msg) {
				err.should.not.equal(null);
				done();
			});
		});
	});
})