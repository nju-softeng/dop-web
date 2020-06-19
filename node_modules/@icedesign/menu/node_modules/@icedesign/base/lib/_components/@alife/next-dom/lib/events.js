'use strict';

var EVENT_PREFIX = 'next-';

function on(node, eventName, handler, useCapture) {
    if (node.addEventListener) {
        node.addEventListener(eventName, handler, useCapture);
    } else if (node.attachEvent) {
        var nextEvent = getNextEventName(eventName);
        if (Array.isArray(node[nextEvent])) {
            if (node[nextEvent].indexOf(handler) === -1) {
                node[nextEvent].push(handler);
            }
        } else {
            node[nextEvent] = [handler];
            node.attachEvent('on' + eventName, function () {
                node[nextEvent].forEach(function (handler) {
                    handler && handler.call(node, shimEvent(window.event, node));
                });
            });
        }
    }

    return {
        off: function off() {
            _off(node, eventName, handler, useCapture);
        }
    };
}

function _off(node, eventName, handler, useCapture) {
    if (node.removeEventListener) {
        node.removeEventListener(eventName, handler, useCapture);
    } else {
        var nextEvent = getNextEventName(eventName);
        if (Array.isArray(node[nextEvent])) {
            var index = node[nextEvent].indexOf(handler);
            if (index > -1) {
                node[nextEvent].splice(index, 1);
            }
        }
    }
}

function shimEvent(e, currentTarget) {
    if (!e.target) {
        e.target = e.srcElement;
        e.currentTarget = currentTarget;
        e.relatedTarge = e.type === 'mouseover' ? e.fromElement : e.toElement;
        e.stopPropagation = function () {
            e.cancelBubble = true;
        };
        e.preventDefault = function () {
            e.returnValue = false;
        };
    }

    return e;
}

function getNextEventName(eventName) {
    return '' + EVENT_PREFIX + eventName;
}

module.exports = {
    on: on,
    off: _off
};