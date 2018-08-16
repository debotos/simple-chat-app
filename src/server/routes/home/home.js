module.exports = function() {
  return {
    homePage: function(req, res) {
      // Home Page
      console.log(req.user);
      return res.render('home.ejs', {
        title: 'Chat Application | Dashboard',
        userInfo: req.user
      });
    }
  };
};
