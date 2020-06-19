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

var _nextUtil = require('../../../next-util/lib/index.js');

var _nextDom = require('../../../next-dom/lib/index.js');

var _nextIcon = require('../../../next-icon/lib/index.js');

var _nextIcon2 = _interopRequireDefault(_nextIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

/** Step */
var Step = (_temp = _class = function (_Component) {
    _inherits(Step, _Component);

    function Step(props, context) {
        _classCallCheck(this, Step);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

        _this.state = {
            parentWidth: 'auto',
            parentHeight: 'auto'
        };
        _this.resize = _this.resize.bind(_this);
        return _this;
    }

    Step.prototype.componentDidMount = function componentDidMount() {
        /* istanbul ignore if */
        if (!_nextUtil.support.flex) {
            this.resize();
            _nextDom.events.on(window, 'resize', this.resize);
        }
    };

    Step.prototype.componentWillReceiveProps = function componentWillReceiveProps(newProps) {
        if ('current' in newProps) {
            this.setState({
                current: newProps.current
            });
        }
    };

    Step.prototype.componentWillUnmount = function componentWillUnmount() {
        /* istanbul ignore if */
        if (!_nextUtil.support.flex) {
            _nextDom.events.off(window, 'resize', this.resize);
        }
    };

    Step.prototype.resize = function resize() {
        if (this.step) {
            this.setState({
                parentWidth: this.step.offsetWidth || 0,
                parentHeight: this.step.offsetHeight || 0
            });
        }
    };

    Step.prototype._getValidChildren = function _getValidChildren(children) {
        var result = [];
        _react2['default'].Children.forEach(children, function (child) {
            if (_react2['default'].isValidElement(child)) {
                result.push(child);
            }
        });
        return result;
    };

    Step.prototype._stepRefHandler = function _stepRefHandler(ref) {
        this.step = ref;
    };

    Step.prototype.render = function render() {
        var _classNames;

        /* eslint-disable prefer-const */
        var _props = this.props,
            className = _props.className,
            current = _props.current,
            direction = _props.direction,
            type = _props.type,
            children = _props.children,
            readOnly = _props.readOnly,
            animation = _props.animation,
            others = _objectWithoutProperties(_props, ['className', 'current', 'direction', 'type', 'children', 'readOnly', 'animation']);

        var prefix = this.context.prefix || this.props.prefix;
        var _state = this.state,
            parentWidth = _state.parentWidth,
            parentHeight = _state.parentHeight;

        // type不同对应的direction不同

        direction = type === 'arrow' ? 'horizontal' : direction;

        // children去除null
        children = this._getValidChildren(children);

        // 修改子节点属性
        var cloneChildren = _react.Children.map(children, function (child, index) {
            var status = index < current ? 'finish' : index === current ? 'process' : 'wait';

            return _react2['default'].cloneElement(child, {
                prefix: prefix,
                key: index,
                index: index,
                total: children.length,
                status: child.props.status || status,
                type: type,
                direction: direction,
                parentWidth: parentWidth,
                parentHeight: parentHeight,
                readOnly: readOnly,
                animation: animation
            });
        });

        var stepCls = (0, _classnames2['default'])((_classNames = {}, _defineProperty(_classNames, prefix + 'step', true), _defineProperty(_classNames, prefix + 'step-' + type, type), _defineProperty(_classNames, prefix + 'step-' + direction, direction), _defineProperty(_classNames, className, className), _classNames));

        return _react2['default'].createElement(
            'div',
            _extends({}, (0, _nextUtil.pickAttrs)(others), { className: stepCls, ref: this._stepRefHandler.bind(this) }),
            cloneChildren
        );
    };

    return Step;
}(_react.Component), _class.propTypes = {
    /**
     * 样式的品牌前缀
     */
    prefix: _propTypes2['default'].string,
    /**
     * 当前步骤
     */
    current: _propTypes2['default'].number,
    /**
     * 展示方向
     */
    direction: _propTypes2['default'].oneOf(['horizontal', 'vertical']),
    /**
     * 类型
     */
    type: _propTypes2['default'].oneOf(['circle', 'arrow', 'dot']),
    /**
     * 是否只读模式
     */
    readOnly: _propTypes2['default'].bool,
    /**
     * 是否开启动效
     */
    animation: _propTypes2['default'].bool,
    /**
     * 自定义样式名
     */
    className: _propTypes2['default'].string
}, _class.defaultProps = {
    prefix: 'next-',
    current: 0,
    direction: 'horizontal',
    type: 'circle',
    animation: true
}, _class.contextTypes = {
    prefix: _propTypes2['default'].string
}, _temp);
Step.displayName = 'Step';
exports['default'] = Step;
module.exports = exports['default'];