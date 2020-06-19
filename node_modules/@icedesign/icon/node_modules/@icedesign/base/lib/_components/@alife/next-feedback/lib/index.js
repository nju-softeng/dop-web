'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _feedback = require('./feedback.js');

var _feedback2 = _interopRequireDefault(_feedback);

var _toast = require('./toast.js');

var _toast2 = _interopRequireDefault(_toast);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

_feedback2['default'].toast = _toast2['default'];

exports['default'] = _feedback2['default'];
module.exports = exports['default'];