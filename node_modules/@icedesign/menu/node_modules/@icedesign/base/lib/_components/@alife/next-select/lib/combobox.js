'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp; /* eslint-disable react/prop-types, no-unused-vars, eqeqeq, prefer-const */


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _nextOverlay = require('../../next-overlay/lib/index.js');

var _nextOverlay2 = _interopRequireDefault(_nextOverlay);

var _nextIcon = require('../../next-icon/lib/index.js');

var _nextIcon2 = _interopRequireDefault(_nextIcon);

var _nextDom = require('../../next-dom/lib/index.js');

var _nextLocaleProvider = require('../../next-locale-provider/lib/index.js');

var _nextLocaleProvider2 = _interopRequireDefault(_nextLocaleProvider);

var _nextUtil = require('../../next-util/lib/index.js');

var _base = require('./base.js');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var findDOMNode = _reactDom2['default'].findDOMNode,
    noop = function noop() {};

var isObject = function isObject(object) {
    return Object.prototype.toString.call(object).match(/^\[object\s(.*)\]$/)[1] === 'Object';
};
/**
 * Select.Combobox
 */
var Combobox = (_temp = _class = function (_Base) {
    _inherits(Combobox, _Base);

    function Combobox(props, context) {
        _classCallCheck(this, Combobox);

        var _this = _possibleConstructorReturn(this, _Base.call(this, props, context));

        _this.state = _this.state || {};
        _this.state.inputValue = _this.props.multiple ? '' : _this.getInputValueFromValue(_this.state.value);
        _this.state.placeholder = _this.getPlaceHolder();
        ['onInputChange', 'onInputFocus', 'onInputBlur', 'onInputKeyDown', 'onSelectInnerClick', 'onArrowClick', 'onMouseDown', 'onMouseUp'].forEach(function (method) {
            _this[method] = _this[method].bind(_this);
        });
        _this.isCombobox = true;
        return _this;
    }

    Combobox.prototype.getPlaceHolder = function getPlaceHolder(props) {
        props = props || this.props;
        return props.placeholder || props.locale.comboboxPlaceHolder;
    };

    Combobox.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        _Base.prototype.componentWillReceiveProps.call(this, nextProps);
        if ('value' in nextProps) {
            var value = this.normalizeValue(nextProps.value);
            this.cacheDataByValue(value, nextProps);
            if (!nextProps.multiple) {
                this.setState({
                    inputValue: this.getInputValueFromValue(nextProps.value)
                });
            } else if (!this.props.multiple && nextProps.multiple) {
                this.setState({
                    inputValue: ''
                });
            }
        }

        if ('placeholder' in nextProps) {
            this.setState({
                placeholder: this.getPlaceHolder(nextProps)
            });
        }
    };

    Combobox.prototype.getInputValueFromValue = function getInputValueFromValue(value) {
        var _props = this.props,
            fillProps = _props.fillProps,
            multiple = _props.multiple;

        if (this._isUserInput && !isObject(value)) {
            return value;
        }
        value = this.normalizeValue(value);
        if (value.length && !multiple) {
            value = this.getDataByValue(value);
            return typeof value[0][fillProps] !== 'undefined' ? value[0][fillProps] : value[0];
        } else {
            return '';
        }
    };

    Combobox.prototype.renderComboboxLabel = function renderComboboxLabel() {
        var multiple = this.props.multiple,
            _state = this.state,
            value = _state.value,
            placeholder = _state.placeholder,
            inputValue = _state.inputValue,
            records = this.getDataByValue(value),
            label = this.getDisplayByValue(value, records),
            placeHolderClassName = this.getPrefix() + 'select-placeholder';


        if (multiple) {
            return label.length || inputValue ? this.renderLabel(label, value) : _react2['default'].createElement(
                'span',
                { className: placeHolderClassName },
                placeholder
            );
        } else {
            return null;
        }
    };

    Combobox.prototype.render = function render() {
        var _classnames,
            _this2 = this;

        var _props2 = this.props,
            overlay = _props2.overlay,
            className = _props2.className,
            disabled = _props2.disabled,
            size = _props2.size,
            multiple = _props2.multiple,
            hasArrow = _props2.hasArrow,
            animation = _props2.animation,
            safeNode = _props2.safeNode,
            container = _props2.container,
            dataSource = _props2.dataSource,
            onChange = _props2.onChange,
            name = _props2.name,
            popupClassName = _props2.popupClassName,
            popupProps = _props2.popupProps,
            others = _objectWithoutProperties(_props2, ['overlay', 'className', 'disabled', 'size', 'multiple', 'hasArrow', 'animation', 'safeNode', 'container', 'dataSource', 'onChange', 'name', 'popupClassName', 'popupProps']),
            prefix = this.getPrefix(),
            menu = overlay || _react2['default'].cloneElement(this.renderMenu(), {
            onKeyNavNodeEnter: this.onNodeEnter.bind(this),
            autoFocus: false
        }),
            visible = this.state.visible && !!_react2['default'].Children.toArray(menu.props.children).length,
            _state2 = this.state,
            value = _state2.value,
            inputValue = _state2.inputValue,
            focused = _state2.focused;

        this.cacheDataByValue(value);

        var cls = (0, _classnames3['default'])((_classnames = {}, _defineProperty(_classnames, prefix + 'select', true), _defineProperty(_classnames, prefix + 'comobobox', true), _defineProperty(_classnames, 'focused', focused), _defineProperty(_classnames, 'opened', visible), _defineProperty(_classnames, 'disabled', disabled), _defineProperty(_classnames, size, size), _defineProperty(_classnames, 'multiple', multiple), _defineProperty(_classnames, 'no-arrow', !hasArrow), _defineProperty(_classnames, 'has-clear', this.hasClear()), _defineProperty(_classnames, className, className), _classnames)),
            arrowType = this.getArrowType(visible),
            iconSize = this.getIconSize(),
            arrowContent = hasArrow ? _react2['default'].createElement(
            'span',
            { className: prefix + 'comobobox-arrow-wrapper', onClick: this.onArrowClick },
            _react2['default'].createElement(_nextIcon2['default'], { type: arrowType, size: iconSize, className: prefix + 'select-arrow' })
        ) : null,
            closeIcon = this.hasClear() ? _react2['default'].createElement(_nextIcon2['default'], { type: 'delete-filling', size: iconSize, className: prefix + 'select-clear', onClick: this.clear.bind(this) }) : null;

        others = (0, _nextUtil.pickAttrs)(others);

        var id = others.id;
        var focusNodeId = id ? 'focus-' + id : null;

        return _react2['default'].createElement(
            'span',
            _extends({}, others, { className: cls, onMouseDown: this.onMouseDown, onMouseUp: this.onMouseUp }),
            _react2['default'].createElement(
                'div',
                { className: prefix + 'select-inner-wrapper', ref: 'innerWrapper' },
                _react2['default'].createElement(
                    'div',
                    { className: prefix + 'select-inner', onClick: this.onSelectInnerClick },
                    this.renderComboboxLabel(),
                    _react2['default'].createElement('input', { id: focusNodeId,
                        ref: 'target',
                        tabIndex: disabled ? null : 0,
                        value: inputValue,
                        size: size,
                        disabled: disabled,
                        onKeyDown: this.onInputKeyDown,
                        onChange: this.onInputChange,
                        onFocus: this.onInputFocus,
                        onBlur: this.onInputBlur,
                        name: name,
                        autoComplete: 'off',
                        placeholder: multiple ? null : this.getPlaceHolder()
                    }),
                    closeIcon
                ),
                arrowContent
            ),
            _react2['default'].createElement(
                _nextOverlay2['default'],
                _extends({}, popupProps, {
                    visible: visible,
                    animation: animation,
                    className: popupClassName,
                    container: container,
                    safeNode: [function () {
                        return _this2.refs.innerWrapper;
                    }, safeNode],
                    autoFocus: false, ref: 'overlay',
                    shouldUpdatePosition: true,
                    target: function target() {
                        return _this2;
                    }, onOpen: this.afterOpen, onClose: this.props.onClose,
                    onRequestClose: this.onRequestClose.bind(this) }),
                menu
            )
        );
    };

    Combobox.prototype.onMouseDown = function onMouseDown(e) {
        this.clickByUser = true;
    };

    Combobox.prototype.onMouseUp = function onMouseUp(e) {
        this.clickByUser = false;
    };

    Combobox.prototype.onNodeEnter = function onNodeEnter(e, child) {
        var _props3 = this.props,
            multiple = _props3.multiple,
            tags = _props3.tags,
            selectedValue = [];


        if (child) {
            var value = (child.value || '').toString();
            if (multiple) {
                selectedValue = this.getMultipleStateValue(value);
            } else {
                selectedValue = [value];
            }
            this.onSelect(selectedValue, child);
        } else if (multiple && tags) {
            var _value = e.target.value;
            selectedValue = this.getMultipleStateValue(_value, tags);
            this.onSelect(selectedValue);
        } else {
            this.props.onInputEnter(e);
        }
        this.clearValue();
    };

    Combobox.prototype.getMultipleStateValue = function getMultipleStateValue(value, tags) {
        var stateValue = this.state.value,
            index = stateValue.indexOf(value);

        if (index > -1) {
            if (!tags) {
                stateValue.splice(index, 1);
            }
        } else {
            stateValue.push(value);
        }
        return stateValue;
    };

    Combobox.prototype.onInputChange = function onInputChange(e) {
        var value = e.target.value;
        if (this.filterValueFromLocal !== false) {
            this.filterValue = value;
        }
        this._isUserInput = true;
        var stateValue = this.normalizeValue(value);
        if (!('value' in this.props) && !this.props.multiple) {
            this.setState({
                value: stateValue
            });
        }
        var dataSource = this.getFilteredDataSource();
        var flatternDataSource = this.getFlatternDataSource(dataSource);
        if (flatternDataSource.length || !this.props.filterLocal) {
            this.onVisibleChange(true);
        }
        this.setInputValue(value);
        this.props.onInputUpdate(value);
    };

    Combobox.prototype.fakeInputWidth = function fakeInputWidth(value) {
        if (!this._fakeInputElement) {
            this._fakeInputElement = document.createElement('div');
            _nextDom.style.set(this._fakeInputElement, {
                position: 'absolute',
                top: '-9999px',
                left: 0,
                visibility: 'hidden'
            });
            document.body.appendChild(this._fakeInputElement);
        }
        this._fakeInputElement.textContent = value;
    };

    Combobox.prototype.componentDidMount = function componentDidMount() {
        this.setInputWidth();
    };

    Combobox.prototype.componentDidUpdate = function componentDidUpdate() {
        _Base.prototype.componentDidUpdate.apply(this, arguments);
        this.resizeInput();
        this._isUserInput = false;
    };

    Combobox.prototype.setInputWidth = function setInputWidth() {
        var input = findDOMNode(this.refs.target);
        this._oldInputWidth = input.clientWidth;
    };

    Combobox.prototype.resizeInput = function resizeInput() {
        var input = findDOMNode(this.refs.target),
            multiple = this.props.multiple,
            width = void 0;


        if (multiple) {
            if (!this._fakeInputElement) {
                this.fakeInputWidth('');
            }
            width = this._fakeInputElement.clientWidth;
            _nextDom.style.set(input, 'width', width + 10 + 'px');
        } else {
            _nextDom.style.set(input, 'width', this._oldInputWidth + 'px');
        }
    };

    Combobox.prototype.onInputFocus = function onInputFocus(e) {
        this.setState({
            focused: true
        });

        if (this._blurTimeout) {
            clearTimeout(this._blurTimeout);
        }
        if (this.state.placeholder !== '') {
            this.setState({
                placeholder: ''
            });
        }
        this.props.onInputFocus(e, this.clickByUser);
    };

    Combobox.prototype.onInputBlur = function onInputBlur(e) {
        var _this3 = this;

        this.setState({
            focused: false
        });

        this._blurTimeout = setTimeout(function () {
            if (!_this3.state.value.length) {
                _this3.setState({
                    placeholder: _this3.getPlaceHolder()
                });
            }
            _this3.props.onInputBlur(e, _this3.state.inputValue);
        }, 100);
    };

    Combobox.prototype.onInputKeyDown = function onInputKeyDown(e) {
        if (this.refs.overlay.refs.menu) {
            this.refs.overlay.refs.menu.onKeyNavNodeKeyDown(e);
        } else if (e.keyCode === 13) {
            this.onNodeEnter(e);
        }
        if (e.keyCode === 40 || e.keyCode === 38) {
            e.preventDefault();
        }
    };

    Combobox.prototype.onSelectInnerClick = function onSelectInnerClick() {
        this.clickByUser = true;
        this.focusInput();
        this.clickByUser = false;
    };

    Combobox.prototype.focusInput = function focusInput() {
        findDOMNode(this.refs.target).focus();
    };

    Combobox.prototype.setInputValue = function setInputValue(value) {
        this.setState({
            inputValue: value
        });
        this.fakeInputWidth(value);
        this._inputValue = value;
    };

    Combobox.prototype.clearValue = function clearValue() {
        if (this.props.multiple) {
            this.setInputValue('');
        }
        this.focusInput();
    };

    Combobox.prototype.onRequestClose = function onRequestClose() {
        this.onVisibleChange(false);
    };

    Combobox.prototype.onArrowClick = function onArrowClick() {
        if (!this.props.disabled) {
            this.onVisibleChange(!this.state.visible);
            this.focusInput();
        }
    };

    Combobox.prototype.afterOpen = function afterOpen() {
        var menu = this.refs.overlay.refs.menu;
        this._syncWidth(menu);
        this.props.onOpen();
    };

    Combobox.prototype.hasClear = function hasClear() {
        return this.props.hasClear && this.state.inputValue && !this.props.multiple && !this.props.disabled;
    };

    return Combobox;
}(_base2['default']), _class.propTypes = {
    /**
     * 样式类名的品牌前缀
     */
    prefix: _propTypes2['default'].string,
    /**
     * 自定义类名
     */
    className: _propTypes2['default'].string,
    /**
     * 自定义内联样式
     */
    style: _propTypes2['default'].object,
    /**
     *  弹层挂载容器节点
     */
    container: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].func]),
    /**
     * 选择器的尺寸
     */
    size: _propTypes2['default'].oneOf(['small', 'medium', 'large']),
    /**
     * 选择器的形状
     */
    shape: _propTypes2['default'].oneOf(['normal', 'arrow-only']),
    /**
     * 没有值的时候的占位符
     */
    placeholder: _propTypes2['default'].string,
    /**
     * 当前值
     */
    value: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].array, _propTypes2['default'].node, _propTypes2['default'].object]),
    /**
     * 初始默认值
     */
    defaultValue: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].array, _propTypes2['default'].node, _propTypes2['default'].object]),
    /**
     * 当前弹层是否显示
     */
    visible: _propTypes2['default'].bool,
    /**
     * 弹层初始是否显示
     */
    defaultVisible: _propTypes2['default'].bool,
    /**
     * 是否禁用
     */
    disabled: _propTypes2['default'].bool,
    /**
     * 传入的数据，可以动态渲染子项,详见[dataSource的使用](#dataSource的使用)
     */
    dataSource: _propTypes2['default'].array,
    /**
     * 是否是多选
     */
    multiple: _propTypes2['default'].bool,
    /**
     * 是否启用标签模式, 仅在多选时有效,效果是除了自动提示外的选项, 也可以使用输入的文字作为标签
     */
    tags: _propTypes2['default'].bool,
    // TODO: Remove API at next version.
    /**
     * 填充到选择框里面的值
     */
    fillProps: _propTypes2['default'].string,
    /**
     * 是否显示顶部的搜索框
     */
    showSearch: _propTypes2['default'].bool,
    /**
     * 在输入的时候过滤的函数,仅在filterLocal为true时候有效
     * @param {String} filterValue 筛选值
     * @param {Object} option 选项
     * @return {Boolean} 是否保留当前选项
     */
    filterBy: _propTypes2['default'].func,
    /**
     * 是否使用本地过滤,在数据源为远程的时候需要关闭此选项
     */
    filterLocal: _propTypes2['default'].bool,
    /**
     * 是否显示右侧的箭头
     */
    hasArrow: _propTypes2['default'].bool,
    /**
     * 下拉菜单是否与选择器对齐
     */
    autoWidth: _propTypes2['default'].bool,
    /**
     * 选择后是否立即隐藏菜单，单选是默认隐藏的，因此该选项只在多选的时候有效
     */
    hiddenSelected: _propTypes2['default'].bool,
    /**
     * Combobox在用户输入的时候触发的回调
     * @param {String} value 输入值
     */
    onInputUpdate: _propTypes2['default'].func,
    /**
     * Combobox获取焦点的时候触发的回调
     * @param {Event} e DOM事件对象
     * @param {Boolean} clickByUser 是否用户点击
     */
    onInputFocus: _propTypes2['default'].func,
    /**
     * Combobox失去焦点的时候触发的回调
     * @param {Event} e DOM事件对象
     * @param {String} inputValue 输入值
     */
    onInputBlur: _propTypes2['default'].func,
    /**
     * Combobox回车的时候触发的回调
     * @param {Event} e DOM事件对象
     */
    onInputEnter: _propTypes2['default'].func,
    /**
     * Combobox发生改变的时候触发的回调, 注意在输入的时候该事件不会被触发，如果需要监听输入的事件请使用onInputUpdate
     * @param {String} value 数据
     * @param {Object} option 选项
     */
    onChange: _propTypes2['default'].func,
    /**
     * 在搜索框中输入触发的事件，仅在showSearch为true时候有效
     * @param {String} value 搜索值
     */
    onSearch: _propTypes2['default'].func,
    /**
     * 是否显示清空按钮，该按钮可以清空select的value, 该属性仅在单选模式下有效
     */
    hasClear: _propTypes2['default'].bool,
    /**
     * 弹出层的样式类
     */
    popupClassName: _propTypes2['default'].string,
    /**
     * 弹出层的属性
     */
    popupProps: _propTypes2['default'].object,
    /**
     * 弹层显示或隐藏的时候触发的事件
     * @param {Boolean} visible 弹层是否隐藏和显示
     */
    onVisibleChange: _propTypes2['default'].func,
    /**
     * 弹层显示时触发的事件
     */
    onOpen: _propTypes2['default'].func,
    /**
     * 弹层隐藏时触发的事件
     */
    onClose: _propTypes2['default'].func,
    /**
     * 自定义国际化文案对象
     * @property {String} selectPlaceHolder 请选择的提示文案
     * @property {String} comboboxPlaceHolder 请输入的提示文案
     */
    locale: _propTypes2['default'].object,
    /**
     * 自定义国际化语言
     */
    language: _propTypes2['default'].oneOf(['en-us', 'zh-cn', 'zh-tw'])
}, _class.defaultProps = {
    prefix: 'next-',
    size: 'medium',
    shape: 'normal',
    placeholder: '',
    disabled: false,
    multiple: false,
    showSearch: false,
    hasArrow: true,
    autoWidth: true,
    onVisibleChange: noop,
    onChange: noop,
    fillProps: 'value',
    filterLocal: true,
    onMouseDown: noop,
    onMouseUp: noop,
    onSearch: noop,
    onOpen: noop,
    onClose: noop,
    hasClear: false,
    animation: {
        'in': 'expandInDown',
        out: 'expandOutUp'
    },
    onInputUpdate: noop,
    onInputFocus: noop,
    onInputBlur: noop,
    onInputEnter: noop,
    hiddenSelected: false,
    labelInValue: false,
    locale: {
        selectPlaceHolder: '请选择',
        comboboxPlaceHolder: '请输入'
    }
}, _temp);


Combobox.displayName = 'Combobox';

exports['default'] = (0, _nextLocaleProvider2['default'])(Combobox);
module.exports = exports['default'];