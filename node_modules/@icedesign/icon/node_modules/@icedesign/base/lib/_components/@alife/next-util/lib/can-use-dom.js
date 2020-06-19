'use strict';

module.exports = function () {
    return !!(typeof window !== 'undefined' && window.document && window.document.createElement);
};