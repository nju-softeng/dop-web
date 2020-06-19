"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateFunc = validateFunc;
exports.getValidationMethod = getValidationMethod;

var _rules = _interopRequireDefault(require("./rules/"));

/* eslint-disable callback-return */

/**
 * {required, format} => format; {required} => required
 * If a promise is wanted from the validator, either return a promise from the callback,
 *      or do not pass a callback
 *
 * @param  {function} validator [description]
 * @param  {string} ruleType  [description]
 * @return {function}           [description]
 */
function validateFunc(validator, ruleType) {
  return function (rule, value, cb, options) {
    var errors = []; // 如果是非required校验

    if (ruleType !== 'required') {
      var _errors = [];

      _rules.default.required(rule, value, _errors, options); // 空数据


      if (_errors.length > 0) {
        if ('required' in rule && rule.required) {
          if (cb) {
            return cb(_errors);
          } else {
            return Promise.reject(_errors);
          }
        } else if (cb) {
          return cb([]); //空数据，并且没有require要求，则忽略
        } else {
          return Promise.resolve(null);
        }
      }
    }

    validator(rule, value, errors, options);

    if (cb) {
      return cb(errors);
    }

    if (Promise) {
      return Promise.resolve(errors);
    }
  };
}
/**
 * {required, format} => format; {required} => required
 * @param  {object} rule [description]
 * @return {function}      [description]
 */


function getValidationMethod(rule) {
  if (typeof rule.validator === 'function') {
    return rule.validator;
  }

  var keys = Object.keys(rule); //required和其他校验规则共存
  //{required, format} {required, unknown}

  for (var i = 0; i < keys.length; i++) {
    var ruleType = keys[i];

    if (ruleType === 'required') {
      continue;
    }

    if (ruleType in _rules.default) {
      return validateFunc(_rules.default[ruleType], ruleType);
    }
  } // 有其他位置参数


  if ('required' in rule && rule.required) {
    return validateFunc(_rules.default.required, 'required');
  }

  return null;
}