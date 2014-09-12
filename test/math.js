var botsworth = require('../index'),
	should    = require('should');

botsworth.initialize();

describe('Math', function() {
	describe('#command()', function() {
		it('should return the proper value', function(done) {
			botsworth.command("bbtest", "math", "1 * 2", function(err, msg) {
				(err == null).should.equal(true);
				msg.should.equal('1 * 2 = 2');
				done();
			});
		});
		it('should error on an invalid equation', function(done) {
			botsworth.command("bbtest", "math", "this is not an equation", function(err, msg) {
				err.should.not.equal(null);
				done();
			});
		});
	});
})