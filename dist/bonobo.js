(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

var Support = _interopRequireWildcard(require("./modules/Support"));

var Utilities = _interopRequireWildcard(require("./modules/Utilities"));

},{"./modules/Support":2,"./modules/Utilities":4}],2:[function(require,module,exports){
"use strict";

var Ping = require("./Templates").Ping;

var isBoolean = require("./Utilities").isBoolean;

var URL;

var structuredClone = false;

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

(function () {
    if (!isSupported) structuredClone = false;
    var blob = URL.createObjectURL(new Blob([Ping], { type: "text/javascript" }));
    var worker = new Worker(blob);
    worker.onmessage = function (e) {
        structuredClone = isBoolean(e.data) ? true : false;
        worker.terminate();
        URL.revokeObjectURL(blob);
    };
    worker.postMessage(["ping"]);
})();

module.exports = {
    URL: URL, isSupported: isSupported
};

},{"./Templates":3,"./Utilities":4}],3:[function(require,module,exports){
"use strict";

var Ping = exports.Ping = "\nonmessage = function(e) {\n\tpostMessage(Array.isArray(e.data) ? true : false);\n}\n";

var Worker = exports.Worker = "worker";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvam9lL1dvcmtzcGFjZS9Gb3VydGggb2YgNS9ib25vYm8tanMvc3JjL2luZGV4LmpzIiwiL1VzZXJzL2pvZS9Xb3Jrc3BhY2UvRm91cnRoIG9mIDUvYm9ub2JvLWpzL3NyYy9tb2R1bGVzL1N1cHBvcnQuanMiLCIvVXNlcnMvam9lL1dvcmtzcGFjZS9Gb3VydGggb2YgNS9ib25vYm8tanMvc3JjL21vZHVsZXMvVGVtcGxhdGVzLmpzIiwiL1VzZXJzL2pvZS9Xb3Jrc3BhY2UvRm91cnRoIG9mIDUvYm9ub2JvLWpzL3NyYy9tb2R1bGVzL1V0aWxpdGllcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7SUNBWSxPQUFPLG1DQUFNLG1CQUFtQjs7SUFDaEMsU0FBUyxtQ0FBTSxxQkFBcUI7Ozs7O0lDRHZDLElBQUksV0FBUSxhQUFhLEVBQXpCLElBQUk7O0lBQ0osU0FBUyxXQUFRLGFBQWEsRUFBOUIsU0FBUzs7QUFFbEIsSUFBSSxHQUFHLENBQUM7O0FBRVIsSUFBSSxlQUFlLEdBQUcsS0FBSyxDQUFDOztBQUU1QixJQUFJLFdBQVcsR0FBRyxDQUFDLFlBQVc7QUFDMUIsV0FBTyxRQUFRLElBQUksTUFBTSxJQUNyQixNQUFNLElBQUksTUFBTSxLQUNmLFdBQVcsSUFBSSxNQUFNLElBQUksS0FBSyxJQUFJLE1BQU0sQ0FBQSxBQUFDLElBQzFDLENBQUMsQ0FBQyxDQUFDLFlBQVc7QUFDVixZQUFJO0FBQ0EsZUFBRyxHQUFHLE1BQU0sQ0FBQyxHQUFHLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQztBQUNyQyxnQkFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDLGVBQWUsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLGlCQUFpQixFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQzdF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QW1CLENBQUMsR0FBRyxFQUFFO0FBQzlCLFFBQUksTUFBTSxHQUFHLElBQUksV0FBVyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDN0MsUUFBSSxVQUFVLEdBQUcsSUFBSSxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDekMsU0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsTUFBTSxHQUFHLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUNsRCxrQkFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDckM7QUFDRCxXQUFPLE1BQU0sQ0FBQztDQUNqQjs7QUFFRCxTQUFTLE1BQU0sQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFO0FBQ3ZCLFdBQU8sR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDLE9BQU8sQ0FBQyx3QkFBd0IsRUFBRSxVQUFDLENBQUMsRUFBRSxHQUFHO2VBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQztLQUFBLENBQUMsQ0FBQztDQUNsRjs7aUJBRWM7QUFDWCxRQUFJLEVBQUosSUFBSTtBQUNKLGFBQVMsRUFBVCxTQUFTO0FBQ1QsYUFBUyxFQUFULFNBQVM7QUFDVCxzQkFBa0IsRUFBbEIsa0JBQWtCO0FBQ2xCLG1CQUFlLEVBQWYsZUFBZTtBQUNmLHNCQUFrQixFQUFsQixrQkFBa0I7QUFDbEIsdUJBQW1CLEVBQW5CLG1CQUFtQjtBQUNuQix1QkFBbUIsRUFBbkIsbUJBQW1CO0FBQ25CLFVBQU0sRUFBTixNQUFNO0NBQ1QiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0ICogYXMgU3VwcG9ydCBmcm9tICcuL21vZHVsZXMvU3VwcG9ydCc7XG5pbXBvcnQgKiBhcyBVdGlsaXRpZXMgZnJvbSAnLi9tb2R1bGVzL1V0aWxpdGllcyc7IiwiaW1wb3J0IHsgUGluZyB9IGZyb20gJy4vVGVtcGxhdGVzJztcbmltcG9ydCB7IGlzQm9vbGVhbiB9IGZyb20gJy4vVXRpbGl0aWVzJztcblxudmFyIFVSTDtcblxudmFyIHN0cnVjdHVyZWRDbG9uZSA9IGZhbHNlO1xuXG52YXIgaXNTdXBwb3J0ZWQgPSAoZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuICdXb3JrZXInIGluIHdpbmRvdyAmJlxuICAgICAgICAnQmxvYicgaW4gd2luZG93ICYmXG4gICAgICAgICgnd2Via2l0VVJMJyBpbiB3aW5kb3cgfHwgJ1VSTCcgaW4gd2luZG93KSAmJlxuICAgICAgICAhIShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgVVJMID0gd2luZG93LlVSTCB8fCB3aW5kb3cud2Via2l0VVJMO1xuICAgICAgICAgICAgICAgIHZhciB0ZXN0ID0gVVJMLmNyZWF0ZU9iamVjdFVSTChuZXcgQmxvYihbJzsnXSwgeyB0eXBlOiAndGV4dC9qYXZhc2NyaXB0JyB9KSk7XG4gICAgICAgICAgICAgICAgdmFyIHdyayA9IG5ldyBXb3JrZXIodGVzdCk7XG4gICAgICAgICAgICAgICAgd3JrLnRlcm1pbmF0ZSgpO1xuICAgICAgICAgICAgICAgIFVSTC5yZXZva2VPYmplY3RVUkwodGVzdCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KSgpO1xufSkoKTtcblxuKGZ1bmN0aW9uKCkge1xuICAgIGlmICghaXNTdXBwb3J0ZWQpIHN0cnVjdHVyZWRDbG9uZSA9IGZhbHNlO1xuICAgIHZhciBibG9iID0gVVJMLmNyZWF0ZU9iamVjdFVSTChuZXcgQmxvYihbUGluZ10sIHsgdHlwZTogJ3RleHQvamF2YXNjcmlwdCcgfSkpO1xuICAgIHZhciB3b3JrZXIgPSBuZXcgV29ya2VyKGJsb2IpO1xuICAgIHdvcmtlci5vbm1lc3NhZ2UgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgIHN0cnVjdHVyZWRDbG9uZSA9IGlzQm9vbGVhbihlLmRhdGEpID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgICB3b3JrZXIudGVybWluYXRlKCk7XG4gICAgICAgIFVSTC5yZXZva2VPYmplY3RVUkwoYmxvYik7XG4gICAgfVxuICAgIHdvcmtlci5wb3N0TWVzc2FnZShbJ3BpbmcnXSk7XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCB7XG5cdFVSTCwgaXNTdXBwb3J0ZWRcbn0iLCJleHBvcnQgdmFyIFBpbmcgPSBgXG5vbm1lc3NhZ2UgPSBmdW5jdGlvbihlKSB7XG5cdHBvc3RNZXNzYWdlKEFycmF5LmlzQXJyYXkoZS5kYXRhKSA/IHRydWUgOiBmYWxzZSk7XG59XG5gO1xuXG5leHBvcnQgdmFyIFdvcmtlciA9IGB3b3JrZXJgOyIsImZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5mdW5jdGlvbiBpc0RlZmluZWQoYSkge1xuICAgIHJldHVybiB0eXBlb2YgYSAhPT0gJ3VuZGVmaW5lZCc7XG59XG5cbmZ1bmN0aW9uIGlzQm9vbGVhbihiKSB7XG5cdHJldHVybiB0eXBlb2YgYiA9PT0gJ2Jvb2xlYW4nO1xufVxuXG5mdW5jdGlvbiBnZXRDb25zdHJ1Y3Rvck5hbWUobykge1xuICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykubWF0Y2goL1xcW29iamVjdCAoXFx3KilcXF0vKVsxXTtcbn1cblxuZnVuY3Rpb24gZ2V0RnVuY3Rpb25OYW1lKGZuKSB7XG4gICAgcmV0dXJuIGZuLnRvU3RyaW5nKCkubWF0Y2goL2Z1bmN0aW9uIChcXHcqKS8pWzFdO1xufVxuXG5mdW5jdGlvbiBnZXRGdW5jdGlvbkNvbnRlbnQoZm4pIHtcbiAgICByZXR1cm4gZm4udG9TdHJpbmcoKS5yZXBsYWNlKC9eZnVuY3Rpb25cXHM/KD86XFx3Kyk/XFwoXFwpXFxzP1xceygufFtcXHNcXFNdKilcXH0vZywgKG0sIGNvbnRlbnQpID0+ICBjb250ZW50KS50cmltKCk7XG59XG5cbmZ1bmN0aW9uIGFycmF5QnVmZmVyVG9TdHJpbmcoYnVmZmVyKSB7XG4gICAgdmFyIHN0ciA9ICcnO1xuICAgIHZhciBieXRlcyA9IG5ldyBVaW50MTZBcnJheShidWZmZXIpO1xuICAgIGZvciAodmFyIGkgPSAwLCBidWZmTGVuID0gKGJ5dGVzLmJ5dGVMZW5ndGggLyAyKTsgaSA8IGJ1ZmZMZW47IGkrKykge1xuICAgICAgICBzdHIgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShieXRlc1tpXSk7XG4gICAgfVxuICAgIHJldHVybiBzdHI7XG59XG5cbmZ1bmN0aW9uIHN0cmluZ1RvQXJyYXlCdWZmZXIoc3RyKSB7XG4gICAgdmFyIGJ1ZmZlciA9IG5ldyBBcnJheUJ1ZmZlcihzdHIubGVuZ3RoICogMik7XG4gICAgdmFyIGJ1ZmZlclZpZXcgPSBuZXcgVWludDE2QXJyYXkoYnVmZmVyKTtcbiAgICBmb3IgKHZhciBpID0gMCwgc3RyTGVuID0gc3RyLmxlbmd0aDsgaSA8IHN0ckxlbjsgaSsrKSB7XG4gICAgICAgIGJ1ZmZlclZpZXdbaV0gPSBzdHIuY2hhckNvZGVBdChpKTtcbiAgICB9XG4gICAgcmV0dXJuIGJ1ZmZlcjtcbn1cblxuZnVuY3Rpb24gZm9ybWF0KHN0ciwgZGljdCkge1xuICAgIHJldHVybiBzdHIudG9TdHJpbmcoKS5yZXBsYWNlKC88JVxccz8oW15cXHM/JT5dKylcXHM/JT4vZywgKG0sIGtleSkgPT4gZGljdFtrZXldKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIG5vb3AsXG4gICAgaXNEZWZpbmVkLFxuICAgIGlzQm9vbGVhbixcbiAgICBnZXRDb25zdHJ1Y3Rvck5hbWUsXG4gICAgZ2V0RnVuY3Rpb25OYW1lLFxuICAgIGdldEZ1bmN0aW9uQ29udGVudCxcbiAgICBhcnJheUJ1ZmZlclRvU3RyaW5nLFxuICAgIHN0cmluZ1RvQXJyYXlCdWZmZXIsXG4gICAgZm9ybWF0XG59Il19
