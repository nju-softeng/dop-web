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

var _nextSelect = require('../../next-select/lib/index.js');

var _nextSelect2 = _interopRequireDefault(_nextSelect);

var _nextInput = require('../../next-input/lib/index.js');

var _nextInput2 = _interopRequireDefault(_nextInput);

var _nextIcon = require('../../next-icon/lib/index.js');

var _nextIcon2 = _interopRequireDefault(_nextIcon);

var _nextTree = require('../../next-tree/lib/index.js');

var _nextTree2 = _interopRequireDefault(_nextTree);

var _util = require('../../next-tree/lib/util/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var noop = function noop() {};

/**
 * TreeSelect
 */
var TreeSelect = (_temp = _class = function (_Component) {
    _inherits(TreeSelect, _Component);

    function TreeSelect(props, context) {
        _classCallCheck(this, TreeSelect);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

        var defaultVisible = props.defaultVisible,
            defaultValue = props.defaultValue,
            value = props.value;

        _this.state = {
            visible: defaultVisible,
            value: _this.normalizeValue(typeof value === 'undefined' ? defaultValue : value),
            searchedValue: '',
            expandedKeys: [],
            autoExpandParent: false
        };

        ['handleSelect', 'handleCheck', 'handleSearch', 'handleVisibleChange', 'handleRemove', 'handleExpand'].forEach(function (methodName) {
            _this[methodName] = _this[methodName].bind(_this);
        });

        _this.updateCache(props);
        _this.checked = false;
        return _this;
    }

    TreeSelect.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        if ('dataSource' in nextProps || 'children' in nextProps) {
            this.updateCache(nextProps);
        }
        if ('value' in nextProps) {
            this.setState({
                value: this.normalizeValue(nextProps.value)
            });
        }
    };

    TreeSelect.prototype.normalizeValue = function normalizeValue(value) {
        if (value) {
            if (Array.isArray(value)) {
                return value;
            }

            return [value];
        }

        return [];
    };

    TreeSelect.prototype.updateCache = function updateCache(props) {
        var _this2 = this;

        this._k2n = {};
        this._v2k = {};
        this._p2v = {};

        var update = function update(key, value, pos, label) {
            _this2._k2n[key] = { value: value, pos: pos, label: label };
            _this2._v2k[value] = key;
            _this2._p2v[pos] = value;
        };

        if ('dataSource' in props) {
            var loop = function loop(data) {
                var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '0';
                return data.forEach(function (item, index) {
                    var key = item.key,
                        value = item.value,
                        label = item.label,
                        children = item.children;

                    var pos = prefix + '-' + index;
                    update(key || pos, value, pos, label);
                    if (children && children.length) {
                        loop(children, pos);
                    }
                });
            };
            loop(props.dataSource);
        } else if ('children' in props) {
            var _loop = function _loop(children) {
                var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '0';
                return _react2['default'].Children.forEach(children, function (node, index) {
                    var key = node.key;
                    var _node$props = node.props,
                        value = _node$props.value,
                        label = _node$props.label,
                        children = _node$props.children;

                    var pos = prefix + '-' + index;
                    update(key, value, pos, label);
                    if (children && _react2['default'].Children.count(children)) {
                        _loop(children, pos);
                    }
                });
            };
            _loop(props.children);
        }
    };

    TreeSelect.prototype.getPrefix = function getPrefix() {
        return this.context.prefix || this.props.prefix;
    };

    TreeSelect.prototype.getKeys = function getKeys(value) {
        var _this3 = this;

        return value.reduce(function (ret, v) {
            var k = _this3._v2k[v];
            if (k) {
                ret.push(k);
            }

            return ret;
        }, []);
    };

    TreeSelect.prototype.getValueFromSelectedKeys = function getValueFromSelectedKeys(keys) {
        var _this4 = this;

        return keys.map(function (k) {
            return _this4._k2n[k].value;
        });
    };

    TreeSelect.prototype.getValueFromCheckedKeys = function getValueFromCheckedKeys(keys) {
        var _this5 = this;

        if (!this.props.treeCheckStrictly) {
            var posArr = keys.map(function (k) {
                return _this5._k2n[k].pos;
            });
            posArr = (0, _util.filterParentPosition)(posArr);
            return posArr.map(function (p) {
                return _this5._p2v[p];
            });
        }

        return keys.map(function (k) {
            return _this5._k2n[k].value;
        });
    };

    TreeSelect.prototype.getSelectValue = function getSelectValue(value) {
        var _this6 = this;

        var filterValue = value.filter(function (v) {
            return typeof _this6._v2k[v] !== 'undefined';
        });
        var flatValue = this.flatValue(filterValue);
        var newValue = [].concat(_toConsumableArray(flatValue));

        for (var i = 0; i < flatValue.length; i++) {
            if (newValue.indexOf(flatValue[i]) === -1) {
                continue;
            }
            var pos = this.getPos(flatValue[i]);
            var nums = pos.split('-');
            if (nums.length === 2) {
                continue;
            }
            for (var j = nums.length - 2; j > 0; j--) {
                var parent = this.getDataByPosition(nums.slice(1, j + 1));
                var parentChecked = parent.children.every(function (child) {
                    return newValue.indexOf(child.value) > -1;
                });
                if (parentChecked) {
                    parent.children.forEach(function (child) {
                        newValue.splice(newValue.indexOf(child.value), 1);
                    });
                    newValue.push(parent.value);
                } else {
                    break;
                }
            }
        }

        return newValue;
    };

    TreeSelect.prototype.getDataByPosition = function getDataByPosition(posNums) {
        if ('dataSource' in this.props) {
            return posNums.reduce(function (ret, num) {
                return ret.children[num];
            }, { children: this.props.dataSource });
        }
        if ('children' in this.props) {
            var node = posNums.reduce(function (ret, num) {
                return _react2['default'].Children.toArray(ret.props.children)[num];
            }, this);
            return {
                value: node.props.value,
                children: _react2['default'].Children.map(node.props.children, function (node) {
                    return {
                        value: node.props.value
                    };
                })
            };
        }
    };

    TreeSelect.prototype.flatValue = function flatValue(value) {
        var _this7 = this;

        var getDepth = function getDepth(v) {
            return _this7.getPos(v).split('-').length;
        };
        var newValue = value.slice(0).sort(function (prev, next) {
            return getDepth(next) - getDepth(prev);
        });

        for (var i = 0; i < newValue.length; i++) {
            for (var j = i + 1; j < newValue.length; j++) {
                if (this.isDescendantOrSelf(this.getPos(newValue[j]), this.getPos(newValue[i]))) {
                    newValue.splice(i, 1);
                    i--;
                    break;
                }
            }
        }

        return newValue;
    };

    TreeSelect.prototype.getPos = function getPos(value) {
        return this._k2n[this._v2k[value]].pos;
    };

    TreeSelect.prototype.isDescendantOrSelf = function isDescendantOrSelf(currentPos, targetPos) {
        if (!currentPos || !targetPos) {
            return false;
        }

        var currentNums = currentPos.split('-');
        var targetNums = targetPos.split('-');

        return currentNums.length <= targetNums.length && currentNums.every(function (num, index) {
            return num === targetNums[index];
        });
    };

    TreeSelect.prototype.getData = function getData(value, isSelect) {
        var _this8 = this;

        var _props = this.props,
            treeCheckable = _props.treeCheckable,
            treeCheckStrictly = _props.treeCheckStrictly;


        if (isSelect && !this.checked && treeCheckable && !treeCheckStrictly) {
            value = this.getSelectValue(value);
        }

        return value.reduce(function (ret, v) {
            var k = _this8._v2k[v];
            if (k) {
                var _k2n$k = _this8._k2n[k],
                    label = _k2n$k.label,
                    pos = _k2n$k.pos;

                var d = {
                    value: v,
                    label: label,
                    pos: pos
                };
                if (!isSelect) {
                    d.key = k;
                }
                ret.push(d);
            }

            return ret;
        }, []);
    };

    TreeSelect.prototype.handleVisibleChange = function handleVisibleChange(visible) {
        this.setState({
            visible: visible
        });
    };

    TreeSelect.prototype.handleSelect = function handleSelect(selectedKeys, extra) {
        var _props2 = this.props,
            multiple = _props2.multiple,
            onChange = _props2.onChange;
        var selected = extra.selected;


        if (multiple || selected) {
            var st = {};
            var value = this.getValueFromSelectedKeys(selectedKeys);
            if (!('value' in this.props)) {
                st.value = value;
            }
            if (!multiple) {
                st.visible = false;
            }
            if (Object.keys(st).length) {
                this.setState(st);
            }

            var data = this.getData(value);
            multiple ? onChange(value, data) : onChange(value[0], data[0]);
        } else {
            this.setState({
                visible: false
            });
        }
    };

    TreeSelect.prototype.handleCheck = function handleCheck(checkedKeys) {
        var onChange = this.props.onChange;


        var value = this.getValueFromCheckedKeys(checkedKeys);
        if (!('value' in this.props)) {
            this.setState({
                value: value
            });
        }

        onChange(value, this.getData(value));

        this.checked = true;
    };

    TreeSelect.prototype.handleRemove = function handleRemove(value) {
        var _props3 = this.props,
            multiple = _props3.multiple,
            treeCheckable = _props3.treeCheckable,
            onChange = _props3.onChange;

        value = this.normalizeValue(value);

        if (!('value' in this.props)) {
            this.setState({
                value: value
            });
        }

        var data = this.getData(value);
        if (!multiple && !treeCheckable) {
            value = value[0] || null;
            data = data[0] || null;
        }
        onChange(value, data);
    };

    TreeSelect.prototype.handleSearch = function handleSearch(searchedValue) {
        var _this9 = this;

        var searchedKeys = [];
        var retainedKeys = [];
        Object.keys(this._k2n).forEach(function (k) {
            var _k2n$k2 = _this9._k2n[k],
                label = _k2n$k2.label,
                pos = _k2n$k2.pos;

            if (_this9.isSearched(label, searchedValue)) {
                searchedKeys.push(k);
                var posArr = pos.split('-');
                posArr.forEach(function (n, i) {
                    if (i > 0) {
                        var p = posArr.slice(0, i + 1).join('-');
                        var kk = _this9._v2k[_this9._p2v[p]];
                        if (retainedKeys.indexOf(kk) === -1) {
                            retainedKeys.push(kk);
                        }
                    }
                });
            }
        });

        this.setState({
            searchedValue: searchedValue,
            expandedKeys: searchedKeys,
            autoExpandParent: true
        });
        this.searchedKeys = searchedKeys;
        this.retainedKeys = retainedKeys;

        this.props.onSearch(searchedValue);
    };

    TreeSelect.prototype.handleExpand = function handleExpand(expandedKeys) {
        this.setState({
            expandedKeys: expandedKeys,
            autoExpandParent: false
        });
    };

    TreeSelect.prototype.isSearched = function isSearched(label, searchedValue) {
        var labelString = '';
        var loop = function loop(arg) {
            if (_react2['default'].isValidElement(arg) && arg.props.children) {
                _react2['default'].Children.forEach(arg.props.children, loop);
            } else if (typeof arg === 'string') {
                labelString += arg;
            }
        };
        loop(label);

        if (labelString.length >= searchedValue.length && labelString.indexOf(searchedValue) > -1) {
            return true;
        }

        return false;
    };

    TreeSelect.prototype.searchNodes = function searchNodes(children) {
        var _this10 = this;

        var loop = function loop(children) {
            var retainedNodes = [];
            _react2['default'].Children.forEach(children, function (child) {
                if (_this10.searchedKeys.indexOf(child.key) > -1) {
                    retainedNodes.push(child);
                } else if (_this10.retainedKeys.indexOf(child.key) > -1) {
                    var retainedNode = child.props.children ? _react2['default'].cloneElement(child, {}, loop(child.props.children)) : child;
                    retainedNodes.push(retainedNode);
                } else {
                    var hideNode = _react2['default'].cloneElement(child, { style: { display: 'none' } });
                    retainedNodes.push(hideNode);
                }
            });
            return retainedNodes;
        };

        return loop(children);
    };

    TreeSelect.prototype.createNodesByData = function createNodesByData(data, isSearched) {
        var _this11 = this;

        var loop = function loop(data, isParentMatched) {
            var prefix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '0';

            var retainedNodes = [];

            data.forEach(function (item, index) {
                var label = item.label,
                    value = item.value,
                    disabled = item.disabled,
                    selectable = item.selectable,
                    disableCheckbox = item.disableCheckbox,
                    isLeaf = item.isLeaf,
                    children = item.children;

                var props = { label: label, value: value, disabled: disabled, disableCheckbox: disableCheckbox, isLeaf: isLeaf, selectable: typeof selectable === 'undefined' ? true : !!selectable };
                var pos = prefix + '-' + index;
                var addNode = function addNode(isParentMatched, hide) {
                    if (hide) {
                        props.style = { display: 'none' };
                    }
                    retainedNodes.push(_react2['default'].createElement(
                        _nextTree.Node,
                        _extends({}, props, { key: _this11._v2k[_this11._p2v[pos]] }),
                        children && children.length ? loop(children, isParentMatched, pos) : null
                    ));
                };

                if (isSearched) {
                    if (_this11.searchedKeys.indexOf(pos) > -1 || isParentMatched) {
                        addNode(true);
                    } else if (_this11.retainedKeys.indexOf(pos) > -1) {
                        addNode(false);
                    } else {
                        addNode(false, true);
                    }
                } else {
                    addNode();
                }
            });

            return retainedNodes;
        };

        return loop(data, false);
    };

    TreeSelect.prototype.renderOverlay = function renderOverlay() {
        var _this12 = this;

        var prefix = this.getPrefix();
        var treeSelectPrefix = prefix + 'tree-select-';

        if (!this.state.visible) {
            return _react2['default'].createElement('div', { className: treeSelectPrefix + 'dropdown', ref: 'menu' });
        }

        var _props4 = this.props,
            multiple = _props4.multiple,
            treeCheckable = _props4.treeCheckable,
            treeCheckStrictly = _props4.treeCheckStrictly,
            treeDefaultExpandAll = _props4.treeDefaultExpandAll,
            treeDefaultExpandedKeys = _props4.treeDefaultExpandedKeys,
            treeLoadData = _props4.treeLoadData,
            showSearch = _props4.showSearch,
            dataSource = _props4.dataSource,
            children = _props4.children;
        var _state = this.state,
            value = _state.value,
            searchedValue = _state.searchedValue,
            expandedKeys = _state.expandedKeys,
            autoExpandParent = _state.autoExpandParent;


        var treeProps = {
            multiple: multiple,
            loadData: treeLoadData,
            defaultExpandAll: treeDefaultExpandAll,
            defaultExpandedKeys: treeDefaultExpandedKeys
        };

        var keys = this.getKeys(value);
        if (treeCheckable) {
            treeProps.checkable = treeCheckable;
            treeProps.checkStrictly = treeCheckStrictly;
            treeProps.onCheck = this.handleCheck;
            treeProps.checkedKeys = keys;
        } else {
            treeProps.onSelect = this.handleSelect;
            treeProps.selectedKeys = keys;
        }

        var newChildren = void 0;
        if (showSearch && searchedValue) {
            treeProps.expandedKeys = expandedKeys;
            treeProps.autoExpandParent = autoExpandParent;
            treeProps.onExpand = this.handleExpand;
            treeProps.filterTreeNode = function (node) {
                return _this12.searchedKeys.indexOf(node.props.eventKey) > -1;
            };
            newChildren = dataSource ? this.createNodesByData(dataSource, true) : this.searchNodes(children);
        } else {
            newChildren = dataSource ? this.createNodesByData(dataSource) : children;
        }

        return _react2['default'].createElement(
            'div',
            { className: treeSelectPrefix + 'dropdown', ref: 'menu' },
            showSearch ? _react2['default'].createElement(
                'div',
                { className: prefix + 'select-search' },
                _react2['default'].createElement(_nextInput2['default'], { onChange: this.handleSearch }),
                _react2['default'].createElement(_nextIcon2['default'], { type: 'search', size: 'small' })
            ) : null,
            _react2['default'].createElement(
                _nextTree2['default'],
                treeProps,
                newChildren
            )
        );
    };

    TreeSelect.prototype.render = function render() {
        var prefix = this.getPrefix();
        /* eslint-disable no-unused-vars */

        var _props5 = this.props,
            propsPrefix = _props5.prefix,
            size = _props5.size,
            shape = _props5.shape,
            placeholder = _props5.placeholder,
            defaultValue = _props5.defaultValue,
            propsValue = _props5.value,
            dataSource = _props5.dataSource,
            onChange = _props5.onChange,
            defaultVisible = _props5.defaultVisible,
            disabled = _props5.disabled,
            hasArrow = _props5.hasArrow,
            hasClear = _props5.hasClear,
            autoWidth = _props5.autoWidth,
            popupClassName = _props5.popupClassName,
            showSearch = _props5.showSearch,
            onSearch = _props5.onSearch,
            multiple = _props5.multiple,
            treeCheckable = _props5.treeCheckable,
            treeCheckStrictly = _props5.treeCheckStrictly,
            treeDefaultExpandAll = _props5.treeDefaultExpandAll,
            treeLoadData = _props5.treeLoadData,
            className = _props5.className,
            children = _props5.children,
            container = _props5.container,
            others = _objectWithoutProperties(_props5, ['prefix', 'size', 'shape', 'placeholder', 'defaultValue', 'value', 'dataSource', 'onChange', 'defaultVisible', 'disabled', 'hasArrow', 'hasClear', 'autoWidth', 'popupClassName', 'showSearch', 'onSearch', 'multiple', 'treeCheckable', 'treeCheckStrictly', 'treeDefaultExpandAll', 'treeLoadData', 'className', 'children', 'container']);
        /* eslint-enable */


        var _state2 = this.state,
            value = _state2.value,
            visible = _state2.visible;


        return _react2['default'].createElement(_nextSelect2['default'], _extends({ prefix: prefix,
            className: className,
            size: size,
            shape: shape,
            placeholder: placeholder,
            disabled: disabled,
            hasArrow: hasArrow,
            hasClear: hasClear,
            autoWidth: autoWidth,
            popupClassName: popupClassName,
            multiple: treeCheckable || multiple,
            value: this.getData(value, true),
            onChange: this.handleRemove,
            visible: visible,
            onVisibleChange: this.handleVisibleChange,
            overlay: this.renderOverlay(),
            container: container
        }, others));
    };

    return TreeSelect;
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
     * 树节点
     */
    children: _propTypes2['default'].node,
    /**
     * 选择框大小
     */
    size: _propTypes2['default'].oneOf(['small', 'medium', 'large']),
    /**
     * 选择框形状
     */
    shape: _propTypes2['default'].oneOf(['normal', 'arrow-only']),
    /**
     * 选择框占位符
     */
    placeholder: _propTypes2['default'].string,
    /**
     * 是否禁用
     */
    disabled: _propTypes2['default'].bool,
    /**
     * 是否显示右侧的箭头
     */
    hasArrow: _propTypes2['default'].bool,
    /**
     * 是否显示清空按钮，该按钮可以清空当前选中的值，该属性仅在单选模式下有效
     */
    hasClear: _propTypes2['default'].bool,
    /**
     * 下拉框是否与选择器对齐
     */
    autoWidth: _propTypes2['default'].bool,
    /**
     * 数据源，该属性优先级高于 children
     */
    dataSource: _propTypes2['default'].arrayOf(_propTypes2['default'].object),
    /**
     * （受控）当前值
     */
    value: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].arrayOf(_propTypes2['default'].string)]),
    /**
     * （非受控）默认值
     */
    defaultValue: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].arrayOf(_propTypes2['default'].string)]),
    /**
     * 选中值改变时触发的回调函数
     * @param {String|Array} value 选中的值，单选时返回单个值，多选时返回数组
     * @param {Object|Array} data 选中的数据，包括 value, label, pos, key属性，单选时返回单个值，多选时返回数组，父子节点选中关联时，同时选中，只返回父节点
     */
    onChange: _propTypes2['default'].func,
    /**
     * 初始下拉框是否显示
     */
    defaultVisible: _propTypes2['default'].bool,
    /**
     * 是否显示搜索框
     */
    showSearch: _propTypes2['default'].bool,
    /**
     * 在搜索框中输入时触发的回调函数
     * @param {String} keyword 输入的关键字
     */
    onSearch: _propTypes2['default'].func,
    /**
     * 是否支持多选
     */
    multiple: _propTypes2['default'].bool,
    /**
     * 下拉框中的树是否支持勾选节点的复选框
     */
    treeCheckable: _propTypes2['default'].bool,
    /**
     * 下拉框中的树勾选节点复选框是否完全受控（父子节点选中状态不再关联）
     */
    treeCheckStrictly: _propTypes2['default'].bool,
    /**
     * 下拉框中的树是否默认展开所有节点
     */
    treeDefaultExpandAll: _propTypes2['default'].bool,
    /**
     * 下拉框中的树默认展开节点key的数组
     */
    treeDefaultExpandedKeys: _propTypes2['default'].arrayOf(_propTypes2['default'].string),
    /**
     * 下拉框中的树异步加载数据的函数，使用请参考[Tree的异步加载数据Demo](http://fusion-demo.alibaba-inc.com/components?type=next&themeId=next&name=tree#tree-4)
     * @param {ReactElement} node 被点击展开的节点
     */
    treeLoadData: _propTypes2['default'].func,
    /**
     * 下拉框样式自定义类名
     */
    popupClassName: _propTypes2['default'].string,
    /**
     * 下拉框挂载的容器节点
     */
    container: _propTypes2['default'].oneOfType([_propTypes2['default'].string, _propTypes2['default'].func])
}, _class.defaultProps = {
    prefix: 'next-',
    size: 'medium',
    shape: 'normal',
    disabled: false,
    hasArrow: true,
    hasClear: false,
    autoWidth: false,
    defaultValue: null,
    defaultVisible: false,
    onChange: noop,
    showSearch: false,
    onSearch: noop,
    multiple: false,
    treeCheckable: false,
    treeCheckStrictly: false,
    treeDefaultExpandAll: false,
    treeDefaultExpandedKeys: []
}, _temp);
TreeSelect.displayName = 'TreeSelect';
exports['default'] = TreeSelect;


TreeSelect.Node = _nextTree.Node;
module.exports = exports['default'];