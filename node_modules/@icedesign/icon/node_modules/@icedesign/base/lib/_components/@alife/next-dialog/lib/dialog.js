'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _nextButton = require('../../next-button/lib/index.js');

var _nextButton2 = _interopRequireDefault(_nextButton);

var _nextLocaleProvider = require('../../next-locale-provider/lib/index.js');

var _nextLocaleProvider2 = _interopRequireDefault(_nextLocaleProvider);

var _base = require('./base.js');

var _base2 = _interopRequireDefault(_base);

var _content = require('./content.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var noop = function noop() {};

/**
 * Dialog
 */
var Dialog = (_temp = _class = function (_Component) {
  _inherits(Dialog, _Component);

  function Dialog() {
    _classCallCheck(this, Dialog);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  Dialog.prototype.render = function render() {
    /* eslint-disable no-unused-vars, react/prop-types */
    var _props = this.props,
        title = _props.title,
        children = _props.children,
        footer = _props.footer,
        onOk = _props.onOk,
        onCancel = _props.onCancel,
        locale = _props.locale,
        others = _objectWithoutProperties(_props, ['title', 'children', 'footer', 'onOk', 'onCancel', 'locale']),
        prefix = this.context.prefix || this.props.prefix,
        buttons = _react2['default'].createElement(
      'span',
      null,
      _react2['default'].createElement(
        _nextButton2['default'],
        { type: 'primary', onClick: onOk },
        locale.ok
      ),
      _react2['default'].createElement(
        _nextButton2['default'],
        { onClick: onCancel },
        locale.cancel
      )
    ),
        headerNode = title ? _react2['default'].createElement(
      _content.Header,
      null,
      title
    ) : null,
        footerNode = footer === false ? null : _react2['default'].createElement(
      _content.Footer,
      null,
      footer ? footer : buttons
    );

    return _react2['default'].createElement(
      _base2['default'],
      others,
      headerNode,
      _react2['default'].createElement(
        _content.Body,
        null,
        children
      ),
      footerNode
    );
  };

  return Dialog;
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
   * 自定义内联样式
   */
  style: _propTypes2['default'].object,
  /**
   * 对话框的标题
   */
  title: _propTypes2['default'].any,
  /**
   * 传入底部的内容
   */
  footer: _propTypes2['default'].oneOfType([_propTypes2['default'].bool, _propTypes2['default'].string, _propTypes2['default'].node]),
  /**
   * 底部按钮的对齐方式
   */
  footerAlign: _propTypes2['default'].oneOf(['left', 'center', 'right']),
  /**
   * 控制对话框是否可见
   */
  visible: _propTypes2['default'].bool,
  /**
   * 是否需要mask
   */
  hasMask: _propTypes2['default'].bool,
  /**
   * 'esc, mask, close', 详见[closable](#closable)
   */
  closable: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].bool]),
  /**
   * 是否强制更新dialog的位置，在`isFullScreen`为true且align为`cc cc`的时候无效
   */
  shouldUpdatePosition: _propTypes2['default'].bool,
  /**
   * 浮层自定义位置
   */
  align: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].number]),
  /**
   * 配置动画的播放方式
   * @param {String} in 进场动画
   * @param {String} out 出场动画
   */
  animation: _propTypes2['default'].oneOfType([_propTypes2['default'].object, _propTypes2['default'].bool]),
  /**
   * 在点击关闭按钮的时候触发的函数
   */
  onClose: _propTypes2['default'].func,
  /**
   * 浮层关闭后触发的事件, 如果有动画，则在动画结束后触发
   */
  afterClose: _propTypes2['default'].func,
  /**
   * 在点击Ok按钮的时候触发的函数
   */
  onOk: _propTypes2['default'].func,
  /**
   * 在点击Cancel按钮的时候触发的函数
   */
  onCancel: _propTypes2['default'].func,
  /**
   * 当dialog过高的时候距离viewport的最小边距,在`isFullScreen`下无效。
   */
  minMargin: _propTypes2['default'].number,
  /**
   * 当dialog弹出的时候是否自动获取焦点
   */
  autoFocus: _propTypes2['default'].bool,
  /**
   * 自定义国际化文案对象
   * @property {String} ok 确认按钮文案
   * @property {String} cancel 取消按钮文案
   */
  locale: _propTypes2['default'].object,
  /**
   * 自定义国际化语言
   */
  language: _propTypes2['default'].oneOf(['en-us', 'zh-cn', 'zh-tw']),
  /**
   * 是否是启用使用CSS定位模式的对话框, 在该模式下面无需通过`shouldUpdatePosition`来进行重新定位。
   */
  isFullScreen: _propTypes2['default'].bool
}, _class.defaultProps = {
  prefix: 'next-',
  footerAlign: 'right',
  hasMask: true,
  closable: 'esc,close',
  align: 'cc cc',
  animation: {
    'in': 'fadeInDown',
    out: 'fadeOutUp'
  },
  onOk: noop,
  onCancel: noop,
  minMargin: 40,
  autoFocus: true,
  isFullScreen: false
}, _class.contextTypes = {
  prefix: _propTypes2['default'].string
}, _temp);
Dialog.displayName = 'Dialog';
exports['default'] = (0, _nextLocaleProvider2['default'])(Dialog);
module.exports = exports['default'];