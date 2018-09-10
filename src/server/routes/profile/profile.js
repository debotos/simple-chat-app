const _ = require('lodash');

module.exports = function() {
  return {
    profilePage: function(req, res) {
      // profile Page
      console.log(req.user);
      return res.render('profile.ejs', {
        title: `Chat Application | Profile(${req.user.username})`,
        userInfo: req.user
      });
    },
    profileInfo: function(req, res) {
      // profile Page
      return res.json(
        _.pick(req.user, [
          'username',
          'fullname',
          'userImage',
          'country',
          'gender'
        ])
      );
    }
  };
};
