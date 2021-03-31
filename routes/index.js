const express = require('express');
const router = express.Router();
const { AuthenticatedUser, forwardAuthenticated } = require('../config/authentication');

// Welcome Page
router.get('/', (req, res) => res.render('Home'));

// Homepage
router.get('/homepage', AuthenticatedUser, (req, res) =>
  res.render('homepage', {
    user: req.user
  })
);

//ChatApp Pages
router.get('/chatHome', AuthenticatedUser, (req, res) =>
  res.render('chatHome', {
    user: req.user
  })
);
router.get('/chat', AuthenticatedUser, (req, res) =>
  res.render('chat', {
    user: req.user
  })
);

//Profile Page
router.get('/profile', AuthenticatedUser, (req, res) =>
  res.render('profile', {
    user: req.user
  })
);

module.exports = router;