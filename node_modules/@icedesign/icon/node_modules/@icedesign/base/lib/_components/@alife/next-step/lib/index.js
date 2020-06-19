'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _step = require('./view/step.js');

var _step2 = _interopRequireDefault(_step);

var _stepItem = require('./view/step-item.js');

var _stepItem2 = _interopRequireDefault(_stepItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

_step2['default'].Item = _stepItem2['default'];

exports['default'] = _step2['default'];
module.exports = exports['default'];