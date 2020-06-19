'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _transfer = require('./view/transfer.js');

var _transfer2 = _interopRequireDefault(_transfer);

var _locale = require('./locale/index.js');

var _locale2 = _interopRequireDefault(_locale);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

_transfer2['default'].LOCALE = _locale2['default'];

exports['default'] = _transfer2['default'];
module.exports = exports['default'];