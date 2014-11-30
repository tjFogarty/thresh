/**
 * Flexible scrollend event for the browser.
 *
 * @file Scrollend
 * @author Talon
 */
var EventEmitter = require('events').EventEmitter;
var inherits     = require('util').inherits;
var $            = require('jquery');

var Scrollend = function(timeout) {
  if (!(this instanceof Scrollend)) return new Scrollend(timeout);
  timeout = timeout || 250;
  var self = this;
  $(window).scroll(function() {
    clearTimeout($.data(this, 'scrollTimer'));
    $.data(this, 'scrollTimer', setTimeout(function() {
      self.emit('scrollend');
    }, timeout));
  });
};

inherits(Scrollend, EventEmitter);

/**
 * Alias for .on('scrollend')
 */
Scrollend.prototype.add = function(fn) {
  this.on('scrollend', fn);
};


/**
 * @exports
 */
module.exports = function(timeout) {
  var s = new Scrollend(timeout);
  return s.add.bind(s);
};
