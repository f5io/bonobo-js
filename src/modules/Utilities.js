function noop() {}

function isDefined(a) {
    return typeof a !== 'undefined';
}

function getConstructorName(o) {
    return Object.prototype.toString.call(o).match(/\[object (\w*)\]/)[1];
}

function getFunctionName(fn) {
    return fn.toString().match(/function (\w*)/)[1];
}

function getFunctionContent(fn) {
    return fn.toString().replace(/^function\s?(?:\w+)?\(\)\s?\{(.|[\s\S]*)\}/g, (m, content) =>  content).trim();
}

function arrayBufferToString(buffer) {
    var str = '';
    var bytes = new Uint16Array(buffer);
    for (var i = 0, buffLen = (bytes.byteLength / 2); i < buffLen; i++) {
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
    return str.toString().replace(/<%\s?([^\s?%>]+)\s?%>/g, (m, key) => dict[key]);
}

export default {
    noop,
    isDefined,
    getConstructorName,
    getFunctionName,
    getFunctionContent,
    arrayBufferToString,
    stringToArrayBuffer,
    format
}