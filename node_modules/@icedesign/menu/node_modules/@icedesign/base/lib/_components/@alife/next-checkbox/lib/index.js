'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _checkbox = require('./checkbox.js');

var _checkbox2 = _interopRequireDefault(_checkbox);

var _checkboxGroup = require('./checkbox-group.js');

var _checkboxGroup2 = _interopRequireDefault(_checkboxGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

_checkbox2['default'].Group = _checkboxGroup2['default'];

exports['default'] = _checkbox2['default'];
module.exports = exports['default'];