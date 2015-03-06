import * as _ from './Utilities';

function buildArgsConvert(method, userData) {
	var args = { method, userData },
		constructor = _.getConstructorName(userData);

	switch (constructor) {
		case 'Array':
		case 'Object':
			args.userData = _.stringToArrayBuffer(JSON.stringify(userData));
			args.transfer = 'JSON_AB';
			break;
		case 'String':
			args.userData = _.stringToArrayBuffer(userData);
			args.transfer = 'STRING_AB';
			break;
		case 'ArrayBuffer':
			args.transfer = 'AB';
			break;
	}
	var result = [args];
	if ('transfer' in args) result.push([args.userData]);
	return result;
}

function buildArgsStructuredClone(method, userData) {
	var args = { method, userData };
	var result = [args];
	result.push([args.userData]);
	return result;
}

export default {
	buildArgsConvert,
	buildArgsStructuredClone
}