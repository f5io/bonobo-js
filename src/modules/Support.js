import { Ping } from './Templates';
import { isBoolean, isDefined } from './Utilities';

var URL;

var structuredClone;

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

var supportsStructuredClone = function() {
    return new Promise((resolve, reject) => {
        if (isDefined(structuredClone)) return resolve(structuredClone);
        if (!isSupported) return resolve((structuredClone = false));
        var blobURL = URL.createObjectURL(new Blob([Ping], { type: 'text/javascript' }));
        var worker = new Worker(blobURL);
        worker.onmessage = function(e) {
            resolve((structuredClone = isBoolean(e.data)));
            worker.terminate();
            URL.revokeObjectURL(blobURL);
        }
        worker.postMessage(['ping']);
    });
};

export default {
	URL, isSupported, supportsStructuredClone
}