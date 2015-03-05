(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _modulesUtilities = require("./modules/Utilities");

var isDefined = _modulesUtilities.isDefined;
var getConstructorName = _modulesUtilities.getConstructorName;
var getFunctionName = _modulesUtilities.getFunctionName;

},{"./modules/Utilities":2}],2:[function(require,module,exports){
"use strict";

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
    });
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
    isDefined: isDefined,
    getConstructorName: getConstructorName,
    getFunctionName: getFunctionName,
    getFunctionContent: getFunctionContent,
    arrayBufferToString: arrayBufferToString,
    stringToArrayBuffer: stringToArrayBuffer,
    format: format
};

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvam9laGFybG93L1Byb2plY3RzL2Jvbm9iby1qcy9zcmMvaW5kZXguanMiLCIvVXNlcnMvam9laGFybG93L1Byb2plY3RzL2Jvbm9iby1qcy9zcmMvbW9kdWxlcy9VdGlsaXRpZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztnQ0NBK0QscUJBQXFCOztJQUEzRSxTQUFTLHFCQUFULFNBQVM7SUFBRSxrQkFBa0IscUJBQWxCLGtCQUFrQjtJQUFFLGVBQWUscUJBQWYsZUFBZTs7Ozs7QUNBdkQsU0FBUyxTQUFTLENBQUMsQ0FBQyxFQUFFO0FBQ2xCLFdBQU8sT0FBTyxDQUFDLEtBQUssV0FBVyxDQUFDO0NBQ25DOztBQUVELFNBQVMsa0JBQWtCLENBQUMsQ0FBQyxFQUFFO0FBQzNCLFdBQU8sTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQ3pFOztBQUVELFNBQVMsZUFBZSxDQUFDLEVBQUUsRUFBRTtBQUN6QixXQUFPLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUNuRDs7QUFFRCxTQUFTLGtCQUFrQixDQUFDLEVBQUUsRUFBRTtBQUM1QixXQUFPLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxPQUFPLENBQUMsNkNBQTZDLEVBQUUsVUFBQyxDQUFDLEVBQUUsT0FBTztlQUFNLE9BQU87S0FBQSxDQUFDLENBQUM7Q0FDekc7O0FBRUQsU0FBUyxtQkFBbUIsQ0FBQyxNQUFNLEVBQUU7QUFDakMsUUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDO0FBQ2IsUUFBSSxLQUFLLEdBQUcsSUFBSSxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDcEMsU0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsT0FBTyxHQUFJLEtBQUssQ0FBQyxVQUFVLEdBQUcsQ0FBQyxBQUFDLEVBQUUsQ0FBQyxHQUFHLE9BQU8sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUNoRSxXQUFHLElBQUksTUFBTSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUN4QztBQUNELFdBQU8sR0FBRyxDQUFDO0NBQ2Q7O0FBRUQsU0FBUyxtQkFBbUIsQ0FBQyxHQUFHLEVBQUU7QUFDOUIsUUFBSSxNQUFNLEdBQUcsSUFBSSxXQUFXLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztBQUM3QyxRQUFJLFVBQVUsR0FBRyxJQUFJLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUN6QyxTQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxNQUFNLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ2xELGtCQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNyQztBQUNELFdBQU8sTUFBTSxDQUFDO0NBQ2pCOztBQUVELFNBQVMsTUFBTSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUU7QUFDdkIsV0FBTyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUMsT0FBTyxDQUFDLHdCQUF3QixFQUFFLFVBQUMsQ0FBQyxFQUFFLEdBQUc7ZUFBSyxJQUFJLENBQUMsR0FBRyxDQUFDO0tBQUEsQ0FBQyxDQUFDO0NBQ2xGOztpQkFFYztBQUNYLGFBQVMsRUFBVCxTQUFTO0FBQ1Qsc0JBQWtCLEVBQWxCLGtCQUFrQjtBQUNsQixtQkFBZSxFQUFmLGVBQWU7QUFDZixzQkFBa0IsRUFBbEIsa0JBQWtCO0FBQ2xCLHVCQUFtQixFQUFuQixtQkFBbUI7QUFDbkIsdUJBQW1CLEVBQW5CLG1CQUFtQjtBQUNuQixVQUFNLEVBQU4sTUFBTTtDQUNUIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCB7IGlzRGVmaW5lZCwgZ2V0Q29uc3RydWN0b3JOYW1lLCBnZXRGdW5jdGlvbk5hbWUgfSBmcm9tICcuL21vZHVsZXMvVXRpbGl0aWVzJzsiLCJmdW5jdGlvbiBpc0RlZmluZWQoYSkge1xuICAgIHJldHVybiB0eXBlb2YgYSAhPT0gJ3VuZGVmaW5lZCc7XG59XG5cbmZ1bmN0aW9uIGdldENvbnN0cnVjdG9yTmFtZShvKSB7XG4gICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5tYXRjaCgvXFxbb2JqZWN0IChcXHcqKVxcXS8pWzFdO1xufVxuXG5mdW5jdGlvbiBnZXRGdW5jdGlvbk5hbWUoZm4pIHtcbiAgICByZXR1cm4gZm4udG9TdHJpbmcoKS5tYXRjaCgvZnVuY3Rpb24gKFxcdyopLylbMV07XG59XG5cbmZ1bmN0aW9uIGdldEZ1bmN0aW9uQ29udGVudChmbikge1xuICAgIHJldHVybiBmbi50b1N0cmluZygpLnJlcGxhY2UoL15mdW5jdGlvblxccz8oPzpcXHcrKT9cXChcXClcXHM/XFx7KC58W1xcc1xcU10qKVxcfS9nLCAobSwgY29udGVudCkgPT4gIGNvbnRlbnQpO1xufVxuXG5mdW5jdGlvbiBhcnJheUJ1ZmZlclRvU3RyaW5nKGJ1ZmZlcikge1xuICAgIHZhciBzdHIgPSAnJztcbiAgICB2YXIgYnl0ZXMgPSBuZXcgVWludDE2QXJyYXkoYnVmZmVyKTtcbiAgICBmb3IgKHZhciBpID0gMCwgYnVmZkxlbiA9IChieXRlcy5ieXRlTGVuZ3RoIC8gMik7IGkgPCBidWZmTGVuOyBpKyspIHtcbiAgICAgICAgc3RyICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYnl0ZXNbaV0pO1xuICAgIH1cbiAgICByZXR1cm4gc3RyO1xufVxuXG5mdW5jdGlvbiBzdHJpbmdUb0FycmF5QnVmZmVyKHN0cikge1xuICAgIHZhciBidWZmZXIgPSBuZXcgQXJyYXlCdWZmZXIoc3RyLmxlbmd0aCAqIDIpO1xuICAgIHZhciBidWZmZXJWaWV3ID0gbmV3IFVpbnQxNkFycmF5KGJ1ZmZlcik7XG4gICAgZm9yICh2YXIgaSA9IDAsIHN0ckxlbiA9IHN0ci5sZW5ndGg7IGkgPCBzdHJMZW47IGkrKykge1xuICAgICAgICBidWZmZXJWaWV3W2ldID0gc3RyLmNoYXJDb2RlQXQoaSk7XG4gICAgfVxuICAgIHJldHVybiBidWZmZXI7XG59XG5cbmZ1bmN0aW9uIGZvcm1hdChzdHIsIGRpY3QpIHtcbiAgICByZXR1cm4gc3RyLnRvU3RyaW5nKCkucmVwbGFjZSgvPCVcXHM/KFteXFxzPyU+XSspXFxzPyU+L2csIChtLCBrZXkpID0+IGRpY3Rba2V5XSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBpc0RlZmluZWQsXG4gICAgZ2V0Q29uc3RydWN0b3JOYW1lLFxuICAgIGdldEZ1bmN0aW9uTmFtZSxcbiAgICBnZXRGdW5jdGlvbkNvbnRlbnQsXG4gICAgYXJyYXlCdWZmZXJUb1N0cmluZyxcbiAgICBzdHJpbmdUb0FycmF5QnVmZmVyLFxuICAgIGZvcm1hdFxufSJdfQ==
