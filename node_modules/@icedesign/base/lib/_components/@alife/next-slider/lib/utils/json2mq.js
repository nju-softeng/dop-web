'use strict';

/**
 * json2mq is used to generate media query string from JSON or javascript object.
 * reference:
 *   https://github.com/akiran/json2mq/blob/master/index.js
 */

var utils = require('./utils.js');

var isDimension = function isDimension(feature) {
    var re = /[height|width]$/;
    return re.test(feature);
};

var obj2mq = function obj2mq(obj) {
    var mq = '';
    var features = Object.keys(obj);
    features.forEach(function (feature, index) {
        var value = obj[feature];
        feature = utils.camel2hyphen(feature);
        // Add px to dimension features
        if (isDimension(feature) && typeof value === 'number') {
            value = value + 'px';
        }
        if (value === true) {
            mq += feature;
        } else if (value === false) {
            mq += 'not ' + feature;
        } else {
            mq += '(' + feature + ': ' + value + ')';
        }
        if (index < features.length - 1) {
            mq += ' and ';
        }
    });
    return mq;
};

var json2mq = function json2mq(query) {
    var mq = '';
    if (typeof query === 'string') {
        return query;
    }
    // Handling array of media queries
    if (query instanceof Array) {
        query.forEach(function (q, index) {
            mq += obj2mq(q);
            if (index < query.length - 1) {
                mq += ', ';
            }
        });
        return mq;
    }
    // Handling single media query
    return obj2mq(query);
};

module.exports = json2mq;