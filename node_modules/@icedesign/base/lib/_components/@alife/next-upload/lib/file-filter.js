'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports['default'] = filter;
// 过滤掉 `status === error` 的文件
function filter(fileList) {
    var list = [];
    fileList.forEach(function (file) {
        file.status !== 'error' && list.push(file);
    });
    return list;
}
module.exports = exports['default'];