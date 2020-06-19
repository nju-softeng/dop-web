'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _button = require('./view/button.js');

var _button2 = _interopRequireDefault(_button);

var _group = require('./view/group.js');

var _group2 = _interopRequireDefault(_group);

var _split = require('./view/split.js');

var _split2 = _interopRequireDefault(_split);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

_button2['default'].Group = _group2['default'];
_button2['default'].Split = _split2['default'];

exports['default'] = _button2['default'];
module.exports = exports['default'];