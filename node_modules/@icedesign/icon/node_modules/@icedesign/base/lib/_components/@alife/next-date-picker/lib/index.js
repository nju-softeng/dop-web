'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _datePicker = require('./view/date-picker.js');

var _datePicker2 = _interopRequireDefault(_datePicker);

var _rangePicker = require('./view/range-picker.js');

var _rangePicker2 = _interopRequireDefault(_rangePicker);

var _monthPicker = require('./view/month-picker.js');

var _monthPicker2 = _interopRequireDefault(_monthPicker);

var _yearPicker = require('./view/year-picker.js');

var _yearPicker2 = _interopRequireDefault(_yearPicker);

var _locale = require('./locale/index.js');

var _locale2 = _interopRequireDefault(_locale);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

_datePicker2['default'].LOCALE = _locale2['default'];
_rangePicker2['default'].LOCALE = _locale2['default'];
_monthPicker2['default'].LOCALE = _locale2['default'];
_yearPicker2['default'].LOCALE = _locale2['default'];

_datePicker2['default'].MonthPicker = _monthPicker2['default'];
_datePicker2['default'].YearPicker = _yearPicker2['default'];
_datePicker2['default'].RangePicker = _rangePicker2['default'];

exports['default'] = _datePicker2['default'];
module.exports = exports['default'];