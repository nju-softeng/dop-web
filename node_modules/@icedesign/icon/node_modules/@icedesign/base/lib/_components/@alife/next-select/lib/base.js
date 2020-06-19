'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp; /* eslint-disable react/prop-types, no-unused-vars, eqeqeq, prefer-const */


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _nextMenu = require('../../next-menu/lib/index.js');

var _nextMenu2 = _interopRequireDefault(_nextMenu);

var _nextInput = require('../../next-input/lib/index.js');

var _nextInput2 = _interopRequireDefault(_nextInput);

var _nextIcon = require('../../next-icon/lib/index.js');

var _nextIcon2 = _interopRequireDefault(_nextIcon);

var _nextDom = require('../../next-dom/lib/index.js');

var _nextUtil = require('../../next-util/lib/index.js');

var _optionGroup = require('./option-group.js');

var _optionGroup2 = _interopRequireDefault(_optionGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var stopPropagation = function stopPropagation(e) {
    e.stopPropagation();
};

var escape = function escape(s) {
    return s.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
};

var Base = (_temp = _class = function (_Component) {
    _inherits(Base, _Component);

    function Base(props, context) {
        _classCallCheck(this, Base);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

        var value = 'value' in props ? props.value : props.defaultValue;
        _this.state = {
            value: _this.normalizeValue(value),
            visible: props.visible || props.defaultVisible
        };
        _this._cache = {};

        ['afterOpen', 'onSelect', 'onInputSearch', 'onSearch'].forEach(function (method) {
            _this[method] = _this[method].bind(_this);
        });
        _this.cacheDataByValue(_this.state.value);
        _this.oldValue = value;
        return _this;
    }

    Base.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        var value = void 0;
        if ('value' in nextProps) {
            value = this.normalizeValue(nextProps.value);
            this.setState({
                value: value
            });
            this.oldValue = nextProps.value;
        }
        if ('visible' in nextProps) {
            this.setState({
                visible: nextProps.visible
            });
        }
    };

    Base.prototype.componentDidUpdate = function componentDidUpdate() {
        if (!this.state.visible && this.props.filterLocal) {
            this.filterValue = '';
        }
    };

    Base.prototype.getPrefix = function getPrefix() {
        return this.context.prefix || this.props.prefix;
    };

    Base.prototype._syncWidth = function _syncWidth(menu) {
        var autoWidth = this.props.autoWidth;

        var select = (0, _reactDom.findDOMNode)(this);
        menu = (0, _reactDom.findDOMNode)(menu);
        if (menu && autoWidth) {
            var width = select.offsetWidth;
            _nextDom.style.set(menu, 'width', width + 'px');
            //We need reposition menu after sync width.
            this.forceUpdate();
        }
    };

    Base.prototype.normalizeValue = function normalizeValue(value) {
        if (!Array.isArray(value)) {
            value = [value];
        }
        value = value.filter(function (v) {
            return v != null;
        }).map(function (v) {
            if (_nextUtil.obj.isPlainObject(v)) {
                return v;
            }
            return v.toString ? v.toString() : v;
        });
        return value;
    };

    Base.prototype.renderMenu = function renderMenu() {
        var _this2 = this;

        var dataSource = this.getFilteredDataSource(),
            flatternDataSource = this.getFlatternDataSource(dataSource),
            children = this.renderMenuContent(dataSource),
            showSearch = this.props.showSearch,
            header = void 0,
            currentKeys = this.state.value,
            focusedKeys = flatternDataSource.filter(function (item) {
            return _this2.state.value.indexOf(item.__key) > -1;
        }).map(function (item) {
            return item.__key;
        }),
            focusedKey = void 0;


        if (showSearch) {
            header = _react2['default'].createElement(
                'div',
                { className: this.getPrefix() + 'select-search' },
                _react2['default'].createElement(_nextInput2['default'], { onFocus: stopPropagation,
                    defaultValue: this.filterValue,
                    onChange: this.onInputSearch,
                    onSelect: stopPropagation,
                    onKeyDown: stopPropagation }),
                _react2['default'].createElement(_nextIcon2['default'], { type: 'search', size: 'small' })
            );
        }

        focusedKey = this.lastFocusedKey;

        if (!focusedKey) {
            focusedKey = focusedKeys[focusedKeys.length - 1];
        }

        if (!focusedKey && flatternDataSource.length) {
            focusedKey = flatternDataSource[0].value;
        }

        return _react2['default'].createElement(
            _nextMenu2['default'],
            { selectedKeys: currentKeys,
                focusedKey: focusedKey,
                header: header,
                selectMode: this.props.multiple ? 'multiple' : 'single',
                onSelect: this.onSelect,
                autoFocus: !showSearch,
                className: this.getPrefix() + 'select-menu ' + (showSearch ? 'has-search' : ''),
                ref: 'menu' },
            children
        );
    };

    Base.prototype.renderMenuContent = function renderMenuContent(dataSource) {
        var _this3 = this;

        return dataSource.map(function (option, index) {
            return _this3.renderMenuItem(option, index);
        });
    };

    Base.prototype.renderMenuItem = function renderMenuItem(option, i) {
        var label = option.label,
            children = option.children,
            __key = option.__key,
            index = option.index,
            others = _objectWithoutProperties(option, ['label', 'children', '__key', 'index']);

        if (children) {
            return _react2['default'].createElement(
                _nextMenu2['default'].Group,
                _extends({}, others, { label: label, key: i }),
                this.renderMenuContent(children)
            );
        } else {
            return _react2['default'].createElement(
                _nextMenu2['default'].Item,
                _extends({}, others, { key: __key }),
                label
            );
        }
    };

    // 获取的是结构化数据源


    Base.prototype.getDataSource = function getDataSource(props) {
        var dataSource = void 0;
        props = props || this.props;
        if (props.children) {
            dataSource = this.structorChildren(props.children);
        } else {
            dataSource = this.normalizeDataSource(props.dataSource);
        }
        return dataSource;
    };

    Base.prototype.structorChildren = function structorChildren(content) {
        var loop = function loop(children) {
            var result = [];
            _react.Children.map(children, function (child, index) {
                var props = _extends({}, child.props),
                    children = [];
                if (child.type === _optionGroup2['default']) {
                    children = loop(props.children);
                    props.children = children;
                } else {
                    props.label = props.children;
                    delete props.children;
                }
                props.__key = props.value != null ? props.value.toString() : props.value;
                result.push(props);
            });
            return result;
        };
        return loop(content);
    };

    // 抹平结构化数据源


    Base.prototype.getFlatternDataSource = function getFlatternDataSource(dataSource) {
        var flatternDataSource = [];
        loop(dataSource, function (option) {
            flatternDataSource.push(option);
        });
        return flatternDataSource;
    };

    // 使用抹平后的数据源进行过滤
    // 但是依然要返回结构化数据


    Base.prototype.getFilteredDataSource = function getFilteredDataSource() {
        var _this4 = this;

        var dataSource = this.getDataSource(),
            filterLocal = this.props.filterLocal,
            result = [];


        if (this.filterValue && filterLocal) {
            loop(dataSource, function (option, index, parentIndex) {
                var filterBy = _this4.props.filterBy;
                if (!filterBy) {
                    filterBy = _this4.filterBy;
                }
                if (filterBy(_this4.filterValue, option)) {
                    if (typeof parentIndex !== 'undefined') {
                        if (!result[parentIndex]) {
                            var _dataSource$parentInd = dataSource[parentIndex],
                                children = _dataSource$parentInd.children,
                                others = _objectWithoutProperties(_dataSource$parentInd, ['children']);

                            result[parentIndex] = others;
                        }
                        result[parentIndex].children = result[parentIndex].children || [];
                        result[parentIndex].children.push(option);
                    } else {
                        result.push(option);
                    }
                }
            });
        } else {
            result = dataSource;
        }
        return result;
    };

    Base.prototype.normalizeDataSource = function normalizeDataSource(dataSource) {
        dataSource = dataSource || [];
        return dataSource.map(function (option, index) {
            if (!_nextUtil.obj.isPlainObject(option)) {
                return {
                    label: option,
                    value: option,
                    __key: option
                };
            } else {
                /* eslint-disable eqeqeq */
                option.__key = option.value != null ? option.value.toString() : option.value;
                if (option.children) {
                    option.children.forEach(function (item, j) {
                        item.__key = item.value.toString();
                    });
                }
                return option;
            }
        });
    };

    Base.prototype.cacheDataByValue = function cacheDataByValue(value, props) {
        var _this5 = this;

        var dataSource = this.getFlatternDataSource(this.getDataSource(props));

        value.forEach(function (v) {
            dataSource.forEach(function (option) {
                if (option.__key == v) {
                    _this5._cache[v] = option;
                }
            });
        });
    };

    Base.prototype.getDataByValue = function getDataByValue(value) {
        var cache = this._cache;
        return value.map(function (v) {
            return cache[v] || v;
        });
    };

    Base.prototype.getDisplayByValue = function getDisplayByValue(value) {
        var _this6 = this;

        var fillProps = this.props.fillProps;


        if (!fillProps) {
            fillProps = 'label';
        }
        var label = value.map(function (val, i) {
            if (_this6._cache[val]) {
                return _this6._cache[val][fillProps];
            } else {
                if (_nextUtil.obj.isPlainObject(val)) {
                    return val[fillProps];
                }
                return val;
            }
        });
        return label;
    };

    Base.prototype.onSelect = function onSelect(value, context) {
        var _props = this.props,
            multiple = _props.multiple,
            hiddenSelected = _props.hiddenSelected,
            labelInValue = _props.labelInValue,
            data = void 0,
            changeValue = void 0;


        this.cacheDataByValue(value);
        data = this.getDataByValue(value).map(function (item) {
            var option = item;
            if (option) {
                delete option.__key;
            }
            return option;
        });
        changeValue = data.map(function (item) {
            return item.value != null ? item.value : item;
        });
        if (!('value' in this.props)) {
            this.setState({ value: value, inputValue: this.getDisplayByValue(value) });
        }
        if (!multiple || hiddenSelected) {
            this.onVisibleChange(false);
        }
        if (!multiple) {
            changeValue = changeValue[0];
            data = data[0];
        }
        if (this.oldValue !== changeValue || this.isCombobox) {
            if (labelInValue) {
                this.props.onChange(data, data);
            } else {
                this.props.onChange(changeValue, data);
            }
            this.oldValue = changeValue;
        }
        if (this.clearValue) {
            this.clearValue();
        }
        if (context) {
            this.lastFocusedKey = 'index' in context ? context.index : context.props.index;
        }
    };

    Base.prototype.onInputSearch = function onInputSearch(value) {
        this.onSearch(value);
    };

    Base.prototype.onSearch = function onSearch(value) {
        this.filterValue = value;
        this.forceUpdate();
        this.props.onSearch(value);
    };

    Base.prototype.filterBy = function filterBy(value, item) {
        var v = escape(value),
            regExp = new RegExp('(' + v + ')', 'ig');
        return regExp.test(item.value) || regExp.test(item.label);
    };

    Base.prototype.renderLabel = function renderLabel(label, value) {
        var _this7 = this;

        var multiple = this.props.multiple;

        return label.map(function (l, i) {
            if (multiple) {
                return _react2['default'].createElement(
                    'span',
                    { className: _this7.getPrefix() + 'select-inner-item', key: value[i].value || value[i] },
                    _react2['default'].createElement(
                        'label',
                        { className: _this7.getPrefix() + 'select-inner-item-label',
                            title: typeof l === 'string' ? l : null
                        },
                        l
                    ),
                    _react2['default'].createElement(
                        'a',
                        { href: 'javascript:;', onClick: _this7.onRemoveClick.bind(_this7, value[i]) },
                        _react2['default'].createElement(_nextIcon2['default'], { type: 'close', size: 'xxs' })
                    )
                );
            } else {
                return l;
            }
        });
    };

    Base.prototype.onRemoveClick = function onRemoveClick(val, e) {
        var value = [].concat(_toConsumableArray(this.state.value)),
            index = value.indexOf(val),
            disabled = this.props.disabled;


        if (!disabled) {
            value.splice(index, 1);
            this.onSelect(value);
            e.stopPropagation();
        }
    };

    Base.prototype.getIconSize = function getIconSize() {
        var size = this.props.size,
            map = {
            large: 'medium',
            medium: 'small',
            small: 'xs'
        };


        return map[size];
    };

    Base.prototype.getArrowType = function getArrowType(visible) {
        var arrowType = void 0;

        if (visible == null) {
            visible = this.state.visible;
        }

        if (visible) {
            arrowType = 'arrow-up';
        } else {
            arrowType = 'arrow-down';
        }
        return arrowType;
    };

    Base.prototype.onVisibleChange = function onVisibleChange(visible) {
        if (!('visible' in this.props)) {
            this.setState({ visible: visible });
        }
        this.props.onVisibleChange(visible);
    };

    Base.prototype.hasClear = function hasClear() {
        return this.props.hasClear && this.state.value.length && !this.props.multiple && !this.props.disabled;
    };

    Base.prototype.clear = function clear(e) {
        this.setState({
            value: [],
            inputValue: ''
        });
        this.props.onChange(null, {});
        this.oldValue = null;
        e.stopPropagation();
    };

    return Base;
}(_react.Component), _class.contextTypes = {
    prefix: _propTypes2['default'].string
}, _temp);
Base.displayName = 'Base';


function loop(dataSource, callback, parentIndex) {
    dataSource.forEach(function (option, index) {
        if (option.children) {
            loop(option.children, callback, index);
        } else {
            callback(option, index, parentIndex);
        }
    });
}

exports['default'] = Base;
module.exports = exports['default'];