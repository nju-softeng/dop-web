"use strict";

module.exports = function (Class, props) {
    var propTypes = Class.propTypes;
    var others = {};
    for (var key in props) {
        if (!(key in propTypes)) {
            others[key] = props[key];
        }
    }
    return others;
};