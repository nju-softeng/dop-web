'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports['default'] = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _checkbox = require('./checkbox.js');

var _checkbox2 = _interopRequireDefault(_checkbox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

/** Checkbox.Group */
var CheckboxGroup = (_temp = _class = function (_Component) {
    _inherits(CheckboxGroup, _Component);

    function CheckboxGroup(props) {
        _classCallCheck(this, CheckboxGroup);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

        var value = [];
        if ('value' in props) {
            value = props.value;
        } else if ('defaultValue' in props) {
            value = props.defaultValue;
        }
        if (!Array.isArray(value)) {
            if (value === null || value === undefined) {
                value = [];
            } else {
                value = [value];
            }
        }
        _this.state = {
            value: [].concat(_toConsumableArray(value)),
            disabled: props.disabled
        };

        _this.onChange = _this.onChange.bind(_this);
        return _this;
    }

    CheckboxGroup.prototype.getChildContext = function getChildContext() {
        return {
            __group__: true,
            onChange: this.onChange,
            selectedValue: this.state.value,
            disabled: this.state.disabled
        };
    };

    CheckboxGroup.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        if ('value' in nextProps) {
            var value = nextProps.value;

            if (!Array.isArray(value)) {
                if (value === null || value === undefined) {
                    value = [];
                } else {
                    value = [value];
                }
            }
            this.setState({
                value: value
            });
        }
        if ('disabled' in nextProps) {
            this.setState({
                disabled: nextProps.disabled
            });
        }
    };

    CheckboxGroup.prototype.onChange = function onChange(currentValue, e) {
        var value = this.state.value;

        var index = value.indexOf(currentValue);
        var valTemp = [].concat(_toConsumableArray(value));

        if (index === -1) {
            valTemp.push(currentValue);
        } else {
            valTemp.splice(index, 1);
        }

        if (!('value' in this.props)) {
            this.setState({ value: valTemp });
        }
        this.props.onChange(valTemp, e);
    };

    CheckboxGroup.prototype.render = function render() {
        var _this2 = this,
            _classnames;

        var _props = this.props,
            className = _props.className,
            style = _props.style;

        var disabled = this.state.disabled;
        var prefix = this.context.prefix || this.props.prefix;

        // 如果内嵌标签跟dataSource同时存在，以内嵌标签为主
        var children = void 0;
        if (this.props.children) {
            children = this.props.children;
        } else {
            children = this.props.dataSource.map(function (item, index) {
                var option = item;
                if ((typeof item === 'undefined' ? 'undefined' : _typeof(item)) !== 'object') {
                    option = {
                        label: item,
                        value: item,
                        disabled: disabled
                    };
                }
                var checked = _this2.state.value && _this2.state.value.indexOf(option.value) > -1;

                return _react2['default'].createElement(
                    'label',
                    { key: index },
                    _react2['default'].createElement(_checkbox2['default'], {
                        value: option.value,
                        checked: checked,
                        disabled: disabled || option.disabled
                    }),
                    _react2['default'].createElement(
                        'span',
                        { className: prefix + 'checkbox-label' },
                        option.label
                    )
                );
            });
        }

        var cls = (0, _classnames3['default'])((_classnames = {}, _defineProperty(_classnames, prefix + 'checkbox-group', true), _defineProperty(_classnames, className, !!className), _defineProperty(_classnames, 'disabled', disabled), _classnames));

        return _react2['default'].createElement(
            'span',
            { className: cls, style: style },
            children
        );
    };

    return CheckboxGroup;
}(_react.Component), _class.propTypes = {
    /**
     * 样式类名的品牌前缀
     */
    prefix: _propTypes2['default'].string,
    /**
     * 自定义类名
     */
    className: _propTypes2['default'].string,
    /**
     * 自定义内敛样式
     */
    style: _propTypes2['default'].object,
    /**
     * 整体禁用
     */
    disabled: _propTypes2['default'].bool,
    /**
     * 可选项列表, 数据项可为 String 或者 Object, 如 `['apple', 'pear', 'orange']` 或者 `[{value: 'apple', label: '苹果',}, {value: 'pear', label: '梨'}, {value: 'orange', label: '橙子'}]`
     */
    dataSource: _propTypes2['default'].arrayOf(_propTypes2['default'].any),
    /**
     * 被选中的值列表
     */
    value: _propTypes2['default'].array,
    /**
     * 默认被选中的值列表
     */
    defaultValue: _propTypes2['default'].array,
    /**
     * 通过子元素方式设置内部 checkbox
     */
    children: _propTypes2['default'].arrayOf(_propTypes2['default'].element),
    /**
     * 选中值改变时的事件
     * @param {Array} value 选中项列表
     * @param {Event} e Dom 事件对象
     */
    onChange: _propTypes2['default'].func
}, _class.defaultProps = {
    dataSource: [],
    onChange: function onChange() {},
    prefix: 'next-'
}, _class.contextTypes = {
    prefix: _propTypes2['default'].string
}, _class.childContextTypes = {
    onChange: _propTypes2['default'].func,
    __group__: _propTypes2['default'].bool,
    selectedValue: _propTypes2['default'].array,
    disabled: _propTypes2['default'].bool
}, _temp);
CheckboxGroup.displayName = 'CheckboxGroup';
exports['default'] = CheckboxGroup;
module.exports = exports['default'];