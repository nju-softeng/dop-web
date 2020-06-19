'use strict';

/**
 * React version of NProgress
 * https://github.com/rstacruz/nprogress/
 */

var React = require('react');
var ReactDOM = require('react-dom');
var ClassNameMixin = require('./mixins/ClassNameMixin');

function clamp(n, min, max) {
  if (n < min) {
    return min;
  }

  if (n > max) {
    return max;
  }

  return n;
}

function toBarPercentage(n) {
  return (-1 + n) * 100;
}

var NProgress = React.createClass({
  displayName: 'NProgress',

  mixins: [ClassNameMixin],

  propTypes: {
    minimum: React.PropTypes.number,
    easing: React.PropTypes.string,
    speed: React.PropTypes.number,
    spinner: React.PropTypes.bool,
    trickle: React.PropTypes.bool,
    trickleRate: React.PropTypes.number,
    trickleSpeed: React.PropTypes.number
  },

  getInitialState: function getInitialState() {
    return {
      status: null
    };
  },

  getDefaultProps: function getDefaultProps() {
    return {
      minimum: 0.08,
      easing: 'ease',
      speed: 200,
      trickle: true,
      trickleRate: 0.02,
      trickleSpeed: 800
    };
  },

  start: function start() {
    var _this = this;
    var n = this.state.status; // this.set() is not sync to affected this.state.status

    if (!this.state.status) {
      this.set(this.props.minimum);
      n = this.props.minimum;
    }

    var work = function work() {
      setTimeout(function () {
        if (!n || n === 1) {
          return;
        }

        _this.trickle();
        work();
      }, _this.props.trickleSpeed);
    };

    this.props.trickle && work();
  },

  set: function set(n) {
    var _this = this;

    n = clamp(n, this.props.minimum, 1);
    this.setState({
      status: n
    });

    if (n === 1) {
      var progress = ReactDOM.findDOMNode(this.refs.progress);

      progress.style.opacity = 1;
      progress.style.transition = 'none';
      progress.offsetWidth;

      setTimeout(function () {
        progress.style.opacity = 0;
        progress.style.transition = 'all ' + _this.props.speed + 'ms linear';

        setTimeout(function () {
          _this.reset();
        }, _this.props.speed + 100);
      }, _this.props.speed);
    }
  },

  reset: function reset() {
    this.setState({
      status: null
    });
  },

  done: function done() {
    if (this.state.status) {
      this.inc(0.3 + 0.5 * Math.random());
      this.set(1);
    }
  },

  inc: function inc(amount) {
    var n = this.state.status;

    if (!n) {
      return this.start();
    } else {
      if (typeof amount !== 'number') {
        amount = (1 - n) * clamp(Math.random() * n, 0.1, 0.95);
      }

      n = clamp(n + amount, 0, 0.994);
      return this.set(n);
    }
  },

  trickle: function trickle() {
    if (this.state.status < 1) {
      this.inc(Math.random() * this.props.trickleRate);
    }
  },

  render: function render() {
    var props = this.props;
    var percent = this.state.status === null ? '-100' : toBarPercentage(this.state.status);
    var barStyle = {
      transition: 'all ' + props.speed + 'ms ' + props.easing,
      transform: 'translate(' + percent + '%,0)'
    };
    var spinner = props.spinner ? React.createElement(
      'div',
      { className: 'nprogress-spinner', ref: 'spinner' },
      React.createElement('div', { className: 'nprogress-spinner-icon' })
    ) : null;

    return this.state.status ? React.createElement(
      'div',
      { id: 'nprogress', ref: 'progress' },
      React.createElement(
        'div',
        { className: 'nprogress-bar', ref: 'bar', style: barStyle },
        React.createElement('div', { className: 'nprogress-peg' })
      ),
      spinner
    ) : null;
  }
});

module.exports = NProgress;