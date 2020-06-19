'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

/** Accordion.Panel */
var Section = (_temp = _class = function (_React$Component) {
    _inherits(Section, _React$Component);

    function Section() {
        _classCallCheck(this, Section);

        return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
    }

    Section.prototype.render = function render() {
        var _classNames;

        var _props = this.props,
            expanded = _props.expanded,
            disabled = _props.disabled,
            trigger = _props.trigger,
            index = _props.index,
            title = _props.title,
            children = _props.children,
            multiTitle = _props.multiTitle,
            className = _props.className,
            style = _props.style,
            prefix = _props.prefix,
            others = _objectWithoutProperties(_props, ['expanded', 'disabled', 'trigger', 'index', 'title', 'children', 'multiTitle', 'className', 'style', 'prefix']);

        // 支持从context上获取prefix


        var _prefix = this.context.prefix || prefix;

        var _className = [_prefix + 'accordion-section'];
        if (expanded) {
            _className.push(_prefix + 'accordion-section-expand');
        }
        if (className) {
            _className.push(className);
        }
        return _react2['default'].createElement(
            'div',
            _extends({ className: _classnames2['default'].apply(undefined, _className), style: style }, others),
            _react2['default'].createElement(
                'div',
                {
                    className: (0, _classnames2['default'])((_classNames = {}, _defineProperty(_classNames, _prefix + 'accordion-section-title', true), _defineProperty(_classNames, _prefix + 'accordion-section-title-disabled', disabled), _defineProperty(_classNames, _prefix + 'accordion-section-title-mutli', multiTitle), _classNames)),
                    onClick: function onClick() {
                        !disabled && trigger(index);
                    } },
                _react2['default'].createElement('i', { className: _prefix + 'icon ' + _prefix + 'icon-arrow-up-filling ' + _prefix + 'accordion-icon' }),
                title
            ),
            _react2['default'].createElement(
                'div',
                { className: _prefix + 'accordion-section-content' },
                children
            )
        );
    };

    return Section;
}(_react2['default'].Component), _class.contextTypes = {
    prefix: _propTypes2['default'].string
}, _class.propTypes = {
    /**
     * 样式类名的品牌前缀
     */
    prefix: _propTypes2['default'].string,
    /**
     * 子组件接受行内样式
     */
    style: _propTypes2['default'].object,
    children: _propTypes2['default'].any,
    /**
     * 是否展开
     */
    expanded: _propTypes2['default'].bool.isRequired,
    /**
     * 是否禁止用户操作
     */
    disabled: _propTypes2['default'].bool.isRequired,
    trigger: _propTypes2['default'].func.isRequired,
    index: _propTypes2['default'].number.isRequired,
    /**
     * 标题
     */
    title: _propTypes2['default'].node,
    /**
     * 标题是否多行显示
     */
    multiTitle: _propTypes2['default'].bool.isRequired,
    /**
     * 扩展class
     */
    className: _propTypes2['default'].string
}, _class.defaultProps = {
    expanded: false,
    title: '',
    multiTitle: false
}, _temp);
Section.displayName = 'Section';
exports['default'] = Section;
module.exports = exports['default'];