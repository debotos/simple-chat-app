const pageRoutes = require('../routes/pageRoutes');
const error = require('../middleware/error');

module.exports = function(app, passport) {
  app.use('/', pageRoutes(passport));
  app.use(error);
};
