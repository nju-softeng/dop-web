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

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _nextOverlay = require('../../next-overlay/lib/index.js');

var _nextIcon = require('../../next-icon/lib/index.js');

var _nextIcon2 = _interopRequireDefault(_nextIcon);

var _nextUtil = require('../../next-util/lib/index.js');

var _nextLocaleProvider = require('../../next-locale-provider/lib/index.js');

var _nextLocaleProvider2 = _interopRequireDefault(_nextLocaleProvider);

var _base = require('./base.js');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var noop = function noop() {};

/**
 * Select
 */
var Select = (_temp = _class = function (_Base) {
  _inherits(Select, _Base);

  function Select() {
    _classCallCheck(this, Select);

    return _possibleConstructorReturn(this, _Base.apply(this, arguments));
  }

  Select.prototype.render = function render() {
    var _classnames;

    /* eslint-disable no-unused-vars */
    var _props = this.props,
        placeholder = _props.placeholder,
        children = _props.children,
        className = _props.className,
        locale = _props.locale,
        overlay = _props.overlay,
        popupProps = _props.popupProps,
        size = _props.size,
        disabled = _props.disabled,
        shape = _props.shape,
        hasArrow = _props.hasArrow,
        safeNode = _props.safeNode,
        multiple = _props.multiple,
        animation = _props.animation,
        dataSource = _props.dataSource,
        container = _props.container,
        hasClear = _props.hasClear,
        popupClassName = _props.popupClassName,
        others = _objectWithoutProperties(_props, ['placeholder', 'children', 'className', 'locale', 'overlay', 'popupProps', 'size', 'disabled', 'shape', 'hasArrow', 'safeNode', 'multiple', 'animation', 'dataSource', 'container', 'hasClear', 'popupClassName']),
        prefix = this.getPrefix(),
        menu = overlay || this.renderMenu(),
        _state = this.state,
        value = _state.value,
        visible = _state.visible;

    placeholder = placeholder || locale.selectPlaceHolder;

    this.cacheDataByValue(value);

    var records = this.getDataByValue(value),
        label = this.getDisplayByValue(value, records),
        cls = (0, _classnames3['default'])((_classnames = {}, _defineProperty(_classnames, prefix + 'select', true), _defineProperty(_classnames, 'opened', visible), _defineProperty(_classnames, 'disabled', disabled), _defineProperty(_classnames, size, size), _defineProperty(_classnames, 'multiple', multiple), _defineProperty(_classnames, 'no-border', shape === 'arrow-only'), _defineProperty(_classnames, 'no-arrow', !hasArrow), _defineProperty(_classnames, 'has-clear', this.hasClear()), _defineProperty(_classnames, className, className), _classnames)),
        arrowType = this.getArrowType(),
        iconSize = this.getIconSize(),
        hiddenValue = this.normalizeHiddenValue(this.state.value),
        labelContent = label.length ? this.renderLabel(label, value) : _react2['default'].createElement(
      'span',
      { className: prefix + 'select-placeholder' },
      placeholder
    ),
        arrowContent = hasArrow ? _react2['default'].createElement(_nextIcon2['default'], { type: arrowType, size: iconSize, className: prefix + 'select-arrow' }) : null,
        closeIcon = this.hasClear() ? _react2['default'].createElement(_nextIcon2['default'], { type: 'delete-filling', size: iconSize, className: prefix + 'select-clear', onClick: this.clear.bind(this) }) : null;

    others = (0, _nextUtil.pickAttrs)(others);

    var trigger = _react2['default'].createElement(
      'span',
      _extends({}, others, { className: cls, tabIndex: disabled ? null : 0 }),
      _react2['default'].createElement('input', { type: 'hidden', name: others.name || 'select-faker', value: hiddenValue }),
      _react2['default'].createElement(
        'span',
        { ref: 'target', className: prefix + 'select-inner' },
        labelContent,
        closeIcon
      ),
      arrowContent
    );

    return _react2['default'].createElement(
      _nextOverlay.Popup,
      _extends({}, popupProps, {
        className: popupClassName,
        trigger: trigger,
        ref: 'popup',
        container: container,
        triggerType: 'click',
        disabled: disabled,
        visible: visible,
        animation: animation,
        autoFocus: true,
        safeNode: safeNode,
        shouldUpdatePosition: true,
        onOpen: this.afterOpen,
        onClose: this.props.onClose,
        onVisibleChange: this.onVisibleChange.bind(this) }),
      menu
    );
  };

  Select.prototype.afterOpen = function afterOpen() {
    var menu = this.refs.popup.overlay.refs.menu;
    this._syncWidth(menu);
    this.props.onOpen();
  };

  Select.prototype.normalizeHiddenValue = function normalizeHiddenValue(value) {
    return value.map(function (v) {
      if (_nextUtil.obj.isPlainObject(v)) {
        return v.value;
      } else {
        return v;
      }
    });
  };

  return Select;
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
   * Select发生改变的时候触发的回调
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
  fillProps: 'label',
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
  locale: {
    selectPlaceHolder: '请选择',
    comboboxPlaceHolder: '请输入'
  }
}, _temp);


Select.displayName = 'Select';

exports['default'] = (0, _nextLocaleProvider2['default'])(Select);
module.exports = exports['default'];