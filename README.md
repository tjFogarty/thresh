# thresh
[![Gitter](https://badges.gitter.im/Join Chat.svg)](https://gitter.im/LegitTalon/thresh?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Scroll threshold events for the browser.

*Honestly, this probably exists I just couldn't find it anywhere else.*


## Download

The easiest way is to use npm and browserify.

```
npm install thresh --save-dev
```

Or you can [download the latest release](https://github.com/LegitTalon/thresh/releases)
and add it to the page via `<script>` tags or something.

## Use

```javascript
// Ignore this `require` if you're not not using browserify.
var Thresh = require('thresh');

var thresh = Thresh();

/**
 * Thresh is an event emitter. Here are the important ones.
 */
tresh.on('up', function() {
  console.log('You broke the scrolling up threshold.');
});
tresh.on('down', function() {
  console.log('You broke the scrolling down threshold.');
});
tresh.on('top', function() {
  console.log('You broke the top threshold.');
});
tresh.on('bottom', function() {
  console.log('You broke the bottom threshold.');
});

/**
 * Here's a bonus event!
 */
thresh.on('scrollend', function() {
  console.log('You stopped scrolling.');
});
```

## Options

Pass an object as the second parameter upon instantiating. Here is an example
with all the default options.

```javascript
var Tresh = require('thresh');

var thresh = Thresh({

  /**
   * Adjust the trigger sensitivty of events. You probably want to play with
   * these.
   */
  threshold: {
    // Distance from top or bottom of page.
    up: 50,
    bottom: 50,

    // Distance from current scroll position.
    down: 50,
    top: 50
  },

  /**
   * The milliseconds to wait before deciding the user is done scrolling.
   * You probably don't need to play with this but you can.
   */
  scrollTimeout: 250,

  /**
   * You like lots of console.logs? change this to true.
   */
  debug: false
});
```

## Bugs

[File bugs here](https://github.com/LegitTalon/thresh/issues)

Pull requests are also welcome :wink:
