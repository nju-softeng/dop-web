'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IframeUploader = exports.Html5Uploader = undefined;

var _html5Uploader = require('./html5-uploader.js');

var _html5Uploader2 = _interopRequireDefault(_html5Uploader);

var _iframeUploader = require('./iframe-uploader.js');

var _iframeUploader2 = _interopRequireDefault(_iframeUploader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

exports.Html5Uploader = _html5Uploader2['default'];
exports.IframeUploader = _iframeUploader2['default'];