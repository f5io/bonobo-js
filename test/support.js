import assert from 'assert';
import {
	URL,
	isSupported
} from '../src/modules/Support';

describe('Support', function() {

	describe('#isSupported', function() {

		it('should be usable in phantomjs', function() {
			assert.equal(isSupported, true);
		});
		
	});

});