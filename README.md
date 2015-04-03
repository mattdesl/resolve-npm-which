# resolve-npm-which

[![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

For a CLI module like `"browserify"` or `"watchify"`, resolves to the path for that module in local or global installs.

```js
var find = require('resolve-npm-which')

find('browserify', {
  basedir: process.cwd()
}, function(err, file) {
  if (err) throw err
  
  // now require it !
  var browserify = require(file)
})
```

First it will use the [resolve](https://www.npmjs.com/package/resolve) algorithm to look through locals, and then it will fall back to [npm-which](https://www.npmjs.com/package/npm-which) to look through globals.

The callback provides the path to the module so that it can be required.

## Usage

[![NPM](https://nodei.co/npm/resolve-npm-which.png)](https://www.npmjs.com/package/resolve-npm-which)

#### `find(name, opt, cb)`

Finds the module `name` with the given options (passed to [resolve](https://www.npmjs.com/package/resolve)), then calls `cb` with the error/success state. 

Options must include `basedir` to search for.

## Test

Note: To test, you need to have `browserify` installed gobally, and `npm config get prefix` should return a meaningful value.

## License

MIT, see [LICENSE.md](http://github.com/mattdesl/resolve-npm-which/blob/master/LICENSE.md) for details.
