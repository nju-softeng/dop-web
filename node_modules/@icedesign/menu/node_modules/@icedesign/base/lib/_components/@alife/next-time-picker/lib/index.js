'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nextLocaleProvider = require('../../next-locale-provider/lib/index.js');

var _nextLocaleProvider2 = _interopRequireDefault(_nextLocaleProvider);

var _timePicker = require('./view/time-picker.js');

var _timePicker2 = _interopRequireDefault(_timePicker);

var _timePickerPanel = require('./view/time-picker-panel.js');

var _timePickerPanel2 = _interopRequireDefault(_timePickerPanel);

var _locale = require('./locale/index.js');

var _locale2 = _interopRequireDefault(_locale);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var TimePickerLocale = (0, _nextLocaleProvider2['default'])(_timePicker2['default']);
var TimePickerPanelLocale = (0, _nextLocaleProvider2['default'])(_timePickerPanel2['default']);

TimePickerLocale.LOCALE = _locale2['default'];
TimePickerPanelLocale.LOCALE = _locale2['default'];
TimePickerLocale.Panel = TimePickerPanelLocale;

exports['default'] = TimePickerLocale;
module.exports = exports['default'];