'use strict';

var a127 = require('a127-magic');
var express = require('express');
const bodyParser = require('body-parser');

var app = express();

const {createTodoRoute} = require('./api/controllers/create-todo-route');
const {getAllTodos} = require('./api/controllers/get-todo-route');
const {getTodo} = require('./api/controllers/get-todo-by-id-route')

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

  app.post('/todos', createTodoRoute);
  app.get('/todos', getAllTodos);
  app.get('/todos/:id', getTodo);

  var ip = process.env.IP || 'localhost';
  var port = process.env.PORT || 3000;
  // begin listening for client requests
  app.listen(port, ip);

  // console.log('try this:\ncurl http://' + ip + ':' + port + '/hello?name=Scott');
});
