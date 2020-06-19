'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports['default'] = undefined;

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

/** Timeline */
var Timeline = (_temp = _class = function (_Component) {
    _inherits(Timeline, _Component);

    function Timeline(props, context) {
        _classCallCheck(this, Timeline);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

        _this.state = {
            fold: props.fold
        };
        return _this;
    }

    Timeline.prototype.componentWillReceiveProps = function componentWillReceiveProps(newProps) {
        this.setState({ fold: newProps.fold });
    };

    Timeline.prototype.toggleFold = function toggleFold(folderIndex, total) {
        var fold = this.state.fold;


        if (folderIndex) {
            for (var i = 0; i < fold.length; i++) {
                var _fold$i = fold[i],
                    foldArea = _fold$i.foldArea,
                    foldShow = _fold$i.foldShow;


                if (foldArea[1] && folderIndex === foldArea[1] || !foldArea[1] && folderIndex === total - 1) {
                    fold[i].foldShow = !foldShow;
                }
            }

            this.setState({ fold: fold });
        }
    };

    Timeline.prototype.render = function render() {
        var _this2 = this,
            _classNames;

        var _props = this.props,
            className = _props.className,
            children = _props.children;

        var prefix = this.context.prefix || this.props.prefix;
        var fold = this.state.fold;

        // 修改子节点属性

        var childrenCount = _react2['default'].Children.count(children);
        var cloneChildren = _react.Children.map(children, function (child, i) {
            var ref = 'timeline-item-' + i.toString();
            var folderIndex = null;
            var foldNodeShow = false;

            fold.forEach(function (item) {
                var foldArea = item.foldArea,
                    foldShow = item.foldShow;


                if (foldArea[0] && i >= foldArea[0] && (i <= foldArea[1] || !foldArea[1])) {
                    folderIndex = foldArea[1] || childrenCount - 1;
                    foldNodeShow = foldShow;
                }
            });

            return _react2['default'].cloneElement(child, {
                prefix: prefix,
                ref: ref,
                total: childrenCount,
                index: i,
                folderIndex: folderIndex,
                foldShow: foldNodeShow,
                toggleFold: folderIndex === i ? _this2.toggleFold.bind(_this2, folderIndex, childrenCount) : function () {}
            });
        });

        var timelineCls = (0, _classnames2['default'])((_classNames = {}, _defineProperty(_classNames, prefix + 'timeline', true), _defineProperty(_classNames, className, className), _classNames));

        return _react2['default'].createElement(
            'ul',
            { className: timelineCls },
            cloneChildren
        );
    };

    return Timeline;
}(_react.Component), _class.propTypes = {
    /**
     * 样式的品牌前缀
     */
    prefix: _propTypes2['default'].string,
    /**
     * 自定义折叠选项 示例`[{foldArea: [startIndex, endIndex], foldShow: boolean}]`
     */
    fold: _propTypes2['default'].array,
    /**
     * 自定义类名
     */
    className: _propTypes2['default'].string,
    children: _propTypes2['default'].any
}, _class.defaultProps = {
    prefix: 'next-',
    fold: []
}, _class.contextTypes = {
    prefix: _propTypes2['default'].string
}, _temp);
Timeline.displayName = 'Timeline';
exports['default'] = Timeline;
module.exports = exports['default'];