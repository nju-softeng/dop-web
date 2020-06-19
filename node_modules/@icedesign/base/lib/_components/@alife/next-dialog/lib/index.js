'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dialog = require('./dialog.js');

var _dialog2 = _interopRequireDefault(_dialog);

var _base = require('./base.js');

var _base2 = _interopRequireDefault(_base);

var _content = require('./content.js');

var _inner = require('./inner.js');

var _inner2 = _interopRequireDefault(_inner);

var _util = require('./util.js');

var _index = require('./locale/index.js');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

_dialog2['default'].Header = _content.Header;
_dialog2['default'].Body = _content.Body;
_dialog2['default'].Footer = _content.Footer;
_dialog2['default'].alert = _util.alert;
_dialog2['default'].confirm = _util.confirm;
_dialog2['default'].Inner = _inner2['default'];
_dialog2['default'].Base = _base2['default'];
_dialog2['default'].LOCALE = _index2['default'];

exports['default'] = _dialog2['default'];
module.exports = exports['default'];