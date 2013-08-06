(function(s) {

	'use strict';

	var _ = {},
		_emp = {},
		_bN = {};

	_.impt = (function() {
		return typeof s.document === 'undefined';
	})();

	_.support = true;

	_.noop = function() {};

	if (!_.impt) {
		var d = document, w = window;

		_.support = (function() {
			return 'Worker' in w && 'Blob' in w && ('webkitURL' in w || 'URL' in w);
		})();

		_bN = function(ref) {
			if (typeof ref === 'undefined') throw '[Bonobo] Your employee needs a reference.';
			return (ref in _emp) ? _emp[ref] : new Employee(ref);
		};

		if (_.support) {
			_.url = w.URL || w.webkitURL;
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
		} else {
			console.warn('[Bonobo] Web Workers are not supported, using a shim, however it will not be truly multi-threaded.');
		}
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
			stop : function() {
				s.close();
			}
		};
	}

	var Employee = function(ref) {
		var t = this;
		t.ref = ref;
		t.blob = undefined;
		t.worker = undefined;
		t.to = undefined;
		t.fallback = _.noop;
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
			if (_.support) {
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
			} else {
				var t = this;
				t.fallback = fn;
				t.to = undefined;
				t.fn = {
					done : function(d) {
						t.doneHandler.call(t, d);
					},
					log : function(d) {
						console.log('[Bonobo(\''+t.ref+'\') : LOG]: ' + d);
					},
					error : function(d) {
						t.errorHandler.call(t, d);
					},
					stop : function() {
						if (typeof t.to !== 'undefined') clearTimeout(this.to);
					}
				};
				t.worker = (function() {
					return new Function('return ' + t.fallback.toString().replace(/Bonobo|bN|console/g, 'this.fn'));
				})();
			}
			return this;
		},
		begin : function(d) {
			if (typeof this.worker !== 'undefined') {
				if (_.support) {
					this.worker.postMessage(d);
				} else {
					console.log(this.worker().toString());
					try {
						var t = this;
						t.to = setTimeout(function() {
							t.worker().call(t, d);
						}, 10);
					} catch (e) {
						this.errorHandler.call(this, e.message);
					}
				}
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
			if (_.support) {
				this.worker.terminate();
			} else {
				if (typeof this.to !== 'undefined') clearTimeout(this.to);
			}
			return this;
		},
		destroy : function() {
			this.blob = undefined;
			if (_.support) {
				this.worker.terminate();
				_.url.revokeObjectURL(this.blobURL);
			} else {
				if (typeof this.to !== 'undefined') clearTimeout(this.to);
			}
			this.worker = undefined;
			delete _emp[this.ref];
		}
	};

	s.bN = s.Bonobo = _bN;

})(self);