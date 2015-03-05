import assert from 'assert';
import Employee from '../src/modules/Employee';

describe('Employee', function() {

	var emp;

	beforeEach(function() {
		emp = new Employee('hello');
	});

	describe('#constructor()', function() {

		it('should construct with a reference and maintain it', function() {
			assert.equal(emp.ref, 'hello');
		});

	});

	describe('#hoist()', function() {

		it('should get the supplied function contents and save it to the `scope` property of the instance', function() {
			emp.hoist(function() {
				var hello;
			});
			assert(emp.scope, 'var hello;');
		});

	});

});