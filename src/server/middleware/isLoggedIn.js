module.exports = (req, res, next) => {
  if (!req.user) {
    return res.redirect('/');
  } else {
    return next();
  }
};
