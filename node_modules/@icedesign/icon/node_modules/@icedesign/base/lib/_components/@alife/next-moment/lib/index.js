"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//! moment.js
//! version : 2.17.0
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com
//! 
//! 
//! 
//! 说明 : 内置了 zh-cn, zh-tw, zh-hk 语言，其他语言为动态加载
//!  

!function (a, b) {
  "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "undefined" != typeof module ? module.exports = b() : "function" == typeof define && define.amd ? define(b) : a.moment = b();
}(undefined, function () {
  function b() {
    return a.apply(null, arguments);
  }function c(b) {
    a = b;
  }function d(a) {
    return a instanceof Array || "[object Array]" === Object.prototype.toString.call(a);
  }function e(a) {
    return null != a && "[object Object]" === Object.prototype.toString.call(a);
  }function f(a) {
    var b;for (b in a) {
      return !1;
    }return !0;
  }function g(a) {
    return "number" == typeof a || "[object Number]" === Object.prototype.toString.call(a);
  }function h(a) {
    return a instanceof Date || "[object Date]" === Object.prototype.toString.call(a);
  }function i(a, b) {
    var d,
        c = [];for (d = 0; d < a.length; ++d) {
      c.push(b(a[d], d));
    }return c;
  }function j(a, b) {
    return Object.prototype.hasOwnProperty.call(a, b);
  }function k(a, b) {
    for (var c in b) {
      j(b, c) && (a[c] = b[c]);
    }return j(b, "toString") && (a.toString = b.toString), j(b, "valueOf") && (a.valueOf = b.valueOf), a;
  }function l(a, b, c, d) {
    return Md(a, b, c, d, !0).utc();
  }function m() {
    return { empty: !1, unusedTokens: [], unusedInput: [], overflow: -2, charsLeftOver: 0, nullInput: !1, invalidMonth: null, invalidFormat: !1, userInvalidated: !1, iso: !1, parsedDateParts: [], meridiem: null };
  }function n(a) {
    return null == a._pf && (a._pf = m()), a._pf;
  }function q(a) {
    var b, c, d;if (null == a._isValid) {
      if (b = n(a), c = p.call(b.parsedDateParts, function (a) {
        return null != a;
      }), d = !isNaN(a._d.getTime()) && b.overflow < 0 && !b.empty && !b.invalidMonth && !b.invalidWeekday && !b.nullInput && !b.invalidFormat && !b.userInvalidated && (!b.meridiem || b.meridiem && c), a._strict && (d = d && 0 === b.charsLeftOver && 0 === b.unusedTokens.length && void 0 === b.bigHour), null != Object.isFrozen && Object.isFrozen(a)) return d;a._isValid = d;
    }return a._isValid;
  }function r(a) {
    var b = l(0 / 0);return null != a ? k(n(b), a) : n(b).userInvalidated = !0, b;
  }function s(a) {
    return void 0 === a;
  }function u(a, b) {
    var c, d, e;if (s(b._isAMomentObject) || (a._isAMomentObject = b._isAMomentObject), s(b._i) || (a._i = b._i), s(b._f) || (a._f = b._f), s(b._l) || (a._l = b._l), s(b._strict) || (a._strict = b._strict), s(b._tzm) || (a._tzm = b._tzm), s(b._isUTC) || (a._isUTC = b._isUTC), s(b._offset) || (a._offset = b._offset), s(b._pf) || (a._pf = n(b)), s(b._locale) || (a._locale = b._locale), t.length > 0) for (c in t) {
      d = t[c], e = b[d], s(e) || (a[d] = e);
    }return a;
  }function w(a) {
    u(this, a), this._d = new Date(null != a._d ? a._d.getTime() : 0 / 0), this.isValid() || (this._d = new Date(0 / 0)), v === !1 && (v = !0, b.updateOffset(this), v = !1);
  }function x(a) {
    return a instanceof w || null != a && null != a._isAMomentObject;
  }function y(a) {
    return 0 > a ? Math.ceil(a) || 0 : Math.floor(a);
  }function z(a) {
    var b = +a,
        c = 0;return 0 !== b && isFinite(b) && (c = y(b)), c;
  }function A(a, b, c) {
    var g,
        d = Math.min(a.length, b.length),
        e = Math.abs(a.length - b.length),
        f = 0;for (g = 0; d > g; g++) {
      (c && a[g] !== b[g] || !c && z(a[g]) !== z(b[g])) && f++;
    }return f + e;
  }function B(a) {
    b.suppressDeprecationWarnings === !1 && "undefined" != typeof console && console.warn && console.warn("Deprecation warning: " + a);
  }function C(a, c) {
    var d = !0;return k(function () {
      var e, f, g, h;if (null != b.deprecationHandler && b.deprecationHandler(null, a), d) {
        for (e = [], g = 0; g < arguments.length; g++) {
          if (f = "", "object" == _typeof(arguments[g])) {
            f += "\n[" + g + "] ";for (h in arguments[0]) {
              f += h + ": " + arguments[0][h] + ", ";
            }f = f.slice(0, -2);
          } else f = arguments[g];e.push(f);
        }B(a + "\nArguments: " + Array.prototype.slice.call(e).join("") + "\n" + new Error().stack), d = !1;
      }return c.apply(this, arguments);
    }, c);
  }function E(a, c) {
    null != b.deprecationHandler && b.deprecationHandler(a, c), D[a] || (B(c), D[a] = !0);
  }function F(a) {
    return a instanceof Function || "[object Function]" === Object.prototype.toString.call(a);
  }function G(a) {
    var b, c;for (c in a) {
      b = a[c], F(b) ? this[c] = b : this["_" + c] = b;
    }this._config = a, this._ordinalParseLenient = new RegExp(this._ordinalParse.source + "|" + /\d{1,2}/.source);
  }function H(a, b) {
    var d,
        c = k({}, a);for (d in b) {
      j(b, d) && (e(a[d]) && e(b[d]) ? (c[d] = {}, k(c[d], a[d]), k(c[d], b[d])) : null != b[d] ? c[d] = b[d] : delete c[d]);
    }for (d in a) {
      j(a, d) && !j(b, d) && e(a[d]) && (c[d] = k({}, c[d]));
    }return c;
  }function I(a) {
    null != a && this.set(a);
  }function M(a, b, c) {
    var d = this._calendar[a] || this._calendar["sameElse"];return F(d) ? d.call(b, c) : d;
  }function O(a) {
    var b = this._longDateFormat[a],
        c = this._longDateFormat[a.toUpperCase()];return b || !c ? b : (this._longDateFormat[a] = c.replace(/MMMM|MM|DD|dddd/g, function (a) {
      return a.slice(1);
    }), this._longDateFormat[a]);
  }function Q() {
    return this._invalidDate;
  }function T(a) {
    return this._ordinal.replace("%d", a);
  }function V(a, b, c, d) {
    var e = this._relativeTime[c];return F(e) ? e(a, b, c, d) : e.replace(/%d/i, a);
  }function W(a, b) {
    var c = this._relativeTime[a > 0 ? "future" : "past"];return F(c) ? c(b) : c.replace(/%s/i, b);
  }function Y(a, b) {
    var c = a.toLowerCase();X[c] = X[c + "s"] = X[b] = a;
  }function Z(a) {
    return "string" == typeof a ? X[a] || X[a.toLowerCase()] : void 0;
  }function $(a) {
    var c,
        d,
        b = {};for (d in a) {
      j(a, d) && (c = Z(d), c && (b[c] = a[d]));
    }return b;
  }function ab(a, b) {
    _[a] = b;
  }function bb(a) {
    var c,
        b = [];for (c in a) {
      b.push({ unit: c, priority: _[c] });
    }return b.sort(function (a, b) {
      return a.priority - b.priority;
    }), b;
  }function cb(a, c) {
    return function (d) {
      return null != d ? (eb(this, a, d), b.updateOffset(this, c), this) : db(this, a);
    };
  }function db(a, b) {
    return a.isValid() ? a._d["get" + (a._isUTC ? "UTC" : "") + b]() : 0 / 0;
  }function eb(a, b, c) {
    a.isValid() && a._d["set" + (a._isUTC ? "UTC" : "") + b](c);
  }function fb(a) {
    return a = Z(a), F(this[a]) ? this[a]() : this;
  }function gb(a, b) {
    var c, d;if ("object" == (typeof a === "undefined" ? "undefined" : _typeof(a))) for (a = $(a), c = bb(a), d = 0; d < c.length; d++) {
      this[c[d].unit](a[c[d].unit]);
    } else if (a = Z(a), F(this[a])) return this[a](b);return this;
  }function hb(a, b, c) {
    var d = "" + Math.abs(a),
        e = b - d.length,
        f = a >= 0;return (f ? c ? "+" : "" : "-") + Math.pow(10, Math.max(0, e)).toString().substr(1) + d;
  }function mb(a, b, c, d) {
    var e = d;"string" == typeof d && (e = function e() {
      return this[d]();
    }), a && (lb[a] = e), b && (lb[b[0]] = function () {
      return hb(e.apply(this, arguments), b[1], b[2]);
    }), c && (lb[c] = function () {
      return this.localeData().ordinal(e.apply(this, arguments), a);
    });
  }function nb(a) {
    return a.match(/\[[\s\S]/) ? a.replace(/^\[|\]$/g, "") : a.replace(/\\/g, "");
  }function ob(a) {
    var c,
        d,
        b = a.match(ib);for (c = 0, d = b.length; d > c; c++) {
      b[c] = lb[b[c]] ? lb[b[c]] : nb(b[c]);
    }return function (c) {
      var f,
          e = "";for (f = 0; d > f; f++) {
        e += b[f] instanceof Function ? b[f].call(c, a) : b[f];
      }return e;
    };
  }function pb(a, b) {
    return a.isValid() ? (b = qb(b, a.localeData()), kb[b] = kb[b] || ob(b), kb[b](a)) : a.localeData().invalidDate();
  }function qb(a, b) {
    function d(a) {
      return b.longDateFormat(a) || a;
    }var c = 5;for (jb.lastIndex = 0; c >= 0 && jb.test(a);) {
      a = a.replace(jb, d), jb.lastIndex = 0, c -= 1;
    }return a;
  }function Jb(a, b, c) {
    Ib[a] = F(b) ? b : function (a) {
      return a && c ? c : b;
    };
  }function Kb(a, b) {
    return j(Ib, a) ? Ib[a](b._strict, b._locale) : new RegExp(Lb(a));
  }function Lb(a) {
    return Mb(a.replace("\\", "").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (a, b, c, d, e) {
      return b || c || d || e;
    }));
  }function Mb(a) {
    return a.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
  }function Ob(a, b) {
    var c,
        d = b;for ("string" == typeof a && (a = [a]), g(b) && (d = function d(a, c) {
      c[b] = z(a);
    }), c = 0; c < a.length; c++) {
      Nb[a[c]] = d;
    }
  }function Pb(a, b) {
    Ob(a, function (a, c, d, e) {
      d._w = d._w || {}, b(a, d._w, d, e);
    });
  }function Qb(a, b, c) {
    null != b && j(Nb, a) && Nb[a](b, c._a, c, a);
  }function ac(a, b) {
    return new Date(Date.UTC(a, b + 1, 0)).getUTCDate();
  }function dc(a, b) {
    return a ? d(this._months) ? this._months[a.month()] : this._months[(this._months.isFormat || bc).test(b) ? "format" : "standalone"][a.month()] : this._months;
  }function fc(a, b) {
    return a ? d(this._monthsShort) ? this._monthsShort[a.month()] : this._monthsShort[bc.test(b) ? "format" : "standalone"][a.month()] : this._monthsShort;
  }function gc(a, b, c) {
    var d,
        e,
        f,
        g = a.toLocaleLowerCase();if (!this._monthsParse) for (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = [], d = 0; 12 > d; ++d) {
      f = l([2e3, d]), this._shortMonthsParse[d] = this.monthsShort(f, "").toLocaleLowerCase(), this._longMonthsParse[d] = this.months(f, "").toLocaleLowerCase();
    }return c ? "MMM" === b ? (e = _b.call(this._shortMonthsParse, g), -1 !== e ? e : null) : (e = _b.call(this._longMonthsParse, g), -1 !== e ? e : null) : "MMM" === b ? (e = _b.call(this._shortMonthsParse, g), -1 !== e ? e : (e = _b.call(this._longMonthsParse, g), -1 !== e ? e : null)) : (e = _b.call(this._longMonthsParse, g), -1 !== e ? e : (e = _b.call(this._shortMonthsParse, g), -1 !== e ? e : null));
  }function hc(a, b, c) {
    var d, e, f;if (this._monthsParseExact) return gc.call(this, a, b, c);for (this._monthsParse || (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = []), d = 0; 12 > d; d++) {
      if (e = l([2e3, d]), c && !this._longMonthsParse[d] && (this._longMonthsParse[d] = new RegExp("^" + this.months(e, "").replace(".", "") + "$", "i"), this._shortMonthsParse[d] = new RegExp("^" + this.monthsShort(e, "").replace(".", "") + "$", "i")), c || this._monthsParse[d] || (f = "^" + this.months(e, "") + "|^" + this.monthsShort(e, ""), this._monthsParse[d] = new RegExp(f.replace(".", ""), "i")), c && "MMMM" === b && this._longMonthsParse[d].test(a)) return d;if (c && "MMM" === b && this._shortMonthsParse[d].test(a)) return d;if (!c && this._monthsParse[d].test(a)) return d;
    }
  }function ic(a, b) {
    var c;if (!a.isValid()) return a;if ("string" == typeof b) if (/^\d+$/.test(b)) b = z(b);else if (b = a.localeData().monthsParse(b), !g(b)) return a;return c = Math.min(a.date(), ac(a.year(), b)), a._d["set" + (a._isUTC ? "UTC" : "") + "Month"](b, c), a;
  }function jc(a) {
    return null != a ? (ic(this, a), b.updateOffset(this, !0), this) : db(this, "Month");
  }function kc() {
    return ac(this.year(), this.month());
  }function mc(a) {
    return this._monthsParseExact ? (j(this, "_monthsRegex") || pc.call(this), a ? this._monthsShortStrictRegex : this._monthsShortRegex) : (j(this, "_monthsShortRegex") || (this._monthsShortRegex = lc), this._monthsShortStrictRegex && a ? this._monthsShortStrictRegex : this._monthsShortRegex);
  }function oc(a) {
    return this._monthsParseExact ? (j(this, "_monthsRegex") || pc.call(this), a ? this._monthsStrictRegex : this._monthsRegex) : (j(this, "_monthsRegex") || (this._monthsRegex = nc), this._monthsStrictRegex && a ? this._monthsStrictRegex : this._monthsRegex);
  }function pc() {
    function a(a, b) {
      return b.length - a.length;
    }var e,
        f,
        b = [],
        c = [],
        d = [];for (e = 0; 12 > e; e++) {
      f = l([2e3, e]), b.push(this.monthsShort(f, "")), c.push(this.months(f, "")), d.push(this.months(f, "")), d.push(this.monthsShort(f, ""));
    }for (b.sort(a), c.sort(a), d.sort(a), e = 0; 12 > e; e++) {
      b[e] = Mb(b[e]), c[e] = Mb(c[e]);
    }for (e = 0; 24 > e; e++) {
      d[e] = Mb(d[e]);
    }this._monthsRegex = new RegExp("^(" + d.join("|") + ")", "i"), this._monthsShortRegex = this._monthsRegex, this._monthsStrictRegex = new RegExp("^(" + c.join("|") + ")", "i"), this._monthsShortStrictRegex = new RegExp("^(" + b.join("|") + ")", "i");
  }function qc(a) {
    return rc(a) ? 366 : 365;
  }function rc(a) {
    return 0 === a % 4 && 0 !== a % 100 || 0 === a % 400;
  }function tc() {
    return rc(this.year());
  }function uc(a, b, c, d, e, f, g) {
    var h = new Date(a, b, c, d, e, f, g);return 100 > a && a >= 0 && isFinite(h.getFullYear()) && h.setFullYear(a), h;
  }function vc(a) {
    var b = new Date(Date.UTC.apply(null, arguments));return 100 > a && a >= 0 && isFinite(b.getUTCFullYear()) && b.setUTCFullYear(a), b;
  }function wc(a, b, c) {
    var d = 7 + b - c,
        e = (7 + vc(a, 0, d).getUTCDay() - b) % 7;return -e + d - 1;
  }function xc(a, b, c, d, e) {
    var i,
        j,
        f = (7 + c - d) % 7,
        g = wc(a, d, e),
        h = 1 + 7 * (b - 1) + f + g;return 0 >= h ? (i = a - 1, j = qc(i) + h) : h > qc(a) ? (i = a + 1, j = h - qc(a)) : (i = a, j = h), { year: i, dayOfYear: j };
  }function yc(a, b, c) {
    var f,
        g,
        d = wc(a.year(), b, c),
        e = Math.floor((a.dayOfYear() - d - 1) / 7) + 1;return 1 > e ? (g = a.year() - 1, f = e + zc(g, b, c)) : e > zc(a.year(), b, c) ? (f = e - zc(a.year(), b, c), g = a.year() + 1) : (g = a.year(), f = e), { week: f, year: g };
  }function zc(a, b, c) {
    var d = wc(a, b, c),
        e = wc(a + 1, b, c);return (qc(a) - d + e) / 7;
  }function Ac(a) {
    return yc(a, this._week.dow, this._week.doy).week;
  }function Cc() {
    return this._week.dow;
  }function Dc() {
    return this._week.doy;
  }function Ec(a) {
    var b = this.localeData().week(this);return null == a ? b : this.add(7 * (a - b), "d");
  }function Fc(a) {
    var b = yc(this, 1, 4).week;return null == a ? b : this.add(7 * (a - b), "d");
  }function Gc(a, b) {
    return "string" != typeof a ? a : isNaN(a) ? (a = b.weekdaysParse(a), "number" == typeof a ? a : null) : parseInt(a, 10);
  }function Hc(a, b) {
    return "string" == typeof a ? b.weekdaysParse(a) % 7 || 7 : isNaN(a) ? null : a;
  }function Jc(a, b) {
    return a ? d(this._weekdays) ? this._weekdays[a.day()] : this._weekdays[this._weekdays.isFormat.test(b) ? "format" : "standalone"][a.day()] : this._weekdays;
  }function Lc(a) {
    return a ? this._weekdaysShort[a.day()] : this._weekdaysShort;
  }function Nc(a) {
    return a ? this._weekdaysMin[a.day()] : this._weekdaysMin;
  }function Oc(a, b, c) {
    var d,
        e,
        f,
        g = a.toLocaleLowerCase();if (!this._weekdaysParse) for (this._weekdaysParse = [], this._shortWeekdaysParse = [], this._minWeekdaysParse = [], d = 0; 7 > d; ++d) {
      f = l([2e3, 1]).day(d), this._minWeekdaysParse[d] = this.weekdaysMin(f, "").toLocaleLowerCase(), this._shortWeekdaysParse[d] = this.weekdaysShort(f, "").toLocaleLowerCase(), this._weekdaysParse[d] = this.weekdays(f, "").toLocaleLowerCase();
    }return c ? "dddd" === b ? (e = _b.call(this._weekdaysParse, g), -1 !== e ? e : null) : "ddd" === b ? (e = _b.call(this._shortWeekdaysParse, g), -1 !== e ? e : null) : (e = _b.call(this._minWeekdaysParse, g), -1 !== e ? e : null) : "dddd" === b ? (e = _b.call(this._weekdaysParse, g), -1 !== e ? e : (e = _b.call(this._shortWeekdaysParse, g), -1 !== e ? e : (e = _b.call(this._minWeekdaysParse, g), -1 !== e ? e : null))) : "ddd" === b ? (e = _b.call(this._shortWeekdaysParse, g), -1 !== e ? e : (e = _b.call(this._weekdaysParse, g), -1 !== e ? e : (e = _b.call(this._minWeekdaysParse, g), -1 !== e ? e : null))) : (e = _b.call(this._minWeekdaysParse, g), -1 !== e ? e : (e = _b.call(this._weekdaysParse, g), -1 !== e ? e : (e = _b.call(this._shortWeekdaysParse, g), -1 !== e ? e : null)));
  }function Pc(a, b, c) {
    var d, e, f;if (this._weekdaysParseExact) return Oc.call(this, a, b, c);for (this._weekdaysParse || (this._weekdaysParse = [], this._minWeekdaysParse = [], this._shortWeekdaysParse = [], this._fullWeekdaysParse = []), d = 0; 7 > d; d++) {
      if (e = l([2e3, 1]).day(d), c && !this._fullWeekdaysParse[d] && (this._fullWeekdaysParse[d] = new RegExp("^" + this.weekdays(e, "").replace(".", ".?") + "$", "i"), this._shortWeekdaysParse[d] = new RegExp("^" + this.weekdaysShort(e, "").replace(".", ".?") + "$", "i"), this._minWeekdaysParse[d] = new RegExp("^" + this.weekdaysMin(e, "").replace(".", ".?") + "$", "i")), this._weekdaysParse[d] || (f = "^" + this.weekdays(e, "") + "|^" + this.weekdaysShort(e, "") + "|^" + this.weekdaysMin(e, ""), this._weekdaysParse[d] = new RegExp(f.replace(".", ""), "i")), c && "dddd" === b && this._fullWeekdaysParse[d].test(a)) return d;if (c && "ddd" === b && this._shortWeekdaysParse[d].test(a)) return d;if (c && "dd" === b && this._minWeekdaysParse[d].test(a)) return d;if (!c && this._weekdaysParse[d].test(a)) return d;
    }
  }function Qc(a) {
    if (!this.isValid()) return null != a ? this : 0 / 0;var b = this._isUTC ? this._d.getUTCDay() : this._d.getDay();return null != a ? (a = Gc(a, this.localeData()), this.add(a - b, "d")) : b;
  }function Rc(a) {
    if (!this.isValid()) return null != a ? this : 0 / 0;var b = (this.day() + 7 - this.localeData()._week.dow) % 7;return null == a ? b : this.add(a - b, "d");
  }function Sc(a) {
    if (!this.isValid()) return null != a ? this : 0 / 0;if (null != a) {
      var b = Hc(a, this.localeData());return this.day(this.day() % 7 ? b : b - 7);
    }return this.day() || 7;
  }function Uc(a) {
    return this._weekdaysParseExact ? (j(this, "_weekdaysRegex") || Zc.call(this), a ? this._weekdaysStrictRegex : this._weekdaysRegex) : (j(this, "_weekdaysRegex") || (this._weekdaysRegex = Tc), this._weekdaysStrictRegex && a ? this._weekdaysStrictRegex : this._weekdaysRegex);
  }function Wc(a) {
    return this._weekdaysParseExact ? (j(this, "_weekdaysRegex") || Zc.call(this), a ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex) : (j(this, "_weekdaysShortRegex") || (this._weekdaysShortRegex = Vc), this._weekdaysShortStrictRegex && a ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex);
  }function Yc(a) {
    return this._weekdaysParseExact ? (j(this, "_weekdaysRegex") || Zc.call(this), a ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex) : (j(this, "_weekdaysMinRegex") || (this._weekdaysMinRegex = Xc), this._weekdaysMinStrictRegex && a ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex);
  }function Zc() {
    function a(a, b) {
      return b.length - a.length;
    }var f,
        g,
        h,
        i,
        j,
        b = [],
        c = [],
        d = [],
        e = [];for (f = 0; 7 > f; f++) {
      g = l([2e3, 1]).day(f), h = this.weekdaysMin(g, ""), i = this.weekdaysShort(g, ""), j = this.weekdays(g, ""), b.push(h), c.push(i), d.push(j), e.push(h), e.push(i), e.push(j);
    }for (b.sort(a), c.sort(a), d.sort(a), e.sort(a), f = 0; 7 > f; f++) {
      c[f] = Mb(c[f]), d[f] = Mb(d[f]), e[f] = Mb(e[f]);
    }this._weekdaysRegex = new RegExp("^(" + e.join("|") + ")", "i"), this._weekdaysShortRegex = this._weekdaysRegex, this._weekdaysMinRegex = this._weekdaysRegex, this._weekdaysStrictRegex = new RegExp("^(" + d.join("|") + ")", "i"), this._weekdaysShortStrictRegex = new RegExp("^(" + c.join("|") + ")", "i"), this._weekdaysMinStrictRegex = new RegExp("^(" + b.join("|") + ")", "i");
  }function $c() {
    return this.hours() % 12 || 12;
  }function _c() {
    return this.hours() || 24;
  }function ad(a, b) {
    mb(a, 0, 0, function () {
      return this.localeData().meridiem(this.hours(), this.minutes(), b);
    });
  }function bd(a, b) {
    return b._meridiemParse;
  }function cd(a) {
    return "p" === (a + "").toLowerCase().charAt(0);
  }function ed(a, b, c) {
    return a > 11 ? c ? "pm" : "PM" : c ? "am" : "AM";
  }function kd(a) {
    return a ? a.toLowerCase().replace("_", "-") : a;
  }function ld(a) {
    for (var c, d, e, f, b = 0; b < a.length;) {
      for (f = kd(a[b]).split("-"), c = f.length, d = kd(a[b + 1]), d = d ? d.split("-") : null; c > 0;) {
        if (e = md(f.slice(0, c).join("-"))) return e;if (d && d.length >= c && A(f, d, !0) >= c - 1) break;c--;
      }b++;
    }return null;
  }function md(a) {
    var b = null;if (!hd[a] && "undefined" != typeof module && module && module.exports) try {
      b = jd._abbr, require("./locale/" + a), nd(b);
    } catch (c) {}return hd[a];
  }function nd(a, b) {
    var c;return a && (c = s(b) ? qd(a) : od(a, b), c && (jd = c)), jd._abbr;
  }function od(a, b) {
    if (null !== b) {
      var c = gd;if (b.abbr = a, null != hd[a]) E("defineLocaleOverride", "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."), c = hd[a]._config;else if (null != b.parentLocale) {
        if (null == hd[b.parentLocale]) return id[b.parentLocale] || (id[b.parentLocale] = []), id[b.parentLocale].push({ name: a, config: b }), null;c = hd[b.parentLocale]._config;
      }return hd[a] = new I(H(c, b)), id[a] && id[a].forEach(function (a) {
        od(a.name, a.config);
      }), nd(a), hd[a];
    }return delete hd[a], null;
  }function pd(a, b) {
    if (null != b) {
      var c,
          d = gd;null != hd[a] && (d = hd[a]._config), b = H(d, b), c = new I(b), c.parentLocale = hd[a], hd[a] = c, nd(a);
    } else null != hd[a] && (null != hd[a].parentLocale ? hd[a] = hd[a].parentLocale : null != hd[a] && delete hd[a]);return hd[a];
  }function qd(a) {
    var b;if (a && a._locale && a._locale._abbr && (a = a._locale._abbr), !a) return jd;if (!d(a)) {
      if (b = md(a)) return b;a = [a];
    }return ld(a);
  }function rd() {
    return K(hd);
  }function sd(a) {
    var b,
        c = a._a;return c && -2 === n(a).overflow && (b = c[Sb] < 0 || c[Sb] > 11 ? Sb : c[Tb] < 1 || c[Tb] > ac(c[Rb], c[Sb]) ? Tb : c[Ub] < 0 || c[Ub] > 24 || 24 === c[Ub] && (0 !== c[Vb] || 0 !== c[Wb] || 0 !== c[Xb]) ? Ub : c[Vb] < 0 || c[Vb] > 59 ? Vb : c[Wb] < 0 || c[Wb] > 59 ? Wb : c[Xb] < 0 || c[Xb] > 999 ? Xb : -1, n(a)._overflowDayOfYear && (Rb > b || b > Tb) && (b = Tb), n(a)._overflowWeeks && -1 === b && (b = Yb), n(a)._overflowWeekday && -1 === b && (b = Zb), n(a).overflow = b), a;
  }function zd(a) {
    var b,
        c,
        f,
        g,
        h,
        i,
        d = a._i,
        e = td.exec(d) || ud.exec(d);if (e) {
      for (n(a).iso = !0, b = 0, c = wd.length; c > b; b++) {
        if (wd[b][1].exec(e[1])) {
          g = wd[b][0], f = wd[b][2] !== !1;break;
        }
      }if (null == g) return a._isValid = !1, void 0;if (e[3]) {
        for (b = 0, c = xd.length; c > b; b++) {
          if (xd[b][1].exec(e[3])) {
            h = (e[2] || " ") + xd[b][0];break;
          }
        }if (null == h) return a._isValid = !1, void 0;
      }if (!f && null != h) return a._isValid = !1, void 0;if (e[4]) {
        if (!vd.exec(e[4])) return a._isValid = !1, void 0;i = "Z";
      }a._f = g + (h || "") + (i || ""), Fd(a);
    } else a._isValid = !1;
  }function Ad(a) {
    var c = yd.exec(a._i);return null !== c ? (a._d = new Date(+c[1]), void 0) : (zd(a), a._isValid === !1 && (delete a._isValid, b.createFromInputFallback(a)), void 0);
  }function Bd(a, b, c) {
    return null != a ? a : null != b ? b : c;
  }function Cd(a) {
    var c = new Date(b.now());return a._useUTC ? [c.getUTCFullYear(), c.getUTCMonth(), c.getUTCDate()] : [c.getFullYear(), c.getMonth(), c.getDate()];
  }function Dd(a) {
    var b,
        c,
        e,
        f,
        d = [];if (!a._d) {
      for (e = Cd(a), a._w && null == a._a[Tb] && null == a._a[Sb] && Ed(a), a._dayOfYear && (f = Bd(a._a[Rb], e[Rb]), a._dayOfYear > qc(f) && (n(a)._overflowDayOfYear = !0), c = vc(f, 0, a._dayOfYear), a._a[Sb] = c.getUTCMonth(), a._a[Tb] = c.getUTCDate()), b = 0; 3 > b && null == a._a[b]; ++b) {
        a._a[b] = d[b] = e[b];
      }for (; 7 > b; b++) {
        a._a[b] = d[b] = null == a._a[b] ? 2 === b ? 1 : 0 : a._a[b];
      }24 === a._a[Ub] && 0 === a._a[Vb] && 0 === a._a[Wb] && 0 === a._a[Xb] && (a._nextDay = !0, a._a[Ub] = 0), a._d = (a._useUTC ? vc : uc).apply(null, d), null != a._tzm && a._d.setUTCMinutes(a._d.getUTCMinutes() - a._tzm), a._nextDay && (a._a[Ub] = 24);
    }
  }function Ed(a) {
    var c,
        d,
        e,
        f,
        g,
        h,
        i,
        j,
        b = a._w;null != b.GG || null != b.W || null != b.E ? (f = 1, g = 4, c = Bd(b.GG, a._a[Rb], yc(Nd(), 1, 4).year), d = Bd(b.W, 1), e = Bd(b.E, 1), (1 > e || e > 7) && (i = !0)) : (f = a._locale._week.dow, g = a._locale._week.doy, j = yc(Nd(), f, g), c = Bd(b.gg, a._a[Rb], j.year), d = Bd(b.w, j.week), null != b.d ? (e = b.d, (0 > e || e > 6) && (i = !0)) : null != b.e ? (e = b.e + f, (b.e < 0 || b.e > 6) && (i = !0)) : e = f), 1 > d || d > zc(c, f, g) ? n(a)._overflowWeeks = !0 : null != i ? n(a)._overflowWeekday = !0 : (h = xc(c, d, e, f, g), a._a[Rb] = h.year, a._dayOfYear = h.dayOfYear);
  }function Fd(a) {
    if (a._f === b.ISO_8601) return zd(a), void 0;a._a = [], n(a).empty = !0;var d,
        e,
        f,
        g,
        h,
        c = "" + a._i,
        i = c.length,
        j = 0;for (f = qb(a._f, a._locale).match(ib) || [], d = 0; d < f.length; d++) {
      g = f[d], e = (c.match(Kb(g, a)) || [])[0], e && (h = c.substr(0, c.indexOf(e)), h.length > 0 && n(a).unusedInput.push(h), c = c.slice(c.indexOf(e) + e.length), j += e.length), lb[g] ? (e ? n(a).empty = !1 : n(a).unusedTokens.push(g), Qb(g, e, a)) : a._strict && !e && n(a).unusedTokens.push(g);
    }n(a).charsLeftOver = i - j, c.length > 0 && n(a).unusedInput.push(c), a._a[Ub] <= 12 && n(a).bigHour === !0 && a._a[Ub] > 0 && (n(a).bigHour = void 0), n(a).parsedDateParts = a._a.slice(0), n(a).meridiem = a._meridiem, a._a[Ub] = Gd(a._locale, a._a[Ub], a._meridiem), Dd(a), sd(a);
  }function Gd(a, b, c) {
    var d;return null == c ? b : null != a.meridiemHour ? a.meridiemHour(b, c) : null != a.isPM ? (d = a.isPM(c), d && 12 > b && (b += 12), d || 12 !== b || (b = 0), b) : b;
  }function Hd(a) {
    var b, c, d, e, f;if (0 === a._f.length) return n(a).invalidFormat = !0, a._d = new Date(0 / 0), void 0;for (e = 0; e < a._f.length; e++) {
      f = 0, b = u({}, a), null != a._useUTC && (b._useUTC = a._useUTC), b._f = a._f[e], Fd(b), q(b) && (f += n(b).charsLeftOver, f += 10 * n(b).unusedTokens.length, n(b).score = f, (null == d || d > f) && (d = f, c = b));
    }k(a, c || b);
  }function Id(a) {
    if (!a._d) {
      var b = $(a._i);a._a = i([b.year, b.month, b.day || b.date, b.hour, b.minute, b.second, b.millisecond], function (a) {
        return a && parseInt(a, 10);
      }), Dd(a);
    }
  }function Jd(a) {
    var b = new w(sd(Kd(a)));return b._nextDay && (b.add(1, "d"), b._nextDay = void 0), b;
  }function Kd(a) {
    var b = a._i,
        c = a._f;return a._locale = a._locale || qd(a._l), null === b || void 0 === c && "" === b ? r({ nullInput: !0 }) : ("string" == typeof b && (a._i = b = a._locale.preparse(b)), x(b) ? new w(sd(b)) : (h(b) ? a._d = b : d(c) ? Hd(a) : c ? Fd(a) : Ld(a), q(a) || (a._d = null), a));
  }function Ld(a) {
    var c = a._i;void 0 === c ? a._d = new Date(b.now()) : h(c) ? a._d = new Date(c.valueOf()) : "string" == typeof c ? Ad(a) : d(c) ? (a._a = i(c.slice(0), function (a) {
      return parseInt(a, 10);
    }), Dd(a)) : "object" == (typeof c === "undefined" ? "undefined" : _typeof(c)) ? Id(a) : g(c) ? a._d = new Date(c) : b.createFromInputFallback(a);
  }function Md(a, b, c, g, h) {
    var i = {};return (c === !0 || c === !1) && (g = c, c = void 0), (e(a) && f(a) || d(a) && 0 === a.length) && (a = void 0), i._isAMomentObject = !0, i._useUTC = i._isUTC = h, i._l = c, i._i = a, i._f = b, i._strict = g, Jd(i);
  }function Nd(a, b, c, d) {
    return Md(a, b, c, d, !1);
  }function Qd(a, b) {
    var c, e;if (1 === b.length && d(b[0]) && (b = b[0]), !b.length) return Nd();for (c = b[0], e = 1; e < b.length; ++e) {
      (!b[e].isValid() || b[e][a](c)) && (c = b[e]);
    }return c;
  }function Rd() {
    var a = [].slice.call(arguments, 0);return Qd("isBefore", a);
  }function Sd() {
    var a = [].slice.call(arguments, 0);return Qd("isAfter", a);
  }function Ud(a) {
    var b = $(a),
        c = b.year || 0,
        d = b.quarter || 0,
        e = b.month || 0,
        f = b.week || 0,
        g = b.day || 0,
        h = b.hour || 0,
        i = b.minute || 0,
        j = b.second || 0,
        k = b.millisecond || 0;this._milliseconds = +k + 1e3 * j + 6e4 * i + 60 * 60 * 1e3 * h, this._days = +g + 7 * f, this._months = +e + 3 * d + 12 * c, this._data = {}, this._locale = qd(), this._bubble();
  }function Vd(a) {
    return a instanceof Ud;
  }function Wd(a) {
    return 0 > a ? -1 * Math.round(-1 * a) : Math.round(a);
  }function Xd(a, b) {
    mb(a, 0, 0, function () {
      var a = this.utcOffset(),
          c = "+";return 0 > a && (a = -a, c = "-"), c + hb(~~(a / 60), 2) + b + hb(~~a % 60, 2);
    });
  }function Zd(a, b) {
    var d,
        e,
        f,
        c = (b || "").match(a);return null === c ? null : (d = c[c.length - 1] || [], e = (d + "").match(Yd) || ["-", 0, 0], f = +(60 * e[1]) + z(e[2]), 0 === f ? 0 : "+" === e[0] ? f : -f);
  }function $d(a, c) {
    var d, e;return c._isUTC ? (d = c.clone(), e = (x(a) || h(a) ? a.valueOf() : Nd(a).valueOf()) - d.valueOf(), d._d.setTime(d._d.valueOf() + e), b.updateOffset(d, !1), d) : Nd(a).local();
  }function _d(a) {
    return 15 * -Math.round(a._d.getTimezoneOffset() / 15);
  }function ae(a, c) {
    var e,
        d = this._offset || 0;if (!this.isValid()) return null != a ? this : 0 / 0;if (null != a) {
      if ("string" == typeof a) {
        if (a = Zd(Fb, a), null === a) return this;
      } else Math.abs(a) < 16 && (a = 60 * a);return !this._isUTC && c && (e = _d(this)), this._offset = a, this._isUTC = !0, null != e && this.add(e, "m"), d !== a && (!c || this._changeInProgress ? se(this, ne(a - d, "m"), 1, !1) : this._changeInProgress || (this._changeInProgress = !0, b.updateOffset(this, !0), this._changeInProgress = null)), this;
    }return this._isUTC ? d : _d(this);
  }function be(a, b) {
    return null != a ? ("string" != typeof a && (a = -a), this.utcOffset(a, b), this) : -this.utcOffset();
  }function ce(a) {
    return this.utcOffset(0, a);
  }function de(a) {
    return this._isUTC && (this.utcOffset(0, a), this._isUTC = !1, a && this.subtract(_d(this), "m")), this;
  }function ee() {
    if (null != this._tzm) this.utcOffset(this._tzm);else if ("string" == typeof this._i) {
      var a = Zd(Eb, this._i);null != a ? this.utcOffset(a) : this.utcOffset(0, !0);
    }return this;
  }function fe(a) {
    return this.isValid() ? (a = a ? Nd(a).utcOffset() : 0, 0 === (this.utcOffset() - a) % 60) : !1;
  }function ge() {
    return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset();
  }function he() {
    var a, b;return s(this._isDSTShifted) ? (a = {}, u(a, this), a = Kd(a), a._a ? (b = a._isUTC ? l(a._a) : Nd(a._a), this._isDSTShifted = this.isValid() && A(a._a, b.toArray()) > 0) : this._isDSTShifted = !1, this._isDSTShifted) : this._isDSTShifted;
  }function ie() {
    return this.isValid() ? !this._isUTC : !1;
  }function je() {
    return this.isValid() ? this._isUTC : !1;
  }function ke() {
    return this.isValid() ? this._isUTC && 0 === this._offset : !1;
  }function ne(a, b) {
    var e,
        f,
        h,
        c = a,
        d = null;return Vd(a) ? c = { ms: a._milliseconds, d: a._days, M: a._months } : g(a) ? (c = {}, b ? c[b] = a : c.milliseconds = a) : (d = le.exec(a)) ? (e = "-" === d[1] ? -1 : 1, c = { y: 0, d: z(d[Tb]) * e, h: z(d[Ub]) * e, m: z(d[Vb]) * e, s: z(d[Wb]) * e, ms: z(Wd(1e3 * d[Xb])) * e }) : (d = me.exec(a)) ? (e = "-" === d[1] ? -1 : 1, c = { y: oe(d[2], e), M: oe(d[3], e), w: oe(d[4], e), d: oe(d[5], e), h: oe(d[6], e), m: oe(d[7], e), s: oe(d[8], e) }) : null == c ? c = {} : "object" == (typeof c === "undefined" ? "undefined" : _typeof(c)) && ("from" in c || "to" in c) && (h = qe(Nd(c.from), Nd(c.to)), c = {}, c.ms = h.milliseconds, c.M = h.months), f = new Ud(c), Vd(a) && j(a, "_locale") && (f._locale = a._locale), f;
  }function oe(a, b) {
    var c = a && parseFloat(a.replace(",", "."));return (isNaN(c) ? 0 : c) * b;
  }function pe(a, b) {
    var c = { milliseconds: 0, months: 0 };return c.months = b.month() - a.month() + 12 * (b.year() - a.year()), a.clone().add(c.months, "M").isAfter(b) && --c.months, c.milliseconds = +b - +a.clone().add(c.months, "M"), c;
  }function qe(a, b) {
    var c;return a.isValid() && b.isValid() ? (b = $d(b, a), a.isBefore(b) ? c = pe(a, b) : (c = pe(b, a), c.milliseconds = -c.milliseconds, c.months = -c.months), c) : { milliseconds: 0, months: 0 };
  }function re(a, b) {
    return function (c, d) {
      var e, f;return null === d || isNaN(+d) || (E(b, "moment()." + b + "(period, number) is deprecated. Please use moment()." + b + "(number, period). " + "See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."), f = c, c = d, d = f), c = "string" == typeof c ? +c : c, e = ne(c, d), se(this, e, a), this;
    };
  }function se(a, c, d, e) {
    var f = c._milliseconds,
        g = Wd(c._days),
        h = Wd(c._months);a.isValid() && (e = null == e ? !0 : e, f && a._d.setTime(a._d.valueOf() + f * d), g && eb(a, "Date", db(a, "Date") + g * d), h && ic(a, db(a, "Month") + h * d), e && b.updateOffset(a, g || h));
  }function ve(a, b) {
    var c = a.diff(b, "days", !0);return -6 > c ? "sameElse" : -1 > c ? "lastWeek" : 0 > c ? "lastDay" : 1 > c ? "sameDay" : 2 > c ? "nextDay" : 7 > c ? "nextWeek" : "sameElse";
  }function we(a, c) {
    var d = a || Nd(),
        e = $d(d, this).startOf("day"),
        f = b.calendarFormat(this, e) || "sameElse",
        g = c && (F(c[f]) ? c[f].call(this, d) : c[f]);return this.format(g || this.localeData().calendar(f, this, Nd(d)));
  }function xe() {
    return new w(this);
  }function ye(a, b) {
    var c = x(a) ? a : Nd(a);return this.isValid() && c.isValid() ? (b = Z(s(b) ? "millisecond" : b), "millisecond" === b ? this.valueOf() > c.valueOf() : c.valueOf() < this.clone().startOf(b).valueOf()) : !1;
  }function ze(a, b) {
    var c = x(a) ? a : Nd(a);return this.isValid() && c.isValid() ? (b = Z(s(b) ? "millisecond" : b), "millisecond" === b ? this.valueOf() < c.valueOf() : this.clone().endOf(b).valueOf() < c.valueOf()) : !1;
  }function Ae(a, b, c, d) {
    return d = d || "()", ("(" === d[0] ? this.isAfter(a, c) : !this.isBefore(a, c)) && (")" === d[1] ? this.isBefore(b, c) : !this.isAfter(b, c));
  }function Be(a, b) {
    var d,
        c = x(a) ? a : Nd(a);return this.isValid() && c.isValid() ? (b = Z(b || "millisecond"), "millisecond" === b ? this.valueOf() === c.valueOf() : (d = c.valueOf(), this.clone().startOf(b).valueOf() <= d && d <= this.clone().endOf(b).valueOf())) : !1;
  }function Ce(a, b) {
    return this.isSame(a, b) || this.isAfter(a, b);
  }function De(a, b) {
    return this.isSame(a, b) || this.isBefore(a, b);
  }function Ee(a, b, c) {
    var d, e, f, g;return this.isValid() ? (d = $d(a, this), d.isValid() ? (e = 6e4 * (d.utcOffset() - this.utcOffset()), b = Z(b), "year" === b || "month" === b || "quarter" === b ? (g = Fe(this, d), "quarter" === b ? g /= 3 : "year" === b && (g /= 12)) : (f = this - d, g = "second" === b ? f / 1e3 : "minute" === b ? f / 6e4 : "hour" === b ? f / 36e5 : "day" === b ? (f - e) / 864e5 : "week" === b ? (f - e) / 6048e5 : f), c ? g : y(g)) : 0 / 0) : 0 / 0;
  }function Fe(a, b) {
    var e,
        f,
        c = 12 * (b.year() - a.year()) + (b.month() - a.month()),
        d = a.clone().add(c, "months");return 0 > b - d ? (e = a.clone().add(c - 1, "months"), f = (b - d) / (d - e)) : (e = a.clone().add(c + 1, "months"), f = (b - d) / (e - d)), -(c + f) || 0;
  }function Ge() {
    return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
  }function He() {
    var a = this.clone().utc();return 0 < a.year() && a.year() <= 9999 ? F(Date.prototype.toISOString) ? this.toDate().toISOString() : pb(a, "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]") : pb(a, "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]");
  }function Ie() {
    var a, b, c, d, e, f;return this.isValid() ? (a = "moment", b = "", this.isLocal() || (a = 0 === this.utcOffset() ? "moment.utc" : "moment.parseZone", b = "Z"), c = "[" + a + '("]', d = 0 < this.year() && this.year() <= 9999 ? "YYYY" : "YYYYYY", e = "-MM-DD[T]HH:mm:ss.SSS", f = b + '[")]', this.format(c + d + e + f)) : "moment.invalid(/* " + this._i + " */)";
  }function Je(a) {
    a || (a = this.isUtc() ? b.defaultFormatUtc : b.defaultFormat);var c = pb(this, a);return this.localeData().postformat(c);
  }function Ke(a, b) {
    return this.isValid() && (x(a) && a.isValid() || Nd(a).isValid()) ? ne({ to: this, from: a }).locale(this.locale()).humanize(!b) : this.localeData().invalidDate();
  }function Le(a) {
    return this.from(Nd(), a);
  }function Me(a, b) {
    return this.isValid() && (x(a) && a.isValid() || Nd(a).isValid()) ? ne({ from: this, to: a }).locale(this.locale()).humanize(!b) : this.localeData().invalidDate();
  }function Ne(a) {
    return this.to(Nd(), a);
  }function Oe(a) {
    var b;return void 0 === a ? this._locale._abbr : (b = qd(a), null != b && (this._locale = b), this);
  }function Qe() {
    return this._locale;
  }function Re(a) {
    switch (a = Z(a)) {case "year":
        this.month(0);case "quarter":case "month":
        this.date(1);case "week":case "isoWeek":case "day":case "date":
        this.hours(0);case "hour":
        this.minutes(0);case "minute":
        this.seconds(0);case "second":
        this.milliseconds(0);}return "week" === a && this.weekday(0), "isoWeek" === a && this.isoWeekday(1), "quarter" === a && this.month(3 * Math.floor(this.month() / 3)), this;
  }function Se(a) {
    return a = Z(a), void 0 === a || "millisecond" === a ? this : ("date" === a && (a = "day"), this.startOf(a).add(1, "isoWeek" === a ? "week" : a).subtract(1, "ms"));
  }function Te() {
    return this._d.valueOf() - 6e4 * (this._offset || 0);
  }function Ue() {
    return Math.floor(this.valueOf() / 1e3);
  }function Ve() {
    return new Date(this.valueOf());
  }function We() {
    var a = this;return [a.year(), a.month(), a.date(), a.hour(), a.minute(), a.second(), a.millisecond()];
  }function Xe() {
    var a = this;return { years: a.year(), months: a.month(), date: a.date(), hours: a.hours(), minutes: a.minutes(), seconds: a.seconds(), milliseconds: a.milliseconds() };
  }function Ye() {
    return this.isValid() ? this.toISOString() : null;
  }function Ze() {
    return q(this);
  }function $e() {
    return k({}, n(this));
  }function _e() {
    return n(this).overflow;
  }function af() {
    return { input: this._i, format: this._f, locale: this._locale, isUTC: this._isUTC, strict: this._strict };
  }function bf(a, b) {
    mb(0, [a, a.length], 0, b);
  }function cf(a) {
    return gf.call(this, a, this.week(), this.weekday(), this.localeData()._week.dow, this.localeData()._week.doy);
  }function df(a) {
    return gf.call(this, a, this.isoWeek(), this.isoWeekday(), 1, 4);
  }function ef() {
    return zc(this.year(), 1, 4);
  }function ff() {
    var a = this.localeData()._week;return zc(this.year(), a.dow, a.doy);
  }function gf(a, b, c, d, e) {
    var f;return null == a ? yc(this, d, e).year : (f = zc(a, d, e), b > f && (b = f), hf.call(this, a, b, c, d, e));
  }function hf(a, b, c, d, e) {
    var f = xc(a, b, c, d, e),
        g = vc(f.year, 0, f.dayOfYear);return this.year(g.getUTCFullYear()), this.month(g.getUTCMonth()), this.date(g.getUTCDate()), this;
  }function jf(a) {
    return null == a ? Math.ceil((this.month() + 1) / 3) : this.month(3 * (a - 1) + this.month() % 3);
  }function lf(a) {
    var b = Math.round((this.clone().startOf("day") - this.clone().startOf("year")) / 864e5) + 1;return null == a ? b : this.add(a - b, "d");
  }function pf(a, b) {
    b[Xb] = z(1e3 * ("0." + a));
  }function rf() {
    return this._isUTC ? "UTC" : "";
  }function sf() {
    return this._isUTC ? "Coordinated Universal Time" : "";
  }function uf(a) {
    return Nd(1e3 * a);
  }function vf() {
    return Nd.apply(null, arguments).parseZone();
  }function wf(a) {
    return a;
  }function yf(a, b, c, d) {
    var e = qd(),
        f = l().set(d, b);return e[c](f, a);
  }function zf(a, b, c) {
    var d, e;if (g(a) && (b = a, a = void 0), a = a || "", null != b) return yf(a, b, c, "month");for (e = [], d = 0; 12 > d; d++) {
      e[d] = yf(a, d, c, "month");
    }return e;
  }function Af(a, b, c, d) {
    var e, f, h, i;
    if ("boolean" == typeof a ? (g(b) && (c = b, b = void 0), b = b || "") : (b = a, c = b, a = !1, g(b) && (c = b, b = void 0), b = b || ""), e = qd(), f = a ? e._week.dow : 0, null != c) return yf(b, (c + f) % 7, d, "day");for (i = [], h = 0; 7 > h; h++) {
      i[h] = yf(b, (h + f) % 7, d, "day");
    }return i;
  }function Bf(a, b) {
    return zf(a, b, "months");
  }function Cf(a, b) {
    return zf(a, b, "monthsShort");
  }function Df(a, b, c) {
    return Af(a, b, c, "weekdays");
  }function Ef(a, b, c) {
    return Af(a, b, c, "weekdaysShort");
  }function Ff(a, b, c) {
    return Af(a, b, c, "weekdaysMin");
  }function Hf() {
    var a = this._data;return this._milliseconds = Gf(this._milliseconds), this._days = Gf(this._days), this._months = Gf(this._months), a.milliseconds = Gf(a.milliseconds), a.seconds = Gf(a.seconds), a.minutes = Gf(a.minutes), a.hours = Gf(a.hours), a.months = Gf(a.months), a.years = Gf(a.years), this;
  }function If(a, b, c, d) {
    var e = ne(b, c);return a._milliseconds += d * e._milliseconds, a._days += d * e._days, a._months += d * e._months, a._bubble();
  }function Jf(a, b) {
    return If(this, a, b, 1);
  }function Kf(a, b) {
    return If(this, a, b, -1);
  }function Lf(a) {
    return 0 > a ? Math.floor(a) : Math.ceil(a);
  }function Mf() {
    var e,
        f,
        g,
        h,
        i,
        a = this._milliseconds,
        b = this._days,
        c = this._months,
        d = this._data;return a >= 0 && b >= 0 && c >= 0 || 0 >= a && 0 >= b && 0 >= c || (a += 864e5 * Lf(Of(c) + b), b = 0, c = 0), d.milliseconds = a % 1e3, e = y(a / 1e3), d.seconds = e % 60, f = y(e / 60), d.minutes = f % 60, g = y(f / 60), d.hours = g % 24, b += y(g / 24), i = y(Nf(b)), c += i, b -= Lf(Of(i)), h = y(c / 12), c %= 12, d.days = b, d.months = c, d.years = h, this;
  }function Nf(a) {
    return 4800 * a / 146097;
  }function Of(a) {
    return 146097 * a / 4800;
  }function Pf(a) {
    var b,
        c,
        d = this._milliseconds;if (a = Z(a), "month" === a || "year" === a) return b = this._days + d / 864e5, c = this._months + Nf(b), "month" === a ? c : c / 12;switch (b = this._days + Math.round(Of(this._months)), a) {case "week":
        return b / 7 + d / 6048e5;case "day":
        return b + d / 864e5;case "hour":
        return 24 * b + d / 36e5;case "minute":
        return 1440 * b + d / 6e4;case "second":
        return 86400 * b + d / 1e3;case "millisecond":
        return Math.floor(864e5 * b) + d;default:
        throw new Error("Unknown unit " + a);}
  }function Qf() {
    return this._milliseconds + 864e5 * this._days + 2592e6 * (this._months % 12) + 31536e6 * z(this._months / 12);
  }function Rf(a) {
    return function () {
      return this.as(a);
    };
  }function $f(a) {
    return a = Z(a), this[a + "s"]();
  }function _f(a) {
    return function () {
      return this._data[a];
    };
  }function hg() {
    return y(this.days() / 7);
  }function kg(a, b, c, d, e) {
    return e.relativeTime(b || 1, !!c, a, d);
  }function lg(a, b, c) {
    var d = ne(a).abs(),
        e = ig(d.as("s")),
        f = ig(d.as("m")),
        g = ig(d.as("h")),
        h = ig(d.as("d")),
        i = ig(d.as("M")),
        j = ig(d.as("y")),
        k = e < jg.s && ["s", e] || 1 >= f && ["m"] || f < jg.m && ["mm", f] || 1 >= g && ["h"] || g < jg.h && ["hh", g] || 1 >= h && ["d"] || h < jg.d && ["dd", h] || 1 >= i && ["M"] || i < jg.M && ["MM", i] || 1 >= j && ["y"] || ["yy", j];return k[2] = b, k[3] = +a > 0, k[4] = c, kg.apply(null, k);
  }function mg(a) {
    return void 0 === a ? ig : "function" == typeof a ? (ig = a, !0) : !1;
  }function ng(a, b) {
    return void 0 === jg[a] ? !1 : void 0 === b ? jg[a] : (jg[a] = b, !0);
  }function og(a) {
    var b = this.localeData(),
        c = lg(this, !a, b);return a && (c = b.pastFuture(+this, c)), b.postformat(c);
  }function qg() {
    var f,
        g,
        h,
        i,
        j,
        k,
        l,
        m,
        a = pg(this._milliseconds) / 1e3,
        b = pg(this._days),
        c = pg(this._months),
        d = y(a / 60),
        e = y(d / 60);return a %= 60, d %= 60, f = y(c / 12), c %= 12, g = f, h = c, i = b, j = e, k = d, l = a, m = this.asSeconds(), m ? (0 > m ? "-" : "") + "P" + (g ? g + "Y" : "") + (h ? h + "M" : "") + (i ? i + "D" : "") + (j || k || l ? "T" : "") + (j ? j + "H" : "") + (k ? k + "M" : "") + (l ? l + "S" : "") : "P0D";
  }var a, o, p, t, v, D, J, K, L, N, P, R, S, U, X, _, ib, jb, kb, lb, rb, sb, tb, ub, vb, wb, xb, yb, zb, Ab, Bb, Cb, Db, Eb, Fb, Gb, Hb, Ib, Nb, Rb, Sb, Tb, Ub, Vb, Wb, Xb, Yb, Zb, $b, _b, bc, cc, ec, lc, nc, sc, Bc, Ic, Kc, Mc, Tc, Vc, Xc, dd, fd, gd, hd, id, jd, td, ud, vd, wd, xd, yd, Od, Pd, Td, Yd, le, me, te, ue, Pe, kf, mf, nf, of, qf, tf, xf, Gf, Sf, Tf, Uf, Vf, Wf, Xf, Yf, Zf, ag, bg, cg, dg, eg, fg, gg, ig, jg, pg, rg;o = Array.prototype.some ? Array.prototype.some : function (a) {
    var d,
        b = Object(this),
        c = b.length >>> 0;for (d = 0; c > d; d++) {
      if (d in b && a.call(this, b[d], d, b)) return !0;
    }return !1;
  }, p = o, t = b.momentProperties = [], v = !1, D = {}, b.suppressDeprecationWarnings = !1, b.deprecationHandler = null, J = Object.keys ? Object.keys : function (a) {
    var b,
        c = [];for (b in a) {
      j(a, b) && c.push(b);
    }return c;
  }, K = J, L = { sameDay: "[Today at] LT", nextDay: "[Tomorrow at] LT", nextWeek: "dddd [at] LT", lastDay: "[Yesterday at] LT", lastWeek: "[Last] dddd [at] LT", sameElse: "L" }, N = { LTS: "h:mm:ss A", LT: "h:mm A", L: "MM/DD/YYYY", LL: "MMMM D, YYYY", LLL: "MMMM D, YYYY h:mm A", LLLL: "dddd, MMMM D, YYYY h:mm A" }, P = "Invalid date", R = "%d", S = /\d{1,2}/, U = { future: "in %s", past: "%s ago", s: "a few seconds", m: "a minute", mm: "%d minutes", h: "an hour", hh: "%d hours", d: "a day", dd: "%d days", M: "a month", MM: "%d months", y: "a year", yy: "%d years" }, X = {}, _ = {}, ib = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g, jb = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, kb = {}, lb = {}, rb = /\d/, sb = /\d\d/, tb = /\d{3}/, ub = /\d{4}/, vb = /[+-]?\d{6}/, wb = /\d\d?/, xb = /\d\d\d\d?/, yb = /\d\d\d\d\d\d?/, zb = /\d{1,3}/, Ab = /\d{1,4}/, Bb = /[+-]?\d{1,6}/, Cb = /\d+/, Db = /[+-]?\d+/, Eb = /Z|[+-]\d\d:?\d\d/gi, Fb = /Z|[+-]\d\d(?::?\d\d)?/gi, Gb = /[+-]?\d+(\.\d{1,3})?/, Hb = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i, Ib = {}, Nb = {}, Rb = 0, Sb = 1, Tb = 2, Ub = 3, Vb = 4, Wb = 5, Xb = 6, Yb = 7, Zb = 8, $b = Array.prototype.indexOf ? Array.prototype.indexOf : function (a) {
    var b;for (b = 0; b < this.length; ++b) {
      if (this[b] === a) return b;
    }return -1;
  }, _b = $b, mb("M", ["MM", 2], "Mo", function () {
    return this.month() + 1;
  }), mb("MMM", 0, 0, function (a) {
    return this.localeData().monthsShort(this, a);
  }), mb("MMMM", 0, 0, function (a) {
    return this.localeData().months(this, a);
  }), Y("month", "M"), ab("month", 8), Jb("M", wb), Jb("MM", wb, sb), Jb("MMM", function (a, b) {
    return b.monthsShortRegex(a);
  }), Jb("MMMM", function (a, b) {
    return b.monthsRegex(a);
  }), Ob(["M", "MM"], function (a, b) {
    b[Sb] = z(a) - 1;
  }), Ob(["MMM", "MMMM"], function (a, b, c, d) {
    var e = c._locale.monthsParse(a, d, c._strict);null != e ? b[Sb] = e : n(c).invalidMonth = a;
  }), bc = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/, cc = "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ec = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), lc = Hb, nc = Hb, mb("Y", 0, 0, function () {
    var a = this.year();return 9999 >= a ? "" + a : "+" + a;
  }), mb(0, ["YY", 2], 0, function () {
    return this.year() % 100;
  }), mb(0, ["YYYY", 4], 0, "year"), mb(0, ["YYYYY", 5], 0, "year"), mb(0, ["YYYYYY", 6, !0], 0, "year"), Y("year", "y"), ab("year", 1), Jb("Y", Db), Jb("YY", wb, sb), Jb("YYYY", Ab, ub), Jb("YYYYY", Bb, vb), Jb("YYYYYY", Bb, vb), Ob(["YYYYY", "YYYYYY"], Rb), Ob("YYYY", function (a, c) {
    c[Rb] = 2 === a.length ? b.parseTwoDigitYear(a) : z(a);
  }), Ob("YY", function (a, c) {
    c[Rb] = b.parseTwoDigitYear(a);
  }), Ob("Y", function (a, b) {
    b[Rb] = parseInt(a, 10);
  }), b.parseTwoDigitYear = function (a) {
    return z(a) + (z(a) > 68 ? 1900 : 2e3);
  }, sc = cb("FullYear", !0), mb("w", ["ww", 2], "wo", "week"), mb("W", ["WW", 2], "Wo", "isoWeek"), Y("week", "w"), Y("isoWeek", "W"), ab("week", 5), ab("isoWeek", 5), Jb("w", wb), Jb("ww", wb, sb), Jb("W", wb), Jb("WW", wb, sb), Pb(["w", "ww", "W", "WW"], function (a, b, c, d) {
    b[d.substr(0, 1)] = z(a);
  }), Bc = { dow: 0, doy: 6 }, mb("d", 0, "do", "day"), mb("dd", 0, 0, function (a) {
    return this.localeData().weekdaysMin(this, a);
  }), mb("ddd", 0, 0, function (a) {
    return this.localeData().weekdaysShort(this, a);
  }), mb("dddd", 0, 0, function (a) {
    return this.localeData().weekdays(this, a);
  }), mb("e", 0, 0, "weekday"), mb("E", 0, 0, "isoWeekday"), Y("day", "d"), Y("weekday", "e"), Y("isoWeekday", "E"), ab("day", 11), ab("weekday", 11), ab("isoWeekday", 11), Jb("d", wb), Jb("e", wb), Jb("E", wb), Jb("dd", function (a, b) {
    return b.weekdaysMinRegex(a);
  }), Jb("ddd", function (a, b) {
    return b.weekdaysShortRegex(a);
  }), Jb("dddd", function (a, b) {
    return b.weekdaysRegex(a);
  }), Pb(["dd", "ddd", "dddd"], function (a, b, c, d) {
    var e = c._locale.weekdaysParse(a, d, c._strict);null != e ? b.d = e : n(c).invalidWeekday = a;
  }), Pb(["d", "e", "E"], function (a, b, c, d) {
    b[d] = z(a);
  }), Ic = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), Kc = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), Mc = "Su_Mo_Tu_We_Th_Fr_Sa".split("_"), Tc = Hb, Vc = Hb, Xc = Hb, mb("H", ["HH", 2], 0, "hour"), mb("h", ["hh", 2], 0, $c), mb("k", ["kk", 2], 0, _c), mb("hmm", 0, 0, function () {
    return "" + $c.apply(this) + hb(this.minutes(), 2);
  }), mb("hmmss", 0, 0, function () {
    return "" + $c.apply(this) + hb(this.minutes(), 2) + hb(this.seconds(), 2);
  }), mb("Hmm", 0, 0, function () {
    return "" + this.hours() + hb(this.minutes(), 2);
  }), mb("Hmmss", 0, 0, function () {
    return "" + this.hours() + hb(this.minutes(), 2) + hb(this.seconds(), 2);
  }), ad("a", !0), ad("A", !1), Y("hour", "h"), ab("hour", 13), Jb("a", bd), Jb("A", bd), Jb("H", wb), Jb("h", wb), Jb("HH", wb, sb), Jb("hh", wb, sb), Jb("hmm", xb), Jb("hmmss", yb), Jb("Hmm", xb), Jb("Hmmss", yb), Ob(["H", "HH"], Ub), Ob(["a", "A"], function (a, b, c) {
    c._isPm = c._locale.isPM(a), c._meridiem = a;
  }), Ob(["h", "hh"], function (a, b, c) {
    b[Ub] = z(a), n(c).bigHour = !0;
  }), Ob("hmm", function (a, b, c) {
    var d = a.length - 2;b[Ub] = z(a.substr(0, d)), b[Vb] = z(a.substr(d)), n(c).bigHour = !0;
  }), Ob("hmmss", function (a, b, c) {
    var d = a.length - 4,
        e = a.length - 2;b[Ub] = z(a.substr(0, d)), b[Vb] = z(a.substr(d, 2)), b[Wb] = z(a.substr(e)), n(c).bigHour = !0;
  }), Ob("Hmm", function (a, b) {
    var d = a.length - 2;b[Ub] = z(a.substr(0, d)), b[Vb] = z(a.substr(d));
  }), Ob("Hmmss", function (a, b) {
    var d = a.length - 4,
        e = a.length - 2;b[Ub] = z(a.substr(0, d)), b[Vb] = z(a.substr(d, 2)), b[Wb] = z(a.substr(e));
  }), dd = /[ap]\.?m?\.?/i, fd = cb("Hours", !0), gd = { calendar: L, longDateFormat: N, invalidDate: P, ordinal: R, ordinalParse: S, relativeTime: U, months: cc, monthsShort: ec, week: Bc, weekdays: Ic, weekdaysMin: Mc, weekdaysShort: Kc, meridiemParse: dd }, hd = {}, id = {}, td = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/, ud = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/, vd = /Z|[+-]\d\d(?::?\d\d)?/, wd = [["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/], ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/], ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/], ["GGGG-[W]WW", /\d{4}-W\d\d/, !1], ["YYYY-DDD", /\d{4}-\d{3}/], ["YYYY-MM", /\d{4}-\d\d/, !1], ["YYYYYYMMDD", /[+-]\d{10}/], ["YYYYMMDD", /\d{8}/], ["GGGG[W]WWE", /\d{4}W\d{3}/], ["GGGG[W]WW", /\d{4}W\d{2}/, !1], ["YYYYDDD", /\d{7}/]], xd = [["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/], ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/], ["HH:mm:ss", /\d\d:\d\d:\d\d/], ["HH:mm", /\d\d:\d\d/], ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/], ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/], ["HHmmss", /\d\d\d\d\d\d/], ["HHmm", /\d\d\d\d/], ["HH", /\d\d/]], yd = /^\/?Date\((\-?\d+)/i, b.createFromInputFallback = C("value provided is not in a recognized ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non ISO date formats are discouraged and will be removed in an upcoming major release. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.", function (a) {
    a._d = new Date(a._i + (a._useUTC ? " UTC" : ""));
  }), b.ISO_8601 = function () {}, Od = C("moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/", function () {
    var a = Nd.apply(null, arguments);return this.isValid() && a.isValid() ? this > a ? this : a : r();
  }), Pd = C("moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/", function () {
    var a = Nd.apply(null, arguments);return this.isValid() && a.isValid() ? a > this ? this : a : r();
  }), Td = function Td() {
    return Date.now ? Date.now() : +new Date();
  }, Xd("Z", ":"), Xd("ZZ", ""), Jb("Z", Fb), Jb("ZZ", Fb), Ob(["Z", "ZZ"], function (a, b, c) {
    c._useUTC = !0, c._tzm = Zd(Fb, a);
  }), Yd = /([\+\-]|\d\d)/gi, b.updateOffset = function () {}, le = /^(\-)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/, me = /^(-)?P(?:(-?[0-9,.]*)Y)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)W)?(?:(-?[0-9,.]*)D)?(?:T(?:(-?[0-9,.]*)H)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)S)?)?$/, ne.fn = Ud.prototype, te = re(1, "add"), ue = re(-1, "subtract"), b.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ", b.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]", Pe = C("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.", function (a) {
    return void 0 === a ? this.localeData() : this.locale(a);
  }), mb(0, ["gg", 2], 0, function () {
    return this.weekYear() % 100;
  }), mb(0, ["GG", 2], 0, function () {
    return this.isoWeekYear() % 100;
  }), bf("gggg", "weekYear"), bf("ggggg", "weekYear"), bf("GGGG", "isoWeekYear"), bf("GGGGG", "isoWeekYear"), Y("weekYear", "gg"), Y("isoWeekYear", "GG"), ab("weekYear", 1), ab("isoWeekYear", 1), Jb("G", Db), Jb("g", Db), Jb("GG", wb, sb), Jb("gg", wb, sb), Jb("GGGG", Ab, ub), Jb("gggg", Ab, ub), Jb("GGGGG", Bb, vb), Jb("ggggg", Bb, vb), Pb(["gggg", "ggggg", "GGGG", "GGGGG"], function (a, b, c, d) {
    b[d.substr(0, 2)] = z(a);
  }), Pb(["gg", "GG"], function (a, c, d, e) {
    c[e] = b.parseTwoDigitYear(a);
  }), mb("Q", 0, "Qo", "quarter"), Y("quarter", "Q"), ab("quarter", 7), Jb("Q", rb), Ob("Q", function (a, b) {
    b[Sb] = 3 * (z(a) - 1);
  }), mb("D", ["DD", 2], "Do", "date"), Y("date", "D"), ab("date", 9), Jb("D", wb), Jb("DD", wb, sb), Jb("Do", function (a, b) {
    return a ? b._ordinalParse : b._ordinalParseLenient;
  }), Ob(["D", "DD"], Tb), Ob("Do", function (a, b) {
    b[Tb] = z(a.match(wb)[0], 10);
  }), kf = cb("Date", !0), mb("DDD", ["DDDD", 3], "DDDo", "dayOfYear"), Y("dayOfYear", "DDD"), ab("dayOfYear", 4), Jb("DDD", zb), Jb("DDDD", tb), Ob(["DDD", "DDDD"], function (a, b, c) {
    c._dayOfYear = z(a);
  }), mb("m", ["mm", 2], 0, "minute"), Y("minute", "m"), ab("minute", 14), Jb("m", wb), Jb("mm", wb, sb), Ob(["m", "mm"], Vb), mf = cb("Minutes", !1), mb("s", ["ss", 2], 0, "second"), Y("second", "s"), ab("second", 15), Jb("s", wb), Jb("ss", wb, sb), Ob(["s", "ss"], Wb), nf = cb("Seconds", !1), mb("S", 0, 0, function () {
    return ~~(this.millisecond() / 100);
  }), mb(0, ["SS", 2], 0, function () {
    return ~~(this.millisecond() / 10);
  }), mb(0, ["SSS", 3], 0, "millisecond"), mb(0, ["SSSS", 4], 0, function () {
    return 10 * this.millisecond();
  }), mb(0, ["SSSSS", 5], 0, function () {
    return 100 * this.millisecond();
  }), mb(0, ["SSSSSS", 6], 0, function () {
    return 1e3 * this.millisecond();
  }), mb(0, ["SSSSSSS", 7], 0, function () {
    return 1e4 * this.millisecond();
  }), mb(0, ["SSSSSSSS", 8], 0, function () {
    return 1e5 * this.millisecond();
  }), mb(0, ["SSSSSSSSS", 9], 0, function () {
    return 1e6 * this.millisecond();
  }), Y("millisecond", "ms"), ab("millisecond", 16), Jb("S", zb, rb), Jb("SS", zb, sb), Jb("SSS", zb, tb);for (of = "SSSS"; of.length <= 9; of += "S") {
    Jb(of, Cb);
  }for (of = "S"; of.length <= 9; of += "S") {
    Ob(of, pf);
  }return qf = cb("Milliseconds", !1), mb("z", 0, 0, "zoneAbbr"), mb("zz", 0, 0, "zoneName"), tf = w.prototype, tf.add = te, tf.calendar = we, tf.clone = xe, tf.diff = Ee, tf.endOf = Se, tf.format = Je, tf.from = Ke, tf.fromNow = Le, tf.to = Me, tf.toNow = Ne, tf.get = fb, tf.invalidAt = _e, tf.isAfter = ye, tf.isBefore = ze, tf.isBetween = Ae, tf.isSame = Be, tf.isSameOrAfter = Ce, tf.isSameOrBefore = De, tf.isValid = Ze, tf.lang = Pe, tf.locale = Oe, tf.localeData = Qe, tf.max = Pd, tf.min = Od, tf.parsingFlags = $e, tf.set = gb, tf.startOf = Re, tf.subtract = ue, tf.toArray = We, tf.toObject = Xe, tf.toDate = Ve, tf.toISOString = He, tf.inspect = Ie, tf.toJSON = Ye, tf.toString = Ge, tf.unix = Ue, tf.valueOf = Te, tf.creationData = af, tf.year = sc, tf.isLeapYear = tc, tf.weekYear = cf, tf.isoWeekYear = df, tf.quarter = tf.quarters = jf, tf.month = jc, tf.daysInMonth = kc, tf.week = tf.weeks = Ec, tf.isoWeek = tf.isoWeeks = Fc, tf.weeksInYear = ff, tf.isoWeeksInYear = ef, tf.date = kf, tf.day = tf.days = Qc, tf.weekday = Rc, tf.isoWeekday = Sc, tf.dayOfYear = lf, tf.hour = tf.hours = fd, tf.minute = tf.minutes = mf, tf.second = tf.seconds = nf, tf.millisecond = tf.milliseconds = qf, tf.utcOffset = ae, tf.utc = ce, tf.local = de, tf.parseZone = ee, tf.hasAlignedHourOffset = fe, tf.isDST = ge, tf.isLocal = ie, tf.isUtcOffset = je, tf.isUtc = ke, tf.isUTC = ke, tf.zoneAbbr = rf, tf.zoneName = sf, tf.dates = C("dates accessor is deprecated. Use date instead.", kf), tf.months = C("months accessor is deprecated. Use month instead", jc), tf.years = C("years accessor is deprecated. Use year instead", sc), tf.zone = C("moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/", be), tf.isDSTShifted = C("isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information", he), xf = I.prototype, xf.calendar = M, xf.longDateFormat = O, xf.invalidDate = Q, xf.ordinal = T, xf.preparse = wf, xf.postformat = wf, xf.relativeTime = V, xf.pastFuture = W, xf.set = G, xf.months = dc, xf.monthsShort = fc, xf.monthsParse = hc, xf.monthsRegex = oc, xf.monthsShortRegex = mc, xf.week = Ac, xf.firstDayOfYear = Dc, xf.firstDayOfWeek = Cc, xf.weekdays = Jc, xf.weekdaysMin = Nc, xf.weekdaysShort = Lc, xf.weekdaysParse = Pc, xf.weekdaysRegex = Uc, xf.weekdaysShortRegex = Wc, xf.weekdaysMinRegex = Yc, xf.isPM = cd, xf.meridiem = ed, nd("en", { ordinalParse: /\d{1,2}(th|st|nd|rd)/, ordinal: function ordinal(a) {
      var b = a % 10,
          c = 1 === z(a % 100 / 10) ? "th" : 1 === b ? "st" : 2 === b ? "nd" : 3 === b ? "rd" : "th";return a + c;
    } }), b.lang = C("moment.lang is deprecated. Use moment.locale instead.", nd), b.langData = C("moment.langData is deprecated. Use moment.localeData instead.", qd), Gf = Math.abs, Sf = Rf("ms"), Tf = Rf("s"), Uf = Rf("m"), Vf = Rf("h"), Wf = Rf("d"), Xf = Rf("w"), Yf = Rf("M"), Zf = Rf("y"), ag = _f("milliseconds"), bg = _f("seconds"), cg = _f("minutes"), dg = _f("hours"), eg = _f("days"), fg = _f("months"), gg = _f("years"), ig = Math.round, jg = { s: 45, m: 45, h: 22, d: 26, M: 11 }, pg = Math.abs, rg = Ud.prototype, rg.abs = Hf, rg.add = Jf, rg.subtract = Kf, rg.as = Pf, rg.asMilliseconds = Sf, rg.asSeconds = Tf, rg.asMinutes = Uf, rg.asHours = Vf, rg.asDays = Wf, rg.asWeeks = Xf, rg.asMonths = Yf, rg.asYears = Zf, rg.valueOf = Qf, rg._bubble = Mf, rg.get = $f, rg.milliseconds = ag, rg.seconds = bg, rg.minutes = cg, rg.hours = dg, rg.days = eg, rg.weeks = hg, rg.months = fg, rg.years = gg, rg.humanize = og, rg.toISOString = qg, rg.toString = qg, rg.toJSON = qg, rg.locale = Oe, rg.localeData = Qe, rg.toIsoString = C("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", qg), rg.lang = Pe, mb("X", 0, 0, "unix"), mb("x", 0, 0, "valueOf"), Jb("x", Db), Jb("X", Gb), Ob("X", function (a, b, c) {
    c._d = new Date(1e3 * parseFloat(a, 10));
  }), Ob("x", function (a, b, c) {
    c._d = new Date(z(a));
  }), b.version = "2.17.0", c(Nd), b.fn = tf, b.min = Rd, b.max = Sd, b.now = Td, b.utc = l, b.unix = uf, b.months = Bf, b.isDate = h, b.locale = nd, b.invalid = r, b.duration = ne, b.isMoment = x, b.weekdays = Df, b.parseZone = vf, b.localeData = qd, b.isDuration = Vd, b.monthsShort = Cf, b.weekdaysMin = Ff, b.defineLocale = od, b.updateLocale = pd, b.locales = rd, b.weekdaysShort = Ef, b.normalizeUnits = Z, b.relativeTimeRounding = mg, b.relativeTimeThreshold = ng, b.calendarFormat = ve, b.prototype = tf, b.defineLocale("zh-cn", { months: "一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"), monthsShort: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"), weekdays: "星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"), weekdaysShort: "周日_周一_周二_周三_周四_周五_周六".split("_"), weekdaysMin: "日_一_二_三_四_五_六".split("_"), longDateFormat: { LT: "Ah点mm分", LTS: "Ah点m分s秒", L: "YYYY-MM-DD", LL: "YYYY年MMMD日", LLL: "YYYY年MMMD日Ah点mm分", LLLL: "YYYY年MMMD日ddddAh点mm分", l: "YYYY-MM-DD", ll: "YYYY年MMMD日", lll: "YYYY年MMMD日Ah点mm分", llll: "YYYY年MMMD日ddddAh点mm分" }, meridiemParse: /凌晨|早上|上午|中午|下午|晚上/, meridiemHour: function meridiemHour(a, b) {
      return 12 === a && (a = 0), "凌晨" === b || "早上" === b || "上午" === b ? a : "下午" === b || "晚上" === b ? a + 12 : a >= 11 ? a : a + 12;
    }, meridiem: function meridiem(a, b) {
      var d = 100 * a + b;return 600 > d ? "凌晨" : 900 > d ? "早上" : 1130 > d ? "上午" : 1230 > d ? "中午" : 1800 > d ? "下午" : "晚上";
    }, calendar: { sameDay: function sameDay() {
        return 0 === this.minutes() ? "[今天]Ah[点整]" : "[今天]LT";
      }, nextDay: function nextDay() {
        return 0 === this.minutes() ? "[明天]Ah[点整]" : "[明天]LT";
      }, lastDay: function lastDay() {
        return 0 === this.minutes() ? "[昨天]Ah[点整]" : "[昨天]LT";
      }, nextWeek: function nextWeek() {
        var a, c;return a = b().startOf("week"), c = this.diff(a, "days") >= 7 ? "[下]" : "[本]", 0 === this.minutes() ? c + "dddAh点整" : c + "dddAh点mm";
      }, lastWeek: function lastWeek() {
        var a, c;return a = b().startOf("week"), c = this.unix() < a.unix() ? "[上]" : "[本]", 0 === this.minutes() ? c + "dddAh点整" : c + "dddAh点mm";
      }, sameElse: "LL" }, ordinalParse: /\d{1,2}(日|月|周)/, ordinal: function ordinal(a, b) {
      switch (b) {case "d":case "D":case "DDD":
          return a + "日";case "M":
          return a + "月";case "w":case "W":
          return a + "周";default:
          return a;}
    }, relativeTime: { future: "%s内", past: "%s前", s: "几秒", m: "1 分钟", mm: "%d 分钟", h: "1 小时", hh: "%d 小时", d: "1 天", dd: "%d 天", M: "1 个月", MM: "%d 个月", y: "1 年", yy: "%d 年" }, week: { dow: 1, doy: 4 } }), b.defineLocale("zh-hk", { months: "一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"), monthsShort: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"), weekdays: "星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"), weekdaysShort: "週日_週一_週二_週三_週四_週五_週六".split("_"), weekdaysMin: "日_一_二_三_四_五_六".split("_"), longDateFormat: { LT: "Ah點mm分", LTS: "Ah點m分s秒", L: "YYYY年MMMD日", LL: "YYYY年MMMD日", LLL: "YYYY年MMMD日Ah點mm分", LLLL: "YYYY年MMMD日ddddAh點mm分", l: "YYYY年MMMD日", ll: "YYYY年MMMD日", lll: "YYYY年MMMD日Ah點mm分", llll: "YYYY年MMMD日ddddAh點mm分" }, meridiemParse: /凌晨|早上|上午|中午|下午|晚上/, meridiemHour: function meridiemHour(a, b) {
      return 12 === a && (a = 0), "凌晨" === b || "早上" === b || "上午" === b ? a : "中午" === b ? a >= 11 ? a : a + 12 : "下午" === b || "晚上" === b ? a + 12 : void 0;
    }, meridiem: function meridiem(a, b) {
      var d = 100 * a + b;return 600 > d ? "凌晨" : 900 > d ? "早上" : 1130 > d ? "上午" : 1230 > d ? "中午" : 1800 > d ? "下午" : "晚上";
    }, calendar: { sameDay: "[今天]LT", nextDay: "[明天]LT", nextWeek: "[下]ddddLT", lastDay: "[昨天]LT", lastWeek: "[上]ddddLT", sameElse: "L" }, ordinalParse: /\d{1,2}(日|月|週)/, ordinal: function ordinal(a, b) {
      switch (b) {case "d":case "D":case "DDD":
          return a + "日";case "M":
          return a + "月";case "w":case "W":
          return a + "週";default:
          return a;}
    }, relativeTime: { future: "%s內", past: "%s前", s: "幾秒", m: "1 分鐘", mm: "%d 分鐘", h: "1 小時", hh: "%d 小時", d: "1 天", dd: "%d 天", M: "1 個月", MM: "%d 個月", y: "1 年", yy: "%d 年" } }), b.defineLocale("zh-tw", { months: "一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"), monthsShort: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"), weekdays: "星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"), weekdaysShort: "週日_週一_週二_週三_週四_週五_週六".split("_"), weekdaysMin: "日_一_二_三_四_五_六".split("_"), longDateFormat: { LT: "Ah點mm分", LTS: "Ah點m分s秒", L: "YYYY年MMMD日", LL: "YYYY年MMMD日", LLL: "YYYY年MMMD日Ah點mm分", LLLL: "YYYY年MMMD日ddddAh點mm分", l: "YYYY年MMMD日", ll: "YYYY年MMMD日", lll: "YYYY年MMMD日Ah點mm分", llll: "YYYY年MMMD日ddddAh點mm分" }, meridiemParse: /凌晨|早上|上午|中午|下午|晚上/, meridiemHour: function meridiemHour(a, b) {
      return 12 === a && (a = 0), "凌晨" === b || "早上" === b || "上午" === b ? a : "中午" === b ? a >= 11 ? a : a + 12 : "下午" === b || "晚上" === b ? a + 12 : void 0;
    }, meridiem: function meridiem(a, b) {
      var d = 100 * a + b;return 600 > d ? "凌晨" : 900 > d ? "早上" : 1130 > d ? "上午" : 1230 > d ? "中午" : 1800 > d ? "下午" : "晚上";
    }, calendar: { sameDay: "[今天]LT", nextDay: "[明天]LT", nextWeek: "[下]ddddLT", lastDay: "[昨天]LT", lastWeek: "[上]ddddLT", sameElse: "L" }, ordinalParse: /\d{1,2}(日|月|週)/, ordinal: function ordinal(a, b) {
      switch (b) {case "d":case "D":case "DDD":
          return a + "日";case "M":
          return a + "月";case "w":case "W":
          return a + "週";default:
          return a;}
    }, relativeTime: { future: "%s內", past: "%s前", s: "幾秒", m: "1 分鐘", mm: "%d 分鐘", h: "1 小時", hh: "%d 小時", d: "1 天", dd: "%d 天", M: "1 個月", MM: "%d 個月", y: "1 年", yy: "%d 年" } }), b.locale("en"), b;
});