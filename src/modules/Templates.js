export var Ping = `
onmessage = function(e) {
	postMessage(Array.isArray(e.data));
}
`;

export var Worker = `
<% scripts %>
var slice = Array.prototype.slice;
var _ = { <% utilities %> };
var Bonobo = { <% api %> };
var console = { log: Bonobo.log };
onmessage = function(e) {
	var data = e.data.userData;
	if ('transfer' in e.data) {
		switch (e.data.transfer) {
			case 'JSON_AB':
				data = JSON.parse(_.arrayBufferToString(data));
				break;
			case 'STRING_AB':
				data = _.arrayBufferToString(data);
				break;
		}
	}

	switch (e.data.method) {
		<% methods %>
	}
}
`;