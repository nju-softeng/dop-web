"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

!function (a, b) {
  "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "undefined" != typeof module && "function" == typeof require ? b(require("../index.js")) : "function" == typeof define && define.amd ? define(["../index"], b) : b(a.moment);
}(undefined, function (a) {
  var b = a.defineLocale("ja", { months: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"), monthsShort: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"), weekdays: "日曜日_月曜日_火曜日_水曜日_木曜日_金曜日_土曜日".split("_"), weekdaysShort: "日_月_火_水_木_金_土".split("_"), weekdaysMin: "日_月_火_水_木_金_土".split("_"), longDateFormat: { LT: "Ah時m分", LTS: "Ah時m分s秒", L: "YYYY/MM/DD", LL: "YYYY年M月D日", LLL: "YYYY年M月D日Ah時m分", LLLL: "YYYY年M月D日Ah時m分 dddd" }, meridiemParse: /午前|午後/i, isPM: function isPM(a) {
      return "午後" === a;
    }, meridiem: function meridiem(a) {
      return 12 > a ? "午前" : "午後";
    }, calendar: { sameDay: "[今日] LT", nextDay: "[明日] LT", nextWeek: "[来週]dddd LT", lastDay: "[昨日] LT", lastWeek: "[前週]dddd LT", sameElse: "L" }, ordinalParse: /\d{1,2}日/, ordinal: function ordinal(a, b) {
      switch (b) {case "d":case "D":case "DDD":
          return a + "日";default:
          return a;}
    }, relativeTime: { future: "%s後", past: "%s前", s: "数秒", m: "1分", mm: "%d分", h: "1時間", hh: "%d時間", d: "1日", dd: "%d日", M: "1ヶ月", MM: "%dヶ月", y: "1年", yy: "%d年" } });return b;
});