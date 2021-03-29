const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// Welcome Page
router.get('/', (req, res) => res.render('Home'));

// Homepage
router.get('/homepage', ensureAuthenticated, (req, res) =>
  res.render('homepage', {
    user: req.user
  })
);

//ChatApp
router.get('/chatHome', ensureAuthenticated, (req, res) =>
  res.render('chatHome', {
    user: req.user
  })
);
router.get('/chat', ensureAuthenticated, (req, res) =>
  res.render('chat', {
    user: req.user
  })
);
router.get('/profile', ensureAuthenticated, (req, res) =>
  res.render('profile', {
    user: req.user
  })
);

router.get('/films/FilmList', ensureAuthenticated, (req, res) =>
  res.render('FilmList', {
    user: req.user
  })
);

router.get('/films/films', ensureAuthenticated, (req, res) =>
  res.render('films', {
    user: req.user
  })
);

router.get('/shows/ShowList', ensureAuthenticated, (req, res) =>
  res.render('ShowList', {
    user: req.user
  })
);

router.get('/shows/shows', ensureAuthenticated, (req, res) =>
  res.render('shows', {
    user: req.user
  })
);

module.exports = router;