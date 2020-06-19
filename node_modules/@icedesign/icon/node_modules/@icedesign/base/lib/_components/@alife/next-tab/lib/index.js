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

var _nextIcon = require('../../next-icon/lib/index.js');

var _nextIcon2 = _interopRequireDefault(_nextIcon);

var _nextUtil = require('../../next-util/lib/index.js');

var _nextUtil2 = _interopRequireDefault(_nextUtil);

var _tabs = require('./tabs/tabs.js');

var _tabs2 = _interopRequireDefault(_tabs);

var _tabPane = require('./tabs/tab-pane.js');

var _tabPane2 = _interopRequireDefault(_tabPane);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var noop = function noop() {};

/** Tab */
var NextTabs = (_temp = _class = function (_Component) {
  _inherits(NextTabs, _Component);

  function NextTabs() {
    _classCallCheck(this, NextTabs);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  NextTabs.prototype.handleRemove = function handleRemove(key, e) {
    e.stopPropagation();
    if (!key) {
      return;
    }
    this.props.onClose(key);
  };

  NextTabs.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props,
        prefix = _props.prefix,
        type = _props.type,
        closeable = _props.closeable,
        children = _props.children,
        others = _objectWithoutProperties(_props, ['prefix', 'type', 'closeable', 'children']);

    var tabPrefix = this.context.prefix || prefix;
    var filteredChildren = _nextUtil2['default'].children.toArray(children).filter(_react2['default'].isValidElement);

    // only bar and wrapped tab could closable
    if (/^bar|wrapped$/i.test(type) && closeable === true) {
      filteredChildren = filteredChildren.map(function (child, index) {
        var childCloseable = child.props.closeable;

        var tabTail = childCloseable ? _react2['default'].createElement(_nextIcon2['default'], { type: 'close', onClick: function onClick(e) {
            return _this2.handleRemove(child.key, e);
          } }) : null;
        var tabInnerStyle = tabPrefix + 'tabs-tab-inner-content';
        return _react2['default'].cloneElement(child, {
          tab: _react2['default'].createElement(
            'div',
            { className: tabInnerStyle },
            child.props.tab,
            tabTail
          ),
          key: child.key || index
        });
      });
    }

    var tabsProps = _extends({
      prefix: tabPrefix,
      type: type,
      closeable: closeable
    }, others);
    return _react2['default'].createElement(
      _tabs2['default'],
      tabsProps,
      filteredChildren
    );
  };

  return NextTabs;
}(_react.Component), _class.contextTypes = {
  prefix: _propTypes2['default'].string
}, _class.propTypes = {
  /**
   * 样式前缀
   */
  prefix: _propTypes2['default'].string,
  /**
   * 被激活的选项卡的 key（受控）
   */
  activeKey: _propTypes2['default'].oneOfType([_propTypes2['default'].number, _propTypes2['default'].string]),
  /**
   * 初始化时被激活的选项卡的 key（非受控）
   */
  defaultActiveKey: _propTypes2['default'].oneOfType([_propTypes2['default'].number, _propTypes2['default'].string]),
  /**
   * 类型
   */
  type: _propTypes2['default'].oneOf(['bar', 'wrapped', 'text', 'capsule']),
  /**
   * 是否开启动效
   */
  animation: _propTypes2['default'].bool,
  /**
   * 多余项的展现方向
   */
  resDirection: _propTypes2['default'].oneOf(['horizontal', 'vertical']),
  /**
   * 导航选项卡的位置，只适用于包裹型（wrapped）选项卡
   */
  tabPosition: _propTypes2['default'].oneOf(['top', 'bottom', 'left', 'right']),
  /**
   * 尺寸
   */
  size: _propTypes2['default'].oneOf(['small', 'medium']),
  /**
   * 是否可关闭选项卡，只支持 `bar` 和 `wrapped` 两种类型
   */
  closeable: _propTypes2['default'].bool,
  /**
   * 触发选项卡的方式
   */
  triggerType: _propTypes2['default'].oneOf(['hover', 'click']),
  /**
   * 是否提前渲染好所有 TabPane 的内容
   */
  lazyLoad: _propTypes2['default'].bool,
  destroyInactiveTabPane: _propTypes2['default'].bool,
  /**
   * 导航条的附加样式
   */
  navStyle: _propTypes2['default'].object,
  /**
   * 内容区的附加样式
   */
  contentStyle: _propTypes2['default'].object,
  /**
   * 导航栏附加内容
   */
  tabBarExtraContent: _propTypes2['default'].node,
  /**
   * 选项卡发生切换时的事件回调
   * @param {String} key 改变后的 key
   */
  onChange: _propTypes2['default'].func,
  /**
   * 选项卡被关闭时的事件回调
   * @param {String} key   关闭的选项卡的 key
   * @param {Object} event Event 对象
   */
  onClose: _propTypes2['default'].func,
  children: _propTypes2['default'].any
}, _class.defaultProps = {
  prefix: 'next-',
  type: 'bar',
  size: 'medium',
  animation: true,
  tabPosition: 'top',
  resDirection: 'horizontal',
  triggerType: 'click',
  tabBarExtraContent: null,
  closeable: false,
  lazyLoad: true,
  navStyle: {},
  contentStyle: {},
  destroyInactiveTabPane: false,
  style: {},
  onChange: noop,
  onClose: noop
}, _temp);
NextTabs.displayName = 'NextTabs';


NextTabs.TabPane = _tabPane2['default'];

exports['default'] = NextTabs;
module.exports = exports['default'];