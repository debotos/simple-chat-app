const express = require('express');
const users = require('../routes/users');
const pages = require('../routes/pages');
const error = require('../middleware/error');

module.exports = function(app, passport) {
  app.use('/', pages(passport));
  app.use('/api/users', users);
  app.use(error);
};
