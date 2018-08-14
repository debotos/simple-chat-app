const router = require('express').Router();
const _ = require('lodash');

const loginValidation = require('../middleware/loginValidation');
const signupValidation = require('../middleware/signupValidation');
const isAlreadyLoggedIn = require('../middleware/isAlreadyLoggedIn');

module.exports = passport => {
  // GET
  router.get('/', isAlreadyLoggedIn, indexPage); // Local login
  router.get('/signup', isAlreadyLoggedIn, getSignUp);
  router.get('/auth/facebook', getFacebookLogin());
  router.get('/auth/facebook/callback', facebookLogin());
  router.get('/auth/google', getGoogleLogin());
  router.get('/auth/google/callback', googleLogin());
  // POST
  router.post('/', loginValidation, postLogin());
  router.post('/signup', signupValidation, postSignUp());

  router.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy(err => {
      res.redirect('/');
    });
  });

  function postLogin() {
    return passport.authenticate('local.login', {
      successRedirect: '/home',
      failureRedirect: '/',
      failureFlash: true
    });
  }

  function postSignUp() {
    return passport.authenticate('local.signup', {
      successRedirect: '/home',
      failureRedirect: '/signup',
      failureFlash: true
    });
  }

  function indexPage(req, res) {
    // Local login
    const errors = req.flash('error');
    return res.render('index.ejs', {
      title: 'Chat Application | Login',
      messages: errors,
      hasErrors: errors.length > 0,
      data: { email: req.flash('email') }
    });
  }

  function getSignUp(req, res) {
    const errors = req.flash('error');
    return res.render('signup.ejs', {
      title: 'Chat Application | SignUp',
      messages: errors,
      hasErrors: errors.length > 0,
      data: { email: req.flash('email'), username: req.flash('username') }
    });
  }

  function getFacebookLogin() {
    return passport.authenticate('facebook', {
      scope: 'email'
    });
  }

  function getGoogleLogin() {
    return passport.authenticate('google', {
      scope: [
        'https://www.googleapis.com/auth/plus.login',
        'https://www.googleapis.com/auth/plus.profile.emails.read'
      ]
    });
  }

  function googleLogin() {
    return passport.authenticate('google', {
      successRedirect: '/home',
      failureRedirect: '/signup',
      failureFlash: true
    });
  }

  function facebookLogin() {
    return passport.authenticate('facebook', {
      successRedirect: '/home',
      failureRedirect: '/signup',
      failureFlash: true
    });
  }

  return router;
};
