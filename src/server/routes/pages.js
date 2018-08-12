const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('index.ejs', { title: 'Chat Application | Login' });
});

module.exports = router;
