'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports['default'] = undefined;

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _nextDom = require('../../next-dom/lib/index.js');

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Children = _react2['default'].Children,
    place = _nextDom.position.place,
    noop = function noop() {};

/** Overlay.Position */
var Position = (_temp = _class = function (_React$Component) {
    _inherits(Position, _React$Component);

    function Position(props) {
        _classCallCheck(this, Position);

        var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

        ['resize', 'setPosition'].forEach(function (method) {
            _this[method] = _this[method].bind(_this);
        });
        return _this;
    }

    Position.prototype.resize = function resize() {
        var _this2 = this;

        if (this.resizeTimeout) {
            clearTimeout(this.resizeTimeout);
        }
        this.resizeTimeout = setTimeout(function () {
            _this2.setPosition();
        }, 200);
    };

    Position.prototype.render = function render() {
        var _classnames;

        var child = Children.only(this.props.children),
            propClassName = this.props.className,
            childClassName = child.props.className,
            className = (0, _classnames3['default'])((_classnames = {}, _defineProperty(_classnames, propClassName, propClassName), _defineProperty(_classnames, childClassName, childClassName), _classnames));

        return _react2['default'].cloneElement(child, {
            className: className
        });
    };

    Position.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        if ('align' in nextProps && nextProps.align !== this.props.align || nextProps.shouldUpdatePosition) {
            this.shouldUpdatePosition = true;
        }
    };

    Position.prototype.componentDidMount = function componentDidMount() {
        this.setPosition();
        if (this.props.needListenResize) {
            _nextDom.events.on(window, 'resize', this.resize);
        }
    };

    Position.prototype.componentWillUnmount = function componentWillUnmount() {
        if (this.props.needListenResize) {
            _nextDom.events.off(window, 'resize', this.resize);
        }
        if (this.resizeTimeout) {
            clearTimeout(this.resizeTimeout);
        }
    };

    Position.prototype.componentDidUpdate = function componentDidUpdate() {
        if (this.shouldUpdatePosition) {
            this.setPosition();
            this.shouldUpdatePosition = false;
        }
    };

    Position.prototype.setPosition = function setPosition() {
        var align = this.props.align,
            offset = this.props.offset,
            contentNode = this.getContentNode(),
            target = this.getTarget();

        this.props.beforePosition();
        if (target && contentNode) {
            var resultAlign = place(contentNode, target, align, offset, this.props.needAdjust, this.props.isRtl);
            var left = _nextDom.style.get(contentNode, 'left'),
                top = _nextDom.style.get(contentNode, 'top');

            this.props.onPosition({
                left: left,
                top: top,
                align: resultAlign.split(' ')
            }, contentNode);
        }
    };

    Position.prototype.getContentNode = function getContentNode() {
        return _reactDom2['default'].findDOMNode(this);
    };

    Position.prototype.getTarget = function getTarget() {
        var target = this.props.target;
        if (!target) {
            return null;
        }
        if (typeof target === 'function') {
            target = target(this.props);
        }
        if (typeof target === 'string' && target !== _nextDom.position.VIEWPORT) {
            target = document.getElementById(target);
        } else {
            try {
                target = _reactDom2['default'].findDOMNode(target);
            } catch (err) {
                // continue regardless of error
            }
        }
        return target;
    };

    return Position;
}(_react2['default'].Component), _class.propTypes = {
    /**
     * 自定义类名
     */
    className: _propTypes2['default'].string,
    children: _propTypes2['default'].any,
    /**
     * 定位参照的元素
     */
    target: _propTypes2['default'].any,
    /**
     * 定位的目标元素
     */
    contentNode: _propTypes2['default'].any,
    /**
     * 定位的方式, 详见开发指南的[定位部分](#定位)
     */
    align: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].bool]),
    /**
     * 相对于target定位的微调
     */
    offset: _propTypes2['default'].array,
    /**
     * 定位完成前触发的事件
     */
    beforePosition: _propTypes2['default'].func,
    /**
     * 定位完成后触发的事件
     * @param {Object} config 定位的参数
     * @param {Object} node 定位的元素
     */
    onPosition: _propTypes2['default'].func,
    /**
     * 是否自动调整定位的位置
     */
    needAdjust: _propTypes2['default'].bool,
    /**
     * 是否监听Resize事件
     */
    needListenResize: _propTypes2['default'].bool,
    /**
     * 强制更新定位信息
     */
    shouldUpdatePosition: _propTypes2['default'].bool,
    /**
     * 对齐方式
     */
    isRtl: _propTypes2['default'].bool
}, _class.defaultProps = {
    align: 'tl bl',
    offset: [0, 0],
    isRtl: false,
    beforePosition: noop,
    onPosition: noop,
    needAdjust: true,
    needListenResize: true,
    shouldUpdatePosition: false
}, _temp);
Position.displayName = 'Position';
exports['default'] = Position;


Position.VIEWPORT = _nextDom.position.VIEWPORT;
module.exports = exports['default'];