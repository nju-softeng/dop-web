'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.inRange = inRange;
exports.getPercent = getPercent;
exports.getPrecision = getPrecision;
function inRange(value, range, min) {
    if (!Array.isArray(range)) {
        range = [min, range];
    }

    return value >= range[0] && value <= range[1];
}

function getPercent(min, max, value) {
    return (value - min) * 100 / (max - min);
}

function getPrecision(step) {
    var precision = 0;
    var stepString = step.toString();
    if (stepString.indexOf('.') !== -1) {
        precision = stepString.length - stepString.indexOf('.') - 1;
    }
    return precision;
}
// export function debounce(func, wait, immediate) {
//     let timeout;
//     return function() {
//         let context = this, args = arguments;
//         let later = function() {
//             timeout = null;
//             if (!immediate) func.apply(context, args);
//         };
//         let callNow = immediate && !timeout;
//         clearTimeout(timeout);
//         timeout = setTimeout(later, wait);
//         if (callNow) func.apply(context, args);
//     };
// }
// export function throttle(func, wait, options) {
//     /* options的默认值
//      *  表示首次调用返回值方法时，会马上调用func；否则仅会记录当前时刻，当第二次调用的时间间隔超过wait时，才调用func。
//      *  options.leading = true;
//      * 表示当调用方法时，未到达wait指定的时间间隔，则启动计时器延迟调用func函数，若后续在既未达到wait指定的时间间隔和func函数又未被调用的情况下调用返回值方法，则被调用请求将被丢弃。
//      *  options.trailing = true;
//      * 注意：当options.trailing = false时，效果与上面的简单实现效果相同
//      */
//     let context, args, result;
//     let timeout = null;
//     let previous = 0;
//     if (!options) options = {};
//     let later = function() {
//         previous = options.leading === false ? 0 : new Date().getTime();
//         timeout = null;
//         result = func.apply(context, args);
//         if (!timeout) context = args = null;
//     };
//     return function() {
//         let now = new Date().getTime();
//         if (!previous && options.leading === false) previous = now;
//         // 计算剩余时间
//         let remaining = wait - (now - previous);
//         context = this;
//         args = arguments;
//         // 当到达wait指定的时间间隔，则调用func函数
//         // 精彩之处：按理来说remaining <= 0已经足够证明已经到达wait的时间间隔，但这里还考虑到假如客户端修改了系统时间则马上执行func函数。
//         if (remaining <= 0 || remaining > wait) {
//             // 由于setTimeout存在最小时间精度问题，因此会存在到达wait的时间间隔，但之前设置的setTimeout操作还没被执行，因此为保险起见，这里先清理setTimeout操作
//             if (timeout) {
//                 clearTimeout(timeout);
//                 timeout = null;
//             }
//             previous = now;
//             result = func.apply(context, args);
//             if (!timeout) context = args = null;
//         } else if (!timeout && options.trailing !== false) {
//             // options.trailing=true时，延时执行func函数
//             timeout = setTimeout(later, remaining);
//         }
//         return result;
//     };
// }