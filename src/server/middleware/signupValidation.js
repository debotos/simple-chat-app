// This file dependent on express-validator Middleware
module.exports = (req, res, next) => {
  // Username
  req.checkBody('username', 'Username is Required').notEmpty();
  if (req.body['username'].trim().length > 0) {
    req
      .checkBody('username', 'Username Must Not Be Less Than 3')
      .trim()
      .escape()
      .isLength({ min: 3 });
  }
  // Email
  req.checkBody('email', 'Email is Required').notEmpty();
  if (req.body['password'].trim().length > 0) {
    req
      .checkBody('email', 'Email is Invalid')
      .isEmail()
      .normalizeEmail();
  }
  // Password
  req.checkBody('password', 'Password is Required').notEmpty();
  if (req.body['password'].trim().length > 0) {
    req
      .checkBody('password', 'Password Must Not Be Less Than 5')
      .isLength({ min: 5 });
  }

  req
    .getValidationResult()
    .then(result => {
      const errors = result.array();
      const messages = [];
      errors.forEach(error => {
        messages.push(error.msg);
      });

      req.flash('error', messages);
      req.flash('email', req.body.email);
      req.flash('username', req.body.username);
      res.redirect('/signup');
    })
    .catch(err => {
      return next();
    });
};
