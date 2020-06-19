'use strict';

var React = require('react');
var classNames = require('classnames');
var ClassNameMixin = require('./mixins/ClassNameMixin');

var FormGroup = React.createClass({
  displayName: 'FormGroup',

  mixins: [ClassNameMixin],

  propTypes: {
    validation: React.PropTypes.string,
    amSize: React.PropTypes.oneOf(['sm', 'lg']),
    hasFeedback: React.PropTypes.bool
  },

  render: function render() {
    var classSet = {};

    classSet[this.setClassNamespace('form-group')] = true;
    this.props.validation && (classSet[this.setClassNamespace('form-' + this.props.validation)] = true);
    classSet[this.setClassNamespace('form-feedback')] = this.props.hasFeedback;
    classSet[this.setClassNamespace('form-icon')] = this.props.hasFeedback;

    if (this.props.amSize) {
      classSet[this.setClassNamespace('form-group-' + this.props.amSize)] = true;
    }

    return React.createElement(
      'div',
      { className: classNames(classSet, this.props.className) },
      this.props.children
    );
  }
});

module.exports = FormGroup;