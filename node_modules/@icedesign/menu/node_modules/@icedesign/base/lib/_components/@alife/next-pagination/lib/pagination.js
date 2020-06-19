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

var _nextIcon = require('../../next-icon/lib/index.js');

var _nextIcon2 = _interopRequireDefault(_nextIcon);

var _nextButton = require('../../next-button/lib/index.js');

var _nextButton2 = _interopRequireDefault(_nextButton);

var _nextInput = require('../../next-input/lib/index.js');

var _nextInput2 = _interopRequireDefault(_nextInput);

var _nextSelect = require('../../next-select/lib/index.js');

var _nextSelect2 = _interopRequireDefault(_nextSelect);

var _nextMixinKeyBinder = require('../../next-mixin-key-binder/lib/index.js');

var _nextMixinKeyBinder2 = _interopRequireDefault(_nextMixinKeyBinder);

var _nextLocaleProvider = require('../../next-locale-provider/lib/index.js');

var _nextLocaleProvider2 = _interopRequireDefault(_nextLocaleProvider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var noop = function noop() {};

/**
 * Pagination
 */
var Pagination = (_temp = _class = function (_Component) {
    _inherits(Pagination, _Component);

    function Pagination(props, context) {
        _classCallCheck(this, Pagination);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

        var current = props.current,
            defaultCurrent = props.defaultCurrent,
            total = props.total,
            pageSize = props.pageSize;

        _this.state = {
            current: _this.correctCurrent(current || defaultCurrent, total, pageSize),
            currentPageSize: pageSize
        };
        _this.onJump = _this.onJump.bind(_this);
        _this.keyBinders = { enter: _this.onJump };
        return _this;
    }

    Pagination.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        var current = nextProps.current,
            total = nextProps.total,
            pageSize = nextProps.pageSize;


        var st = {};
        var newCurrent = this.correctCurrent(current || this.state.current, total, pageSize);
        if (this.state.current !== newCurrent) {
            st.current = newCurrent;
        }
        if (this.state.currentPageSize !== pageSize) {
            st.currentPageSize = pageSize;
        }

        if (Object.keys(st).length) {
            this.setState(st);
        }
    };

    Pagination.prototype.getPrefix = function getPrefix() {
        return this.context.prefix || this.props.prefix;
    };

    Pagination.prototype.correctCurrent = function correctCurrent(currentPage, total, currentPageSize) {
        var totalPage = this.getTotalPage(total, currentPageSize);
        return currentPage > totalPage ? totalPage : currentPage;
    };

    Pagination.prototype.getTotalPage = function getTotalPage(total, currentPageSize) {
        var totalPage = Math.ceil(total / currentPageSize);
        return totalPage <= 0 ? 1 : totalPage;
    };

    Pagination.prototype.onJump = function onJump(e) {
        var total = this.props.total;
        var _state = this.state,
            current = _state.current,
            currentPageSize = _state.currentPageSize;

        var totalPage = this.getTotalPage(total, currentPageSize);
        var value = parseInt(this.inputValue, 10);
        if (typeof value === 'number' && value >= 1 && value <= totalPage && value !== current) {
            this.onPageItemClick(value, e);
        }
    };

    Pagination.prototype.onPageItemClick = function onPageItemClick(page, e) {
        var _this2 = this;

        if (!('current' in this.props)) {
            this.setState({
                current: page
            }, function () {
                _this2.props.onChange(page, e);
            });
        } else {
            this.props.onChange(page, e);
        }
    };

    Pagination.prototype.onInputChange = function onInputChange(value) {
        this.inputValue = value;
    };

    Pagination.prototype.onSelectSize = function onSelectSize(pageSize) {
        var newState = {
            currentPageSize: pageSize
        };

        var totalPage = this.getTotalPage(this.props.total, pageSize);
        if (this.state.current > totalPage) {
            newState.current = totalPage;
        }

        this.setState(newState);
        this.props.onPageSizeChange(pageSize);
    };

    Pagination.prototype.renderPageItem = function renderPageItem(index) {
        var _cx;

        var prefix = this.getPrefix();
        var _props = this.props,
            size = _props.size,
            link = _props.link;
        var current = this.state.current;


        var isCurrent = parseInt(index, 10) === current;
        var props = {
            size: size,
            className: (0, _classnames2['default'])((_cx = {}, _defineProperty(_cx, prefix + 'pagination-item', true), _defineProperty(_cx, 'current', isCurrent), _cx)),
            onClick: isCurrent ? noop : this.onPageItemClick.bind(this, index)
        };
        if (link) {
            props.component = 'a';
            props.href = link.replace('{page}', index);
        }

        return _react2['default'].createElement(
            _nextButton2['default'],
            _extends({}, props, { key: index }),
            index
        );
    };

    Pagination.prototype.renderPageFirst = function renderPageFirst(current) {
        var _cx2;

        var prefix = this.getPrefix();
        var _props2 = this.props,
            size = _props2.size,
            shape = _props2.shape,
            locale = _props2.locale;


        var isFirst = current <= 1;
        var props = {
            disabled: isFirst,
            size: size,
            className: (0, _classnames2['default'])((_cx2 = {}, _defineProperty(_cx2, prefix + 'pagination-item', true), _defineProperty(_cx2, 'prev', true), _cx2)),
            onClick: this.onPageItemClick.bind(this, current - 1)
        };

        return _react2['default'].createElement(
            _nextButton2['default'],
            props,
            _react2['default'].createElement(_nextIcon2['default'], { type: 'arrow-left' }),
            shape === 'arrow-only' || shape === 'arrow-prev-only' || shape === 'no-border' ? '' : locale.prev
        );
    };

    Pagination.prototype.renderPageLast = function renderPageLast(current, totalPage) {
        var _cx3;

        var prefix = this.getPrefix();
        var _props3 = this.props,
            size = _props3.size,
            shape = _props3.shape,
            locale = _props3.locale;


        var isLast = current >= totalPage;
        var props = {
            disabled: isLast,
            size: size,
            className: (0, _classnames2['default'])((_cx3 = {}, _defineProperty(_cx3, prefix + 'pagination-item', true), _defineProperty(_cx3, 'next', true), _cx3)),
            onClick: this.onPageItemClick.bind(this, current + 1)
        };

        return _react2['default'].createElement(
            _nextButton2['default'],
            props,
            shape === 'arrow-only' || shape === 'no-border' ? '' : locale.next,
            _react2['default'].createElement(_nextIcon2['default'], { type: 'arrow-right' })
        );
    };

    Pagination.prototype.renderPageEllipsis = function renderPageEllipsis(idx) {
        var prefix = this.getPrefix();

        return _react2['default'].createElement(
            'span',
            { className: prefix + 'pagination-ellipsis', key: 'ellipsis-' + idx },
            '...'
        );
    };

    Pagination.prototype.renderPageJump = function renderPageJump() {
        var prefix = this.getPrefix();
        var _props4 = this.props,
            size = _props4.size,
            locale = _props4.locale;


        var boundInput = this.getKeyBinderElement(_react2['default'].createElement(_nextInput2['default'], { type: 'text', size: size, onChange: this.onInputChange.bind(this) }));

        return _react2['default'].createElement(
            'div',
            { className: prefix + 'pagination-jump' },
            _react2['default'].createElement(
                'span',
                null,
                locale.goTo
            ),
            boundInput,
            _react2['default'].createElement(
                'span',
                null,
                locale.page
            ),
            _react2['default'].createElement(
                _nextButton2['default'],
                { size: size, className: prefix + 'pagination-go', onClick: this.onJump },
                locale.go
            )
        );
    };

    Pagination.prototype.renderPageDisplay = function renderPageDisplay(current, totalPage) {
        var prefix = this.getPrefix();

        return _react2['default'].createElement(
            'span',
            { className: prefix + 'pagination-display' },
            _react2['default'].createElement(
                'em',
                null,
                current
            ),
            '/',
            totalPage
        );
    };

    Pagination.prototype.renderPageList = function renderPageList(current, totalPage) {
        var prefix = this.getPrefix();
        var pageShowCount = this.props.pageShowCount;


        var pages = [];

        if (totalPage <= pageShowCount) {
            for (var i = 1; i <= totalPage; i++) {
                pages.push(this.renderPageItem(i));
            }
        } else {
            // 除去第一页，最后一页以及当前页，剩下的页数
            var othersCount = pageShowCount - 3;
            var halfCount = parseInt(othersCount / 2, 10);
            var start = void 0,
                end = void 0;

            pages.push(this.renderPageItem(1));

            start = current - halfCount;
            end = current + halfCount;
            if (start <= 1) {
                start = 2;
                end = start + othersCount;
            }
            if (start > 2) {
                pages.push(this.renderPageEllipsis(1));
            }
            if (end >= totalPage - 1) {
                end = totalPage - 1;
                start = totalPage - 1 - othersCount;
            }
            for (var j = start; j <= end; j++) {
                pages.push(this.renderPageItem(j));
            }
            if (end < totalPage - 1) {
                pages.push(this.renderPageEllipsis(2));
            }

            pages.push(this.renderPageItem(totalPage));
        }

        return _react2['default'].createElement(
            'div',
            { className: prefix + 'pagination-list' },
            pages
        );
    };

    Pagination.prototype.renderPageSizeSelector = function renderPageSizeSelector() {
        var prefix = this.getPrefix();
        var _props5 = this.props,
            pageSizeSelector = _props5.pageSizeSelector,
            locale = _props5.locale;

        var pageSizeSpan = _react2['default'].createElement(
            'span',
            { className: prefix + 'pagination-size-selector-title' },
            locale.pageSize
        );

        switch (pageSizeSelector) {
            case 'filter':
                return _react2['default'].createElement(
                    'div',
                    { className: prefix + 'pagination-size-selector' },
                    pageSizeSpan,
                    this.renderPageSizeFilter()
                );
            case 'dropdown':
                return _react2['default'].createElement(
                    'div',
                    { className: prefix + 'pagination-size-selector' },
                    pageSizeSpan,
                    this.renderPageSizeDropdown()
                );
            default:
                return null;
        }
    };

    Pagination.prototype.renderPageSizeFilter = function renderPageSizeFilter() {
        var _this3 = this;

        var prefix = this.getPrefix();
        var _props6 = this.props,
            size = _props6.size,
            pageSizeList = _props6.pageSizeList;
        var currentPageSize = this.state.currentPageSize;


        return _react2['default'].createElement(
            'div',
            { className: prefix + 'pagination-size-selector-filter' },
            pageSizeList.map(function (pageSize, index) {
                var _cx4;

                var classes = (0, _classnames2['default'])((_cx4 = {}, _defineProperty(_cx4, prefix + 'pagination-size-selector-btn', true), _defineProperty(_cx4, 'current', pageSize === currentPageSize), _cx4));

                return _react2['default'].createElement(
                    _nextButton2['default'],
                    { key: index,
                        shape: 'text',
                        size: size,
                        className: classes,
                        onClick: pageSize !== currentPageSize ? _this3.onSelectSize.bind(_this3, pageSize) : null },
                    pageSize
                );
            })
        );
    };

    Pagination.prototype.renderPageSizeDropdown = function renderPageSizeDropdown() {
        var prefix = this.getPrefix();
        var _props7 = this.props,
            size = _props7.size,
            pageSizeList = _props7.pageSizeList;
        var currentPageSize = this.state.currentPageSize;


        return _react2['default'].createElement(
            _nextSelect2['default'],
            { className: prefix + 'pagination-size-selector-dropdown',
                size: size,
                value: currentPageSize,
                onChange: this.onSelectSize.bind(this) },
            pageSizeList.map(function (pageSize, index) {
                return _react2['default'].createElement(
                    _nextSelect.Option,
                    { key: index, value: pageSize },
                    pageSize
                );
            })
        );
    };

    Pagination.prototype.render = function render() {
        var _cx5;

        /* eslint-disable no-unused-vars */
        var prefix = this.getPrefix();

        var _props8 = this.props,
            propsPrefix = _props8.prefix,
            type = _props8.type,
            size = _props8.size,
            shape = _props8.shape,
            className = _props8.className,
            total = _props8.total,
            pageSize = _props8.pageSize,
            pageSizeSelector = _props8.pageSizeSelector,
            pageSizeList = _props8.pageSizeList,
            pageSizePosition = _props8.pageSizePosition,
            onPageSizeChange = _props8.onPageSizeChange,
            hideOnlyOnePage = _props8.hideOnlyOnePage,
            showJump = _props8.showJump,
            locale = _props8.locale,
            current = _props8.current,
            defaultCurrent = _props8.defaultCurrent,
            pageShowCount = _props8.pageShowCount,
            link = _props8.link,
            language = _props8.language,
            onChange = _props8.onChange,
            others = _objectWithoutProperties(_props8, ['prefix', 'type', 'size', 'shape', 'className', 'total', 'pageSize', 'pageSizeSelector', 'pageSizeList', 'pageSizePosition', 'onPageSizeChange', 'hideOnlyOnePage', 'showJump', 'locale', 'current', 'defaultCurrent', 'pageShowCount', 'link', 'language', 'onChange']);
        /* eslint-enable */


        var _state2 = this.state,
            currentPage = _state2.current,
            currentPageSize = _state2.currentPageSize;

        var totalPage = this.getTotalPage(total, currentPageSize);
        var pageFirst = this.renderPageFirst(currentPage);
        var pageLast = this.renderPageLast(currentPage, totalPage);
        var sizeSelector = this.renderPageSizeSelector();
        var isStart = pageSizePosition === 'start';

        var classes = (0, _classnames2['default'])((_cx5 = {}, _defineProperty(_cx5, prefix + 'pagination', true), _defineProperty(_cx5, prefix + 'pagination-' + type, type), _defineProperty(_cx5, prefix + 'pagination-' + shape, shape), _defineProperty(_cx5, prefix + 'pagination-' + size, size), _defineProperty(_cx5, size, size), _defineProperty(_cx5, 'start', !!pageSizeSelector && isStart), _defineProperty(_cx5, 'end', !!pageSizeSelector && !isStart), _defineProperty(_cx5, 'hide', totalPage <= 1 && hideOnlyOnePage), _defineProperty(_cx5, className, !!className), _cx5));

        var buildComponent = function buildComponent() {
            for (var _len = arguments.length, coms = Array(_len), _key = 0; _key < _len; _key++) {
                coms[_key] = arguments[_key];
            }

            return _react2['default'].createElement(
                'div',
                _extends({ className: classes }, others),
                isStart && sizeSelector,
                _react2['default'].createElement(
                    'div',
                    { className: prefix + 'pagination-pages' },
                    coms.map(function (com, index) {
                        return com && _react2['default'].cloneElement(com, { key: index });
                    })
                ),
                !isStart && sizeSelector
            );
        };

        switch (type) {
            case 'mini':
                return buildComponent(pageFirst, pageLast);
            case 'simple':
                {
                    var pageDisplay = this.renderPageDisplay(currentPage, totalPage);
                    return buildComponent(pageFirst, pageDisplay, pageLast);
                }
            case 'normal':
                {
                    var pageList = this.renderPageList(currentPage, totalPage);
                    var _pageDisplay = showJump && totalPage > 5 ? this.renderPageDisplay(currentPage, totalPage) : null;
                    var pageJump = showJump && totalPage > 5 ? this.renderPageJump(currentPage, totalPage) : null;
                    return buildComponent(pageFirst, pageList, pageLast, _pageDisplay, pageJump);
                }
            default:
                return null;
        }
    };

    return Pagination;
}(_react.Component), _class.contextTypes = {
    prefix: _propTypes2['default'].string
}, _class.propTypes = {
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
     * 分页组件类型
     */
    type: _propTypes2['default'].oneOf(['normal', 'simple', 'mini']),
    /**
     * 前进后退按钮样式
     */
    shape: _propTypes2['default'].oneOf(['normal', 'arrow-only', 'arrow-prev-only', 'no-border']),
    /**
     * 分页组件大小
     */
    size: _propTypes2['default'].oneOf(['small', 'medium', 'large']),
    /**
     * （受控）当前页码
     */
    current: _propTypes2['default'].number,
    /**
     * （非受控）初始页码
     */
    defaultCurrent: _propTypes2['default'].number,
    /**
     * 页码发生改变时的回调函数
     * @param {Number} current 改变后的页码数
     * @param {Object} e 点击事件对象
     */
    onChange: _propTypes2['default'].func,
    /**
     * 总记录数
     */
    total: _propTypes2['default'].number,
    /**
     * 页码显示的数量，更多的使用...代替
     */
    pageShowCount: _propTypes2['default'].number,
    /**
     * 一页中的记录数
     */
    pageSize: _propTypes2['default'].number,
    /**
     * 每页显示记录数量选择器类型
     */
    pageSizeSelector: _propTypes2['default'].oneOf([false, 'filter', 'dropdown']),
    /**
     * 每页显示记录数量选择器可选值
     */
    pageSizeList: _propTypes2['default'].arrayOf(_propTypes2['default'].number),
    /**
     * 每页显示记录数量选择器在组件中的位置
     */
    pageSizePosition: _propTypes2['default'].oneOf(['start', 'end']),
    /**
     * 每页显示记录数量改变时的回调函数
     * @param {Number} pageSize 改变后的每页显示记录数
     */
    onPageSizeChange: _propTypes2['default'].func,
    /**
     * 当分页数为1时，是否隐藏分页器
     */
    hideOnlyOnePage: _propTypes2['default'].bool,
    /**
     * type 设置为 normal 时，在页码数超过5页后，会显示跳转输入框与按钮，当设置 showJump 为 false 时，不再显示该跳转区域
     */
    showJump: _propTypes2['default'].bool,
    /**
     * 设置页码按钮的跳转链接，它的值为一个包含 {page} 的模版字符串，如：http://xxx.com/{page}
     */
    link: _propTypes2['default'].string,
    /**
     * 自定义国际化文案对象
     */
    locale: _propTypes2['default'].object,
    /**
     * 自定义国际化语言
     */
    language: _propTypes2['default'].oneOf(['zh-cn', 'en-us', 'zh-tw'])
}, _class.defaultProps = {
    prefix: 'next-',
    type: 'normal',
    shape: 'normal',
    size: 'medium',
    defaultCurrent: 1,
    onChange: noop,
    pageSize: 10,
    pageSizeSelector: false,
    pageSizeList: [5, 10, 20],
    pageSizePosition: 'start',
    onPageSizeChange: noop,
    total: 100,
    pageShowCount: 5,
    hideOnlyOnePage: false,
    showJump: true
}, _temp);
Pagination.displayName = 'Pagination';


Object.keys(_nextMixinKeyBinder2['default']).forEach(function (key) {
    Pagination.prototype[key] = _nextMixinKeyBinder2['default'][key];
});

exports['default'] = (0, _nextLocaleProvider2['default'])(Pagination);
module.exports = exports['default'];