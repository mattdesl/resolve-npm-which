var find = require('./')
var test = require('tape')
var path = require('path')
var conf = require('npmconf')

test('should find a local dependency', function(t) {
  t.plan(2)
  var expected = path.resolve('node_modules', 'watchify')
  find('watchify', { basedir: process.cwd() }, function(err, file) {
    if (err) return t.fail(err)
    t.equal(file, expected)
    t.doesNotThrow(function() {
      return require(file)
    })
  })
})

test('should find a global dependency', function(t) {
  t.plan(2)
  conf.load({}, function(err, config) {
    if (err) return t.fail(err)
    var expected = path.resolve(config.get('prefix'), 'lib', 'node_modules', 'browserify')
    find('browserify', { basedir: process.cwd() }, function(err, file) {
      if (err) return t.fail(err)
      t.equal(file, expected)
      t.doesNotThrow(function() {
        return require(file)
      })
    })
  })
})

