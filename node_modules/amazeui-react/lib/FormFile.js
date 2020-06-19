'use strict';

var React = require('react');
var classNames = require('classnames');
var ClassNameMixin = require('./mixins/ClassNameMixin');
var Button = require('./Button');
var Input = require('./Input');

var FormFile = React.createClass({
  displayName: 'FormFile',

  mixins: [ClassNameMixin],

  propTypes: {},

  getDefaultProps: function getDefaultProps() {
    return {};
  },

  render: function render() {
    return React.createElement(
      FormGroup,
      {
        className: this.setClassNamespace('form-file')
      },
      React.createElement(Input, { type: 'file', standalone: true })
    );
  }
});

module.exports = FormFile;