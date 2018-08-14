// This file dependent on express-validator Middleware
module.exports = (req, res, next) => {
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
      res.redirect('/');
    })
    .catch(err => {
      return next();
    });
};
