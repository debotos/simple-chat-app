const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const User = require('../models/user');
const keys = require('./credential/keys');

// passport session setup
// required for persistent login sessions
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

//================
//  Local Strategy
//================
// Local Signup (named strategies)
passport.use(
  'local.signup',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },
    (req, email, password, done) => {
      User.findOne({ email: email }, (err, user) => {
        if (err) {
          return done(err);
        }

        if (user) {
          return done(
            null,
            false,
            req.flash('error', 'User with email already exist')
          );
        }

        const newUser = new User();
        newUser.username = req.body.username;
        newUser.fullname = req.body.username;
        newUser.email = req.body.email;
        newUser.password = newUser.encryptPassword(req.body.password);

        newUser.save(err => {
          done(null, newUser);
        });
      });
    }
  )
);

passport.use(
  'local.login',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },
    (req, email, password, done) => {
      User.findOne({ email: email }, (err, user) => {
        if (err) {
          return done(err);
        }

        const messages = [];
        if (!user || !user.validUserPassword(password)) {
          messages.push('Email Does Not Exist or Password is Invalid');
          return done(null, false, req.flash('error', messages));
        }

        return done(null, user);
      });
    }
  )
);

//==================
// Facebook Strategy
//==================
// Facebook doesn't support http ! so you can't test it in localhot
// localhost is http. you have to host it in a https server to test
passport.use(
  new FacebookStrategy(
    {
      clientID: keys.facebookAuth.clientID,
      clientSecret: keys.facebookAuth.clientSecret,
      callbackURL: keys.facebookAuth.callbackURL,
      // In Facebook app at the "Valid OAuth Redirect URIs" section add this url
      passReqToCallback: true
      // (it's let us check if a user is logged in or not)
      // simpliy Allows us to pass req from our route to below perameter
    },
    (req, token, refreshToken, profile, done) => {
      User.findOne({ facebook: profile.id }, (err, user) => {
        if (err) {
          return done(err);
        }

        if (user) {
          return done(null, user);
        } else {
          const newUser = new User();
          newUser.facebook = profile.id;
          newUser.fullname = profile.displayName;
          newUser.username = profile.displayName;
          newUser.email = profile._json.email;
          newUser.userImage =
            'https://graph.facebook.com/' + profile.id + '/picture?type=large';
          newUser.fbTokens.push({ token: token });

          newUser.save(err => {
            return done(null, newUser);
          });
        }
      });
    }
  )
);

//==================
// Google Strategy
//==================
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleAuth.clientID,
      clientSecret: keys.googleAuth.clientSecret,
      callbackURL: keys.googleAuth.callbackURL,
      passReqToCallback: true
      // (it's let us check if a user is logged in or not)
      // simpliy Allows us to pass req from our route to below perameter
    },
    (req, accessToken, refreshToken, profile, done) => {
      User.findOne({ google: profile.id }, (err, user) => {
        if (err) {
          return done(err);
        }

        if (user) {
          return done(null, user);
        } else {
          const newUser = new User();
          newUser.google = profile.id;
          newUser.fullname = profile.displayName;
          newUser.username = profile.displayName;
          newUser.email = profile.emails[0].value;
          newUser.userImage = profile._json.image.url;

          newUser.save(err => {
            if (err) {
              return done(err);
            }
            return done(null, newUser);
          });
        }
      });
    }
  )
);
