# extract-data-options

<p align="center">
  <a href="https://saucelabs.com/u/extactdataoptions">
    <img src="https://saucelabs.com/browser-matrix/extactdataoptions.svg" alt="Sauce Test Status">
  </a>
</p>

Extract options from data attributes:

```html
<div class="js-carousel"
     data-carousel-index="0"
     data-carousel-auto-play="true"
     data-carousel-controls.prev=".js-prev"
     data-carousel-control.next=".js-next"
     data-carousel-dots=".my-dots">
</div>
```

```js
// Import the module
var extractDataOptions = require('extract-data-options')

// Get the element
var element = document.querySelector('.js-carousel')

// Extract the options from `data-carousel-*` attributes
var options = extractDataOptions(element, 'carousel')
```

The function will return:

```js
{
  index: 0,
  autoPlay: true,
  controls: {
    prev: '.js-prev',
    next: '.js-next'
  },
  dots: '.my-dots'
}
```

## installation

`npm install extract-data-options --save`

## usage

### function

`extractDataOptions(element: HTMLElement, namespace: String) : Object`

If you don't pass a namespace, it will return all data-* options.

### camel case

This module will automatically convert the attributes names into camelCase. So, an attribute like `data-example-my-option` will be turned into `myOption`.

### nested properties

You can use nested properties too. Just use a dot (`.`) to define the keypath:

`data-example-prop.show.example="hello"`, will result into:

```js
{
  prop: {
    show: {
      example: 'hello'
    }
  }
}
```

**OBS:** Don't worry about this notation with dots. It is a [valid HTML5 standard](https://www.w3.org/TR/html/syntax.html#elements-attributes).

### json

This module will always attempt to parse the values as JSON, otherwise it will set the value as a String.

The following options:

```html
<div data-option-boolean="true"
     data-option-number="3.14"
     data-option-object='{"key": "value"}'
     data-option-array="[1, 2, 3]"
     data-option-string="A simple string">
</div>
```

Will produce the result below:

```js
{
  boolean: true,
  number: 3.14,
  object: {key: 'value'},
  array: [1, 2, 3],
  string: 'A simple string'
}
```

## tests

Install all dependencies:

`npm install`

Run the tests:

`npm test`

## license

MIT
