/**
 * Scroll threshold events for the browser.
 *
 * @file Thresh
 */
var EventEmitter = require('events').EventEmitter;
var inherits     = require('util').inherits;
var $            = require('jquery');
var scrollend    = require('scrollend');

var Thresh = function(opts) {
  if (!(this instanceof Thresh)) return new Thresh(opts);

  /**
   * Defaults options.
   */
  this.opts                  = opts                       || {};
  this.opts.threshold        = this.opts.threshold        || {};

  this.opts.threshold.down   = this.opts.threshold.down   || 50;
  this.opts.threshold.up     = this.opts.threshold.up     || 50;
  this.opts.threshold.bottom = this.opts.threshold.bottom || 50;
  this.opts.threshold.top    = this.opts.threshold.top    || 50;

  this.opts.scrollTimeout    = this.opts.scrollTimeout    || 250;

  this.DEBUG = this.opts.debug || false;

  /**
   * Initialize.
   */
  this.init();

};

/**
 * @exports
 */
module.exports = Thresh;

/**
 * Inherit EventEmitter so we can, emit events.
 */
inherits(Thresh, EventEmitter);

/**
 * Keep track of last scroll position.
 */
Thresh.prototype.lastScrollTop = {
  lastScrollTop: 0,
  get: function() {
    return this.lastScrollTop;
  },
  set: function(val) {
    this.lastScrollTop = val;
    return val;
  }
};

Thresh.prototype.isDownScroll = true;

Thresh.prototype.down = function() {
  var self = this;
  return self.isDownScroll && self.delta > self.opts.threshold.down;
};
Thresh.prototype.up = function() {
  var self = this;
  return !self.isDownScroll && self.delta > self.opts.threshold.up;
};
Thresh.prototype.top = function() {
  var self = this;
  return $(window).scrollTop() <= self.opts.threshold.top;
};
Thresh.prototype.bottom = function() {
  var self = this;
  var distance = $(window).scrollTop() + $(window).height();
  return ($(document).height() - distance) <= self.opts.threshold.bottom;
};

/**
 * Define events.
 */
Thresh.prototype.init = function() {
  var self = this;

  scrollend(function() {
    self.lastScrollTop.set($this.scrollTop());
  });

  $(window).scroll(function() {

    var $this         = $(this);
    self.delta        = Math.abs($this.scrollTop() - self.lastScrollTop.get());
    self.isDownScroll = $this.scrollTop() > self.lastScrollTop.get();

    /**
     * Scroll end event.
     */
    clearTimeout($.data(this, 'scrollTimer'));
    $.data(this, 'scrollTimer', setTimeout(function() {
      self.emit('scrollend');
    }, self.opts.scrollTimeout));

    /**
     * Emit events.
     */
    if (self.top()) {
      self.log('emit: top');
      self.emit('top');
      return;
    }
    if (self.bottom()) {
      self.log('emit: bottom');
      self.emit('bottom');
      return;
    }
    if (self.down()) {
      self.log('emit: down');
      self.emit('down');
      return;
    }
    if (self.up()) {
      self.log('emit: up');
      self.emit('up');
      return;
    }

  });
};

Thresh.prototype.log = function(/* ..args */) {
  if (!this.DEBUG) return;
  var args = Array.prototype.slice.call(arguments);
  console.log.apply(console, ["Thresh:"].concat(args));
};
