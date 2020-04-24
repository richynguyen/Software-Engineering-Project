//Used to authenticate the user from existing users in User DB

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

// User Model i.e our schema
const User = require('../../models/Users');          // .../ is cd ..

// @route   POST api/auth                           // 
// @desc    Authenticate user                  
// @access  Public
router.post('/', (req, res) => {
  //res.send('register');                           // Response to the API so we can know we can access this route 
  const { email, password } = req.body        // destructoring = pulling out data from the req.body   

  // Simple validation
  if (!email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' }); // bad request, the user did not send the right info to get the right response
  }

  // Check for existing user in User DB using provided email
  User.findOne({ email })                         // returns to us a user
    .then(user => {                               // if user is not null, meaning that user exists, then send a bad response
      if (!user) return res.status(400).json({ msg: 'User does not exist' });

      // Validate password
      bcrypt.compare(password, user.password)    // compare password from loging page and the password in the DB for the user
        .then(isMatch => {                       // isMatch is true or fale
          if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' }); // if there's no match then give bad message

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
        })
    })
});

// @route   GET api/auth/user                          
// @desc    Get user data                  
// @access  Private
router.get('/user', auth, (req, res) => {          // Get user from User DB
  User.findById(req.user.id)                     // Note: auth param -> must be authenticated (implemented using our own middlware)
    .select('-password')                         // Find the user by that id and then return that user in JSON format
    .then(user => res.json(user));
});
// Front end / API asks for that user and all it's info so we need to validate the token first then return the user if valid
// We need the Token for the user for it to be valid

module.exports = router;