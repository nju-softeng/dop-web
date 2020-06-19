'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _calendar = require('./view/calendar.js');

var _calendar2 = _interopRequireDefault(_calendar);

var _datePickerPanel = require('./view/date-picker-panel.js');

var _datePickerPanel2 = _interopRequireDefault(_datePickerPanel);

var _rangePickerPanel = require('./view/range-picker-panel.js');

var _rangePickerPanel2 = _interopRequireDefault(_rangePickerPanel);

var _locale = require('./locale/index.js');

var _locale2 = _interopRequireDefault(_locale);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

_calendar2['default'].LOCALE = _locale2['default'];
_datePickerPanel2['default'].LOCALE = _locale2['default'];
_rangePickerPanel2['default'].LOCALE = _locale2['default'];

_calendar2['default'].DatePickerPanel = _datePickerPanel2['default'];
_calendar2['default'].RangePickerPanel = _rangePickerPanel2['default'];

exports['default'] = _calendar2['default'];
module.exports = exports['default'];