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

var _nextIcon = require('../../next-icon/lib/index.js');

var _nextIcon2 = _interopRequireDefault(_nextIcon);

var _nextLocaleProvider = require('../../next-locale-provider/lib/index.js');

var _nextLocaleProvider2 = _interopRequireDefault(_nextLocaleProvider);

var _nextUtil = require('../../next-util/lib/index.js');

var _fileUpload = require('./file-upload.js');

var _fileUpload2 = _interopRequireDefault(_fileUpload);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

/**
 * Upload.ImageUpload
 * @order 1
 * @description 继承 Upload 的 API，除非特别说明
 */
var ImageUpload = (_temp = _class = function (_Component) {
    _inherits(ImageUpload, _Component);

    function ImageUpload() {
        _classCallCheck(this, ImageUpload);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    ImageUpload.prototype.render = function render() {
        var _props = this.props,
            locale = _props.locale,
            disabled = _props.disabled,
            triggerDisable = _props.triggerDisable;

        var prefix = this.context.prefix || this.props.prefix;
        var prefixCls = prefix + 'upload-text';

        // API `triggerDisable` -> `disabled` 提醒
        triggerDisable && _nextUtil.log.deprecated('triggerDisable', 'disabled', 'ImageUpload');

        return _react2['default'].createElement(
            _fileUpload2['default'],
            _extends({}, this.props, { disabled: disabled || triggerDisable }),
            _react2['default'].createElement(_nextIcon2['default'], { type: 'add', size: 'large' }),
            _react2['default'].createElement(
                'div',
                { className: prefixCls },
                locale.image.addPhoto
            )
        );
    };

    return ImageUpload;
}(_react.Component), _class.propTypes = {
    prefix: _propTypes2['default'].string,
    language: _propTypes2['default'].string,
    locale: _propTypes2['default'].object,
    triggerDisable: _propTypes2['default'].bool,
    disabled: _propTypes2['default'].bool
}, _class.defaultProps = {
    prefix: 'next-'
}, _class.contextTypes = {
    prefix: _propTypes2['default'].string
}, _temp);
ImageUpload.displayName = 'ImageUpload';


ImageUpload.displayName = 'ImageUpload';

exports['default'] = (0, _nextLocaleProvider2['default'])(ImageUpload);
module.exports = exports['default'];