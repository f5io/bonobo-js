export var Ping = `
onmessage = function(e) {
	postMessage(Array.isArray(e.data) ? true : false);
}
`;

export var Worker = `worker`;