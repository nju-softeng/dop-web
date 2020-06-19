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

var _nextUtil = require('../../next-util/lib/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

/** Form */
var Form = (_temp = _class = function (_React$Component) {
    _inherits(Form, _React$Component);

    function Form() {
        _classCallCheck(this, Form);

        return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
    }

    Form.prototype.getChildContext = function getChildContext() {
        return {
            field: this.props.field,
            direction: this.props.direction,
            labelAlign: this.props.labelAlign,
            size: this.props.size
        };
    };

    Form.prototype.render = function render() {
        var _classNames;

        /*eslint-disable */
        var _props = this.props,
            className = _props.className,
            field = _props.field,
            direction = _props.direction,
            size = _props.size,
            labelAlign = _props.labelAlign,
            labelTextAlign = _props.labelTextAlign,
            others = _objectWithoutProperties(_props, ['className', 'field', 'direction', 'size', 'labelAlign', 'labelTextAlign']);

        /*eslint-enable */


        var prefix = this.context.prefix || this.props.prefix;

        // inset 模式统一左对齐
        var labelAlignReal = labelAlign === 'inset' ? 'left' : labelAlign;

        var formClassName = (0, _classnames2['default'])((_classNames = {}, _defineProperty(_classNames, prefix + 'form', true), _defineProperty(_classNames, prefix + 'form-' + labelAlignReal, labelAlignReal), _defineProperty(_classNames, prefix + 'form-label-' + labelTextAlign, !!labelTextAlign), _defineProperty(_classNames, prefix + 'form-hoz', direction === 'hoz'), _defineProperty(_classNames, '' + direction, true), _defineProperty(_classNames, prefix + 'form-' + size, size), _defineProperty(_classNames, className, !!className), _classNames));

        return _react2['default'].createElement(
            'form',
            _extends({}, (0, _nextUtil.pickAttrs)(others), { className: formClassName }),
            this.props.children
        );
    };

    return Form;
}(_react2['default'].Component), _class.propTypes = {
    /**
     * 样式前缀
     */
    prefix: _propTypes2['default'].string,
    /**
     * 表单展示方向
     * @enumdesc 水平, 垂直
     */
    direction: _propTypes2['default'].oneOf(['hoz', 'ver']),
    /**
     * 单个FormItem的size自定义，优先级高于Form的size, 并且当组件与 FormItem 一起使用时，组件自身设置 size 属性无效。
     * @enumdesc 大, 中, 小
     */
    size: _propTypes2['default'].oneOf(['large', 'medium', 'small']),
    /**
     * 标签的位置
     * @enumdesc 上, 左, 内
     */
    labelAlign: _propTypes2['default'].oneOf(['top', 'left', 'inset']),
    /**
     * 标签的左右对齐方式
     * @enumdesc , 左, 右
     */
    labelTextAlign: _propTypes2['default'].oneOf(['', 'left', 'right']),
    /**
     * 经 `new Field(this)` 初始化后，直接传给 Form 即可 用到表单校验则不可忽略此项
     */
    field: _propTypes2['default'].any,
    /**
     * form内有 `htmlType="submit"` 的元素的时候会触发
     */
    onSubmit: _propTypes2['default'].func,
    /**
     * 子元素
     */
    children: _propTypes2['default'].any,
    /**
     * 扩展class
     */
    className: _propTypes2['default'].string,
    /**
     * 自定义内联样式
     */
    style: _propTypes2['default'].object
}, _class.defaultProps = {
    prefix: 'next-',
    onSubmit: function onSubmit(e) {
        e.preventDefault();
    },

    size: 'medium',
    direction: 'ver',
    labelAlign: 'left'
}, _class.contextTypes = {
    prefix: _propTypes2['default'].string
}, _class.childContextTypes = {
    field: _propTypes2['default'].object,
    direction: _propTypes2['default'].oneOf(['hoz', 'ver']),
    labelAlign: _propTypes2['default'].oneOf(['top', 'left', 'inset']),
    size: _propTypes2['default'].oneOf(['large', 'small', 'medium'])
}, _temp);
Form.displayName = 'Form';
exports['default'] = Form;
module.exports = exports['default'];