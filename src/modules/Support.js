var URL;

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

export default {
	URL, isSupported
}