'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _table = require('./table.js');

var _table2 = _interopRequireDefault(_table);

var _column = require('./column.js');

var _column2 = _interopRequireDefault(_column);

var _columnGroup = require('./column-group.js');

var _columnGroup2 = _interopRequireDefault(_columnGroup);

var _groupHeader = require('./group-header.js');

var _groupHeader2 = _interopRequireDefault(_groupHeader);

var _index = require('./locale/index.js');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

_table2['default'].Column = _column2['default'];
_table2['default'].ColumnGroup = _columnGroup2['default'];
_table2['default'].GroupHeader = _groupHeader2['default'];
_table2['default'].LOCALE = _index2['default'];

exports['default'] = _table2['default'];
module.exports = exports['default'];