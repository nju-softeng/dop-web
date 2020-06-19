'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _nextMoment = require('../../../next-moment/lib/index.js');

var _nextMoment2 = _interopRequireDefault(_nextMoment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/*eslint-disable no-useless-escape */
var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;
var basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;

function isFunction(obj) {
    return !!(obj && obj.constructor && obj.call && obj.apply);
}

var utils = {
    isISODate: function isISODate(str) {
        if (typeof str !== 'string') {
            return false;
        }
        var match = extendedIsoRegex.exec(str) || basicIsoRegex.exec(str);

        // 这里检测强制规范
        if (match && match.length && match[2] === 'T' && match[4] === 'Z') {
            return true;
        }
        return false;
    },


    /**
     * 构造自定义 CalendarDate 对象
     * @param {Object} value 被 moment 格式化后的日期值 { _d, _isUTC, _isValid, _locale, ... }
     * @return {Object} 格式化后的 Calendar 日期对象
     */
    getCalendarDate: function getCalendarDate(value) {
        if (!value.isValid()) {
            return {};
        }

        return {
            timestamp: value.valueOf(),
            year: value.year(),
            month: value.month(),
            date: value.date(),
            week: value.isoWeekday(),
            valueOf: function valueOf() {
                return value.valueOf();
            }
        };
    },


    /**
     * 判断输入值是否是有效的 CalendarDate 对象
     * @param {Object} calendarDate  输入日期对象
     * @param {Function} disabledDateFn 判断日期是否是禁用日期的函数
     */
    isValidCalendarDate: function isValidCalendarDate(calendarDate, disabledDateFn) {
        if (isFunction(disabledDateFn)) {
            return !disabledDateFn(calendarDate);
        }
        return true;
    },


    /**
     * 获取模糊匹配和精确匹配日期的正则表达式
     * @param {Array|String} formater format 数组
     * @return {Object} { fuzzy, exact }
     */
    getStrRegExp: function getStrRegExp(formater) {
        var exactRegExp = [];
        var fuzzyRegExp = [];

        for (var i = 0; i < formater.length; i++) {
            if (/[a-zA-Z]/.test(formater[i])) {
                exactRegExp.push('[0-9]');
            } else {
                exactRegExp.push(formater[i]);

                if (fuzzyRegExp.indexOf(formater[i]) === -1) {
                    fuzzyRegExp.push(formater[i]);
                }
            }
        }

        return {
            fuzzy: new RegExp('^[0-9' + fuzzyRegExp.join('') + ']{0,' + exactRegExp.length + '}$'),
            exact: new RegExp('^' + exactRegExp.join('') + '$')
        };
    },
    parseTime: function parseTime(date, format) {
        if (typeof date === 'string') {
            return (0, _nextMoment2['default'])(date, format);
        }
        if (date && date.isValid) {
            return date;
        }
    }
};

exports['default'] = utils;
module.exports = exports['default'];