const express = require('express');
const router = express.Router();

const Orders = require('../../models/Orders');

// @route POST api/orders
// @desc  Create a order for a user or guest
// @access Public

router.post('/', (req, res) => {
  const newOrder = new Orders({
    orderID: req.body.orderID,
    userID: req.body.userID,
  });

  newOrder.save()
    .then(order => res.json(order));
});

// @route  GET api/orders/orderID
// @desc   Get a user order
// @access Public
router.get('/:orderID', (req, res) => {
  Orders.find({ orderID: req.params.orderID })
    .sort({ date: -1 })
    .then(order => res.json(order))
})

// @route DELETE api/orders/id:
// @desc  DELTE a Order Item
// @access Public
router.delete('/:id', (req, res) => {
  Orders.findById(req.params.id)
    .then(order => order.remove()
      .then(() =>
        res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }))
})

module.exports = router;