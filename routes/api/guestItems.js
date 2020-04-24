// Used to store the items selected by guest for their shopping cart

const express = require('express');
const router = express.Router();

// Guest Items Model i.e our schema
const GuestItem = require('../../models/GuestItems');

// @route POST api/guestItems
// @desc  Create a Guest Item
// @access Public
router.post('/', (req, res) => {
  const newGuestItem = new GuestItem({
    name: req.body.name,
    userID: req.body.userID
  });

  newGuestItem.save().then(guestItem => res.json(guestItem));
});

// @route  GET api/guestItems/userID
// @desc   Get all Guest Items
// @access Public
router.get('/:userID', (req, res) => {
  GuestItem.find({ userID: req.params.userID })
    .sort({ date: -1 })
    .then(guestItems => res.json(guestItems));
});

// @route DELETE api/guestItems/id:
// @desc  DELTE a Guest Item
// @access Public
router.delete('/:id', (req, res) => {
  GuestItem.findById(req.params.id)
    .then(guestItem => guestItem.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ sucess: false }));
});


module.exports = router;
