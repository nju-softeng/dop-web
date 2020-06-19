'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports['default'] = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp2;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _nextOverlay = require('../../next-overlay/lib/index.js');

var _nextOverlay2 = _interopRequireDefault(_nextOverlay);

var _feedback = require('./feedback.js');

var _feedback2 = _interopRequireDefault(_feedback);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Mask = (_temp2 = _class = function (_React$Component) {
    _inherits(Mask, _React$Component);

    function Mask() {
        var _temp, _this, _ret;

        _classCallCheck(this, Mask);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.state = {
            visible: true
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    Mask.prototype.render = function render() {
        var prefix = this.context.prefix || this.props.prefix;
        /* eslint-disable no-unused-vars */

        var _props = this.props,
            propsPrefix = _props.prefix,
            type = _props.type,
            content = _props.content,
            align = _props.align,
            offset = _props.offset,
            hasMask = _props.hasMask,
            afterClose = _props.afterClose,
            animation = _props.animation,
            others = _objectWithoutProperties(_props, ['prefix', 'type', 'content', 'align', 'offset', 'hasMask', 'afterClose', 'animation']);
        /* eslint-enable */


        var visible = this.state.visible;

        return _react2['default'].createElement(
            _nextOverlay2['default'],
            { prefix: prefix, animation: animation, visible: visible, align: align, offset: offset, hasMask: hasMask, afterClose: afterClose },
            _react2['default'].createElement(_feedback2['default'], _extends({}, others, { prefix: prefix, type: type, shape: 'toast',
                title: content, className: prefix + 'feedback-wrapper' }))
        );
    };

    return Mask;
}(_react2['default'].Component), _class.contextTypes = {
    prefix: _propTypes2['default'].string
}, _class.propTypes = {
    prefix: _propTypes2['default'].string,
    type: _propTypes2['default'].string,
    content: _propTypes2['default'].node,
    align: _propTypes2['default'].string,
    offset: _propTypes2['default'].array,
    hasMask: _propTypes2['default'].bool,
    afterClose: _propTypes2['default'].func,
    animation: _propTypes2['default'].object
}, _class.defaultProps = {
    prefix: 'next-',
    align: 'cc cc',
    offset: [0, 0],
    hasMask: false,
    animation: {
        'in': 'pulse',
        out: 'zoomOut'
    }
}, _temp2);
Mask.displayName = 'Mask';
exports['default'] = Mask;


Mask.create = function (props) {
    /* eslint-disable no-unused-vars */
    var duration = props.duration,
        afterClose = props.afterClose,
        others = _objectWithoutProperties(props, ['duration', 'afterClose']);
    /* eslint-enable no-unused-vars */

    var div = document.createElement('div');
    document.body.appendChild(div);

    var closeChain = function closeChain() {
        _reactDom2['default'].unmountComponentAtNode(div);
        document.body.removeChild(div);

        afterClose && afterClose();
    };

    var mask = void 0;
    _reactDom2['default'].render(_react2['default'].createElement(Mask, _extends({ afterClose: closeChain }, others)), div, function () {
        mask = this;
    });

    return {
        component: mask,
        destroy: function destroy() {
            return mask && mask.setState({
                visible: false
            });
        }
    };
};
module.exports = exports['default'];