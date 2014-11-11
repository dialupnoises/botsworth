var botsworth = require('../index'),
	should    = require('should');

botsworth.initialize();

describe('Stock', function() {
	describe('#message()', function() {
		it('should include the proper stock price', function(done) {
			botsworth.message("bbtest", "$GOOG", function(err, msg) {
				if(err == null && msg == null) return;
				(err == null).should.equal(true);
				msg.indexOf('$').should.be.greaterThan(0);
				done();
			});
		});
		it('should error on an invalid stock', function(done) {
			botsworth.message("bbtest", "$NOTASTOCK", function(err, msg) {
				if(err == null && msg == null) return;
				(err == null).should.not.equal(true);
				done();
			});
		});
	});
	describe('#command()', function() {
		it('should include the proper stock price', function(done) {
			botsworth.command("bbtest", "stock", "GOOG", function(err, msg) {
				(err == null).should.equal(true);
				msg.indexOf('$').should.be.greaterThan(0);
				done();
			});
		});
		it('should error on an invalid stock', function(done) {
			botsworth.command("bbtest", "stock", "NOTASTOCK", function(err, msg) {
				err.should.not.equal(null);
				done();
			});
		});
	});
})