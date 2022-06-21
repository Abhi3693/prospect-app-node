const express = require('express');
const router = express.Router();
const Prospect = require('../models/Prospect');

//  Get prospects
router.get('/', async (req, res, next) => {
  try {
    let prospects = await Prospect.find()
      .limit(req.query.limit)
      .skip(req.query.offset);
    let prospectCount = await Prospect.countDocuments();
    res.status(200).json({ prospects: prospects, count: prospectCount });
  } catch (error) {
    next(error);
  }
});

//  Add prospect
router.post('/', async (req, res, next) => {
  try {
    let prospect = await Prospect.create(req.body.prospect);
    res.json({ prospect: prospect });
  } catch (error) {
    next(error);
  }
});

//  Edit prospect
router.put('/:id', async (req, res, next) => {
  let id = req.params.id;
  try {
    let prospect = await Prospect.findByIdAndUpdate(id, req.body.prospect, {
      new: true,
    });
    if (prospect) {
      res.status(200).json(prospect);
    } else {
      res.status(422).json({ error: 'Prospect not found' });
    }
  } catch (error) {
    next(error);
  }
});

//  Delete prospect
router.delete('/:id', async (req, res, next) => {
  let id = req.params.id;
  try {
    let prospect = await Prospect.findByIdAndDelete(id);
    if (prospect) {
      res.status(200).json({ prospect: 'Deleted successfully' });
    } else {
      res.status(422).json({ error: 'Prospect not found' });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
