(function(factory) {

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = factory(self);
    } else {
        self.Bonobo = self.bN = factory(self);
    }

})(function(s) {
    
    'use strict';

    var _ = {},
        _bonobo, Employee, Promise,
        _employees = {};

    _.isDefined = function(o) {
        return typeof o !== 'undefined';
    };

    _.isImported = (function() {
        return !_.isDefined(s.document);
    })();

    _.isSupported = true;

    _.noOp = function() {};
    
    _.slice = Array.prototype.slice;
    
    _.buildArgs = function(method, data, transfer) {
        var args = [{ method: method, userData: data }];
        var construct = _.getConstructorName(data);
        if (transfer || construct === 'Object' || construct === 'Array' || construct === 'String' || construct === 'ArrayBuffer') {
            switch (construct) {
                case 'Object':
                case 'Array':
                    data = _.stringToArrayBuffer(JSON.stringify(data));
                    args[0].transferred = construct;
                    break;
                case 'String':
                    data = _.stringToArrayBuffer(data);
                    args[0].transferred = construct;
                    break;
            }
            args[0].userData = data;
            args.push([data]);
        }
        return args;
    };

    _.stringToArrayBuffer = function(str) {
        var buffer = new ArrayBuffer(str.length * 2);
        var bufferView = new Uint16Array(buffer);
        for (var i = 0, strLen = str.length; i < strLen; i++) {
            bufferView[i] = str.charCodeAt(i);
        }
        return buffer;
    };

    _.arrayBufferToString = function(buffer) {
        return String.fromCharCode.apply(null, new Uint16Array(buffer));
    };

    _.getConstructorName = function(o) {
        return Object.prototype.toString.call(o).match(/\[object (\w*)\]/)[1];
    };

    _.getFunctionName = function(str) {
        return str.match(/function (\w*)/)[1];
    };

    if (!_.isImported) {
        var d = document, w = window;

        _bonobo = function(ref) {
            if (typeof ref === 'undefined') throw '[Bonobo] Your employee needs a reference.';
            return (ref in _employees) ? _employees[ref] : new Employee(ref);
        };

        _.isSupported = (function() {
            return 'Worker' in w &&
                'Blob' in w &&
                ('webkitURL' in w || 'URL' in w) &&
                !!(function() {
                    try {
                        _.blobURL = w.URL || w.webkitURL;
                        var test = _.blobURL.createObjectURL(new Blob([';'], { type: 'text/javascript' }));
                        var wrk = new Worker(test);
                        wrk.terminate();
                        _.blobURL.revokeObjectURL(test);
                        return true;
                    } catch (e) {
                        return false;
                    }
                })();
        })();

        if (_.isSupported) {
            _.location = (function() {
                function cleanPathName() {
                    var path = d.location.pathname.replace(/(\b\/.+)\.(?:html?|php|do)/g, '/');
                    path = path.slice(-1) === '/' ? path : path + '/';
                    return path;
                }

                return d.location.protocol + '//' + d.location.hostname + (d.location.port ? ':' + d.location.port : '') + cleanPathName();
            })();
            
            _.bonoboSrc = (function() {
                var scripts = d.getElementsByTagName('script'), url;
                for (var i = 0; i < scripts.length; i++) {
                    if (scripts[i].getAttribute('src').indexOf('bonobo') !== -1) {
                        url = scripts[i].getAttribute('src');
                    }
                }
                return _.location + url;
            })();
        } else {
            _.removeScripts = function(ref) {
                var el = d.querySelectorAll('[rel='+ref+']');
                for (var i = 0; i < el.length; i++) {
                    el[i].parentNode.removeChild(el[i]);
                }
            };

            _.loadScripts = function() {
                var _this = this;
                var args = _.slice.call(arguments);
                var _prm = new Promise().bind(_this);

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
                    var _promise = new Promise();
                    var src = s;
                    if (source(s.src)) {
                        setTimeout(_promise.resolve, 0);
                        return _promise;
                    }
                    var p = d.getElementsByTagName('script')[0];
                    var f = d.createElement('script');
                    var done = false;
                    f.async = true;
                    f.src = src  + '?' + Math.floor(Math.random() * new Date().getTime());
                    f.onload = f.onreadystatechange = function() {
                        if ( !done && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete') )
                        {
                            done = true;
                            setTimeout(_promise.resolve, 0);
                            f.onload = f.onreadystatechange = null;
                        }
                    };
                    p.parentNode.insertBefore(f, p);
                    f.setAttribute('rel', _this.ref);
                    return _promise;
                }

                function loop() {
                    if (args.length) {
                        script(args.shift()).then(loop);
                    } else {
                        _prm.resolve();
                    }
                }

                loop();

                return _prm;
            };
        }
    } else {
        _bonobo = {
            done : function(data, transfer) {
                s.postMessage.apply(s, _.buildArgs('response', data, transfer));
            },
            emit : function(ev, data, transfer) {
                s.postMessage.apply(s, _.buildArgs(ev, data, transfer));
            },
            log : function() {
                s.postMessage.apply(s, _.buildArgs('log', _.slice.call(arguments)));
            },
            error : function() {
                s.postMessage.apply(s, _.buildArgs('error', _.slice.call(arguments)));
            },
            importJS : function() {
                s.importScripts.apply(s, _.slice.call(arguments).map(function(scr) {
                    return scr.indexOf('http') > -1 ? scr : scr.slice(0, 1) === '/' ? _location + scr.slice(1) : _location + scr;
                }));
            },
            stop : function() {
                s.close();
            }
        };
        s._ = _;
    }

    Promise = function() {
        var _self = this;
        _self.scope = _self;
        _self.stack = [];
        _self.resolve = function(r) {
            while (_self.stack.length) {
                return _self.stack.shift().call(_self.scope, r);
            }
        };
        _self.bind = function(scope) {
            _self.scope = scope;
            return _self;
        };
        _self.then = function(s,e) {
            _self.stack.push(s);
            return _self;
        };
    };

    Employee = function(ref) {
        var _self = this;
        _self.ref = ref;
        _self.scripts = [_.bonoboSrc];
        _self.methods = {};
        _self.scope = '';
        _self.blob = undefined;
        _self.worker = undefined;
        _self.fallback = _.noOp;
        _self.doneHandler = _.noOp;
        _self.errorHandler = _.noOp;
        _self.userHandlers = {};
        _self.messageHandler = function(e) {

            function getData(response) {
                var data = response.userData;
                if ('transferred' in response) {
                    switch (response.transferred) {
                        case 'Object':
                        case 'Array':
                            data = JSON.parse(_.arrayBufferToString(data));
                            break;
                        case 'String':
                            data = _.arrayBufferToString(data);
                            break;
                    }
                }
                return data;
            }

            if (e.type === 'error') {
                _self.errorHandler.call(_self, e.message);
            } else if (_self.userHandlers.hasOwnProperty(e.data.method)) {
                _self.userHandlers[e.data.method].call(_self, getData(e.data));
            } else {
                switch (e.data.method) {
                    case 'log':
                        Function.prototype.apply.call(s.console.log, s.console, ['[Bonobo(\''+_self.ref+'\') : LOG]:'].concat(getData(e.data)));
                    break;
                    case 'response':
                        _self.doneHandler.call(_self, getData(e.data));
                    break;
                }
            }
        };
        _employees[ref] = _self;
    };

    Employee.prototype = {
        hoist : function(fn) {
            this.scope = fn.toString().replace(/^function\s?(?:\w+)?\(\)\s?\{(.|[\s\S]*)\}/g, function(match, internals) { return internals; });
            return this;
        },
        require : function() {
            var args = _.slice.call(arguments);
            if (_.isSupported) {
                this.scripts = this.scripts.concat(args.map(function(scr) {
                    return scr.indexOf('http') > -1 ? scr : scr.slice(0, 1) === '/' ? _.location + scr.slice(1) : _.location + scr;
                }));
            } else {
                this.scripts = args;
            }
            return this;
        },
        define : function(method, fn) {
            var _this = this;
            if (!fn) {
                fn = method;
                method = _.getFunctionName(fn.toString());
                if (method === '') throw '[Bonobo] Please define a function using a named function OR a string and function.';
                if (method in _this) throw '[Bonobo] \'' + method + '\' is reserved or already defined, please use something else.';
            }
            _this.methods[method] = fn;
            _this[method] = function(data, transfer) {
                _this.run(method, data, transfer);
            };
            return _this;
        },
        run : function(method, data, transfer) {
            if (_.isDefined(this.worker)) {
                if (_.isSupported) {
                    this.worker.postMessage.apply(this.worker, _.buildArgs(method, data, transfer));
                } else {
                    this.worker[method](data);
                }
            } else {
                throw '[Bonobo] Please build/compile your worker before attempting to interact with it.';
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
        on : function(ev, fn) {
            this.userHandlers[ev] = fn;
            return this;
        },
        stop : function() {
            if (_.isDefined(this.worker) && _.isSupported) {
                this.worker.terminate();
            }
            return this;
        },
        destroy : function() {
            this.blob = undefined;
            if (_.isDefined(this.worker)) {
                if (_.isSupported) {
                    this.worker.terminate();
                    _.blobURL.revokeObjectURL(this.blobURL);
                } else {
                    _.removeScripts(this.ref);
                }
            }
            this.worker = undefined;
            delete _employees[this.ref];
        },
        build : function() {
            var build, _promise = new Promise().bind(this);
            if (_.isSupported) {
                build = [
                    'importScripts(\'' + this.scripts.join('\',\'') + '\');',
                    'console = { log : Bonobo.log };',
                    'var _location = \'' + _.location + '\';',
                    this.scope,
                    'onmessage = function(e) {',
                        'var data = e.data.userData;',
                        'if (\'transferred\' in e.data) {',
                            'switch(e.data.transferred) {',
                                'case \'Object\':',
                                'case \'Array\':',
                                    'data = JSON.parse(_.arrayBufferToString(data));',
                                    'break;',
                                'case \'String\':',
                                    'data = _.arrayBufferToString(data);',
                                    'break;',
                            '}',
                        '}',
                        'switch(e.data.method) {'
                ];
                for (var m in this.methods) {
                    build.push(
                            'case \'' + m + '\':',
                                '(' + this.methods[m].toString().replace(/importScripts/g, 'Bonobo.importJS') + ').apply(self,[data]);',
                            'break;'
                    );
                }
                build.push(
                        '}',
                    '}'
                );
                this.blob = new Blob([ build.join('\n') ], { type : 'text/javascript' });
                this.blobURL = _.blobURL.createObjectURL(this.blob);
                this.worker = new Worker(this.blobURL);
                this.worker.onmessage = this.messageHandler;
                this.worker.onerror = this.messageHandler;
                setTimeout(_promise.resolve, 0);
            } else {
                var _self = this;
                var fn = {
                    done : function(data) {
                        _self.doneHandler.call(_self, data);
                    },
                    emit : function(ev, data) {
                        if (_self.userHandlers.hasOwnProperty(ev)) _self.userHandlers[ev].call(_self, data);
                    },
                    log : function() {
                        Function.prototype.apply.call(s.console.log, s.console, ['[Bonobo(\''+_self.ref+'\') : LOG]:'].concat(_.slice.call(arguments)));
                    },
                    error : function(data) {
                        _self.errorHandler.call(_self, data);
                    },
                    importJS: function() {
                        return _.loadScripts.apply(_self, _.slice.call(arguments));
                    },
                    stop : function() {
                        _self.stop();
                    }
                };
                _.loadScripts.apply(_self, _self.scripts).then(function() {
                    var m, handleScripts = function(match, args, rest) {
                        return '_scope.importJS(' + args + ').then(function() {' + rest + '); };';
                    };
                    build = [
                        'var _scope = this;',
                        _self.scope
                    ];
                    for (m in _self.methods) {
                        build.push('var ' + m + ' = ' + _self.methods[m].toString()
                            .replace(/Bonobo|bN|console/g, '_scope')
                            .replace(/(?:_scope.importJS|importScripts)+\(([^\)]+)\);?([^]*)/g, handleScripts)
                        );
                    }
                    build.push('return {');
                    for (m in _self.methods) {
                        build.push(m + ' : ' + m + ',');
                    }
                    build[build.length - 1] = build[build.length - 1].slice(0,-1);
                    build.push('}');
                    _self.worker = new Function(build.join('\n')).call(fn);
                    setTimeout(_promise.resolve, 0);
                });
            }
            return _promise;
        },
        compile : function() {
            return this.build();
        }
    };

    return _bonobo;

});