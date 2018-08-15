module.exports = function() {
  return {
    homePage: function(req, res) {
      // Home Page
      return res.render('home.ejs', {
        title: 'Chat Application | Dashboard'
      });
    }
  };
};
