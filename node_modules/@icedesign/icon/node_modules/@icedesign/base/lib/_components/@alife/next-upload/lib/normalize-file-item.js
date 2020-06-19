'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports['default'] = normalize;

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _index = require('./util/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function normalize(file) {
    var tempObj = {
        originFileObj: file,
        fileName: file.name
    };

    for (var prop in file) {
        if (file[prop] && typeof file[prop] !== 'function') {
            tempObj[prop] = file[prop];
        }
    }

    return (0, _objectAssign2['default'])({}, tempObj, {
        uid: file.uid || (0, _index.uid)(),
        percent: file.percent || 0
    });
}
module.exports = exports['default'];