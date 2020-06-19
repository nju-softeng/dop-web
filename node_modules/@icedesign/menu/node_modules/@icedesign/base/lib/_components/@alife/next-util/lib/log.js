'use strict';

exports.deprecated = function (props, instead, component) {
    if (window && window.console && window.console.error) {
        window.console.error('Warning: ' + props + ' is deprecated at [ ' + component + ' ], use [ ' + instead + ' ] instead of it.');
    }
};

exports.warning = function (msg) {
    if (window && window.console && window.console.error) {
        window.console.error('Warning: ' + msg);
    }
};