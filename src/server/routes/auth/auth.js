module.exports = function(passport) {
  return {
    postLogin: function() {
      return passport.authenticate('local.login', {
        successRedirect: '/home',
        failureRedirect: '/',
        failureFlash: true
      });
    },

    postSignUp: function() {
      return passport.authenticate('local.signup', {
        successRedirect: '/home',
        failureRedirect: '/signup',
        failureFlash: true
      });
    },

    indexPage: function(req, res) {
      // Local login
      const errors = req.flash('error');
      return res.render('index.ejs', {
        title: 'Chat Application | Login',
        messages: errors,
        hasErrors: errors.length > 0,
        data: { email: req.flash('email') }
      });
    },

    getSignUp: function(req, res) {
      const errors = req.flash('error');
      return res.render('signup.ejs', {
        title: 'Chat Application | SignUp',
        messages: errors,
        hasErrors: errors.length > 0,
        data: { email: req.flash('email'), username: req.flash('username') }
      });
    },

    logout: function(req, res) {
      req.logout();
      req.session.destroy(err => {
        res.redirect('/');
      });
    },

    getFacebookLogin: function() {
      return passport.authenticate('facebook', {
        scope: 'email'
      });
    },

    getGoogleLogin: function() {
      return passport.authenticate('google', {
        scope: [
          'https://www.googleapis.com/auth/plus.login',
          'https://www.googleapis.com/auth/plus.profile.emails.read'
        ]
      });
    },

    googleLogin: function() {
      return passport.authenticate('google', {
        successRedirect: '/home',
        failureRedirect: '/signup',
        failureFlash: true
      });
    },

    facebookLogin: function() {
      return passport.authenticate('facebook', {
        successRedirect: '/home',
        failureRedirect: '/signup',
        failureFlash: true
      });
    }
  };
};
