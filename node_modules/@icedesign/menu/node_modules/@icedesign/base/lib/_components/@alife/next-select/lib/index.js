'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _select = require('./select.js');

var _select2 = _interopRequireDefault(_select);

var _combobox = require('./combobox.js');

var _combobox2 = _interopRequireDefault(_combobox);

var _option = require('./option.js');

var _option2 = _interopRequireDefault(_option);

var _optionGroup = require('./option-group.js');

var _optionGroup2 = _interopRequireDefault(_optionGroup);

var _index = require('./locale/index.js');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

_combobox2['default'].LOCALE = _index2['default'];
_select2['default'].LOCALE = _index2['default'];

_select2['default'].Combobox = _combobox2['default'];
_select2['default'].Option = _option2['default'];
_select2['default'].OptionGroup = _optionGroup2['default'];

exports['default'] = _select2['default'];
module.exports = exports['default'];