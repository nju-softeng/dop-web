'use strict';

var PIXEL_PATTERN = /margin|padding|width|height|max|min|offset/;

var getComputedStyle = function getComputedStyle(node) {
    return node.nodeType == 1 ? node.ownerDocument.defaultView.getComputedStyle(node, null) : {};
},
    removePixel = {
    left: true,
    top: true
},
    getStyleValue = function getStyleValue(node, type, value) {
    type = type.toLowerCase();
    if (value === 'auto') {
        if (type === 'height') {
            return node.offsetHeight;
        }
        if (type === 'width') {
            return node.offsetWidth;
        }
    }
    if (!(type in removePixel)) {
        removePixel[type] = PIXEL_PATTERN.test(type);
    }
    return removePixel[type] ? parseFloat(value) || 0 : value;
},
    floatMap = {
    cssFloat: 1,
    styleFloat: 1,
    float: 1
};

function camelize(name) {
    return name.replace(/-(.)/g, function ($0, $1) {
        return $1.toUpperCase();
    });
}

function hyphenate(name) {
    return name.replace(/[A-Z]/g, function ($1) {
        return '-' + $1.toLowerCase();
    });
}

function getStyle(node, name) {
    var length = arguments.length,
        style = getComputedStyle(node);

    name = floatMap[name] ? 'cssFloat' in node.style ? 'cssFloat' : 'styleFloat' : name;

    return length === 1 ? style : getStyleValue(node, name, style.getPropertyValue(hyphenate(name)) || node.style[camelize(name)]);
}

function setStyle(node, name, value) {
    var length = arguments.length;
    name = floatMap[name] ? 'cssFloat' in node.style ? 'cssFloat' : 'styleFloat' : name;
    if (length === 3) {
        if (typeof value === 'number' && PIXEL_PATTERN.test(name)) {
            value = value + 'px';
        }
        return node.style[camelize(name)] = value; // IE8 support.
    }
    for (var x in name) {
        setStyle(node, x, name[x]);
    }
    return getComputedStyle(node);
}

function getOuterWidth(el) {
    if (el === document.body) {
        return document.documentElement.clientWidth;
    }
    return el.offsetWidth;
}

function getOuterHeight(el) {
    if (el === document.body) {
        return window.innerHeight || document.documentElement.clientHeight;
    }
    return el.offsetHeight;
}

function getDocSize() {
    var width = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth),
        height = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);

    return {
        width: width,
        height: height
    };
}

function getClientSize() {
    var width = document.documentElement.clientWidth,
        height = window.innerHeight || document.documentElement.clientHeight;

    return {
        width: width,
        height: height
    };
}

function getScroll() {
    return {
        scrollLeft: Math.max(document.documentElement.scrollLeft, document.body.scrollLeft),
        scrollTop: Math.max(document.documentElement.scrollTop, document.body.scrollTop)
    };
}

function getOffset(node) {
    var box = node.getBoundingClientRect(),
        docElem = document.documentElement;

    return {
        left: box.left + (window.pageXOffset || docElem.scrollLeft) - (docElem.clientLeft || document.body.clientLeft || 0),
        top: box.top + (window.pageYOffset || docElem.scrollTop) - (docElem.clientTop || document.body.clientTop || 0)
    };
}

module.exports = {
    set: setStyle,
    get: getStyle,
    getOuterWidth: getOuterWidth,
    getOuterHeight: getOuterHeight,
    getDocSize: getDocSize,
    getClientSize: getClientSize,
    getScroll: getScroll,
    getOffset: getOffset
};