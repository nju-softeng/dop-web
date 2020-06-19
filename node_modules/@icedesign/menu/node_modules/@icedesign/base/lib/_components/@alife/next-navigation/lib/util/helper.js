'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var navigationPropTypes = {
    rootNavigation: _propTypes2['default'].any,
    rootMount: _propTypes2['default'].bool,
    navigation: _propTypes2['default'].any,
    branchPadding: _propTypes2['default'].any,
    prefix: _propTypes2['default'].string,
    type: _propTypes2['default'].string,
    leaf: _propTypes2['default'].string,
    activeDirection: _propTypes2['default'].string,
    contentAlign: _propTypes2['default'].string,
    trigger: _propTypes2['default'].string,
    title: _propTypes2['default'].string,
    hasLeaf: _propTypes2['default'].bool,
    selectedStyle: _propTypes2['default'].bool,
    isStopPropagation: _propTypes2['default'].bool,
    isBlurDispear: _propTypes2['default'].bool,
    onItemClick: _propTypes2['default'].func,
    onItemMouseEnter: _propTypes2['default'].func,
    onItemMouseLeave: _propTypes2['default'].func,
    onItemMouseMove: _propTypes2['default'].func,
    onItemSelect: _propTypes2['default'].func,
    onItemFold: _propTypes2['default'].func,
    onItemUnFold: _propTypes2['default'].func,
    getRootState: _propTypes2['default'].func,
    selectedKey: _propTypes2['default'].any,
    openedKeys: _propTypes2['default'].array,
    accordion: _propTypes2['default'].bool,
    branchLevel: _propTypes2['default'].number,
    morePositionKey: _propTypes2['default'].any,
    moreText: _propTypes2['default'].string
};

var helper = {
    propTypes: navigationPropTypes,
    empty: function empty() {}
};

exports['default'] = helper;
module.exports = exports['default'];