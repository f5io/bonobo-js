(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _modulesUtilities = require("./modules/Utilities");

var isDefined = _modulesUtilities.isDefined;
var getConstructorName = _modulesUtilities.getConstructorName;
var getFunctionName = _modulesUtilities.getFunctionName;

},{"./modules/Utilities":2}],2:[function(require,module,exports){
"use strict";

var isDefined = exports.isDefined = function (a) {
  return typeof a !== "undefined";
};

var getConstructorName = exports.getConstructorName = function (o) {
  return Object.prototype.toString.call(o).match(/\[object (\w*)\]/)[1];
};

var getFunctionName = exports.getFunctionName = function (fn) {
  return fn.toString().match(/function (\w*)/)[1];
};
Object.defineProperty(exports, "__esModule", {
  value: true
});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvam9lL1dvcmtzcGFjZS9Gb3VydGggb2YgNS9ib25vYm8tanMvc3JjL2luZGV4LmpzIiwiL1VzZXJzL2pvZS9Xb3Jrc3BhY2UvRm91cnRoIG9mIDUvYm9ub2JvLWpzL3NyYy9tb2R1bGVzL1V0aWxpdGllcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O2dDQ0ErRCxxQkFBcUI7O0lBQTNFLFNBQVMscUJBQVQsU0FBUztJQUFFLGtCQUFrQixxQkFBbEIsa0JBQWtCO0lBQUUsZUFBZSxxQkFBZixlQUFlOzs7OztBQ0FoRCxJQUFJLFNBQVMsV0FBVCxTQUFTLEdBQUcsVUFBQSxDQUFDO1NBQUksT0FBTyxDQUFDLEtBQUssV0FBVztDQUFBLENBQUM7O0FBRTlDLElBQUksa0JBQWtCLFdBQWxCLGtCQUFrQixHQUFHLFVBQUEsQ0FBQztTQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FBQSxDQUFDOztBQUU3RixJQUFJLGVBQWUsV0FBZixlQUFlLEdBQUcsVUFBQSxFQUFFO1NBQUksRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUFBLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IHsgaXNEZWZpbmVkLCBnZXRDb25zdHJ1Y3Rvck5hbWUsIGdldEZ1bmN0aW9uTmFtZSB9IGZyb20gJy4vbW9kdWxlcy9VdGlsaXRpZXMnOyIsImV4cG9ydCB2YXIgaXNEZWZpbmVkID0gYSA9PiB0eXBlb2YgYSAhPT0gJ3VuZGVmaW5lZCc7XG5cbmV4cG9ydCB2YXIgZ2V0Q29uc3RydWN0b3JOYW1lID0gbyA9PiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykubWF0Y2goL1xcW29iamVjdCAoXFx3KilcXF0vKVsxXTtcblxuZXhwb3J0IHZhciBnZXRGdW5jdGlvbk5hbWUgPSBmbiA9PiBmbi50b1N0cmluZygpLm1hdGNoKC9mdW5jdGlvbiAoXFx3KikvKVsxXTsiXX0=
