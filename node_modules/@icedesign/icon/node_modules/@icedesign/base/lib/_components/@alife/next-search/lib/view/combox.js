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

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _nextOverlay = require('../../../next-overlay/lib/index.js');

var _nextOverlay2 = _interopRequireDefault(_nextOverlay);

var _nextUtil = require('../../../next-util/lib/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var findDOMNode = _reactDom2['default'].findDOMNode;

var Combox = (_temp = _class = function (_Component) {
    _inherits(Combox, _Component);

    function Combox(props) {
        _classCallCheck(this, Combox);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

        _this.state = {
            placeholder: _this.props.placeholder || '',
            //key: this.props.value || '',
            visible: _this.props.overlayVisible,
            value: _this.props.value || ''
        };
        return _this;
    }

    Combox.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {

        //console.log('1111',nextProps);

        this.setState({
            visible: nextProps.overlayVisible,
            value: nextProps.value,
            placeholder: nextProps.placeholder
        });
    };

    Combox.prototype.componentDidMount = function componentDidMount() {
        this.setInputWidth();
    };

    Combox.prototype.onInputChange = function onInputChange(e) {

        var value = e.target.value;

        this.props.onInputUpdate(value);
    };

    Combox.prototype.onInputKeyDown = function onInputKeyDown(e) {

        if (e.keyCode === 13) {

            this.props.onInputEnter(e);
        }
    };

    Combox.prototype.onInputFocus = function onInputFocus(e) {
        //this.setState({
        //    placeholder: ''
        //});

        this.props.onInputFocus(e);
    };

    Combox.prototype.onInputBlur = function onInputBlur(e) {
        this.props.onInputBlur(e);
    };

    Combox.prototype.setInputWidth = function setInputWidth() {
        var input = findDOMNode(this.refs.target);
        this._inputWidth = input.clientWidth + 16 + 'px'; //add padding width 8px
    };

    Combox.prototype.render = function render() {
        var _this2 = this;

        var visible = this.state.visible;

        var _props = this.props,
            overlay = _props.overlay,
            width = _props.width,
            container = _props.container,
            others = _objectWithoutProperties(_props, ['overlay', 'width', 'container']);

        return _react2['default'].createElement(
            'div',
            { className: 'search-custom', style: { width: width }, ref: 'custom' },
            _react2['default'].createElement('input', _extends({}, (0, _nextUtil.pickAttrs)(others), {
                ref: 'target',
                placeholder: this.state.placeholder,
                value: this.state.value,
                onChange: this.onInputChange.bind(this),
                onFocus: this.onInputFocus.bind(this),
                onKeyDown: this.onInputKeyDown.bind(this),
                onBlur: this.onInputBlur.bind(this)
            })),
            _react2['default'].createElement(
                _nextOverlay2['default'],
                { visible: visible,
                    autoFocus: false, ref: 'overlay',
                    safeNode: function safeNode() {
                        return _this2.refs.custom;
                    },
                    target: function target() {
                        return _this2;
                    },
                    onOpen: this.afterOpen,
                    container: container
                },
                _react2['default'].createElement(
                    'div',
                    { style: { width: width === 'auto' ? this._inputWidth : width } },
                    overlay
                )
            )
        );
    };

    return Combox;
}(_react.Component), _class.propTypes = {
    placeholder: _propTypes2['default'].string,
    value: _propTypes2['default'].string,
    overlayVisible: _propTypes2['default'].bool,
    overlay: _propTypes2['default'].any,
    width: _propTypes2['default'].string,
    onInputUpdate: _propTypes2['default'].func,
    onInputEnter: _propTypes2['default'].func,
    onInputFocus: _propTypes2['default'].func,
    onInputBlur: _propTypes2['default'].func,
    /**
     * 指定渲染combox的容器
     */
    container: _propTypes2['default'].any
}, _class.defaultProps = {
    overlay: null
}, _temp);
Combox.displayName = 'Combox';
exports['default'] = Combox;
module.exports = exports['default'];