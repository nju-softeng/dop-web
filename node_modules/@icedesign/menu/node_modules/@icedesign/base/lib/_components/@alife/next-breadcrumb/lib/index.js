'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _breadcrumb = require('./view/breadcrumb.js');

var _breadcrumb2 = _interopRequireDefault(_breadcrumb);

var _item = require('./view/item.js');

var _item2 = _interopRequireDefault(_item);

var _number = require('./view/number.js');

var _number2 = _interopRequireDefault(_number);

var _keyword = require('./view/keyword.js');

var _keyword2 = _interopRequireDefault(_keyword);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

_breadcrumb2['default'].Item = _item2['default'];
_breadcrumb2['default'].Number = _number2['default'];
_breadcrumb2['default'].Keyword = _keyword2['default'];

exports['default'] = _breadcrumb2['default'];
module.exports = exports['default'];