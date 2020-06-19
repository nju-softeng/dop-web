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

var _nextUtil = require('../../next-util/lib/index.js');

var _nextDom = require('../../next-dom/lib/index.js');

var _menu = require('./menu.js');

var _menu2 = _interopRequireDefault(_menu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

/**
 * Cascader
 */
var Cascader = (_temp = _class = function (_Component) {
    _inherits(Cascader, _Component);

    function Cascader(props, context) {
        _classCallCheck(this, Cascader);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

        var defaultValue = props.defaultValue,
            value = props.value,
            defaultExpandedValue = props.defaultExpandedValue,
            expandedValue = props.expandedValue,
            dataSource = props.dataSource,
            multiple = props.multiple,
            checkStrictly = props.checkStrictly,
            canOnlyCheckLeaf = props.canOnlyCheckLeaf,
            loadData = props.loadData;


        _this.updateCache(dataSource);

        var normalizedValue = _this.normalizeValue(typeof value === 'undefined' ? defaultValue : value);
        if (!loadData) {
            normalizedValue = normalizedValue.filter(function (v) {
                return _this._v2n[v];
            });
        }
        var realExpandedValue = typeof expandedValue === 'undefined' ? typeof defaultExpandedValue === 'undefined' ? _this.getExpandedValue(normalizedValue[0]) : _this.normalizeValue(defaultExpandedValue) : _this.normalizeValue(expandedValue);
        var st = {
            value: normalizedValue,
            expandedValue: realExpandedValue
        };
        if (multiple && !checkStrictly && !canOnlyCheckLeaf) {
            st.value = _this.completeValue(props.dataSource, st.value);
        }

        _this.state = st;

        _this.lastExpandedValue = [].concat(_toConsumableArray(_this.state.expandedValue));

        _this.handleMouseLeave = _this.handleMouseLeave.bind(_this);
        _this.getCascaderNode = _this.getCascaderNode.bind(_this);
        return _this;
    }

    Cascader.prototype.componentDidMount = function componentDidMount() {
        this.setCascaderInnerWidth();
    };

    Cascader.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        var _this2 = this;

        this.updateCache(nextProps.dataSource);

        var state = {};
        if ('value' in nextProps) {
            state.value = this.normalizeValue(nextProps.value);
            if (!nextProps.loadData) {
                state.value = state.value.filter(function (v) {
                    return _this2._v2n[v];
                });
            }

            var multiple = nextProps.multiple,
                checkStrictly = nextProps.checkStrictly,
                canOnlyCheckLeaf = nextProps.canOnlyCheckLeaf;

            if (multiple && !checkStrictly && !canOnlyCheckLeaf) {
                state.value = this.completeValue(nextProps.dataSource, state.value);
            }
            if (!this.state.expandedValue.length && !('expandedValue' in nextProps)) {
                state.expandedValue = this.getExpandedValue(state.value[0]);
            }
        }
        if ('expandedValue' in nextProps) {
            state.expandedValue = this.normalizeValue(nextProps.expandedValue);
        }
        if (Object.keys(state).length) {
            this.setState(state);
        }
    };

    Cascader.prototype.componentDidUpdate = function componentDidUpdate() {
        this.setCascaderInnerWidth();
    };

    Cascader.prototype.getCascaderNode = function getCascaderNode(ref) {
        this.cascader = ref;
        if (this.cascader) {
            this.cascaderInner = this.cascader.querySelector('.' + this.props.prefix + 'cascader-inner');
        }
    };

    Cascader.prototype.setCascaderInnerWidth = function setCascaderInnerWidth() {
        if (!this.props.setCascaderInnerWidth) {
            return;
        }

        var menuWrappers = [].concat(_toConsumableArray(this.cascaderInner.querySelectorAll('.' + this.props.prefix + 'cascader-menu-wrapper')));
        if (menuWrappers.length === 0) {
            return;
        }

        _nextDom.style.set(this.cascaderInner, 'width', null);
        var cascaderClientWidth = this.cascader.clientWidth;
        var cascaderInnerWidth = _nextDom.style.get(this.cascaderInner, 'width');
        var allMenusWidth = Math.ceil(menuWrappers.reduce(function (ret, menuWrapper) {
            return ret + _nextDom.style.get(menuWrapper, 'width');
        }, 0));
        var hasRightBorderClass = 'has-right-border';
        var hasRightBorder = _nextDom.classList.hasClass(this.cascaderInner, hasRightBorderClass);
        if (cascaderClientWidth > allMenusWidth) {
            var borderWidth = _nextDom.style.get(this.cascader, 'borderRightWidth');
            if (cascaderInnerWidth !== allMenusWidth + borderWidth) {
                _nextDom.style.set(this.cascaderInner, 'width', allMenusWidth + borderWidth);
            }
            if (!hasRightBorder) {
                _nextDom.classList.addClass(this.cascaderInner, hasRightBorderClass);
            }
        } else {
            if (cascaderInnerWidth !== allMenusWidth) {
                _nextDom.style.set(this.cascaderInner, 'width', allMenusWidth);
            }
            if (hasRightBorder) {
                _nextDom.classList.removeClass(this.cascaderInner, hasRightBorderClass);
            }
        }
    };

    Cascader.prototype.updateCache = function updateCache(dataSource) {
        var _this3 = this;

        this._v2n = {};
        this._p2n = {};
        var loop = function loop(data) {
            var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '0';
            return data.forEach(function (item, index) {
                var value = item.value,
                    children = item.children;

                var pos = prefix + '-' + index;
                _this3._v2n[value] = _this3._p2n[pos] = _extends({}, item, { pos: pos });

                if (children && children.length) {
                    loop(children, pos);
                }
            });
        };

        loop(dataSource);
    };

    Cascader.prototype.normalizeValue = function normalizeValue(value) {
        if (value) {
            if (Array.isArray(value)) {
                return value;
            }

            return [value];
        }

        return [];
    };

    Cascader.prototype.getExpandedValue = function getExpandedValue(v) {
        var _this4 = this;

        if (!v || !this._v2n[v]) {
            return [];
        }

        var pos = this._v2n[v].pos;
        if (pos.split('-').length === 2) {
            return [];
        }

        var expandedMap = {};
        Object.keys(this._p2n).forEach(function (p) {
            if (_this4.isDescendantOrSelf(p, pos) && p !== pos) {
                expandedMap[_this4._p2n[p].value] = p;
            }
        });

        return Object.keys(expandedMap).sort(function (prev, next) {
            return expandedMap[prev].split('-').length - expandedMap[next].split('-').length;
        });
    };

    Cascader.prototype.completeValue = function completeValue(dataSource, value) {
        var _this5 = this;

        var filterValue = value.filter(function (v) {
            return typeof _this5._v2n[v] !== 'undefined';
        });
        var flatValue = this.flatValue(filterValue);

        var childChecked = function childChecked(child) {
            return flatValue.indexOf(child.value) > -1;
        };
        var removeValue = function removeValue(child) {
            return flatValue.splice(flatValue.indexOf(child.value), 1);
        };
        var addParentValue = function addParentValue(i, parent) {
            return flatValue.splice(i, 0, parent.value);
        };
        for (var i = 0; i < flatValue.length; i++) {
            var pos = this.getPos(flatValue[i]);
            var nums = pos.split('-');
            if (nums.length === 2) {
                break;
            }
            for (var j = nums.length - 2; j > 0; j--) {
                var parent = nums.slice(1, j + 1).reduce(function (ret, num) {
                    return ret.children[num];
                }, { children: dataSource });
                var parentChecked = parent.children.every(childChecked);
                if (parentChecked) {
                    parent.children.forEach(removeValue);
                    addParentValue(i, parent);
                } else {
                    break;
                }
            }
        }

        var newValue = [];
        flatValue = flatValue.reverse();
        var ps = Object.keys(this._p2n);
        if (flatValue.length) {
            for (var _i = 0; _i < ps.length; _i++) {
                for (var _j = 0; _j < flatValue.length; _j++) {
                    var v = flatValue[_j];
                    if (this.isDescendantOrSelf(this.getPos(v), ps[_i])) {
                        newValue.push(this.getValue(ps[_i]));
                        ps.splice(_i, 1);
                        _i--;
                        break;
                    }
                }
            }
        }

        return newValue;
    };

    Cascader.prototype.flatValue = function flatValue(value) {
        var _this6 = this;

        var getDepth = function getDepth(v) {
            return _this6.getPos(v).split('-').length;
        };
        var newValue = value.slice(0).sort(function (prev, next) {
            return getDepth(prev) - getDepth(next);
        });

        for (var i = 0; i < newValue.length; i++) {
            for (var j = 0; j < newValue.length; j++) {
                if (i !== j && this.isDescendantOrSelf(this.getPos(newValue[i]), this.getPos(newValue[j]))) {
                    newValue.splice(j, 1);
                    j--;
                }
            }
        }

        return newValue;
    };

    Cascader.prototype.getValue = function getValue(pos) {
        return this._p2n[pos] ? this._p2n[pos].value : null;
    };

    Cascader.prototype.getPos = function getPos(value) {
        return this._v2n[value] ? this._v2n[value].pos : null;
    };

    Cascader.prototype.getData = function getData(value) {
        var _this7 = this;

        return value.map(function (v) {
            return _this7._v2n[v];
        });
    };

    Cascader.prototype.isDescendantOrSelf = function isDescendantOrSelf(currentPos, targetPos) {
        if (!currentPos || !targetPos) {
            return false;
        }

        var currentNums = currentPos.split('-');
        var targetNums = targetPos.split('-');

        return currentNums.length <= targetNums.length && currentNums.every(function (num, index) {
            return num === targetNums[index];
        });
    };

    Cascader.prototype.isSiblingOrSelf = function isSiblingOrSelf(currentPos, targetPos) {
        var currentNums = currentPos.split('-').slice(0, -1);
        var targetNums = targetPos.split('-').slice(0, -1);

        return currentNums.length === targetNums.length && currentNums.every(function (num, index) {
            return num === targetNums[index];
        });
    };

    Cascader.prototype.processValue = function processValue(value, v, checked) {
        var index = value.indexOf(v);
        if (checked && index === -1) {
            value.push(v);
        } else if (!checked && index > -1) {
            value.splice(index, 1);
        }
    };

    Cascader.prototype.handleSelect = function handleSelect(v, level, canExpand) {
        var _this8 = this;

        if (!(this.props.canOnlySelectLeaf && canExpand) && this.state.value[0] !== v) {
            if (!('value' in this.props)) {
                this.setState({
                    value: [v]
                });
            }

            if ('onChange' in this.props) {
                var data = this._v2n[v];
                var nums = data.pos.split('-');
                var selectedPath = nums.slice(1).reduce(function (ret, num, index) {
                    var p = nums.slice(0, index + 2).join('-');
                    ret.push(_this8._p2n[p]);
                    return ret;
                }, []);

                this.props.onChange(v, data, {
                    selectedPath: selectedPath
                });
            }
        }

        if (this.props.expandTrigger === 'click' && canExpand) {
            return this.handleExpand(v, level);
        }

        if (canExpand) {
            if (!this.props.canOnlySelectLeaf) {
                this.lastExpandedValue = [].concat(_toConsumableArray(this.state.expandedValue.slice(0, -1)));
            }
        } else {
            this.lastExpandedValue = [].concat(_toConsumableArray(this.state.expandedValue));
        }
    };

    Cascader.prototype.handleCheck = function handleCheck(v, checked) {
        var _this9 = this;

        this.lastExpandedValue = [].concat(_toConsumableArray(this.state.expandedValue));

        var _props = this.props,
            checkStrictly = _props.checkStrictly,
            canOnlyCheckLeaf = _props.canOnlyCheckLeaf;
        var value = this.state.value;


        if (checkStrictly || canOnlyCheckLeaf) {
            this.processValue(value, v, checked);
        } else {
            var pos = this.getPos(v);

            var ps = Object.keys(this._p2n);
            ps.forEach(function (p) {
                if (_this9.isDescendantOrSelf(pos, p)) {
                    _this9.processValue(value, _this9.getValue(p), checked);
                }
            });

            var currentPos = pos;
            var nums = pos.split('-');
            for (var i = nums.length; i > 2; i--) {
                var parentChecked = true;
                for (var j = 0; j < ps.length; j++) {
                    var p = ps[j];
                    if (this.isSiblingOrSelf(currentPos, p)) {
                        var _v = this.getValue(p);
                        if (value.indexOf(_v) === -1) {
                            parentChecked = false;
                            break;
                        }
                    }
                }
                var parentPos = nums.slice(0, i - 1).join('-');
                this.processValue(value, this.getValue(parentPos), parentChecked);

                currentPos = parentPos;
            }
        }

        if (!('value' in this.props)) {
            this.setState({
                value: value
            });
        }

        if ('onChange' in this.props) {
            if (checkStrictly || canOnlyCheckLeaf) {
                var data = this.getData(value);
                this.props.onChange(value, data, {
                    checked: checked,
                    currentData: this._v2n[v],
                    checkedData: data
                });
            } else {
                var flatValue = this.flatValue(value);
                var flatData = this.getData(flatValue);
                var checkedData = this.getData(value);
                var indeterminateValue = this.getIndeterminate(value);
                var indeterminateData = this.getData(indeterminateValue);
                this.props.onChange(flatValue, flatData, {
                    checked: checked,
                    currentData: this._v2n[v],
                    checkedData: checkedData,
                    indeterminateData: indeterminateData
                });
            }
        }
    };

    Cascader.prototype.handleExpand = function handleExpand(value, level) {
        var _this10 = this;

        var loadData = this.props.loadData;
        var expandedValue = this.state.expandedValue;

        expandedValue.splice(level, expandedValue.length - level, value);

        if (loadData) {
            return loadData(this._v2n[value]).then(function () {
                _this10.setExpandValue(expandedValue);
            });
        } else {
            this.setExpandValue(expandedValue);
        }
    };

    Cascader.prototype.handleMouseLeave = function handleMouseLeave() {
        this.setExpandValue([].concat(_toConsumableArray(this.lastExpandedValue)));
    };

    Cascader.prototype.setExpandValue = function setExpandValue(expandedValue) {
        if (!('expandedValue' in this.props)) {
            this.setState({
                expandedValue: expandedValue
            });
        }

        if ('onExpand' in this.props) {
            this.props.onExpand(expandedValue);
        }
    };

    Cascader.prototype.getIndeterminate = function getIndeterminate(value) {
        var _this11 = this;

        var indeterminate = [];

        var positions = this.flatValue(value).map(this.getPos.bind(this));
        positions.forEach(function (pos) {
            var nums = pos.split('-');
            for (var i = nums.length; i > 2; i--) {
                var parentPos = nums.slice(0, i - 1).join('-');
                var parentValue = _this11.getValue(parentPos);
                if (indeterminate.indexOf(parentValue) === -1) {
                    indeterminate.push(parentValue);
                }
            }
        });

        return indeterminate;
    };

    Cascader.prototype.getPrefix = function getPrefix() {
        return this.context.prefix || this.props.prefix;
    };

    Cascader.prototype.renderMenu = function renderMenu(data, level) {
        var _this12 = this;

        var _props2 = this.props,
            multiple = _props2.multiple,
            checkStrictly = _props2.checkStrictly,
            expandTrigger = _props2.expandTrigger,
            labelWidth = _props2.labelWidth,
            showItemCount = _props2.showItemCount,
            loadData = _props2.loadData,
            canOnlyCheckLeaf = _props2.canOnlyCheckLeaf;
        var _state = this.state,
            value = _state.value,
            expandedValue = _state.expandedValue;

        var prefix = this.getPrefix();
        var MenuItem = multiple ? _menu2['default'].CheckboxItem : _menu2['default'].Item;

        return _react2['default'].createElement(
            _menu2['default'],
            { prefix: prefix, showItemCount: showItemCount, key: level },
            data.map(function (item) {
                var _cx;

                var disabled = !!item.disabled;
                var canExpand = item.children && item.children.length || !!loadData && !item.isLeaf;
                var expanded = expandedValue[level] === item.value;
                var props = { prefix: prefix, disabled: disabled, canExpand: canExpand, expanded: expanded };
                if (multiple) {
                    props.checkable = !(canOnlyCheckLeaf && canExpand);
                    props.checked = value.indexOf(item.value) > -1;
                    props.checkboxDisabled = !!item.checkboxDisabled;
                    props.className = props.checked ? 'js-selected' : null;
                    props.indeterminate = checkStrictly || canOnlyCheckLeaf ? false : _this12.indeterminate.indexOf(item.value) > -1;
                    if (!disabled) {
                        props.onCheck = _this12.handleCheck.bind(_this12, item.value);
                        var callbackName = expandTrigger === 'click' ? 'onClick' : 'onMouseEnter';
                        if (canExpand) {
                            props[callbackName] = _this12.handleExpand.bind(_this12, item.value, level);
                        }
                    }
                } else {
                    props.selected = value[0] === item.value;
                    props.className = props.selected ? 'js-selected' : null;
                    if (!disabled) {
                        props.onClick = _this12.handleSelect.bind(_this12, item.value, level, canExpand);
                        if (expandTrigger !== 'click' && canExpand) {
                            props.onMouseEnter = _this12.handleExpand.bind(_this12, item.value, level);
                        }
                    }
                }

                var setLabelWidth = typeof labelWidth !== 'undefined';
                var spanProps = {
                    className: (0, _classnames2['default'])((_cx = {}, _defineProperty(_cx, prefix + 'cascader-menu-item-label', true), _defineProperty(_cx, 'ellipsis', setLabelWidth), _cx)),
                    title: item.label
                };
                if (setLabelWidth) {
                    spanProps.style = { width: Number(labelWidth) + 'px' };
                }

                return _react2['default'].createElement(
                    MenuItem,
                    _extends({ key: item.value }, props),
                    _react2['default'].createElement(
                        'span',
                        spanProps,
                        item.label
                    )
                );
            })
        );
    };

    Cascader.prototype.renderMenus = function renderMenus() {
        var _props3 = this.props,
            dataSource = _props3.dataSource,
            multiple = _props3.multiple,
            checkStrictly = _props3.checkStrictly,
            canOnlyCheckLeaf = _props3.canOnlyCheckLeaf;
        var _state2 = this.state,
            value = _state2.value,
            expandedValue = _state2.expandedValue;

        if (multiple && !checkStrictly && !canOnlyCheckLeaf) {
            this.indeterminate = this.getIndeterminate(value);
        }

        var menus = [];
        var data = dataSource;

        for (var i = 0; i <= expandedValue.length; i++) {
            if (!data) {
                break;
            }

            menus.push(this.renderMenu(data, i));

            var expandedItem = void 0;
            for (var j = 0; j < data.length; j++) {
                if (data[j].value === expandedValue[i]) {
                    expandedItem = data[j];
                    break;
                }
            }
            data = expandedItem ? expandedItem.children : null;
        }

        return menus;
    };

    Cascader.prototype.render = function render() {
        var _cx2;

        var _props4 = this.props,
            className = _props4.className,
            expandTrigger = _props4.expandTrigger,
            multiple = _props4.multiple,
            dataSource = _props4.dataSource;

        var others = (0, _nextUtil.pickOthers)(Cascader, this.props);
        var prefix = this.getPrefix();

        var props = _extends({
            className: (0, _classnames2['default'])((_cx2 = {}, _defineProperty(_cx2, prefix + 'cascader', true), _defineProperty(_cx2, 'multiple', multiple), _defineProperty(_cx2, className, !!className), _cx2)),
            ref: 'cascader'
        }, others);
        if (expandTrigger === 'hover') {
            props.onMouseLeave = this.handleMouseLeave;
        }

        return _react2['default'].createElement(
            'div',
            _extends({}, props, { ref: this.getCascaderNode }),
            _react2['default'].createElement(
                'div',
                { className: prefix + 'cascader-inner' },
                dataSource && dataSource.length ? this.renderMenus() : null
            )
        );
    };

    return Cascader;
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
     * 数据源，结构可参考下方说明
     */
    dataSource: _propTypes2['default'].arrayOf(_propTypes2['default'].object),
    /**
     * （非受控）默认值
     */
    defaultValue: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].arrayOf(_propTypes2['default'].string)]),
    /**
     * （受控）当前值
     */
    value: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].arrayOf(_propTypes2['default'].string)]),
    /**
     * 选中值改变时触发的回调函数
     * @param {String|Array} value 选中的值，单选时返回单个值，多选时返回数组
     * @param {Object|Array} data 选中的数据，包括 value 和 label，单选时返回单个值，多选时返回数组，父子节点选中关联时，同时选中，只返回父节点
     * @param {Object} extra 额外参数
     * @param {Array} extra.selectedPath 单选时选中的数据的路径
     * @param {Boolean} extra.checked 多选时当前的操作是选中还是取消选中
     * @param {Object} extra.currentData 多选时当前操作的数据
     * @param {Array} extra.checkedData 多选时所有被选中的数据
     * @param {Array} extra.indeterminateData 多选时半选的数据
     */
    onChange: _propTypes2['default'].func,
    /**
     * （非受控）默认展开值，如果不设置，组件内部会根据 defaultValue/value 进行自动设置
     */
    defaultExpandedValue: _propTypes2['default'].arrayOf(_propTypes2['default'].string),
    /**
     * （受控）当前展开值
     */
    expandedValue: _propTypes2['default'].arrayOf(_propTypes2['default'].string),
    /**
     * 展开触发的方式
     */
    expandTrigger: _propTypes2['default'].oneOf(['click', 'hover']),
    /**
     * 展开时触发的回调函数
     * @param {Array} expandedValue 各列展开值的数组
     */
    onExpand: _propTypes2['default'].func,
    /**
     * 是否多选
     */
    multiple: _propTypes2['default'].bool,
    /**
     * 单选时是否只能选中叶子节点
     */
    canOnlySelectLeaf: _propTypes2['default'].bool,
    /**
     * 多选时是否只能选中叶子节点
     */
    canOnlyCheckLeaf: _propTypes2['default'].bool,
    /**
     * 父子节点是否选中不关联
     */
    checkStrictly: _propTypes2['default'].bool,
    /**
     * 文字区域宽度，当文字超过宽度时，结尾会以省略号显示，默认值为文字实际宽度
     */
    labelWidth: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].number]),
    /**
     * 每一列展示的个数
     */
    showItemCount: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].number]),
    /**
     * 异步加载数据函数
     * @param {Object} data 当前点击异步加载的数据
     */
    loadData: _propTypes2['default'].func,
    setCascaderInnerWidth: _propTypes2['default'].bool
}, _class.defaultProps = {
    prefix: 'next-',
    dataSource: [],
    defaultValue: null,
    canOnlySelectLeaf: false,
    canOnlyCheckLeaf: false,
    expandTrigger: 'click',
    multiple: false,
    checkStrictly: false,
    showItemCount: 6,
    setCascaderInnerWidth: true
}, _temp);
Cascader.displayName = 'Cascader';
exports['default'] = Cascader;
module.exports = exports['default'];