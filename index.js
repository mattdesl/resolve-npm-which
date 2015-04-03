var path = require('path')
var fs = require('fs')
var resolve = require('resolve')
var which = require('npm-which')
var dz = require('dezalgo')

module.exports = function(name, opt, cb) {
  cb = dz(cb)

  //look for it locally
  resolve(name, opt, function (err, result) {
    if (err)
      npmWhich()
    else 
      cb(null, path.dirname(result))
  })

  function npmWhich() {
    //e.g. /Users/username/npm/bin/watchify
    which(opt.basedir)(name, function(err, bin) {
      if (err) 
        return cb(bail())

      //assume its a symlink and get the real target
      fs.realpath(bin, function(err, link) {
        if (err) 
          return cb(bail())

        //now walk upward until we hit the folder by name
        var binPath = getBinPath(link)
        if (binPath)
          cb(null, binPath)
        else
          cb(bail())
      })
    })
  }

  function getBinPath(file) {
    var found, 
      last
    while (file !== last) {
      var base = path.basename(file)
      if (base === 'node_modules') 
        break
      if (base === name) {
        found = file
        break
      }
      last = file
      file = path.resolve(file, '..')
    }
    return found
  }

  function bail() {
    return new Error('"'+name+'" is not installed locally or globally')
  }
}