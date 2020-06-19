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

var _func = require('../../next-util/lib/func.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Children = _react2['default'].Children,
    Popup = _nextOverlay2['default'].Popup,
    noop = function noop() {};

/**
 * Dropdown
 */
var Dropdown = (_temp = _class = function (_React$Component) {
  _inherits(Dropdown, _React$Component);

  function Dropdown(props) {
    _classCallCheck(this, Dropdown);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.state = {
      visible: props.visible || props.defaultVisible || false
    };
    return _this;
  }

  Dropdown.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if ('visible' in nextProps) {
      this.setState({ visible: nextProps.visible });
    }
  };

  Dropdown.prototype.onMenuClick = function onMenuClick() {
    if (!('visible' in this.props)) {
      this.setState({
        visible: false
      });
    }
    this.props.onVisibleChange(false, 'fromContent');
  };

  Dropdown.prototype.onVisibleChange = function onVisibleChange(visible) {
    if (!('visible' in this.props)) {
      this.setState({ visible: visible });
    }
    this.props.onVisibleChange(visible);
  };

  Dropdown.prototype.render = function render() {
    var child = Children.only(this.props.children),
        content = _react2['default'].cloneElement(child, {
      onClick: (0, _func.makeChain)(this.onMenuClick.bind(this), child.props.onClick)
    });

    return _react2['default'].createElement(
      Popup,
      _extends({}, this.props, {
        canCloseByOutSideClick: true,
        visible: this.state.visible,
        onVisibleChange: this.onVisibleChange.bind(this)
      }),
      content
    );
  };

  return Dropdown;
}(_react2['default'].Component), _class.propTypes = {
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
   * 弹层内容
   */
  children: _propTypes2['default'].node,
  /**
   * 弹层当前是否可见
   */
  visible: _propTypes2['default'].bool,
  /**
   * 弹层默认是否可见
   */
  defaultVisible: _propTypes2['default'].bool,
  /**
   * 弹层在显示和隐藏时触发的回调函数
   * @param {Boolean} visible 弹层是否显示
   * @param {String} type 触发弹层显示和隐藏的来源
   * @param {Object} event 事件对象
   */
  onVisibleChange: _propTypes2['default'].func,
  /**
   * 触发弹层显示或者隐藏的元素
   */
  trigger: _propTypes2['default'].node,
  /**
   * 触发弹层显示或者隐藏的事件
   */
  triggerType: _propTypes2['default'].oneOf(['hover', 'click', 'focus']),
  /**
   * 是否禁用，如果设置为true，那么trigger不能触发弹层的显示或隐藏
   */
  disabled: _propTypes2['default'].bool,
  /**
   * 弹层相对于trigger的定位, 详见[Overlay的定位部分](http://fusion-demo.alibaba-inc.com/components?type=next&themeId=next&name=overlay#demo-guide)
   */
  align: _propTypes2['default'].string,
  /**
   * 弹层相对于trigger的定位的微调
   */
  offset: _propTypes2['default'].array,
  /**
   * 悬浮状态下延时时间
   */
  delay: _propTypes2['default'].number,
  /**
   * 弹层弹出后是否自动获取焦点
   */
  autoFocus: _propTypes2['default'].bool,
  /**
   * 是否带有遮罩
   * @type {Boolean}
   */
  hasMask: _propTypes2['default'].bool,
  /**
   * 在弹层隐藏后是否保留当前的DOM
   */
  cache: _propTypes2['default'].bool,
  /**
   * 弹层显示前触发的回调函数
   */
  beforeOpen: _propTypes2['default'].func,
  /**
   * 弹层显示后触发的回调函数
   */
  afterOpen: _propTypes2['default'].func,
  /**
   * 弹层关闭前触发的回调函数
   */
  beforeClose: _propTypes2['default'].func,
  /**
   * 弹层关闭后触发的回调函数
   */
  afterClose: _propTypes2['default'].func,
  /**
   * 弹层定位完成后触发的回调函数
   * @param {Object} config 定位的参数
   * @param {Object} node 定位的元素
   */
  onPosition: _propTypes2['default'].func,
  /**
   * 动画的配置，如果设置为false，将关闭动画
   */
  animation: _propTypes2['default'].oneOfType([_propTypes2['default'].bool, _propTypes2['default'].object])
}, _class.defaultProps = {
  prefix: 'next-',
  defaultVisible: false,
  onVisibleChange: noop,
  triggerType: 'hover',
  disabled: false,
  align: 'tl bl',
  offset: [0, 0],
  delay: 200,
  autoFocus: true,
  hasMask: false,
  cache: false,
  beforeOpen: noop,
  afterOpen: noop,
  beforeClose: noop,
  afterClose: noop,
  onPosition: noop,
  animation: {
    'in': 'expandInDown',
    out: 'expandOutUp'
  }
}, _temp);
Dropdown.displayName = 'Dropdown';
exports['default'] = Dropdown;
module.exports = exports['default'];