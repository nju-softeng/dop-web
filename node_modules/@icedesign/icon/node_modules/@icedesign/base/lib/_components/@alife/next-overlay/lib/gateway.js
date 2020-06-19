'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports['default'] = undefined;

var _class, _temp; //将DOM元素渲染到指定的容器

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Children = _react2['default'].Children;

//<body> [containerNode]
//  <div>
//      <content></content>  [contentNode]
// </div>  [wrapperNode]
// </body>

/** Overlay.Gateway */
var Gateway = (_temp = _class = function (_React$Component) {
    _inherits(Gateway, _React$Component);

    function Gateway() {
        _classCallCheck(this, Gateway);

        return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
    }

    Gateway.prototype.componentWillReceiveProps = function componentWillReceiveProps(newProps) {
        if (this.wrapper && newProps.container !== this.props.container) {
            this.getContainerNode(newProps).appendChild(this.wrapper);
        }
    };

    Gateway.prototype.componentDidMount = function componentDidMount() {
        this._renderOverlay();
    };

    Gateway.prototype.componentDidUpdate = function componentDidUpdate() {
        this._renderOverlay();
    };

    Gateway.prototype.componentWillUnmount = function componentWillUnmount() {
        this._unRenderWrapper();
    };

    Gateway.prototype._renderOverlay = function _renderOverlay() {
        var _this2 = this;

        var children = this.props.children ? Children.only(this.props.children) : null;
        if (children) {
            this._renderWrapper();
            // add refs of overlay
            var originRef = typeof children.ref === 'function' ? children.ref : null;
            children = _react2['default'].cloneElement(children, {
                ref: function ref(node) {
                    originRef && originRef(node);
                    _this2._overlay = node;
                }
            });
            _reactDom2['default'].unstable_renderSubtreeIntoContainer(this, children, this.wrapper);
        } else {
            this._unRenderWrapper();
        }
    };

    Gateway.prototype._renderWrapper = function _renderWrapper() {
        if (!this.wrapper) {
            this.wrapper = document.createElement('div');
            this.wrapper.setAttribute('data-tag', 'gateway-wrapper');
            this.getContainerNode().appendChild(this.wrapper);
        }
    };

    Gateway.prototype._unRenderWrapper = function _unRenderWrapper() {
        if (this.wrapper) {
            _reactDom2['default'].unmountComponentAtNode(this.wrapper);
            var containerNode = this.getContainerNode();
            containerNode && containerNode.removeChild(this.wrapper);
            this._overlay = null;
            this.wrapper = null;
        }
    };

    Gateway.prototype.getNode = function getNode(props, name, node) {
        var container = (props || this.props)[name];
        if (typeof container === 'function') {
            container = container(node);
        }
        if (typeof container === 'string') {
            container = document.getElementById(container);
        } else {
            try {
                container = _reactDom2['default'].findDOMNode(container);
            } catch (err) {
                // regardless of error
            }
        }
        return container;
    };

    Gateway.prototype.getContainerNode = function getContainerNode(props) {
        return this.getNode(props, 'container', this.getTargetNode());
    };

    Gateway.prototype.getTargetNode = function getTargetNode(props) {
        return this.getNode(props, 'target');
    };

    Gateway.prototype.getContentNode = function getContentNode() {
        if (this._overlay) {
            return _reactDom2['default'].findDOMNode(this._overlay);
        }
    };

    Gateway.prototype.getWrapperNode = function getWrapperNode() {
        return this.wrapper;
    };

    Gateway.prototype.render = function render() {
        return null;
    };

    return Gateway;
}(_react2['default'].Component), _class.propTypes = {
    children: _propTypes2['default'].any,
    /**
     * 指定渲染children的容器
     */
    container: _propTypes2['default'].any
}, _class.defaultProps = {
    container: function container() {
        return document.body;
    }
}, _temp);
Gateway.displayName = 'Gateway';
exports['default'] = Gateway;
module.exports = exports['default'];