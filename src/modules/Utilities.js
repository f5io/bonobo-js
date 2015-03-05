export var isDefined = a => typeof a !== 'undefined';

export var getConstructorName = o => Object.prototype.toString.call(o).match(/\[object (\w*)\]/)[1];

export var getFunctionName = fn => fn.toString().match(/function (\w*)/)[1];