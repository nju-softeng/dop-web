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

var _nextIcon = require('../../../next-icon/lib/index.js');

var _nextIcon2 = _interopRequireDefault(_nextIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

/** Timeline.Item */
var TimelineItem = (_temp = _class = function (_Component) {
    _inherits(TimelineItem, _Component);

    function TimelineItem() {
        _classCallCheck(this, TimelineItem);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    TimelineItem.prototype.toggleFold = function toggleFold(folderIndex) {
        this.props.toggleFold(folderIndex);
    };

    TimelineItem.prototype.render = function render() {
        var _classNames;

        var _props = this.props,
            prefix = _props.prefix,
            className = _props.className,
            state = _props.state,
            icon = _props.icon,
            time = _props.time,
            title = _props.title,
            content = _props.content,
            index = _props.index,
            total = _props.total,
            folderIndex = _props.folderIndex,
            foldShow = _props.foldShow;


        var itemCls = (0, _classnames2['default'])((_classNames = {}, _defineProperty(_classNames, prefix + 'timeline-item', true), _defineProperty(_classNames, prefix + 'timeline-item-first', index === 0), _defineProperty(_classNames, prefix + 'timeline-item-last', index === total - 1), _defineProperty(_classNames, prefix + 'timeline-item-' + state, state), _defineProperty(_classNames, prefix + 'timeline-item-folded', folderIndex), _defineProperty(_classNames, prefix + 'timeline-item-unfolded', foldShow), _defineProperty(_classNames, 'className', className), _classNames));

        return _react2['default'].createElement(
            'li',
            null,
            _react2['default'].createElement(
                'div',
                { className: itemCls, ref: 'timeline-item' },
                _react2['default'].createElement(
                    'div',
                    { className: prefix + 'timeline-item-timeline' },
                    _react2['default'].createElement(
                        'div',
                        { className: prefix + 'timeline-item-tail' },
                        _react2['default'].createElement('i', null)
                    ),
                    _react2['default'].createElement(
                        'div',
                        { className: prefix + 'timeline-item-node' },
                        icon ? _react2['default'].createElement(
                            'span',
                            { className: prefix + 'timeline-item-icon' },
                            _react2['default'].createElement(_nextIcon2['default'], { type: icon, size: 'xs' })
                        ) : _react2['default'].createElement('span', { className: prefix + 'timeline-item-dot' })
                    )
                ),
                _react2['default'].createElement(
                    'div',
                    { className: prefix + 'timeline-item-content' },
                    _react2['default'].createElement(
                        'div',
                        { className: prefix + 'timeline-item-title' },
                        title
                    ),
                    _react2['default'].createElement(
                        'div',
                        { className: prefix + 'timeline-item-body' },
                        content
                    ),
                    _react2['default'].createElement(
                        'div',
                        { className: prefix + 'timeline-item-time' },
                        time
                    )
                )
            ),
            folderIndex === index ? _react2['default'].createElement(
                'div',
                { className: prefix + 'timeline-item-folder' },
                _react2['default'].createElement(
                    'a',
                    { className: prefix + 'timeline-item-folder-trigger', onClick: this.toggleFold.bind(this, folderIndex, total) },
                    foldShow ? _react2['default'].createElement(
                        'span',
                        null,
                        '\u6536\u8D77 ',
                        _react2['default'].createElement(_nextIcon2['default'], { type: 'arrow-up', size: 'xs' })
                    ) : _react2['default'].createElement(
                        'span',
                        null,
                        '\u5C55\u5F00 ',
                        _react2['default'].createElement(_nextIcon2['default'], { type: 'arrow-down', size: 'xs' })
                    )
                )
            ) : null
        );
    };

    return TimelineItem;
}(_react.Component), _class.propTypes = {
    prefix: _propTypes2['default'].string,
    index: _propTypes2['default'].number,
    total: _propTypes2['default'].number,
    folderIndex: _propTypes2['default'].number,
    foldShow: _propTypes2['default'].bool,
    /**
     * 节点状态
     */
    state: _propTypes2['default'].oneOf(['done', 'process', 'error', 'success']),
    /**
     * 图标
     */
    icon: _propTypes2['default'].string,
    /**
     * 格式化后的时间
     */
    time: _propTypes2['default'].node,
    /**
     * 标题
     */
    title: _propTypes2['default'].node,
    /**
     * 内容
     */
    content: _propTypes2['default'].node,
    toggleFold: _propTypes2['default'].func,
    className: _propTypes2['default'].string
}, _class.defaultProps = {
    prefix: 'next-',
    state: 'done',
    toggleFold: function toggleFold() {}
}, _temp);
TimelineItem.displayName = 'TimelineItem';
exports['default'] = TimelineItem;
module.exports = exports['default'];