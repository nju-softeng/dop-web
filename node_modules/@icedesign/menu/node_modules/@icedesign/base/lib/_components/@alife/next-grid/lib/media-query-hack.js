'use strict';

var _nextDom = require('../../next-dom/lib/index.js');

var _utils = require('./utils.js');

/* istanbul ignore next */
(function () {
    if (_utils.ieVersion && _utils.ieVersion <= 8 && window && document) {
        _nextDom.events.on(window, 'resize', hackMediaQuery);
        hackMediaQuery();
    }

    function hackMediaQuery() {
        var replace = '';
        var together = [];

        var bps = [344, 504, 752, 1022, 1232, 1532];
        var innerWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        for (var i = 0; i < bps.length; i++) {
            var current = bps[i];
            var next = bps[i + 1];
            if (innerWidth >= current && (!next || innerWidth < next)) {
                replace = 'next-w' + current;
                together = bps.slice(0, i + 1).map(function (bp) {
                    return 'next-w' + bp + '-together';
                });
                break;
            }
        }

        var classNames = document.body.className;
        classNames.split(' ').forEach(function (className) {
            if (/next-w\d+/.test(className)) {
                _nextDom.classList.removeClass(document.body, className);
            }
        });

        _nextDom.classList.addClass(document.body, replace);
        together.forEach(function (className) {
            return _nextDom.classList.addClass(document.body, className);
        });
    }
})();