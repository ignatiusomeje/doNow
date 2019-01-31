'use strict';

var a127 = require('a127-magic');
var express = require('express');
const bodyParser = require('body-parser');

var app = express();

const {todoCreateRoute} = require('./api/controllers/todoroutes/create-todo-route');
const {todoGetAllRoute} = require('./api/controllers/todoroutes/get-todo-route');
const {todoGetOneRoute} = require('./api/controllers/todoroutes/get-todo-by-id-route');
const {todoUpdateRoute} = require('./api/controllers/todoroutes/update-todo-route');
const {todoDeleteRoute} = require('./api/controllers/todoroutes/delete-todo-route');

const {userCreateRoute} = require('./api/controllers/userroutes/create-user-route');
const {userLoginRoute} = require('./api/controllers/userroutes/login-user-route');
const {userVerifyAccountRoute} = require('./api/controllers/userroutes/verify-account-route');
const {userPasswordResetRoute} = require('./api/controllers/userroutes/reset-password-route');
const {userChangePasswordRoute} = require('./api/controllers/userroutes/change-password-route');
const {userChangeDetailsRoute} = require('./api/controllers/userroutes/change-details-route')


module.exports = app; // for testing

// initialize a127 framework
a127.init(function(config) {

  // include a127 middleware
  app.use(a127.middleware(config));

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: false}))

  // error handler to emit errors as a json string
  app.use(function(err, req, res, next) {
    if (typeof err !== 'object') {
      // If the object is not an Error, create a representation that appears to be
      err = {
        message: String(err) // Coerce to string
      };
    } else {
      // Ensure that err.message is enumerable (It is not by default)
      Object.defineProperty(err, 'message', { enumerable: true });
    }

    // Return a JSON representation of #/definitions/ErrorResponse
    res.set('Content-Type', 'application/json');
    res.end(JSON.stringify(err));
  });

  app.post('/todos', todoCreateRoute);
  app.get('/todos', todoGetAllRoute);
  app.get('/todos/:id', todoGetOneRoute);
  app.patch('/todos/:id', todoUpdateRoute);
  app.delete('/todos/:id', todoDeleteRoute);

  app.post('/users', userCreateRoute);
  app.post('/login', userLoginRoute);
  app.get('/:email/:token', userVerifyAccountRoute);
  app.post('/reset-password', userPasswordResetRoute);
  app.patch('/password/:id', userChangePasswordRoute);
  app.patch('/change-details', userChangeDetailsRoute);

  var ip = process.env.IP || 'localhost';
  var port = process.env.PORT || 3000;
  // begin listening for client requests
  app.listen(port, ip);
});
