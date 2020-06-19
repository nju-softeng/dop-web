'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp, _initialiseProps;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _nextUtil = require('../../../next-util/lib/index.js');

var _util = require('../util/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var INPUT_STYLE = {
    position: 'absolute',
    top: 0,
    right: 0,
    fontSize: 9999,
    zIndex: 9999,
    opacity: 0,
    outline: 'none',
    cursor: 'pointer'
};

var noop = function noop() {};

var IframeUploader = (_temp = _class = function (_Component) {
    _inherits(IframeUploader, _Component);

    function IframeUploader(props) {
        _classCallCheck(this, IframeUploader);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

        _initialiseProps.call(_this);

        _this.domain = typeof document !== 'undefined' && document.domain ? document.domain : '';
        return _this;
    }

    IframeUploader.prototype.componentDidMount = function componentDidMount() {
        this.updateInputWH();
    };

    IframeUploader.prototype.componentDidUpdate = function componentDidUpdate() {
        this.updateInputWH();
    };

    IframeUploader.prototype.endUpload = function endUpload() {
        if (this.state.uploading) {
            this.file = {};
            // eslint-disable-next-line
            this.state.uploading = false;
            this.setState({ uploading: false });
        }
    };

    IframeUploader.prototype.startUpload = function startUpload() {
        if (!this.state.uploading) {
            // eslint-disable-next-line
            this.state.uploading = true;
            this.setState({ uploading: true });
        }
    };

    IframeUploader.prototype.updateInputWH = function updateInputWH() {
        var rootNode = _reactDom2['default'].findDOMNode(this);
        var inputNode = this.refs.input;
        inputNode.style.height = rootNode.offsetHeight + 'px';
        inputNode.style.width = rootNode.offsetWidth + 'px';
    };

    IframeUploader.prototype.abort = function abort(file) {
        if (file) {
            var _uid = file;
            if (file && file.uid) {
                _uid = file.uid;
            }
            if (_uid === this.file.uid) {
                this.endUpload();
            }
        } else {
            this.endUpload();
        }
    };

    IframeUploader.prototype.post = function post(file) {
        var formNode = this.refs.form;
        var dataSpan = this.refs.data;

        var data = this.props.data || this.props.multipart;
        if (typeof data === 'function') {
            data = data(file);
        }

        var inputs = document.createDocumentFragment();
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                var input = document.createElement('input');
                input.setAttribute('name', key);
                input.value = data[key];
                inputs.appendChild(input);
            }
        }
        dataSpan.appendChild(inputs);
        formNode.submit();
        dataSpan.innerHTML = '';
        this.props.onStart([file]);
    };

    IframeUploader.prototype.render = function render() {
        var _props = this.props,
            disabled = _props.disabled,
            className = _props.className,
            children = _props.children,
            accept = _props.accept,
            name = _props.name,
            style = _props.style;


        var iframeName = name + '-iframe';

        return _react2['default'].createElement(
            'span',
            { className: className, style: _extends({
                    position: 'relative',
                    zIndex: 0,
                    display: 'inline-block'
                }, style) },
            !disabled ? _react2['default'].createElement('iframe', { ref: 'iframe', name: iframeName, onLoad: this.onLoad, style: { display: 'none' } }) : null,
            _react2['default'].createElement(
                'form',
                { ref: 'form', method: 'post', action: this.props.action, encType: 'multipart/form-data', target: iframeName },
                _react2['default'].createElement('input', { ref: 'input', type: 'file', accept: accept, name: name, onChange: this.onChange, style: INPUT_STYLE }),
                _react2['default'].createElement('input', { name: '_documentDomain', value: this.domain, type: 'hidden' }),
                _react2['default'].createElement('span', { ref: 'data' })
            ),
            children
        );
    };

    return IframeUploader;
}(_react.Component), _class.propTypes = {
    style: _propTypes2['default'].object,
    action: _propTypes2['default'].string.isRequired,
    name: _propTypes2['default'].string.isRequired,
    data: _propTypes2['default'].oneOfType([_propTypes2['default'].object, _propTypes2['default'].func]),
    multipart: _propTypes2['default'].oneOfType([_propTypes2['default'].object, _propTypes2['default'].func]),
    disabled: _propTypes2['default'].bool,
    className: _propTypes2['default'].string,
    children: _propTypes2['default'].node,
    fileList: _propTypes2['default'].array,
    headers: _propTypes2['default'].object,
    beforeUpload: _propTypes2['default'].func,
    onStart: _propTypes2['default'].func,
    onSuccess: _propTypes2['default'].func,
    onError: _propTypes2['default'].func,
    accept: _propTypes2['default'].string
}, _class.defaultProps = {
    name: 'file',
    beforeUpload: noop,
    onStart: noop,
    onSuccess: noop,
    onError: noop,
    onAbort: noop
}, _initialiseProps = function _initialiseProps() {
    var _this2 = this;

    this.state = {
        uploading: false
    };
    this.file = {};

    this.onLoad = function () {
        if (!_this2.state.uploading) {
            return;
        }
        var props = _this2.props,
            file = _this2.file;

        var response = void 0;
        try {
            var doc = _this2.refs.iframe.contentDocument;
            var script = doc.getElementsByTagName('script')[0];
            if (script && script.parentNode === doc.body) {
                doc.body.removeChild(script);
            }
            response = doc.body.innerHTML;
            props.onSuccess(response, file);
        } catch (err) {
            _nextUtil.log.warning('cross domain error for Upload. Maybe server should return document.domain script.');
            response = 'cross-domain';
            props.onError(err, null, file);
        }
        _this2.endUpload();
    };

    this.onChange = function (e) {
        var file = _this2.file = {
            uid: (0, _util.uid)(),
            name: e.target.value
        };
        _this2.startUpload();
        var props = _this2.props;

        if (!props.beforeUpload) {
            return _this2.post(file);
        }
        var before = props.beforeUpload(file);
        if (before && before.then) {
            before.then(function () {
                _this2.post(file);
            }, function () {
                _this2.endUpload();
            });
        } else if (before !== false) {
            _this2.post(file);
        } else {
            _this2.endUpload();
        }
    };
}, _temp);
IframeUploader.displayName = 'IframeUploader';
exports['default'] = IframeUploader;
module.exports = exports['default'];