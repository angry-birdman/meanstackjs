var user = require('./user.controller.js')
var fs = require('fs')
var path = require('path')
var multer = require('multer')
var upload = multer({ dest: 'client/uploads/' })

module.exports = function (app, auth, mail, settings) {
  app.post('/api/photos/upload', upload.single('file'), function (req, res, next) {
    if (req.file) {
      var filePath = path.resolve(__dirname, '../../../client/uploads/')
      fs.readFile(req.file.path, function (err, data) {
        if (err) {
          return res.status(400).send(err)
        }
        var createDir = filePath + '/' + req.file.originalname
        fs.writeFile(createDir, data, function (err) {
          if (err) {
            return res.status(400).send(err)
          } else {
            return res.status(201).send()
          }
        })
      })
    }
  })
  app.post('/api/authenticate', user.postAuthenticate)
  app.get('/api/authenticate', user.getAuthenticate)
  app.post('/api/login', user.postLogin)
  app.get('/api/logout', user.logout)
  app.get('/api/forgot', user.getForgot)
  app.post('/api/forgot', user.postForgot)
  app.get('/api/reset/:token', user.getReset)
  app.post('/api/reset/:token', user.postReset)
  app.get('/api/signup', user.getSignup)
  app.post('/api/signup', user.postSignup)
  app.get('/api/account', auth.isAuthenticated, user.getAccount)
  app.post('/api/account/profile', auth.isAuthenticated, user.postUpdateProfile)
  app.post('/api/account/password', auth.isAuthenticated, user.postUpdatePassword)
  app.post('/api/account/delete', auth.isAuthenticated, user.postDeleteAccount)
}
