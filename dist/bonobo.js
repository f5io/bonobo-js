(function(s) {

	'use strict';

	var _ = {},
		_emp = {},
		_bN = {};

	_.impt = (function() {
		return typeof s.document === 'undefined';
	})();

	_.noop = function(e) {};

	if (!_.impt) {
		var d = document, w = window;
		if (!('Worker' in w) && !('Blob' in w)) throw '[Bonobo] Your browser is not supported.';
		_bN = function(ref) {
			if (typeof ref === 'undefined') throw '[Bonobo] Your employee needs a reference.';
			return (ref in _emp) ? _emp[ref] : new Employee(ref);
		};
		_.src = (function() {
			var scripts = d.getElementsByTagName('script'),
				href = d.location.href,
				loc = href.substr(0, href.lastIndexOf('/')).split('/'),
				url, count;
			for (var i = 0; i < scripts.length; i++) {
				if (scripts[i].getAttribute('src').indexOf('bonobo') !== -1) {
					url = scripts[i].getAttribute('src');
				}
			}
			count = url.match(/\.\.\//g);
			return loc.slice(0, -(count.length)).join('/') + '/' + url.split('../').join('');
		})();
		_.url = 'webkitURL' in w ? w.webkitURL : 'URL' in w ? w.URL : undefined;
		if (typeof _.url === 'undefined') throw '[Bonobo] Your browser is not supported.';
	} else {
		_bN = {
			done : function(d) {
				s.postMessage({method: 'response', userData: d});
			},
			log : function(d) {
				s.postMessage({method: 'log', userData: d});
			},
			error : function(d) {
				s.postMessage({method: 'error', userData: d});
			},
			stop : function(d) {
				s.close();
			}
		};
	}

	var Employee = function(ref) {
		var t = this;
		t.ref = ref;
		t.blob = undefined;
		t.worker = undefined;
		t.doneHandler = _.noop;
		t.errorHandler = _.noop;
		t.messageHandler = function(e) {
			if (e.type === 'error') {
				t.errorHandler.call(t, e.message);
			} else {
				switch (e.data.method) {
					case 'log':
						console.log('[Bonobo(\''+t.ref+'\') : LOG]: ' + e.data.userData);
					break;
					case 'response':
						t.doneHandler.call(t, e.data.userData);
					break;
				}
			}
		};
		_emp[ref] = t;
	};

	Employee.prototype = {
		task : function(fn) {
			this.blob = new Blob([
				[
					'importScripts(\'' + _.src + '\');',
					'console = { log : Bonobo.log };',
					'onmessage = function(e) {',
						'(' + fn.toString() + ').apply(self,[e.data]);',
					'}'
				].join('')
			], {'type' : 'text/javascript' });
			this.blobURL = _.url.createObjectURL(this.blob);
			this.worker = new Worker(this.blobURL);
			this.worker.onmessage = this.messageHandler;
			this.worker.onerror = this.messageHandler;
			return this;
		},
		begin : function(d) {
			if (typeof this.worker !== 'undefined') {
				this.worker.postMessage(d);
				return this;
			} else {
				throw '[Bonobo] This employee has not been tasked with anything!';
			}
		},
		done : function(fn) {
			this.doneHandler = fn;
			return this;
		},
		error : function(fn) {
			this.errorHandler = fn;
			return this;
		},
		stop : function() {
			this.worker.terminate();
			return this;
		},
		destroy : function() {
			this.blob = undefined;
			this.worker.terminate();
			this.worker = undefined;
			_.url.revokeObjectURL(this.blobURL);
			delete _emp[this.ref];
		}
	};

	s.bN = s.Bonobo = _bN;

})(self);