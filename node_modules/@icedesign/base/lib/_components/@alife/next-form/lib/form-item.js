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

var _nextGrid = require('../../next-grid/lib/index.js');

var _nextUtil = require('../../next-util/lib/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

function prefixFn(prefix) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
    }

    return args.map(function (s) {
        return prefix + 'form-item-' + s;
    }).join(' ');
}

/** Form.Item */
var FormItem = (_temp = _class = function (_React$Component) {
    _inherits(FormItem, _React$Component);

    function FormItem() {
        _classCallCheck(this, FormItem);

        return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
    }

    FormItem.prototype._getLayoutClass = function _getLayoutClass(colDef) {
        var _classNames;

        if (!colDef) {
            return '';
        }

        var span = colDef.span,
            offset = colDef.offset,
            fixedSpan = colDef.fixedSpan;

        /*eslint-enable */

        var prefix = this.context.prefix || this.props.prefix;

        return (0, _classnames2['default'])((_classNames = {}, _defineProperty(_classNames, prefix + 'col-' + span, span), _defineProperty(_classNames, prefix + 'col-offset-' + offset, offset), _defineProperty(_classNames, prefix + 'col-fixed-' + fixedSpan, fixedSpan), _classNames));
    };

    FormItem.prototype.getHelpMsg = function getHelpMsg() {
        var context = this.context;
        var props = this.props;
        if (props.help === undefined && context.field) {
            return this.getId() ? context.field.getError(this.getId()) : '';
        }

        return props.help;
    };

    FormItem.prototype.getOnlyControl = function getOnlyControl() {
        var children = _react2['default'].Children.toArray(this.props.children);
        var child = children.filter(function (c) {
            return c.props && 'data-meta' in c.props;
        })[0];
        return child !== undefined ? child : null;
    };

    FormItem.prototype.getChildProp = function getChildProp(prop) {
        var child = this.getOnlyControl();
        return child && child.props && child.props[prop];
    };

    FormItem.prototype.getId = function getId() {
        return this.getChildProp('id');
    };

    FormItem.prototype.renderHelp = function renderHelp() {
        var prefix = this.context.prefix || this.props.prefix;
        var help = this.getHelpMsg();
        return _react2['default'].createElement(
            'div',
            { className: help ? prefixFn(prefix, 'explain') : '', key: 'help' },
            help
        );
    };

    FormItem.prototype.getValidateStatus = function getValidateStatus() {
        var getState = this.context.field.getState;

        var field = this.getId();
        if (!field) {
            return '';
        }
        var state = getState(field);

        if (state === 'validating') {
            return 'loading';
        } else {
            return state;
        }
    };

    FormItem.prototype.renderValidateWrapper = function renderValidateWrapper(validateStatus, help, extra) {
        var _cls;

        var props = this.props;
        var prefix = this.context.prefix || this.props.prefix;

        var cls = (_cls = {}, _defineProperty(_cls, this._getLayoutClass(props.wrapperCol), this.context.labelAlign !== 'top'), _defineProperty(_cls, prefix + 'form-item-control', true), _cls);

        var childrenProps = { size: this.props.size || this.context.size };
        if (props.hasFeedback) {
            if (validateStatus === 'success' || validateStatus === 'loading') {
                childrenProps.state = validateStatus;
            }
        }

        var children = _react2['default'].Children.map(props.children, function (child) {
            if (child && typeof child.type === 'function') {
                return _react2['default'].cloneElement(child, childrenProps);
            }
            return child;
        });

        return _react2['default'].createElement(
            'div',
            { className: (0, _classnames2['default'])(cls), key: 'item' },
            children,
            ' ',
            help,
            ' ',
            extra
        );
    };

    FormItem.prototype.getRules = function getRules(name) {
        return this.context.field && this.context.field._get(name) && this.context.field._get(name).rules;
    };

    FormItem.prototype.isRequired = function isRequired() {
        if (this.context.field) {
            var rules = this.getRules(this.getId()) || null;
            if (!rules) {
                return false;
            }
            if (rules.required) {
                return true;
            } else {
                return rules.some(function (rule) {
                    return rule.required;
                });
            }
        }
        return false;
    };

    FormItem.prototype.renderLabel = function renderLabel() {
        var _classNames2;

        var props = this.props;
        var prefix = this.context.prefix || this.props.prefix;
        var labelCol = props.labelCol;
        var required = props.required === undefined ? this.isRequired() : props.required;

        var className = (0, _classnames2['default'])((_classNames2 = {}, _defineProperty(_classNames2, this._getLayoutClass(labelCol), true), _defineProperty(_classNames2, prefix + 'form-item-label', true), _classNames2));

        return props.label !== undefined ? _react2['default'].createElement(
            'label',
            { htmlFor: props.id || this.getId(), required: required, className: className, key: 'label' },
            props.label
        ) : null;
    };

    FormItem.prototype.renderChildren = function renderChildren(validateStatus) {
        return [this.renderLabel(), this.renderValidateWrapper(validateStatus, this.context.labelAlign !== 'inset' && this.props.labelAlign !== 'inset' ? this.renderHelp() : null, this.props.extra)];
    };

    FormItem.prototype.renderFormItem = function renderFormItem(validateStatus, children) {
        var _classNames3;

        var _props = this.props,
            className = _props.className,
            labelAlign = _props.labelAlign,
            style = _props.style,
            others = _objectWithoutProperties(_props, ['className', 'labelAlign', 'style']);

        var prefix = this.context.prefix || this.props.prefix;

        var itemClassName = (0, _classnames2['default'])((_classNames3 = {}, _defineProperty(_classNames3, prefix + 'form-item', true), _defineProperty(_classNames3, prefix + 'row', this.context.direction === 'ver' && this.context.labelAlign === 'left'), _defineProperty(_classNames3, 'has-success', validateStatus === 'success'), _defineProperty(_classNames3, 'has-error', validateStatus === 'error'), _defineProperty(_classNames3, '' + className, !!className), _classNames3));

        if (this.context.labelAlign === 'inset' || labelAlign === 'inset') {
            return _react2['default'].createElement(
                'div',
                { className: itemClassName, style: style },
                _react2['default'].createElement(
                    _nextGrid.Row,
                    { className: prefix + 'form-item-inset' },
                    children
                ),
                this.renderHelp()
            );
        }

        return _react2['default'].createElement(
            'div',
            _extends({ className: itemClassName, style: style }, (0, _nextUtil.pickAttrs)(others)),
            children
        );
    };

    FormItem.prototype.render = function render() {

        var validateStatus = this.props.validateStatus === undefined && this.context.field ? this.getValidateStatus() : this.props.validateStatus;

        var children = this.renderChildren(validateStatus);
        return this.renderFormItem(validateStatus, children);
    };

    return FormItem;
}(_react2['default'].Component), _class.propTypes = {
    /**
     * 样式前缀
     */
    prefix: _propTypes2['default'].string,
    /**
     * label 标签的文本
     */
    label: _propTypes2['default'].node,
    /**
     * label 标签布局，通 `<Col>` 组件，设置 span offset 值，如 {span: 8, offset: 16}，该项仅在垂直表单有效
     */
    labelCol: _propTypes2['default'].object,
    /**
     * 提示信息，如不设置，则会根据校验规则自动生成. 如果设置会受控（ps: 可以利用这点自定义错误位置,详细看demo自定义错误)
     */
    help: _propTypes2['default'].node,
    /**
     * 校验状态，如不设置，则会根据校验规则自动生成
     * @enumdesc , 成功, 失败, 校验中
     */
    validateStatus: _propTypes2['default'].oneOf(['', 'success', 'error', 'loading']),
    /**
     * 配合 validateStatus 属性使用，是否展示校验状态图标, 目前只有Input支持
     */
    hasFeedback: _propTypes2['default'].bool,
    /**
     * 需要为输入控件设置布局样式时，使用该属性，用法同 labelCol
     */
    wrapperCol: _propTypes2['default'].object,
    /**
     * 自定义内联样式
     */
    style: _propTypes2['default'].object,
    id: _propTypes2['default'].string,
    children: _propTypes2['default'].node,
    /**
     * 额外的提示信息，和 help 类似，当需要错误信息和提示文案同时出现时，可以使用这个。 位于错误信息后面
     */
    extra: _propTypes2['default'].node,
    /**
     * 单个FormItem的size自定义，优先级高于Form的size, 并且当组件与 FormItem 一起使用时，组件自身设置 size 属性无效。
     */
    size: _propTypes2['default'].oneOf(['', 'large', 'small', 'medium']),
    labelAlign: _propTypes2['default'].oneOf(['', 'top', 'left', 'inset']),
    /**
     * 扩展class
     */
    className: _propTypes2['default'].string
}, _class.defaultProps = {
    hasFeedback: false,
    prefix: 'next-'
}, _class.contextTypes = {
    field: _propTypes2['default'].object,
    direction: _propTypes2['default'].oneOf(['hoz', 'ver']),
    labelAlign: _propTypes2['default'].oneOf(['top', 'left', 'inset']),
    prefix: _propTypes2['default'].string,
    size: _propTypes2['default'].oneOf(['small', 'medium', 'large'])
}, _temp);
FormItem.displayName = 'FormItem';
exports['default'] = FormItem;
module.exports = exports['default'];