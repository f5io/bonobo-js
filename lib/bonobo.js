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

		_.manage = (function() {
			if (_.support) {
				return function(t,g) {
					var ret = t + '(\'',
						a = g.split(/[\"|\'],[\"\']/);

					for (var i = 0; i < a.length; i++) {
						ret += _.loc + '/' + a[i] + '?' + new Date().getTime() + '\',\'';
					}
					ret = ret.slice(0,-2) + ')';
					return ret;
				};
			} else {
				return function(a) {
					var _t = this;
					var _prm = new _.promise();

					function source(src) {
						var scripts = d.getElementsByTagName('script');
						for (var i = 0; i < scripts.length; i++) {
							var s = scripts[i];
							if (s.getAttribute('src') === 'src') {
								return true;
							}
						}
						return false;
					}

					function script(s) {
						var _promise = new _.promise();
						var src = s;
						if (source(s.src)) {
							setTimeout(_promise.resolve, 1);
							return _promise;
						}
						var p = d.getElementsByTagName('script')[0];
						var f = d.createElement('script');
						var done = false;
						f.async = true;
						f.src = src  + '?' + Math.floor(Math.random() * new Date().getTime());
						f.onload = f.onreadystatechange = function() {
							if ( !done && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete") )
							{
								done = true;
								setTimeout(_promise.resolve, 1);
								f.onload = f.onreadystatechange = null;
							}
						};
						p.parentNode.insertBefore(f, p);
						f.setAttribute('rel', _t.ref);
						return _promise;
					}

					function loop() {
						if (a.length) {
							script(a.shift()).then(loop);
						} else {
							_prm.resolve();
						}
					}

					loop();

					return _prm;
				};
			}
		})();

		_.loc = d.location.href.substr(0, d.location.href.lastIndexOf('/'));

		_bN = function(ref) {
			if (typeof ref === 'undefined') throw '[Bonobo] Your employee needs a reference.';
			return (ref in _emp) ? _emp[ref] : new Employee(ref);
		};

		if (_.support) {
			_.url = w.URL || w.webkitURL;
			_.src = (function() {
				var scripts = d.getElementsByTagName('script'), url;
				for (var i = 0; i < scripts.length; i++) {
					if (scripts[i].getAttribute('src').indexOf('bonobo') !== -1) {
						url = scripts[i].getAttribute('src');
					}
				}
				return _.loc + '/' + url;
			})();
		} else {
			_.remove = function(ref) {
				var el = d.querySelectorAll('[rel='+ref+']');
				for (var i = 0; i < el.length; i++) {
					el[i].parentNode.removeChild(el[i]);
				}
			};
			_.promise = function() {
				var _this = this;
				_this.scope = _this;
				_this.stack = [];
				_this.resolve = function(r) {
					while (_this.stack.length) {
						return _this.stack.shift().call(_this.scope, r);
					}
				};
				_this.bind = function(scope) {
					_this.scope = scope;
					return _this;
				};
				_this.then = function(s,e) {
					_this.stack.push(s);
					return _this;
				};
			};
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
			importJS : function() {
				s.importScripts.apply(s, Array.prototype.slice.call(arguments));
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
							'(' + fn.toString().replace(/([bN|Bonobo]+.importJS|importScripts)+\([\'|\"](.*)[\'|\"]\)/g, function(m,t,g) {
								return _.manage(t,g);
							}) + ').apply(self,[e.data]);',
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
					importJS: function() {
						return _.manage.call(t, Array.prototype.slice.call(arguments));
					},
					stop : function() {
						if (typeof t.to !== 'undefined') clearTimeout(this.to);
					}
				};
				t.worker = (function() {
					return new Function('return ' + t.fallback.toString()
														.replace(/Bonobo|bN|console/g, 'this.fn')
														.replace(/(this.fn.importJS|importScripts)+\(([^\)]+)\);?([^\-]*)/g, function(m,f,a,r) {
															return 'this.fn.importJS(' + a + ').then(function() {' + r + ').bind(this); };';
														}));
													
				})();
			}
			return this;
		},
		begin : function(d) {
			if (typeof this.worker !== 'undefined') {
				if (_.support) {
					this.worker.postMessage(d);
				} else {
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
				_.remove(this.ref);
			}
			this.worker = undefined;
			delete _emp[this.ref];
		}
	};

	s.bN = s.Bonobo = _bN;

})(self);