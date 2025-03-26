const express = require('express');

const books = require('./components/books/books-route');
const usersRoute = require('./components/users/users-route');

module.exports = () => {
  const app = express.Router();

  books(app);
  app.use('/users', usersRoute);
  return app;
};
