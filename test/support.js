import assert from 'assert';
import { URL, isSupported } from '../src/modules/Support';
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

});