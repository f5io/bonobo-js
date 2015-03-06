import assert from 'assert';
import { URL, isSupported, supportsStructuredClone } from '../src/modules/Support';
import { isDefined } from '../src/modules/Utilities';

describe('Support', function() {

	describe('#isSupported', function() {

		it('should be supported in chrome webdriver', function() {
			assert.equal(isSupported, true);
		});
		
	});

	describe('#URL', function() {

		it('should be defined in chrome webdriver', function() {
			assert.equal(isDefined(URL), true);
		});

	});

	describe('#supportsStructuredClone', function() {

		it('should be supported in chrome webdriver', function(done) {
			supportsStructuredClone().then(function(value) {
				assert.equal(value, true);
				done();
			});
		});

	});

});