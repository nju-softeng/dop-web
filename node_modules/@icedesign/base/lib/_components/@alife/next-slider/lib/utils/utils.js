'use strict';

function extend(a, b) {
    for (var key in b) {
        if (b.hasOwnProperty(key)) {
            a[key] = b[key];
        }
    }
}

module.exports = {

    /**
     * test if you can use dom in the environment
     */
    canUseDOM: !!(typeof window !== 'undefined' && window.document && window.document.createElement),

    /**
     * string transform:
     *  'min-width' to 'minWidth'
     *  '-moz-transition' to 'MozTransition'
     */
    camel2hyphen: function camel2hyphen(str) {
        return str.replace(/[A-Z]/g, function (match) {
            return '-' + match.toLowerCase();
        }).toLowerCase();
    },

    /**
     * string transform:
     *  'minWidth' to 'min-width'
     *  'MozTransition' to '-moz-transition'
     */
    hyphen2camel: function hyphen2camel(str) {
        return str.toLowerCase().replace(/-[a-z]/g, function (match) {
            return match.slice(1).toUpperCase();
        });
    },

    getNodeWidth: function getNodeWidth(node) {
        if (!node) {
            return 0;
        }
        return node.offsetWidth;
    },
    getNodeHeight: function getNodeHeight(node) {
        if (!node) {
            return 0;
        }
        return node.offsetHeight;
    },


    /**
     * IE8 检测
     */
    isIE8: function () {
        if (!document || typeof document === 'undefined') {
            return false;
        }
        var documentMode = document.documentMode || 0;
        return documentMode === 8;
    }(),

    mixinTo: function mixinTo(Target, mixin) {
        extend(Target.prototype, mixin);
    }
};