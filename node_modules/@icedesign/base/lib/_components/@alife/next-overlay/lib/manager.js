"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var Manager = {
    allOverlays: [],

    addOverlay: function addOverlay(overlay) {
        this.removeOverlay(overlay);
        this.allOverlays.push(overlay);
    },
    isCurrentOverlay: function isCurrentOverlay(overlay) {
        return !!this.allOverlays.length && this.allOverlays[this.allOverlays.length - 1] === overlay;
    },
    removeOverlay: function removeOverlay(overlay) {
        var i = this.allOverlays.indexOf(overlay);
        if (i > -1) {
            this.allOverlays.splice(i, 1);
        }
    }
};

exports["default"] = Manager;
module.exports = exports["default"];