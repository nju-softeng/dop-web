'use strict';

/**
 * Reference: https://github.com/akiran/react-responsive-mixin/blob/master/index.js
 * Author: akiran
 */

var utils = require('../../utils/utils.js');
var enquire = utils.canUseDOM && require('enquire.js');
var json2mq = require('../../utils/json2mq.js');

var ResponsiveMixin = {
    media: function media(query, handler) {
        query = json2mq(query);
        if (typeof handler === 'function') {
            handler = {
                match: handler
            };
        }
        enquire.register(query, handler);

        // Queue the handlers to unregister them at unmount
        if (!this._responsiveMediaHandlers) {
            this._responsiveMediaHandlers = [];
        }
        this._responsiveMediaHandlers.push({ query: query, handler: handler });
    },
    componentWillUnmount: function componentWillUnmount() {
        if (this._responsiveMediaHandlers) {
            this._responsiveMediaHandlers.forEach(function (obj) {
                enquire.unregister(obj.query, obj.handler);
            });
        }
    }
};

module.exports = ResponsiveMixin;