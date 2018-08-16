module.exports = function() {
  return {
    profilePage: function(req, res) {
      // profile Page
      console.log(req.user);
      return res.render('profile.ejs', {
        title: `Chat Application | Profile(${req.user.username})`,
        userInfo: req.user
      });
    }
  };
};
