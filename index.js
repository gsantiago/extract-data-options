var camelCase = require('camel-case')
var setKeypathValue = require('lodash.set')

function extractDataOptions (element, namespace) {
  var regex = namespace
    ? new RegExp('data-' + namespace + '-(.*)')
    : /data-(.*)/

  var attrs = element.attributes
  var options = {}

  for (var i = 0, max = attrs.length; i < max; i += 1) {
    var match = attrs[i].name.match(regex)
    if (match) {
      var keypath = match[1].split('.').map(function (key) {
        return camelCase(key)
      }).join('.')
      var value = parseValue(attrs[i].value)
      setKeypathValue(options, keypath, value)
    }
  }

  return options
}

function parseValue (value) {
  try {
    return JSON.parse(value)
  } catch (e) {
    return value
  }
}

module.exports = extractDataOptions
