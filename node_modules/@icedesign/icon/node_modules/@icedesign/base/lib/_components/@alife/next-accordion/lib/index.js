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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _nextUtil = require('../../next-util/lib/index.js');

var _section = require('./accordion/section.js');

var _section2 = _interopRequireDefault(_section);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

/** Accordion */
var Accordion = (_temp = _class = function (_React$Component) {
    _inherits(Accordion, _React$Component);

    function Accordion(props, context) {
        _classCallCheck(this, Accordion);

        var _this = _possibleConstructorReturn(this, _React$Component.call(this, props, context));

        _this.trigger = _this.trigger.bind(_this);
        _this.useProp(_this.props, true);
        return _this;
    }

    Accordion.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        //只有传递数据模型时才接受改变
        this.useProp(nextProps);
    };

    Accordion.prototype.useProp = function useProp(props, initial) {
        var _this2 = this;

        var dataModel = void 0;
        var section = void 0;
        var expandedWarning = false;
        var multiTitleWarning = false;

        if (Array.isArray(props.dataSource)) {
            dataModel = true;
        } else {
            dataModel = false;
        }

        if (dataModel) {
            // 外部控制状态
            section = props.dataSource.map(function (e) {
                var expanded = e.expanded,
                    expand = e.expand,
                    mutliTitle = e.mutliTitle,
                    multiTitle = e.multiTitle,
                    title = e.title,
                    content = e.content,
                    disabled = e.disabled,
                    className = e.className,
                    style = e.style,
                    others = _objectWithoutProperties(e, ['expanded', 'expand', 'mutliTitle', 'multiTitle', 'title', 'content', 'disabled', 'className', 'style']);

                var _expanded = function () {
                    // expand -》 expanded。
                    var isExpanded = void 0;
                    if (expand !== undefined) {
                        expandedWarning = true;
                    }
                    if (expanded !== undefined) {
                        isExpanded = !!expanded;
                    } else if (expand !== undefined) {
                        isExpanded = !!expand;
                    } else {
                        isExpanded = !!expanded;
                    }
                    return isExpanded;
                }();

                var _multiTitle = function () {
                    // mutliTitle -》 multiTitle。
                    var isMultiTitle = void 0;
                    if (mutliTitle !== undefined) {
                        multiTitleWarning = true;
                    }
                    if (multiTitle !== undefined) {
                        isMultiTitle = !!multiTitle;
                    } else if (mutliTitle !== undefined) {
                        isMultiTitle = !!mutliTitle;
                    } else {
                        isMultiTitle = !!multiTitle;
                    }
                    return isMultiTitle;
                }();

                return _extends({
                    expanded: _expanded,
                    title: title,
                    children: content,
                    disabled: !!disabled,
                    multiTitle: _multiTitle,
                    className: className,
                    style: style
                }, others);
            });
        } else {
            section = _react2['default'].Children.map(props.children, function (e, index) {
                var _e$props = e.props,
                    expanded = _e$props.expanded,
                    expand = _e$props.expand,
                    mutliTitle = _e$props.mutliTitle,
                    multiTitle = _e$props.multiTitle,
                    title = _e$props.title,
                    children = _e$props.children,
                    disabled = _e$props.disabled,
                    className = _e$props.className,
                    style = _e$props.style,
                    others = _objectWithoutProperties(_e$props, ['expanded', 'expand', 'mutliTitle', 'multiTitle', 'title', 'children', 'disabled', 'className', 'style']);

                var _expanded = function () {
                    if (expand !== undefined) {
                        expandedWarning = true;
                    }
                    if (_this2.state && _this2.state.section && _this2.state.section[index]) {
                        // 内部维护状态，更新内容，不更新收起和打开状态
                        return _this2.state.section[index].expanded;
                    }
                    var isExpanded = void 0;
                    if (expanded !== undefined) {
                        // expand -》 expanded。
                        isExpanded = !!expanded;
                    } else if (expand !== undefined) {
                        isExpanded = !!expand;
                    } else {
                        isExpanded = !!expanded;
                    }
                    return isExpanded;
                }();

                var _multiTitle = function () {
                    // mutliTitle -》 multiTitle。
                    var isMultiTitle = void 0;
                    if (mutliTitle !== undefined) {
                        multiTitleWarning = true;
                    }
                    if (multiTitle !== undefined) {
                        isMultiTitle = !!multiTitle;
                    } else if (mutliTitle !== undefined) {
                        isMultiTitle = !!mutliTitle;
                    } else {
                        isMultiTitle = !!multiTitle;
                    }
                    return isMultiTitle;
                }();

                return _extends({
                    expanded: _expanded,
                    title: title,
                    children: children,
                    disabled: !!disabled,
                    multiTitle: _multiTitle,
                    className: className,
                    style: style
                }, others);
            });
        }

        if (initial) {
            this.state = {
                section: section,
                dataModel: dataModel
            };
        } else {
            this.setState({
                section: section,
                dataModel: dataModel
            });
        }

        if (expandedWarning) {
            // expand -》 expanded。
            _nextUtil.log.deprecated('expand', 'expanded', 'Accordion');
        }
        if (multiTitleWarning) {
            // mutliTitle -》 multiTitle。
            _nextUtil.log.deprecated('mutliTitle', 'multiTitle', 'Accordion');
        }
    };

    Accordion.prototype.singleCheck = function singleCheck(stateSection, index) {
        var _this3 = this;

        var section = stateSection.slice();

        if (this.props.single === true) {
            //固定单条显示
            section = section.map(function (suc, key) {
                var newSuc = function (o) {
                    //Object.assign不兼容ie9
                    for (var i in suc) {
                        if (!suc.hasOwnProperty(i)) {
                            continue;
                        }
                        o[i] = suc[i];
                    }
                    return o;
                }({});

                if (index === key) {
                    if (_this3.props.singleShrink === true) {
                        //设置这个属性单例子模式可收起全部
                        newSuc.expanded = !newSuc.expanded;
                    } else {
                        newSuc.expanded = true;
                    }
                } else {
                    newSuc.expanded = false;
                }
                return newSuc;
            });
        } else {
            //可以多条显示
            section = section.map(function (suc, key) {
                var newSuc = function (o) {
                    //Object.assign不兼容ie9
                    for (var i in suc) {
                        if (!suc.hasOwnProperty(i)) {
                            continue;
                        }
                        o[i] = suc[i];
                    }
                    return o;
                }({});
                if (index === key) {
                    newSuc.expanded = !newSuc.expanded;
                }
                return newSuc;
            });
        }

        return {
            section: section
        };
    };

    Accordion.prototype.trigger = function trigger(index) {
        var singleCheck = this.singleCheck(this.state.section, index);
        if (this.state.dataModel === false) {
            this.setState({
                section: singleCheck.section
            });
        }

        typeof this.props.onChange === 'function' && this.props.onChange(singleCheck.section.map(function (sec) {
            return sec.expanded;
        }), singleCheck.section);
    };

    Accordion.prototype.render = function render() {
        var _this4 = this;

        // 支持从context上获取prefix
        var prefix = this.context.prefix || this.props.prefix;

        return _react2['default'].createElement(
            'div',
            { className: (0, _classnames2['default'])(prefix + 'accordion', this.props.className), style: this.props.style },
            this.state.section.map(function (e, keys) {
                var title = e.title,
                    disabled = e.disabled,
                    expanded = e.expanded,
                    multiTitle = e.multiTitle,
                    className = e.className,
                    style = e.style,
                    children = e.children,
                    others = _objectWithoutProperties(e, ['title', 'disabled', 'expanded', 'multiTitle', 'className', 'style', 'children']);

                return _react2['default'].createElement(
                    _section2['default'],
                    _extends({
                        title: title,
                        disabled: !!disabled,
                        expanded: !!expanded,
                        trigger: _this4.trigger,
                        multiTitle: !!multiTitle,
                        key: keys,
                        index: keys,
                        className: className,
                        style: style,
                        prefix: prefix
                    }, others),
                    children
                );
            })
        );
    };

    return Accordion;
}(_react2['default'].Component), _class.propTypes = {
    /**
     * 样式前缀
     */
    prefix: _propTypes2['default'].string,
    /**
     * 组件接受行内样式
     */
    style: _propTypes2['default'].object,
    /**
     * 使用数据模型构建
     */
    dataSource: _propTypes2['default'].array,
    /**
     * 如果这个属性为true, 在single为true时, 组件可以收起全部子元素
     */
    singleShrink: _propTypes2['default'].bool,
    /**
     * 是否只能展开1个
     */
    single: _propTypes2['default'].bool,
    /**
     * 接收一个回调函数传递改变状态, 在使用dataSource时改回调需要产生改变组件才能生效
     */
    onChange: _propTypes2['default'].func,
    /**
     * 扩展class
     */
    className: _propTypes2['default'].string
}, _class.defaultProps = {
    single: false,
    prefix: 'next-'
}, _class.contextTypes = {
    prefix: _propTypes2['default'].string
}, _temp);
Accordion.displayName = 'Accordion';


Accordion.Panel = _react2['default'].Component;

exports['default'] = Accordion;
module.exports = exports['default'];