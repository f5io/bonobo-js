(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _modulesUtilities = require("./modules/Utilities");

var isDefined = _modulesUtilities.isDefined;
var getConstructorName = _modulesUtilities.getConstructorName;
var getFunctionName = _modulesUtilities.getFunctionName;

},{"./modules/Utilities":2}],2:[function(require,module,exports){
"use strict";

function noop() {}

function isDefined(a) {
    return typeof a !== "undefined";
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
    getConstructorName: getConstructorName,
    getFunctionName: getFunctionName,
    getFunctionContent: getFunctionContent,
    arrayBufferToString: arrayBufferToString,
    stringToArrayBuffer: stringToArrayBuffer,
    format: format
};

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvam9laGFybG93L1Byb2plY3RzL2Jvbm9iby1qcy9zcmMvaW5kZXguanMiLCIvVXNlcnMvam9laGFybG93L1Byb2plY3RzL2Jvbm9iby1qcy9zcmMvbW9kdWxlcy9VdGlsaXRpZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztnQ0NBK0QscUJBQXFCOztJQUEzRSxTQUFTLHFCQUFULFNBQVM7SUFBRSxrQkFBa0IscUJBQWxCLGtCQUFrQjtJQUFFLGVBQWUscUJBQWYsZUFBZTs7Ozs7QUNBdkQsU0FBUyxJQUFJLEdBQUcsRUFBRTs7QUFFbEIsU0FBUyxTQUFTLENBQUMsQ0FBQyxFQUFFO0FBQ2xCLFdBQU8sT0FBTyxDQUFDLEtBQUssV0FBVyxDQUFDO0NBQ25DOztBQUVELFNBQVMsa0JBQWtCLENBQUMsQ0FBQyxFQUFFO0FBQzNCLFdBQU8sTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQ3pFOztBQUVELFNBQVMsZUFBZSxDQUFDLEVBQUUsRUFBRTtBQUN6QixXQUFPLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUNuRDs7QUFFRCxTQUFTLGtCQUFrQixDQUFDLEVBQUUsRUFBRTtBQUM1QixXQUFPLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxPQUFPLENBQUMsNkNBQTZDLEVBQUUsVUFBQyxDQUFDLEVBQUUsT0FBTztlQUFNLE9BQU87S0FBQSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7Q0FDaEg7O0FBRUQsU0FBUyxtQkFBbUIsQ0FBQyxNQUFNLEVBQUU7QUFDakMsUUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDO0FBQ2IsUUFBSSxLQUFLLEdBQUcsSUFBSSxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDcEMsU0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsT0FBTyxHQUFJLEtBQUssQ0FBQyxVQUFVLEdBQUcsQ0FBQyxBQUFDLEVBQUUsQ0FBQyxHQUFHLE9BQU8sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUNoRSxXQUFHLElBQUksTUFBTSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUN4QztBQUNELFdBQU8sR0FBRyxDQUFDO0NBQ2Q7O0FBRUQsU0FBUyxtQkFBbUIsQ0FBQyxHQUFHLEVBQUU7QUFDOUIsUUFBSSxNQUFNLEdBQUcsSUFBSSxXQUFXLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztBQUM3QyxRQUFJLFVBQVUsR0FBRyxJQUFJLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUN6QyxTQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxNQUFNLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ2xELGtCQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNyQztBQUNELFdBQU8sTUFBTSxDQUFDO0NBQ2pCOztBQUVELFNBQVMsTUFBTSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUU7QUFDdkIsV0FBTyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUMsT0FBTyxDQUFDLHdCQUF3QixFQUFFLFVBQUMsQ0FBQyxFQUFFLEdBQUc7ZUFBSyxJQUFJLENBQUMsR0FBRyxDQUFDO0tBQUEsQ0FBQyxDQUFDO0NBQ2xGOztpQkFFYztBQUNYLFFBQUksRUFBSixJQUFJO0FBQ0osYUFBUyxFQUFULFNBQVM7QUFDVCxzQkFBa0IsRUFBbEIsa0JBQWtCO0FBQ2xCLG1CQUFlLEVBQWYsZUFBZTtBQUNmLHNCQUFrQixFQUFsQixrQkFBa0I7QUFDbEIsdUJBQW1CLEVBQW5CLG1CQUFtQjtBQUNuQix1QkFBbUIsRUFBbkIsbUJBQW1CO0FBQ25CLFVBQU0sRUFBTixNQUFNO0NBQ1QiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IHsgaXNEZWZpbmVkLCBnZXRDb25zdHJ1Y3Rvck5hbWUsIGdldEZ1bmN0aW9uTmFtZSB9IGZyb20gJy4vbW9kdWxlcy9VdGlsaXRpZXMnOyIsImZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5mdW5jdGlvbiBpc0RlZmluZWQoYSkge1xuICAgIHJldHVybiB0eXBlb2YgYSAhPT0gJ3VuZGVmaW5lZCc7XG59XG5cbmZ1bmN0aW9uIGdldENvbnN0cnVjdG9yTmFtZShvKSB7XG4gICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5tYXRjaCgvXFxbb2JqZWN0IChcXHcqKVxcXS8pWzFdO1xufVxuXG5mdW5jdGlvbiBnZXRGdW5jdGlvbk5hbWUoZm4pIHtcbiAgICByZXR1cm4gZm4udG9TdHJpbmcoKS5tYXRjaCgvZnVuY3Rpb24gKFxcdyopLylbMV07XG59XG5cbmZ1bmN0aW9uIGdldEZ1bmN0aW9uQ29udGVudChmbikge1xuICAgIHJldHVybiBmbi50b1N0cmluZygpLnJlcGxhY2UoL15mdW5jdGlvblxccz8oPzpcXHcrKT9cXChcXClcXHM/XFx7KC58W1xcc1xcU10qKVxcfS9nLCAobSwgY29udGVudCkgPT4gIGNvbnRlbnQpLnRyaW0oKTtcbn1cblxuZnVuY3Rpb24gYXJyYXlCdWZmZXJUb1N0cmluZyhidWZmZXIpIHtcbiAgICB2YXIgc3RyID0gJyc7XG4gICAgdmFyIGJ5dGVzID0gbmV3IFVpbnQxNkFycmF5KGJ1ZmZlcik7XG4gICAgZm9yICh2YXIgaSA9IDAsIGJ1ZmZMZW4gPSAoYnl0ZXMuYnl0ZUxlbmd0aCAvIDIpOyBpIDwgYnVmZkxlbjsgaSsrKSB7XG4gICAgICAgIHN0ciArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGJ5dGVzW2ldKTtcbiAgICB9XG4gICAgcmV0dXJuIHN0cjtcbn1cblxuZnVuY3Rpb24gc3RyaW5nVG9BcnJheUJ1ZmZlcihzdHIpIHtcbiAgICB2YXIgYnVmZmVyID0gbmV3IEFycmF5QnVmZmVyKHN0ci5sZW5ndGggKiAyKTtcbiAgICB2YXIgYnVmZmVyVmlldyA9IG5ldyBVaW50MTZBcnJheShidWZmZXIpO1xuICAgIGZvciAodmFyIGkgPSAwLCBzdHJMZW4gPSBzdHIubGVuZ3RoOyBpIDwgc3RyTGVuOyBpKyspIHtcbiAgICAgICAgYnVmZmVyVmlld1tpXSA9IHN0ci5jaGFyQ29kZUF0KGkpO1xuICAgIH1cbiAgICByZXR1cm4gYnVmZmVyO1xufVxuXG5mdW5jdGlvbiBmb3JtYXQoc3RyLCBkaWN0KSB7XG4gICAgcmV0dXJuIHN0ci50b1N0cmluZygpLnJlcGxhY2UoLzwlXFxzPyhbXlxccz8lPl0rKVxccz8lPi9nLCAobSwga2V5KSA9PiBkaWN0W2tleV0pO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgbm9vcCxcbiAgICBpc0RlZmluZWQsXG4gICAgZ2V0Q29uc3RydWN0b3JOYW1lLFxuICAgIGdldEZ1bmN0aW9uTmFtZSxcbiAgICBnZXRGdW5jdGlvbkNvbnRlbnQsXG4gICAgYXJyYXlCdWZmZXJUb1N0cmluZyxcbiAgICBzdHJpbmdUb0FycmF5QnVmZmVyLFxuICAgIGZvcm1hdFxufSJdfQ==
