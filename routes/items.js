
const router = require('express').Router();
let Item = require('../models/item.model');

// GET ALL ITEMS
router.route('/').get((req, res) => {
  Item.find()
    .then(items => res.json(items))
    .catch(err => res.status(400).json('Error: ' + err));
});

// ADD AN ITEM
router.route('/add').post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const date = Date.parse(req.body.date);

  const newItem = new Item({
    username,
    description,
    date,
  });

  newItem.save()
  .then(() => res.json('Item added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

// GET AN ITEM
router.route('/:id').get((req, res) => {
    Item.findById(req.params.id)
      .then(item => res.json(item))
      .catch(err => res.status(400).json('Error: ' + err));
  });

// DELETE AN ITEM
router.route('/:id').delete((req, res) => {
    Item.findByIdAndDelete(req.params.id)
      .then(() => res.json('Item deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
});
  
// UPDATE AN ITEM
router.route('/update/:id').post((req, res) => {
    Item.findById(req.params.id)
      .then(item => {
        item.username = req.body.username;
        item.description = req.body.description;
        item.date = Date.parse(req.body.date);
  
        item.save()
          .then(() => res.json('Item updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
});



module.exports = router;