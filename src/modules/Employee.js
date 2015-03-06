import { noop, isDefined, getFunctionName, getFunctionContent } from './Utilities';
import { URL, isSupported } from './Support';

export default class Employee {
    constructor(ref) {
        this.ref = ref;
        this.scripts = [];
        this.methods = {};
        this.scope = '';
        this.blob = undefined;
        this.worker = undefined;
        this.fallback = noop;
        this.doneHandler = noop;
        this.errorHandler = noop;
        this.userHandlers = {};
    }
    hoist(fn) {
        this.scope = getFunctionContent(fn);
        return this;
    }
    require(...scripts) {
        this.scripts = scripts.map(uri => uri);
        return this;
    }
    define(method, fn) {
        if (!isDefined(fn)) {
            fn = method;
            method = getFunctionName(fn.toString());
            if (method === '') throw '[Bonobo] Please define a function using a named function OR a string and function.';
            if (method in this) throw '[Bonobo] \'' + method + '\' is reserved or already defined, please use something else.';
        }
        this.methods[method] = fn;
        this[method] = (data, transfer) => this.run(method, data, transfer);
        return this;
    }
    run(method, data, transfer) {
        if (isDefined(this.worker)) {
            // this.worker.postMessage.apply(this.worker, ...)
        } else {
            throw '[Bonobo] Please build/compile your worker before attempting to interact with it.';
        }
    }
    done(fn) {
        this.doneHandler = fn;
        return this;
    }
    error(fn) {
        this.errorHandler = fn;
        return this;
    }
    on(ev, fn) {
        this.userHandlers[ev] = fn;
        return this;
    }
    stop() {
        if (isDefined(this.worker)) this.worker.terminate();
        return this;
    }
    destroy() {
        this.blob = undefined;
        if (isDefined(this.worker)) {
            if (isSupported) {
                this.worker.terminate();
                URL.revokeObjectURL(this.blobURL);
            }
        }
        this.worker = undefined;
        return this;
    }
}