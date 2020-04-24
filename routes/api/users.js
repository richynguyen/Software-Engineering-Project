//Used to register new users and add to the User DB

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

// User Model i.e our schema
const User = require('../../models/Users');          // .../ is cd ..

// @route   POST api/users                           // get request to this file
// @desc    Register new user                  
// @access  Public
router.post('/', (req, res) => {
  //res.send('register');                           // Response to the API so we can know we can access this route 
  const { name, email, password, streetAddress, cityAddress, stateAddress, zipCode } = req.body        // destructoring = pulling out data from the req.body   

  // Simple validation
  if (!name || !email || !password || !streetAddress || !cityAddress || !stateAddress || !zipCode) {
    return res.status(400).json({ msg: 'Please enter all fields' }); // bad request, the user did not send the right info to get the right response
  }

  // Check for existing user in User DB
  User.findOne({ email })                         // returns to us a user
    .then(user => {                               // if user is not null, meaning that user exists, then send a bad response
      if (user) return res.status(400).json({ msg: 'User already exists' });

      // User does not already exists so create new user
      const newUser = new User({
        name,
        email,
        password,
        streetAddress,
        cityAddress,
        stateAddress,
        zipCode
      });

      // Create salt & hash
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {     // takes in user passwor and generated salt
          if (err) {
            console.log(newUser.password);
            throw err;
          }
          newUser.password = hash;                            // use the hash for the user password in DB
          newUser.email = email;
          newUser.name = name;
          newUser.streetAddress = streetAddress;
          newUser.cityAddress = cityAddress;
          newUser.stateAddress = stateAddress;
          newUser.zipCode = zipCode;
          newUser.save()                                      // save that user in the DB
            .then(user => {                                  // this gives us a user which then we can return the fields in JSON form
              jwt.sign(               // we sign the token             
                { id: user.id },       // first param is whatever you want to add to the payload = data
                config.get('jwtSecret'),
                { expiresIn: 3600 },       // token only lasts for an hour
                (err, token) => {
                  if (err) throw err;    // once we register it will give us the user back and the token to authenticate w private routes
                  res.json({
                    token: token,
                    user: {
                      id: user.id,
                      name: user.name,
                      email: user.email
                    }
                  });
                }
              )
            });
        })
      }
      )
    })
});


router.get('/:id', (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      if (user) return res.status(400).json({ userID: `${user}` });
    })
})


module.exports = router;