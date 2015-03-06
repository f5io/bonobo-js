(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

var Support = _interopRequireWildcard(require("./modules/Support"));

var Utilities = _interopRequireWildcard(require("./modules/Utilities"));

},{"./modules/Support":2,"./modules/Utilities":4}],2:[function(require,module,exports){
"use strict";

var Ping = require("./Templates").Ping;

var _Utilities = require("./Utilities");

var isBoolean = _Utilities.isBoolean;
var isDefined = _Utilities.isDefined;

var URL;

var structuredClone;

var isSupported = (function () {
    return "Worker" in window && "Blob" in window && ("webkitURL" in window || "URL" in window) && !!(function () {
        try {
            URL = window.URL || window.webkitURL;
            var test = URL.createObjectURL(new Blob([";"], { type: "text/javascript" }));
            var wrk = new Worker(test);
            wrk.terminate();
            URL.revokeObjectURL(test);
            return true;
        } catch (e) {
            return false;
        }
    })();
})();

var supportsStructuredClone = function supportsStructuredClone() {
    return new Promise(function (resolve, reject) {
        if (isDefined(structuredClone)) return resolve(structuredClone);
        if (!isSupported) return resolve(structuredClone = false);
        var blobURL = URL.createObjectURL(new Blob([Ping], { type: "text/javascript" }));
        var worker = new Worker(blobURL);
        worker.onmessage = function (e) {
            resolve(structuredClone = isBoolean(e.data));
            worker.terminate();
            URL.revokeObjectURL(blobURL);
        };
        worker.postMessage(["ping"]);
    });
};

module.exports = {
    URL: URL, isSupported: isSupported, supportsStructuredClone: supportsStructuredClone
};

},{"./Templates":3,"./Utilities":4}],3:[function(require,module,exports){
"use strict";

var Ping = exports.Ping = "\nonmessage = function(e) {\n\tpostMessage(Array.isArray(e.data));\n}\n";

var Worker = exports.Worker = "\n<% scripts %>\nvar slice = Array.prototype.slice;\nvar _ = { <% utilities %> };\nvar Bonobo = { <% api %> };\nvar console = { log: Bonobo.log };\nonmessage = function(e) {\n\tvar data = e.data.userData;\n\tif ('transfer' in e.data) {\n\t\tswitch (e.data.transfer) {\n\t\t\tcase 'JSON_AB':\n\t\t\t\tdata = JSON.parse(_.arrayBufferToString(data));\n\t\t\t\tbreak;\n\t\t\tcase 'STRING_AB':\n\t\t\t\tdata = _.arrayBufferToString(data);\n\t\t\t\tbreak;\n\t\t}\n\t}\n\n\tswitch (e.data.method) {\n\t\t<% methods %>\n\t}\n}\n";
Object.defineProperty(exports, "__esModule", {
	value: true
});

},{}],4:[function(require,module,exports){
"use strict";

function noop() {}

function isDefined(a) {
    return typeof a !== "undefined";
}

function isBoolean(b) {
    return typeof b === "boolean";
}

function getConstructorName(o) {
    return Object.prototype.toString.call(o).match(/\[object (\w*)\]/)[1];
}

function getFunctionName(fn) {
    return fn.toString().match(/function (\w*)/)[1];
}

function getFunctionContent(fn) {
    return fn.toString().replace(/^function\s?(?:\w+)?\(\)\s?\{(.|[\s\S]*)\}/g, function (m, content) {
        return content;
    }).trim();
}

function arrayBufferToString(buffer) {
    var str = "";
    var bytes = new Uint16Array(buffer);
    for (var i = 0, buffLen = bytes.byteLength / 2; i < buffLen; i++) {
        str += String.fromCharCode(bytes[i]);
    }
    return str;
}

function stringToArrayBuffer(str) {
    var buffer = new ArrayBuffer(str.length * 2);
    var bufferView = new Uint16Array(buffer);
    for (var i = 0, strLen = str.length; i < strLen; i++) {
        bufferView[i] = str.charCodeAt(i);
    }
    return buffer;
}

function format(str, dict) {
    return str.toString().replace(/<%\s?([^\s?%>]+)\s?%>/g, function (m, key) {
        return dict[key];
    });
}

module.exports = {
    noop: noop,
    isDefined: isDefined,
    isBoolean: isBoolean,
    getConstructorName: getConstructorName,
    getFunctionName: getFunctionName,
    getFunctionContent: getFunctionContent,
    arrayBufferToString: arrayBufferToString,
    stringToArrayBuffer: stringToArrayBuffer,
    format: format
};

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvam9laGFybG93L1Byb2plY3RzL2Jvbm9iby1qcy9zcmMvaW5kZXguanMiLCIvVXNlcnMvam9laGFybG93L1Byb2plY3RzL2Jvbm9iby1qcy9zcmMvbW9kdWxlcy9TdXBwb3J0LmpzIiwiL1VzZXJzL2pvZWhhcmxvdy9Qcm9qZWN0cy9ib25vYm8tanMvc3JjL21vZHVsZXMvVGVtcGxhdGVzLmpzIiwiL1VzZXJzL2pvZWhhcmxvdy9Qcm9qZWN0cy9ib25vYm8tanMvc3JjL21vZHVsZXMvVXRpbGl0aWVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztJQ0FZLE9BQU8sbUNBQU0sbUJBQW1COztJQUNoQyxTQUFTLG1DQUFNLHFCQUFxQjs7Ozs7SUNEdkMsSUFBSSxXQUFRLGFBQWEsRUFBekIsSUFBSTs7eUJBQ3dCLGFBQWE7O0lBQXpDLFNBQVMsY0FBVCxTQUFTO0lBQUUsU0FBUyxjQUFULFNBQVM7O0FBRTdCLElBQUksR0FBRyxDQUFDOztBQUVSLElBQUksZUFBZSxDQUFDOztBQUVwQixJQUFJLFdBQVcsR0FBRyxDQUFDLFlBQVc7QUFDMUIsV0FBTyxRQUFRLElBQUksTUFBTSxJQUNyQixNQUFNLElBQUksTUFBTSxLQUNmLFdBQVcsSUFBSSxNQUFNLElBQUksS0FBSyxJQUFJLE1BQU0sQ0FBQSxBQUFDLElBQzFDLENBQUMsQ0FBQyxDQUFDLFlBQVc7QUFDVixZQUFJO0FBQ0EsZUFBRyxHQUFHLE1BQU0sQ0FBQyxHQUFHLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQztBQUNyQyxnQkFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDLGVBQWUsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLGlCQUFpQixFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQzdFLGdCQUFJLEdBQUcsR0FB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bmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCAqIGFzIFN1cHBvcnQgZnJvbSAnLi9tb2R1bGVzL1N1cHBvcnQnO1xuaW1wb3J0ICogYXMgVXRpbGl0aWVzIGZyb20gJy4vbW9kdWxlcy9VdGlsaXRpZXMnOyIsImltcG9ydCB7IFBpbmcgfSBmcm9tICcuL1RlbXBsYXRlcyc7XG5pbXBvcnQgeyBpc0Jvb2xlYW4sIGlzRGVmaW5lZCB9IGZyb20gJy4vVXRpbGl0aWVzJztcblxudmFyIFVSTDtcblxudmFyIHN0cnVjdHVyZWRDbG9uZTtcblxudmFyIGlzU3VwcG9ydGVkID0gKGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiAnV29ya2VyJyBpbiB3aW5kb3cgJiZcbiAgICAgICAgJ0Jsb2InIGluIHdpbmRvdyAmJlxuICAgICAgICAoJ3dlYmtpdFVSTCcgaW4gd2luZG93IHx8ICdVUkwnIGluIHdpbmRvdykgJiZcbiAgICAgICAgISEoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIFVSTCA9IHdpbmRvdy5VUkwgfHwgd2luZG93LndlYmtpdFVSTDtcbiAgICAgICAgICAgICAgICB2YXIgdGVzdCA9IFVSTC5jcmVhdGVPYmplY3RVUkwobmV3IEJsb2IoWyc7J10sIHsgdHlwZTogJ3RleHQvamF2YXNjcmlwdCcgfSkpO1xuICAgICAgICAgICAgICAgIHZhciB3cmsgPSBuZXcgV29ya2VyKHRlc3QpO1xuICAgICAgICAgICAgICAgIHdyay50ZXJtaW5hdGUoKTtcbiAgICAgICAgICAgICAgICBVUkwucmV2b2tlT2JqZWN0VVJMKHRlc3QpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkoKTtcbn0pKCk7XG5cbnZhciBzdXBwb3J0c1N0cnVjdHVyZWRDbG9uZSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGlmIChpc0RlZmluZWQoc3RydWN0dXJlZENsb25lKSkgcmV0dXJuIHJlc29sdmUoc3RydWN0dXJlZENsb25lKTtcbiAgICAgICAgaWYgKCFpc1N1cHBvcnRlZCkgcmV0dXJuIHJlc29sdmUoKHN0cnVjdHVyZWRDbG9uZSA9IGZhbHNlKSk7XG4gICAgICAgIHZhciBibG9iVVJMID0gVVJMLmNyZWF0ZU9iamVjdFVSTChuZXcgQmxvYihbUGluZ10sIHsgdHlwZTogJ3RleHQvamF2YXNjcmlwdCcgfSkpO1xuICAgICAgICB2YXIgd29ya2VyID0gbmV3IFdvcmtlcihibG9iVVJMKTtcbiAgICAgICAgd29ya2VyLm9ubWVzc2FnZSA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIHJlc29sdmUoKHN0cnVjdHVyZWRDbG9uZSA9IGlzQm9vbGVhbihlLmRhdGEpKSk7XG4gICAgICAgICAgICB3b3JrZXIudGVybWluYXRlKCk7XG4gICAgICAgICAgICBVUkwucmV2b2tlT2JqZWN0VVJMKGJsb2JVUkwpO1xuICAgICAgICB9XG4gICAgICAgIHdvcmtlci5wb3N0TWVzc2FnZShbJ3BpbmcnXSk7XG4gICAgfSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB7XG5cdFVSTCwgaXNTdXBwb3J0ZWQsIHN1cHBvcnRzU3RydWN0dXJlZENsb25lXG59IiwiZXhwb3J0IHZhciBQaW5nID0gYFxub25tZXNzYWdlID0gZnVuY3Rpb24oZSkge1xuXHRwb3N0TWVzc2FnZShBcnJheS5pc0FycmF5KGUuZGF0YSkpO1xufVxuYDtcblxuZXhwb3J0IHZhciBXb3JrZXIgPSBgXG48JSBzY3JpcHRzICU+XG52YXIgc2xpY2UgPSBBcnJheS5wcm90b3R5cGUuc2xpY2U7XG52YXIgXyA9IHsgPCUgdXRpbGl0aWVzICU+IH07XG52YXIgQm9ub2JvID0geyA8JSBhcGkgJT4gfTtcbnZhciBjb25zb2xlID0geyBsb2c6IEJvbm9iby5sb2cgfTtcbm9ubWVzc2FnZSA9IGZ1bmN0aW9uKGUpIHtcblx0dmFyIGRhdGEgPSBlLmRhdGEudXNlckRhdGE7XG5cdGlmICgndHJhbnNmZXInIGluIGUuZGF0YSkge1xuXHRcdHN3aXRjaCAoZS5kYXRhLnRyYW5zZmVyKSB7XG5cdFx0XHRjYXNlICdKU09OX0FCJzpcblx0XHRcdFx0ZGF0YSA9IEpTT04ucGFyc2UoXy5hcnJheUJ1ZmZlclRvU3RyaW5nKGRhdGEpKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlICdTVFJJTkdfQUInOlxuXHRcdFx0XHRkYXRhID0gXy5hcnJheUJ1ZmZlclRvU3RyaW5nKGRhdGEpO1xuXHRcdFx0XHRicmVhaztcblx0XHR9XG5cdH1cblxuXHRzd2l0Y2ggKGUuZGF0YS5tZXRob2QpIHtcblx0XHQ8JSBtZXRob2RzICU+XG5cdH1cbn1cbmA7IiwiZnVuY3Rpb24gbm9vcCgpIHt9XG5cbmZ1bmN0aW9uIGlzRGVmaW5lZChhKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBhICE9PSAndW5kZWZpbmVkJztcbn1cblxuZnVuY3Rpb24gaXNCb29sZWFuKGIpIHtcblx0cmV0dXJuIHR5cGVvZiBiID09PSAnYm9vbGVhbic7XG59XG5cbmZ1bmN0aW9uIGdldENvbnN0cnVjdG9yTmFtZShvKSB7XG4gICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5tYXRjaCgvXFxbb2JqZWN0IChcXHcqKVxcXS8pWzFdO1xufVxuXG5mdW5jdGlvbiBnZXRGdW5jdGlvbk5hbWUoZm4pIHtcbiAgICByZXR1cm4gZm4udG9TdHJpbmcoKS5tYXRjaCgvZnVuY3Rpb24gKFxcdyopLylbMV07XG59XG5cbmZ1bmN0aW9uIGdldEZ1bmN0aW9uQ29udGVudChmbikge1xuICAgIHJldHVybiBmbi50b1N0cmluZygpLnJlcGxhY2UoL15mdW5jdGlvblxccz8oPzpcXHcrKT9cXChcXClcXHM/XFx7KC58W1xcc1xcU10qKVxcfS9nLCAobSwgY29udGVudCkgPT4gY29udGVudCkudHJpbSgpO1xufVxuXG5mdW5jdGlvbiBhcnJheUJ1ZmZlclRvU3RyaW5nKGJ1ZmZlcikge1xuICAgIHZhciBzdHIgPSAnJztcbiAgICB2YXIgYnl0ZXMgPSBuZXcgVWludDE2QXJyYXkoYnVmZmVyKTtcbiAgICBmb3IgKHZhciBpID0gMCwgYnVmZkxlbiA9IChieXRlcy5ieXRlTGVuZ3RoIC8gMik7IGkgPCBidWZmTGVuOyBpKyspIHtcbiAgICAgICAgc3RyICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYnl0ZXNbaV0pO1xuICAgIH1cbiAgICByZXR1cm4gc3RyO1xufVxuXG5mdW5jdGlvbiBzdHJpbmdUb0FycmF5QnVmZmVyKHN0cikge1xuICAgIHZhciBidWZmZXIgPSBuZXcgQXJyYXlCdWZmZXIoc3RyLmxlbmd0aCAqIDIpO1xuICAgIHZhciBidWZmZXJWaWV3ID0gbmV3IFVpbnQxNkFycmF5KGJ1ZmZlcik7XG4gICAgZm9yICh2YXIgaSA9IDAsIHN0ckxlbiA9IHN0ci5sZW5ndGg7IGkgPCBzdHJMZW47IGkrKykge1xuICAgICAgICBidWZmZXJWaWV3W2ldID0gc3RyLmNoYXJDb2RlQXQoaSk7XG4gICAgfVxuICAgIHJldHVybiBidWZmZXI7XG59XG5cbmZ1bmN0aW9uIGZvcm1hdChzdHIsIGRpY3QpIHtcbiAgICByZXR1cm4gc3RyLnRvU3RyaW5nKCkucmVwbGFjZSgvPCVcXHM/KFteXFxzPyU+XSspXFxzPyU+L2csIChtLCBrZXkpID0+IGRpY3Rba2V5XSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBub29wLFxuICAgIGlzRGVmaW5lZCxcbiAgICBpc0Jvb2xlYW4sXG4gICAgZ2V0Q29uc3RydWN0b3JOYW1lLFxuICAgIGdldEZ1bmN0aW9uTmFtZSxcbiAgICBnZXRGdW5jdGlvbkNvbnRlbnQsXG4gICAgYXJyYXlCdWZmZXJUb1N0cmluZyxcbiAgICBzdHJpbmdUb0FycmF5QnVmZmVyLFxuICAgIGZvcm1hdFxufSJdfQ==
