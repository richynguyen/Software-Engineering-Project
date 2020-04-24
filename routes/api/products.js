// This is the endpoint for the products DB
//Used to handle all requests: GET, POST, & DELETE to the DB

const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// Product Model i.e our schema
const Product = require('../../models/Products');

// @route   GET api/products                          // get request to this file
// @desc    Get All Products                  
// @access  Public
router.get('/', (req, res) => {                    //   api/products = '/'
  Product.find()
    .sort({ date: -1 })
    .then(products => res.json(products))       // gives us all the products, => what we want to do with the products
});                                              // get products from the backend and return them in JSON format

// @route   POST api/products
// @desc    Create A Product
// @access  Public

router.post('/', (req, res) => {
  const newProduct = new Product({            // creates a product based of the schema that is inserted into the DB
    name: req.body.name,                      // Get the name from the request, i.e the API       
    productID: req.body.productID
  });

  // save it to the DB, gives us back the item that it's saving and spit it out as JSON
  newProduct.save().then(product => res.json(product));
});

// @route   DELETE api/products/id:
// @desc    DELETE A Product
// @access  Private

router.delete('/:id', (req, res) => {
  Product.findById(req.params.id)
    .then(product => product.remove().then(() => res.json({ success: true })))   // finds the product, then removes it 
    .catch(err => res.status(404).json({ success: false }));                    // then returns a JSON that it was succesful
});

module.exports = router;