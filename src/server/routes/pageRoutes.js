const router = require('express').Router();

const loginValidation = require('../middleware/loginValidation');
const signupValidation = require('../middleware/signupValidation');
const isAlreadyLoggedIn = require('../middleware/isAlreadyLoggedIn');
const isLoggedIn = require('../middleware/isLoggedIn');

module.exports = passport => {
  /*------------------------*/
  //      AUTH Route
  /*------------------------*/
  // Route Functions
  const auth = require('./auth/auth')(passport);
  // @route   GET /
  // @desc    check for user already loggedin, if not then Get login page
  // @access  Public
  router.get('/', isAlreadyLoggedIn, auth.indexPage); // Local login
  // @route   GET /signup
  // @desc    check for user already loggedin, if not then Get signup page
  // @access  Public
  router.get('/signup', isAlreadyLoggedIn, auth.getSignUp);
  // Facebook auth
  router.get('/auth/facebook', auth.getFacebookLogin());
  router.get('/auth/facebook/callback', auth.facebookLogin());
  // Google auth
  router.get('/auth/google', auth.getGoogleLogin());
  router.get('/auth/google/callback', auth.googleLogin());
  // @route   POST /
  // @desc    User login
  // @access  Public
  router.post('/', loginValidation, auth.postLogin()); // Local login
  // @route   POST /
  // @desc    User signup
  // @access  Public
  router.post('/signup', signupValidation, auth.postSignUp());
  // logout
  router.get('/logout', auth.logout);

  /*------------------------*/
  //      HOME Route
  /*------------------------*/
  // Route Functions
  const home = require('./home/home')();
  // @route   GET /home
  // @desc    check for user loggedin, if yes then Get home page
  // @access  Private
  router.get('/home', isLoggedIn, home.homePage); // Local login

  return router;
};
