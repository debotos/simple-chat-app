module.exports = (req, res, next) => {
  // If the user object does not exist it means the user is not logged in
  if (!req.user) {
    return next();
  } else {
    // If the user object exists, the user is logged in and if they try to log in we redirect them to the home page
    return res.redirect('/home');
  }
};
