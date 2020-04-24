// Used to create a guest account and add to Guests DB

const express = require('express');
const router = express.Router();
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

// Guest Model i.e our schema
const Guest = require('../../models/Guests');

// @route POST api/guests
// @desc Temp account for guest
// @access Public
router.post('/', (req, res) => {
  //res.send('guest registered');       // Used for the API to make sure the guest route works

  // Create the guest
  const newGuest = new Guest({
  });

  newGuest.save()
    .then(guest => {
      jwt.sign(                        // generate the token
        { id: guest.id },                // payload, so when UI/API sends a token the id is in there = knows which guest it is
        config.get('jwtSecret'),
        { expiresIn: 3600 },            // Token expires in one hour
        (err, token) => {               // callback for jwt sign
          if (err) throw err;
          res.json({                    // response
            token: token,
            guest: {
              id: guest.id
            }
          });
        }
      )
    })
});

// @route GET api/guests
// @desc  retrieve guest
// @access Public

router.get('/user', auth, (req, res) => {                // We get the current guest's data by using the token    
  Guest.findById(req.user.id)                // The token is sent by the UI
    .then(guest => {
      if (guest) return res.json({ guest })
    })
});

module.exports = router;