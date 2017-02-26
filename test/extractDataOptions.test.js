var extractDataOptions = require('..')

describe('extractDataOptions', function () {
  beforeEach(function () {
    fixture.setBase('test/fixtures')
    this.result = fixture.load('elements.html')
  })

  it('should return the basic types', function () {
    var el = this.result[0]
    var value = extractDataOptions(el, 'basic')
    var expected = {
      string: 'string',
      boolean: true,
      integer: 10,
      number: 3.14
    }

    expect(value).toEqual(expected)
  })

  it('should transform the property names into camelCase', function () {
    var el = this.result[1]
    var value = extractDataOptions(el, 'dummy')
    var expected = {
      someProperty: 'some value',
      testProperty: 100
    }

    expect(value).toEqual(expected)
  })

  it('should support nested properties', function () {
    var el = this.result[2]
    var value = extractDataOptions(el, 'carousel')
    var expected = {
      autoPlay: true,
      autoPlaySpeed: 300,
      controls: {
        next: '.arrow-next',
        prev: '.arrow-prev'
      },
      nested: {
        property: {
          deep: {
            test: true
          }
        }
      }
    }

    expect(value).toEqual(expected)
  })

  it('should get empty strings for options without value', function () {
    var el = this.result[3]
    var value = extractDataOptions(el, 'dummy')
    var expected = {
      test: '',
      nested: {
        property: {
          empty: ''
        }
      }
    }

    expect(value).toEqual(expected)
  })

  it('should support json values', function () {
    var el = this.result[4]
    var value = extractDataOptions(el, 'json')
    var expected = {
      object: {
        key: 'value'
      },
      array: [1, 2, 3, {k: 'v'}]
    }

    expect(value).toEqual(expected)
  })

  it('should return all data-* options', function () {
    var el = this.result[5]
    var value = extractDataOptions(el)
    var expected = {
      test: 'test',
      dummy: {
        prop: 'dummy prop'
      },
      jsonValue: []
    }

    expect(value).toEqual(expected)
  })
})
