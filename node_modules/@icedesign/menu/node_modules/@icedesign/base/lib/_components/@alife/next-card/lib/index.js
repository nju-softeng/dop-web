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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _nextLocaleProvider = require('../../next-locale-provider/lib/index.js');

var _nextLocaleProvider2 = _interopRequireDefault(_nextLocaleProvider);

var _locale = require('./locale/index.js');

var _locale2 = _interopRequireDefault(_locale);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

/** Card */
var Card = (_temp = _class = function (_React$Component) {
    _inherits(Card, _React$Component);

    function Card(props, context) {
        _classCallCheck(this, Card);

        var _this = _possibleConstructorReturn(this, _React$Component.call(this, props, context));

        _this.state = {
            needMore: false,
            expand: false,
            contentHeight: 'auto'
        };
        return _this;
    }

    Card.prototype.componentDidMount = function componentDidMount() {
        this._setNeedMore();
        this._setBodyHeight();
    };

    Card.prototype.componentDidUpdate = function componentDidUpdate() {
        this._setBodyHeight();
    };

    Card.prototype.handleToggle = function handleToggle() {
        this.setState(function (prevState) {
            return {
                expand: !prevState.expand
            };
        });
    };

    // 是否展示 More 按钮


    Card.prototype._setNeedMore = function _setNeedMore() {
        var bodyHeight = this.props.bodyHeight;

        var contentHeight = this._getHeight(this.content);
        this.setState({
            needMore: bodyHeight !== 'auto' && contentHeight > bodyHeight
        });
    };

    // 设置 Body 的高度


    Card.prototype._setBodyHeight = function _setBodyHeight() {
        var contentHeight = this._getHeight(this.content);
        var expandBtnHeight = this._getHeight(this.expandBtn);
        var expandBtnPaddingTop = this._getPaddingTop(this.expandBtn);

        if (this.state.expand) {
            this.cardBody.style.height = contentHeight + expandBtnHeight + expandBtnPaddingTop + 'px';
        } else {
            this.cardBody.style.height = this.props.bodyHeight + 'px';
        }
    };

    Card.prototype._getHeight = function _getHeight(node) {
        if (node) {
            return node.offsetHeight;
        }
        return 0;
    };

    Card.prototype._getPaddingTop = function _getPaddingTop(node) {
        if (node && window && window.getComputedStyle) {
            return parseFloat(window.getComputedStyle(node).paddingTop);
        }
        return 0;
    };

    Card.prototype._cardBodyRefHandler = function _cardBodyRefHandler(ref) {
        this.cardBody = ref;
    };

    Card.prototype._contentRefHandler = function _contentRefHandler(ref) {
        this.content = ref;
    };

    Card.prototype._expandBtnRefHandler = function _expandBtnRefHandler(ref) {
        this.expandBtn = ref;
    };

    Card.prototype.render = function render() {
        var _classNames, _classNames2, _classNames3;

        var _props = this.props,
            className = _props.className,
            title = _props.title,
            subTitle = _props.subTitle,
            extra = _props.extra,
            titlePrefixLine = _props.titlePrefixLine,
            titleBottomLine = _props.titleBottomLine,
            children = _props.children,
            locale = _props.locale,
            others = _objectWithoutProperties(_props, ['className', 'title', 'subTitle', 'extra', 'titlePrefixLine', 'titleBottomLine', 'children', 'locale']);

        var prefix = this.context.prefix || this.props.prefix;
        var _state = this.state,
            needMore = _state.needMore,
            expand = _state.expand;


        var cardCls = (0, _classnames2['default'])((_classNames = {}, _defineProperty(_classNames, prefix + 'card', true), _defineProperty(_classNames, className, className), _classNames));

        var headCls = (0, _classnames2['default'])((_classNames2 = {}, _defineProperty(_classNames2, prefix + 'card-head', true), _defineProperty(_classNames2, prefix + 'card-head-prefix', titlePrefixLine), _classNames2));

        var bodyCls = (0, _classnames2['default'])((_classNames3 = {}, _defineProperty(_classNames3, prefix + 'card-body', true), _defineProperty(_classNames3, prefix + 'card-body-no-title', !title), _defineProperty(_classNames3, prefix + 'card-body-need-more', needMore), _defineProperty(_classNames3, 'expand', expand), _classNames3));

        return _react2['default'].createElement(
            'div',
            _extends({}, (0, _nextUtil.pickAttrs)(others), { className: cardCls }),
            title ? _react2['default'].createElement(
                'div',
                { className: headCls },
                _react2['default'].createElement(
                    'div',
                    { className: prefix + 'card-head-main' },
                    _react2['default'].createElement(
                        'span',
                        { className: prefix + 'card-title' },
                        title
                    ),
                    subTitle ? _react2['default'].createElement(
                        'span',
                        { className: prefix + 'card-sub-title' },
                        subTitle
                    ) : null,
                    extra ? _react2['default'].createElement(
                        'span',
                        { className: prefix + 'card-extra' },
                        extra
                    ) : null
                ),
                titleBottomLine ? _react2['default'].createElement('div', { className: prefix + 'card-head-divider' }) : null
            ) : null,
            _react2['default'].createElement(
                'div',
                { className: bodyCls, ref: this._cardBodyRefHandler.bind(this) },
                _react2['default'].createElement(
                    'div',
                    { className: prefix + 'card-content', ref: this._contentRefHandler.bind(this) },
                    children
                ),
                needMore ? _react2['default'].createElement(
                    'div',
                    { className: prefix + 'card-more-btn', ref: this._expandBtnRefHandler.bind(this), onClick: this.handleToggle.bind(this) },
                    _react2['default'].createElement(
                        'span',
                        null,
                        expand ? locale.lessBtn : locale.moreBtn,
                        ' ',
                        _react2['default'].createElement(_nextIcon2['default'], { type: 'arrow-down', size: 'xs', className: expand ? 'expand' : '' })
                    )
                ) : null
            )
        );
    };

    return Card;
}(_react2['default'].Component), _class.propTypes = {
    /**
     * 样式的品牌前缀
     */
    prefix: _propTypes2['default'].string,
    /**
     * 卡片的标题
     */
    title: _propTypes2['default'].node,
    /**
     * 卡片的副标题
     */
    subTitle: _propTypes2['default'].node,
    /**
     * 是否显示标题的前缀线
     */
    titlePrefixLine: _propTypes2['default'].bool,
    /**
     * 是否显示标题栏的下划线
     */
    titleBottomLine: _propTypes2['default'].bool, // TODO: 1.x change to `divider`
    /**
     * 内容区域的固定高度
     */
    bodyHeight: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].number]),
    /**
     * 标题区域的用户自定义内容
     */
    extra: _propTypes2['default'].node,
    /**
     * 自定义样式
     */
    className: _propTypes2['default'].string
}, _class.defaultProps = {
    prefix: 'next-',
    titlePrefixLine: true,
    titleBottomLine: true,
    bodyHeight: 120
}, _class.contextTypes = {
    prefix: _propTypes2['default'].string
}, _temp);
Card.displayName = 'Card';


var CardLocale = (0, _nextLocaleProvider2['default'])(Card);
CardLocale.LOCALE = _locale2['default'];

exports['default'] = CardLocale;
module.exports = exports['default'];