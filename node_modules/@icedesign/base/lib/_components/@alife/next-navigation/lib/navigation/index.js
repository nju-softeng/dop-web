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

var _line = require('./line.js');

var _line2 = _interopRequireDefault(_line);

var _text = require('./text.js');

var _text2 = _interopRequireDefault(_text);

var _filling = require('./filling.js');

var _filling2 = _interopRequireDefault(_filling);

var _tree = require('./tree.js');

var _tree2 = _interopRequireDefault(_tree);

var _slip = require('./slip.js');

var _slip2 = _interopRequireDefault(_slip);

var _normal = require('./normal.js');

var _normal2 = _interopRequireDefault(_normal);

var _icononly = require('./icononly.js');

var _icononly2 = _interopRequireDefault(_icononly);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var NavigationMain = (_temp = _class = function (_React$Component) {
    _inherits(NavigationMain, _React$Component);

    function NavigationMain(props, context) {
        _classCallCheck(this, NavigationMain);

        var _this = _possibleConstructorReturn(this, _React$Component.call(this, props, context));

        if (!context.main) {
            _this.state = {
                selectedKey: props.selectedKey,
                openedKeys: props.openedKeys,
                type: props.type,
                nestingPath: []
            };
        }
        return _this;
    }

    NavigationMain.prototype.getChildContext = function getChildContext() {
        return {
            main: this.context.main || this
        };
    };

    NavigationMain.prototype.collectKey = function collectKey(children) {
        var _this2 = this;

        var openedKeys = void 0,
            selectedKey = void 0,
            _handle = void 0;

        _handle = function handle(children) {
            _react2['default'].Children.forEach(children, function (child, i) {
                if (child === null || child === undefined) {
                    return _this2;
                }

                if (typeof child.type === 'function') {
                    if (child.type.componentMark === 'item-main') {

                        if (child.props.opened) {
                            openedKeys = openedKeys || [];
                            openedKeys.push(child.props.itemid || child.key);
                        }

                        if (child.props.selected) {
                            selectedKey = child.props.itemid || child.key;
                        }
                    }
                }

                if (child.props) {
                    if (child.props.children) {
                        return _handle(child.props.children);
                    }
                }
            });
        };

        _handle(children);

        return {
            selectedKey: selectedKey,
            openedKeys: openedKeys
        };
    };

    NavigationMain.prototype.componentWillMount = function componentWillMount() {
        var key = void 0;

        if (!this.context.main) {
            key = this.collectKey(this.props.children);

            if (!this.state.selectedKey) {
                this.state.selectedKey = key.selectedKey;
            }

            if (!this.state.openedKeys) {
                this.state.openedKeys = key.openedKeys;
            }
        }
    };

    NavigationMain.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        var key = void 0,
            state = {},
            recently = void 0,
            current = void 0;

        if (!this.context.main) {
            key = this.collectKey(nextProps.children);

            if (nextProps.selectedKey) {
                state.selectedKey = nextProps.selectedKey;
            } else {
                state.selectedKey = key.selectedKey;
            }

            if (nextProps.openedKeys) {
                state.openedKeys = nextProps.openedKeys;
            } else {
                current = key.openedKeys;
                recently = this.collectKey(this.props.children).openedKeys;

                if (!(current === recently)) {
                    if (current === undefined || recently === undefined) {
                        state.openedKeys = current || [];
                    } else {
                        if (!(current.length === recently.length)) {
                            current = current.sort();
                            recently = recently.sort();

                            if (current.some(function (key, i) {
                                return !(key === recently[i]);
                            })) {
                                state.openedKeys = current;
                            }
                        }
                    }
                }
            }

            if (nextProps.type) {
                state.type = nextProps.type;
            }

            this.setState(state);

            if (nextProps.type) {
                if (!(this.state.type === nextProps.type)) {
                    this.onChangeType(this.state.type, nextProps.type);
                }
            }
        }
    };

    NavigationMain.prototype.onChangeType = function onChangeType(type, nextType) {
        var hasTree = type === 'tree' || nextType === 'tree',
            toTree = hasTree ? nextType === 'tree' : false,
            state = this.state,
            length = state.nestingPath ? state.nestingPath.length : 0,
            item = void 0;

        if (hasTree) {
            if (state.nestingPath) {
                if (state.nestingPath.length > 0) {
                    if (toTree) {
                        item = state.nestingPath[length - 1];
                    } else {
                        item = state.nestingPath[0];
                    }

                    if (item.props.selectedStyle) {
                        if (length === 1) {
                            if (item.props.hasChildren) {
                                return this.setState({
                                    selectedKey: null
                                });
                            }
                        }

                        this.setState({
                            selectedKey: item.props.itemid
                        });
                    }
                }
            }
        }
    };

    NavigationMain.prototype.cloneProperty = function cloneProperty() {
        var props = this.props,
            newProps = {},
            empty = function empty() {},
            onSelect = void 0,
            onUnFold = void 0,
            onFold = void 0;

        Object.keys(props).forEach(function (key) {
            newProps[key] = props[key];
        });

        onSelect = newProps['onSelect'] || empty;
        onUnFold = newProps['onUnFold'] || empty;
        onFold = newProps['onFold'] || empty;

        newProps['onSelect'] = function (itemid, item) {
            var selectedStyle = item.props.selectedStyle,
                state = this.state;


            state.nestingPath = item.nestingPath;

            if (selectedStyle) {
                state.selectedKey = itemid;
            }

            onSelect.apply(null, arguments);
        }.bind(this);

        newProps['onFold'] = function (itemid) {
            if (!this.state.openedKeys) {
                this.state.openedKeys = [];
            }

            var index = this.state.openedKeys.indexOf(itemid);

            if (index > -1) {
                this.state.openedKeys.splice(index, 1);

                this.setState({
                    openedKeys: this.state.openedKeys
                });
            }

            onFold.apply(null, arguments);
        }.bind(this);

        newProps['onUnFold'] = function (itemid) {
            if (!this.state.openedKeys) {
                this.state.openedKeys = [];
            }

            var hasThisKey = this.state.openedKeys.indexOf(itemid) > -1;

            if (!hasThisKey) {
                this.state.openedKeys.push(itemid);
            }

            this.setState({
                openedKeys: this.state.openedKeys
            });

            onUnFold.apply(null, arguments);
        }.bind(this);

        newProps['selectedKey'] = this.state.selectedKey;
        newProps['openedKeys'] = this.state.openedKeys;
        newProps['type'] = this.state.type;

        return newProps;
    };

    NavigationMain.prototype.render = function render() {
        var context = this.context;
        var type = context.type || this.props.type;
        var component = void 0;
        var props = context.main ? this.props : this.cloneProperty();

        type = type.toLowerCase();
        component = NavigationMain.typeMap[type];

        if (component) {
            return _react2['default'].createElement(component, props, this.props.children);
        }
    };

    return NavigationMain;
}(_react2['default'].Component), _class.componentMark = 'navigation-main', _class.typeMap = {
    line: _line2['default'],
    text: _text2['default'],
    slip: _slip2['default'],
    tree: _tree2['default'],
    normal: _normal2['default'],
    filling: _filling2['default'],
    icononly: _icononly2['default']
}, _temp);
NavigationMain.displayName = 'NavigationMain';
exports['default'] = NavigationMain;


NavigationMain.propTypes = {
    type: _propTypes2['default'].string,
    children: _propTypes2['default'].any
};

NavigationMain.defaultProps = {
    type: 'text'
};

NavigationMain.contextTypes = {
    type: _propTypes2['default'].string,
    main: _propTypes2['default'].any
};

NavigationMain.childContextTypes = {
    main: _propTypes2['default'].any
};
module.exports = exports['default'];