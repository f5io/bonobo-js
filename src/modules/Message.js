import { getConstructorName, stringToArrayBuffer, arrayBufferToString } from './Utilities';

var stringify = obj => postMessage(JSON.stringify(obj));

function buildArgs(method, data) {
	var args = { method, data },
		constructor = getConstructorName(data);

	switch (getConstructorName(data)) {
		case 'Array':
		case 'Object':
			args.data = stringToArrayBuffer(JSON.stringify(data));
			args.transfer = 'JSON_AB';
			break;
		case 'String':
			args.data = stringToArrayBuffer(data);
			args.transfer = 'STRING_AB';
			break;
	}
	var result = [args];
	result.push([args.data]);
	return result;
}

export default {
	buildArgs
}