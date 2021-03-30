const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

//User Model
const User = require('../models/User');

// Login Page
router.get('/login', (req, res) => res.render('login'));

// Register Page
router.get('/register', (req, res) => res.render('register'));

//Register Handle
router.post('/register', (req, res) => {
    const{ name, email, username, password, password2 } = req.body;
    let errors = [];

    //Check Required Fields
    if(!name || !email || !username || !password || !password2) {
        errors.push({ msg: 'Please Fill in All Fields' });
    }
 
    //Check Passwords Match
    if(password !== password2) {
        errors.push({ msg: 'Please ensure both Passwords match' });
    }

    //Check Password Length
    if(password.length < 6) {
        errors.push({ msg: 'Password needs to be at least 6 Characters' });
    }

    if (errors.length > 0) {
        res.render('register', {
          errors,
          name,
          email,
          username,
          password,
          password2
        });
      } else {
        //Validation Passing
        User.findOne({ email: email }).then(user => {
          if (user) {
            errors.push({ msg: 'Email has already been registered' });
            res.render('register', {
              errors,
              name,
              email,
              password,
              password2
            });
          } else {
            const newUser = new User({
              name,
              email,
              username,
              password,
            });

            //Hash Password
            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                //Set Hash Password
                newUser.password = hash;
                //Save new User to Database then redirect to login page
                newUser.save()
                  .then(user => {
                    req.flash(
                      'success_msg',
                      'You have successfully registered'
                    );
                    res.redirect('/users/login');
                  })
                  .catch(err => console.log(err));
              });
            });
          }
        });
      }
    });

// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/homepage',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You have successfully logged out');
  res.redirect('/users/login');
});

module.exports = router;