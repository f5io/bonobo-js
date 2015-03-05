import assert from 'assert';
import {
	isDefined,
	getConstructorName,
	getFunctionName,
	getFunctionContent,
	stringToArrayBuffer,
	arrayBufferToString,
	format
} from '../src/modules/Utilities';

describe('Utilities', function() {

	var obj, undef, arr, fn;

	beforeEach(function() {
		obj = { hello: 'world' };
		arr = [1, 2, 3];
		fn = function hello() { var hello; };
	});

	describe('#isDefined()', function() {

		it('should report an undefined object as false', function() {
			assert.equal(isDefined(undef), false);
		});

		it('should report a defined object as true', function() {
			assert.equal(isDefined(obj), true);
		});

	});

	describe('#getConstructorName()', function() {

		it('should return "Object" when passed an object', function() {
			assert.equal(getConstructorName(obj), 'Object');
		});

		it('should return "Array" when passed an array', function() {
			assert.equal(getConstructorName(arr), 'Array');
		});

		it('should return "Function" when passed a function', function() {
			assert.equal(getConstructorName(fn), 'Function');
		});

	});

	describe('#getFunctionName()', function() {

		it('should return "hello" when passed `fn`', function() {
			assert.equal(getFunctionName(fn), 'hello');
		});

		it('should return an empty string when passed an anonymous function', function() {
			assert.equal(getFunctionName(function() {}), '');
		});

	});

	describe('#getFunctionContent()', function() {

		it('should return a string of the content of the function', function() {
			assert.equal(getFunctionContent(fn).trim(), 'var hello;');
		});

	});

	describe('#stringToArrayBuffer()', function() {

		it('should convert a string into an arraybuffer', function() {
			assert.equal(getConstructorName(stringToArrayBuffer('hello')), 'ArrayBuffer');
		});

	});

	describe('#arrayBufferToString()', function() {

		it('should convert an arraybuffer into a string', function() {
			assert.equal(getConstructorName(arrayBufferToString(stringToArrayBuffer('hello'))), 'String');
		});

		it('should retain the value of the initial string', function() {
			assert.equal(arrayBufferToString(stringToArrayBuffer('hello')), 'hello');
		});

	});

	describe('#format()', function() {

		it('should interpolate values into a string from a dictionary object by key', function() {
			var tmpl = 'hello <% greeting %>!';
			assert.equal(format(tmpl, { greeting: 'world'}), 'hello world!');
		});

		it('should interpolate values into a string from an array by index', function() {
			var tmpl = 'hello <% 0 %>!';
			assert.equal(format(tmpl, ['world']), 'hello world!');
		});

	});

});