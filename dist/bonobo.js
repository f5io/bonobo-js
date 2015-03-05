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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvam9laGFybG93L1Byb2plY3RzL2Jvbm9iby1qcy9zcmMvaW5kZXguanMiLCIvVXNlcnMvam9laGFybG93L1Byb2plY3RzL2Jvbm9iby1qcy9zcmMvbW9kdWxlcy9VdGlsaXRpZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztnQ0NBK0QscUJBQXFCOztJQUEzRSxTQUFTLHFCQUFULFNBQVM7SUFBRSxrQkFBa0IscUJBQWxCLGtCQUFrQjtJQUFFLGVBQWUscUJBQWYsZUFBZTs7Ozs7QUNBaEQsSUFBSSxTQUFTLFdBQVQsU0FBUyxHQUFHLFVBQUEsQ0FBQztTQUFJLE9BQU8sQ0FBQyxLQUFLLFdBQVc7Q0FBQSxDQUFDOztBQUU5QyxJQUFJLGtCQUFrQixXQUFsQixrQkFBa0IsR0FBRyxVQUFBLENBQUM7U0FBSSxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQUEsQ0FBQzs7QUFFN0YsSUFBSSxlQUFlLFdBQWYsZUFBZSxHQUFHLFVBQUEsRUFBRTtTQUFJLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FBQSxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCB7IGlzRGVmaW5lZCwgZ2V0Q29uc3RydWN0b3JOYW1lLCBnZXRGdW5jdGlvbk5hbWUgfSBmcm9tICcuL21vZHVsZXMvVXRpbGl0aWVzJzsiLCJleHBvcnQgdmFyIGlzRGVmaW5lZCA9IGEgPT4gdHlwZW9mIGEgIT09ICd1bmRlZmluZWQnO1xuXG5leHBvcnQgdmFyIGdldENvbnN0cnVjdG9yTmFtZSA9IG8gPT4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLm1hdGNoKC9cXFtvYmplY3QgKFxcdyopXFxdLylbMV07XG5cbmV4cG9ydCB2YXIgZ2V0RnVuY3Rpb25OYW1lID0gZm4gPT4gZm4udG9TdHJpbmcoKS5tYXRjaCgvZnVuY3Rpb24gKFxcdyopLylbMV07Il19
