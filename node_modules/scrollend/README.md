# Scrollend

Flexible scrollend event for the browser.

# Install

```
npm install scrollend --save-dev
```

or

[Download the latest release.](https://github.com/LegitTalon/scrollend/releases)

# Use

```javascript
// Skip this line if you are not using browserify.
var Scrollend = require('scrollend');

var scrollend = Scrollend();
scrollend(function() {
  console.log('done scrolling');
});

scrollend(function() {
  console.log('another done scrolling event.');
});
```

# Bugs/Improvements

[Check out the issue queue](https://github.com/LegitTalon/scrollend/issues)

PRs welcome :wink:

