import assert from 'assert';
import { isDefined, getConstructorName, getFunctionName } from '../src/modules/Utilities';

describe('Utilities', function() {

	describe('isDefined', function() {

		it('should report and undefined object as false', function() {
			var obj = undefined;
			assert.equal(isDefined(obj), false);
		});

		it('should report a defined object as true', function() {
			var obj = { hello: 'world' };
			assert.equal(isDefined(obj), true);
		});

	});

});