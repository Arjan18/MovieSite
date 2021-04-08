//Register Handle
router.post('/editprofile', AuthenticatedUser, (req, res) => {
    const { name, username, email } = req.body;
    let errors = [];

    //Check Required Fields
    if(!name || !email || !username) {
        errors.push({ msg: 'Please Fill in All Fields' });
    }

    if (errors.length > 0) {
        res.render('editprofile', {
          errors,
          name,
          email,
          username,
        });
      } else {
        //Validation Passing
        User.findOne({ _id: _id }).then(user => {
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