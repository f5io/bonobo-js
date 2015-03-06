import { Ping } from './Templates';
import { isBoolean } from './Utilities';

var URL;

var structuredClone = false;

var isSupported = (function() {
    return 'Worker' in window &&
        'Blob' in window &&
        ('webkitURL' in window || 'URL' in window) &&
        !!(function() {
            try {
                URL = window.URL || window.webkitURL;
                var test = URL.createObjectURL(new Blob([';'], { type: 'text/javascript' }));
                var wrk = new Worker(test);
                wrk.terminate();
                URL.revokeObjectURL(test);
                return true;
            } catch (e) {
                return false;
            }
        })();
})();

(function() {
    if (!isSupported) structuredClone = false;
    var blob = URL.createObjectURL(new Blob([Ping], { type: 'text/javascript' }));
    var worker = new Worker(blob);
    worker.onmessage = function(e) {
        structuredClone = isBoolean(e.data) ? true : false;
        worker.terminate();
        URL.revokeObjectURL(blob);
    }
    worker.postMessage(['ping']);
})();

export default {
	URL, isSupported
}