//Used to handle all requests: GET, POST, & DELETE to the DB

const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// Item Model i.e our schema
const Item = require('../../models/Item');          // .../ is cd ..

// @route   GET api/items                           // get request to this file
// @desc    Get All Items                  
// @access  Public
router.get('/:userID', (req, res) => {                    //   api/items = '/'
    Item.find({ userID: req.params.userID })
        .sort({ date: -1 })
        .then(items => res.json(items))            // gives us the items, => what we want to do with the items
});                                              // get items from the backend and return them in JSON format

// @route   POST api/items
// @desc    Create An Item
// @access  Private

router.post('/', auth, (req, res) => {
    const newItem = new Item({                  // creates an item based of the schema that is inserted into the DB
        name: req.body.name,                   // all we need is the name which comes from the request which is read in the body, ie. body parser
        userID: req.body.userID
    });

    newItem.save().then(item => res.json(item));  // save it to the DB, gives us back the item that it's saving and spit it out as JSON
});

// @route   DELETE api/items/id:
// @desc    Create An Item
// @access  Private

router.delete('/:id', auth, (req, res) => {
    Item.findById(req.params.id)
        .then(item => item.remove().then(() => res.json({ success: true })))   // finds the item, then removes it then returns a JSON that it was succesful
        .catch(err => res.status(404).json({ success: false }));
});


module.exports = router;