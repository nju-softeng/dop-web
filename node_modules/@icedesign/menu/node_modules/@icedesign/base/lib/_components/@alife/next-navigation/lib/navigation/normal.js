'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports['default'] = undefined;

var _navigation = require('./navigation.js');

var _navigation2 = _interopRequireDefault(_navigation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Normal = function (_Navigation) {
    _inherits(Normal, _Navigation);

    function Normal() {
        _classCallCheck(this, Normal);

        return _possibleConstructorReturn(this, _Navigation.apply(this, arguments));
    }

    /**
     * 由item子组件click触发select处理函数
     * @method onItemSelect
     */
    Normal.prototype.onItemSelect = function onItemSelect(itemid) {
        if (itemid === this.state.selectedKey) {
            return this;
        }

        _Navigation.prototype.onItemSelect.apply(this, arguments);

        if (this.props.selectedStyle) {
            this.setState({
                selectedKey: itemid
            });
        }
    };

    return Normal;
}(_navigation2['default']);

exports['default'] = Normal;


Normal.defaultProps.type = 'normal';
module.exports = exports['default'];