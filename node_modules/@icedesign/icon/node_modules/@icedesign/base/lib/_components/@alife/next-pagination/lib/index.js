'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _pagination = require('./pagination.js');

var _pagination2 = _interopRequireDefault(_pagination);

var _locale = require('./locale/index.js');

var _locale2 = _interopRequireDefault(_locale);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

_pagination2['default'].LOCALE = _locale2['default'];

exports['default'] = _pagination2['default'];
module.exports = exports['default'];