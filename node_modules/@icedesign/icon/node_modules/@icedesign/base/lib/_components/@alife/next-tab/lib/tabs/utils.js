'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getWidth = getWidth;
exports.getHeight = getHeight;
exports.isIE8 = isIE8;
exports.getTransformPropertyName = getTransformPropertyName;
// 获取元素的宽
function getWidth(elem) {
    if (!elem) {
        return 0;
    }
    return elem.offsetWidth;
}

// 获取元素的高度
function getHeight(elem) {
    if (!elem) {
        return 0;
    }
    return elem.offsetHeight;
}

// 是否为 IE8 浏览器
function isIE8() {
    /* istanbul ignore if  */
    if (!document || typeof document === 'undefined') {
        return false;
    }
    var documentMode = document.documentMode || 0;
    return documentMode === 8;
}

var transformPropertyName = void 0;

function getTransformPropertyName() {
    /* istanbul ignore if  */
    if (!window.getComputedStyle) {
        return false;
    }
    if (transformPropertyName !== undefined) {
        return transformPropertyName;
    }
    var el = document.createElement('p');
    var has3d = void 0;
    var transforms = {
        webkitTransform: '-webkit-transform',
        OTransform: '-o-transform',
        msTransform: '-ms-transform',
        MozTransform: '-moz-transform',
        transform: 'transform'
    };
    // Add it to the body to get the computed style.
    document.body.insertBefore(el, null);
    for (var t in transforms) {
        if (el.style[t] !== undefined) {
            el.style[t] = 'translate3d(1px,1px,1px)';
            has3d = window.getComputedStyle(el).getPropertyValue(transforms[t]);
            if (has3d !== undefined && has3d.length > 0 && has3d !== 'none') {
                transformPropertyName = t;
            }
        }
    }
    document.body.removeChild(el);
    return transformPropertyName;
}