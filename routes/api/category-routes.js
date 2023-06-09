const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
 
  try {
    const cateData = await Category.findAll({
      include: [Product]
    });
    res.status(200).json(cateData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    const cateData = await Category.findByPk(req.params.id, {
     
      include: [Product]
    });

    if (!cateData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(cateData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const cateData = await Category.create(req.body);
    res.status(200).json(cateData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const cateData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!cateData[0]) {
      res.status(404).json({ message: 'No category with this id!' });
      return;
    }
    res.status(200).json(cateData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const cateData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!cateData) {
      res.status(404).json({ message: 'No Category found with this id!' });
      return;
    }

    res.status(200).json(cateData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
