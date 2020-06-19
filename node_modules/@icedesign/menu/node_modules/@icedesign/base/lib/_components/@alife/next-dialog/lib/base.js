'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports['default'] = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _nextOverlay = require('../../next-overlay/lib/index.js');

var _nextOverlay2 = _interopRequireDefault(_nextOverlay);

var _nextUtil = require('../../next-util/lib/index.js');

var _nextDom = require('../../next-dom/lib/index.js');

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _inner = require('./inner.js');

var _inner2 = _interopRequireDefault(_inner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var noop = function noop() {},
    limitTabRange = _nextUtil.focus.limitTabRange,
    makeChain = _nextUtil.func.makeChain,
    parseComboOption = function parseComboOption(option) {
    if (option === true || option === false) {
        return option;
    }
    var res = {};
    option.split(',').forEach(function (o) {
        var key = o.replace(/^\s*|\s*$/g, '');
        res[key] = true;
    });
    return res;
};

var hasScroll = function hasScroll() {
    var doc = document.documentElement;
    return doc.scrollHeight > doc.clientHeight;
};
// <Dialog>
//      <Dialog.Header></Dialog.Header>
//      <Dialog.Body></Dialog.Body>
//      <Dialog.Footer></Dialog.Footer>
// </Dialog>

var Dialog = (_temp = _class = function (_React$Component) {
    _inherits(Dialog, _React$Component);

    Dialog.prototype.getPrefix = function getPrefix() {
        return this.context.prefix || this.props.prefix;
    };

    function Dialog(props, context) {
        _classCallCheck(this, Dialog);

        var _this = _possibleConstructorReturn(this, _React$Component.call(this, props, context));

        _this.onKeyDown = _this.onKeyDown.bind(_this);
        _this.adjustPosition = _this.adjustPosition.bind(_this);
        _this.onClose = _this.onClose.bind(_this);
        _this.onCloseButtonClick = _this.onCloseButtonClick.bind(_this);
        _this.beforeOpen = _this.beforeOpen.bind(_this);
        _this.afterClose = _this.afterClose.bind(_this);
        _this.beforePosition = _this.beforePosition.bind(_this);
        _this.onWindowResize = _this.onWindowResize.bind(_this);
        return _this;
    }

    Dialog.prototype.componentDidMount = function componentDidMount() {
        _nextDom.events.on(document, 'keydown', this.onKeyDown);
        /*eslint-disable react/prop-types */
        if (!this.props.isFullScreen) {
            _nextDom.events.on(window, 'resize', this.onWindowResize);
            this.adjustPosition();
        }
    };

    Dialog.prototype.componentDidUpdate = function componentDidUpdate() {
        if (!this.props.isFullScreen) {
            this.adjustPosition();
        }
    };

    Dialog.prototype.componentWillUnmount = function componentWillUnmount() {
        _nextDom.events.off(document, 'keydown', this.onKeyDown);
        _nextDom.events.off(window, 'resize', this.onWindowResize);
        this.afterClose();
    };

    Dialog.prototype.onWindowResize = function onWindowResize() {
        this._hasWindowResize = true;
    };

    Dialog.prototype.render = function render() {
        var _classnames;

        /* eslint-disable no-unused-vars, react/prop-types */
        var _props = this.props,
            prefix = _props.prefix,
            closable = _props.closable,
            children = _props.children,
            className = _props.className,
            footerAlign = _props.footerAlign,
            onClose = _props.onClose,
            style = _props.style,
            role = _props.role,
            wrapperClassName = _props.wrapperClassName,
            align = _props.align,
            isFullScreen = _props.isFullScreen,
            others = _objectWithoutProperties(_props, ['prefix', 'closable', 'children', 'className', 'footerAlign', 'onClose', 'style', 'role', 'wrapperClassName', 'align', 'isFullScreen']),
            props = _extends({}, others, this.mapClosableToConfig(closable));

        delete props.closable;
        var prefixCls = this.getPrefix();
        var wrapperClassNameMix = (0, _classnames3['default'])((_classnames = {}, _defineProperty(_classnames, prefixCls + 'dialog-wrapper', true), _defineProperty(_classnames, wrapperClassName, wrapperClassName), _classnames));

        props.wrapperClassName = wrapperClassNameMix;

        var beforeOpen = makeChain(this.beforeOpen, this.props.beforeOpen),
            afterClose = makeChain(this.afterClose, this.props.afterClose);

        others = (0, _nextUtil.pickAttrs)(others);

        var dialogInner = _react2['default'].createElement(
            _inner2['default'],
            _extends({}, others, {
                onClose: this.onCloseButtonClick,
                className: className,
                footerAlign: footerAlign,
                closable: closable,
                style: style,
                role: role,
                ref: 'inner',
                'aria-hidden': !this.props.visible }),
            children
        );

        var useCss = align === 'cc cc' && isFullScreen;

        var positionAttrs = {};

        if (!useCss) {
            positionAttrs = {
                onPosition: this.adjustPosition,
                beforePosition: this.beforePosition
            };
        }

        return _react2['default'].createElement(
            _nextOverlay2['default'],
            _extends({}, props, {
                align: useCss ? false : align,
                onRequestClose: this.onClose,
                beforeOpen: beforeOpen,
                afterClose: afterClose,
                canCloseByOutSideClick: false,
                needAdjust: false
            }, positionAttrs, {
                ref: 'overlay' }),
            useCss ? _react2['default'].createElement(
                'div',
                { className: prefixCls + 'dialog-container' },
                dialogInner
            ) : dialogInner
        );
    };

    Dialog.prototype.beforeOpen = function beforeOpen() {
        var value = {
            overflowY: 'hidden'
        };
        if (hasScroll()) {
            /* eslint-disable eqeqeq */
            if (this.bodyPaddingRight == null) {
                this.bodyPaddingRight = _nextDom.style.get(document.body, 'paddingRight');
            }
            value.paddingRight = this.bodyPaddingRight + (0, _nextUtil.scrollbar)().width + 'px';
        }
        _nextDom.style.set(document.body, value);
    };

    Dialog.prototype.afterClose = function afterClose() {
        _nextDom.style.set(document.body, {
            overflowY: 'auto',
            paddingRight: this.bodyPaddingRight || 0
        });
    };

    Dialog.prototype.onClose = function onClose() {
        this.props.onClose('fromKeyboard');
    };

    Dialog.prototype.onCloseButtonClick = function onCloseButtonClick() {
        var res = this.mapClosableToConfig(this.props.closable);

        if (res.canCloseByCloseClick) {
            this.props.onClose('fromCloseBtn');
        }
    };

    Dialog.prototype.onKeyDown = function onKeyDown(e) {
        var node = this.refs.overlay.getContentNode();
        if (node) {
            limitTabRange(node, e);
        }
    };

    Dialog.prototype.beforePosition = function beforePosition() {
        if (this.props.visible) {
            var content = this.refs.overlay ? this.refs.overlay.getContent() : '';
            if (content) {
                var body = content.getBody();
                var node = this.refs.overlay.getContentNode();
                if (this._lastDialogHeight !== node.clientHeight || this._hasWindowResize) {
                    this.revertSize(node, body);
                    this._hasWindowResize = false;
                }
            }
        }
    };

    Dialog.prototype.adjustPosition = function adjustPosition() {
        var minMargin = this.props.minMargin;

        if (this.props.visible) {
            var content = this.refs.overlay ? this.refs.overlay.getContent() : '',
                dialogHeight = void 0;

            if (content) {
                var body = content.getBody();
                var node = this.refs.overlay.getContentNode();
                var top = _nextDom.style.get(node, 'top');
                var height = _nextDom.style.get(node, 'height'),
                    clientHeight = window.innerHeight || document.documentElement.clientHeight;

                if (top <= minMargin) {
                    _nextDom.style.set(node, 'top', minMargin + 'px');
                    if (clientHeight <= height + minMargin) {
                        dialogHeight = clientHeight - minMargin * 2;
                        this.adjustSize(node, dialogHeight);
                    } else if (body.scrollHeight === body.clientHeight) {
                        this.revertSize(node, body);
                    }
                } else if (clientHeight <= height + top) {
                    dialogHeight = clientHeight - top;
                    this.adjustSize(node, dialogHeight);
                }
                this._lastDialogHeight = node.clientHeight;
            }
        }
    };

    Dialog.prototype.adjustSize = function adjustSize(node, dialogHeight) {
        var content = this.refs.overlay.getContent(),
            body = content.getBody(),
            header = content.getHeader(),
            footer = content.getFooter();

        var headerHeight = 0,
            footerHeight = 0;

        if (header) {
            headerHeight = _nextDom.style.get(header, 'height');
        }
        if (footer) {
            footerHeight = _nextDom.style.get(footer, 'height');
        }
        var dialogPadding = _nextDom.style.get(node, 'padding-top') + _nextDom.style.get(node, 'padding-bottom'),
            maxBodyHeight = dialogHeight - headerHeight - footerHeight - dialogPadding;

        if (maxBodyHeight < 0) {
            maxBodyHeight = 1;
        }
        _nextDom.style.set(body, {
            'max-height': maxBodyHeight + 'px',
            'overflow-y': 'auto'
        });
    };

    Dialog.prototype.revertSize = function revertSize(node, body) {

        _nextDom.style.set(node, 'height', 'auto');
        _nextDom.style.set(body, {
            'max-height': 'none'
        });
    };

    Dialog.prototype.mapClosableToConfig = function mapClosableToConfig(closable) {
        var res = {},
            map = ['esc', 'outSide', 'close', 'mask'];

        closable = parseComboOption(closable);
        map.forEach(function (o) {
            var value = closable === true ? true : closable[o] || false;
            var key = o.charAt(0).toUpperCase() + o.substr(1);
            if (o === 'esc' || o === 'mask') {
                res['canCloseBy' + key] = value;
            } else {
                res['canCloseBy' + key + 'Click'] = value;
            }
        });
        return res;
    };

    return Dialog;
}(_react2['default'].Component), _class.propTypes = {
    prefix: _propTypes2['default'].string,
    hasMask: _propTypes2['default'].bool,
    onClose: _propTypes2['default'].func,
    closable: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].bool]),
    minMargin: _propTypes2['default'].number
}, _class.defaultProps = {
    prefix: 'next-',
    hasMask: true,
    animation: {
        'in': 'fadeInDown',
        out: 'fadeOutUp'
    },
    onClose: noop,
    closable: 'esc,close',
    align: 'cc cc',
    autoFocus: true,
    minMargin: 40
}, _class.contextTypes = {
    prefix: _propTypes2['default'].string
}, _temp);
Dialog.displayName = 'Dialog';
exports['default'] = Dialog;
module.exports = exports['default'];