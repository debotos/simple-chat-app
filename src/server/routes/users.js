const express = require('express');
const router = express.Router();
const keys = require('../config/credential/keys');
const passport = require('passport');

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
// set Header key: Authorization value: your_Bearer_token
// router.get(
//   '/me',
//   passport.authenticate('jwt', { session: false }),
//   (req, res) => {
//     res.json({
//       id: req.user.id,
//       name: req.user.name,
//       email: req.user.email
//     });
//   }
// );

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post('/register', async (req, res) => {});

// @route   GET api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post('/login', async (req, res) => {});

// @route   POST api/users/me/edit
// @desc    Update user info
// @access  Private
router.post('/me/edit', async (req, res) => {});

module.exports = router;
