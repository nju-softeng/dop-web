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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _nextIcon = require('../../../next-icon/lib/index.js');

var _nextIcon2 = _interopRequireDefault(_nextIcon);

var _nextDropdown = require('../../../next-dropdown/lib/index.js');

var _nextDropdown2 = _interopRequireDefault(_nextDropdown);

var _button = require('./button.js');

var _button2 = _interopRequireDefault(_button);

var _group = require('./group.js');

var _group2 = _interopRequireDefault(_group);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

/** Button.Split */
var SplitButton = (_temp = _class = function (_Component) {
    _inherits(SplitButton, _Component);

    function SplitButton() {
        _classCallCheck(this, SplitButton);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    SplitButton.prototype.render = function render() {
        var _classNames;

        var _props = this.props,
            className = _props.className,
            type = _props.type,
            shape = _props.shape,
            menu = _props.menu,
            size = _props.size,
            disabled = _props.disabled,
            trigger = _props.trigger,
            align = _props.align,
            offset = _props.offset,
            children = _props.children,
            onClick = _props.onClick,
            style = _props.style,
            others = _objectWithoutProperties(_props, ['className', 'type', 'shape', 'menu', 'size', 'disabled', 'trigger', 'align', 'offset', 'children', 'onClick', 'style']);

        var prefix = this.context.prefix || this.props.prefix;

        var splitCls = (0, _classnames2['default'])((_classNames = {}, _defineProperty(_classNames, prefix + 'btn-split', true), _defineProperty(_classNames, className, className), _classNames));
        var iconSize = {
            large: 'small',
            medium: 'xs',
            small: 'xs'
        }[size];
        var splitTrigger = _react2['default'].createElement(
            _button2['default'],
            { type: type, disabled: disabled, size: size, shape: shape },
            _react2['default'].createElement(_nextIcon2['default'], { type: 'arrow-down', size: iconSize, className: prefix + 'icon-split' })
        );

        return _react2['default'].createElement(
            _group2['default'],
            _extends({}, others, { size: size, className: splitCls, style: style }),
            _react2['default'].createElement(
                _button2['default'],
                _extends({ type: type, disabled: disabled, shape: shape, onClick: onClick.bind(this) }, others),
                children
            ),
            _react2['default'].createElement(
                _nextDropdown2['default'],
                { align: align, offset: offset, triggerType: trigger, trigger: splitTrigger },
                menu
            )
        );
    };

    return SplitButton;
}(_react.Component), _class.propTypes = {
    /**
     * 样式品牌前缀
     */
    prefix: _propTypes2['default'].string,
    /**
     * Dropdown 的对齐方式，参考 [Dropdown](http://gitlab.alibaba-inc.com/next/dropdown)
     */
    align: _propTypes2['default'].string,
    /**
     * Dropdown 的位置偏移，参考 [Dropdown](http://gitlab.alibaba-inc.com/next/dropdown)
     */
    offset: _propTypes2['default'].array,
    /**
     * 类型，同 Button
     */
    type: _propTypes2['default'].oneOf(['primary', 'secondary', 'normal', 'dark', 'light']),
    /**
     * 外观，同 Button
     */
    shape: _propTypes2['default'].oneOf(['ghost', 'text', 'warning']),
    /**
     * 尺寸，同 Button
     */
    size: _propTypes2['default'].oneOf(['small', 'medium', 'large']),
    /**
     * Dropdown 触发方式，参考 [Dropdown](http://gitlab.alibaba-inc.com/next/dropdown)
     */
    trigger: _propTypes2['default'].oneOf(['click', 'hover']),
    /**
     * 弹出的内容，参考 [Dropdown](http://gitlab.alibaba-inc.com/next/dropdown)
     */
    menu: _propTypes2['default'].node,
    /**
     * 点击按钮的回调
     * @param {Object} e Event Object
     */
    onClick: _propTypes2['default'].func,
    style: _propTypes2['default'].object
}, _class.defaultProps = {
    prefix: 'next-',
    align: 'tr br',
    offset: [0, 4],
    type: 'normal',
    size: 'medium',
    trigger: 'click',
    onClick: function onClick() {},
    style: null
}, _class.contextTypes = {
    prefix: _propTypes2['default'].string
}, _temp);
SplitButton.displayName = 'SplitButton';
exports['default'] = SplitButton;
module.exports = exports['default'];