const express = require('express');
const Joi = require('joi');

const fetch = require('node-fetch');

const db = require('../db');
const messages = db.get('messages');

const schema = Joi.object().keys({
  name: Joi.string().min(3).max(50).required(),
  message: Joi.string().min(1).max(100).required(),
  latitude: Joi.number().min(-90).max(90).required(),
  longitude: Joi.number().min(-180).max(180).required()
});

const router = express.Router();

// GET /api/v1/messages
router.get('/', (req, res) => {
  messages
      .find()
      .then(allMessages =>
          res.json(allMessages));
});

// POST /api/v1/messages
router.post('/', (req, res, next) => {
  const result = schema.validate(req.body, { aboutEarly: false });

  if (result.error == null) {
    const { name, message, latitude, longitude } = req.body;

    fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=fr`)
        .then(res => res.json())
        .then(data => {
          const locality_name = data.locality;

          const userMessage = {
            name, message, latitude, longitude, locality_name, date: new Date()
          }

          messages
              .insert(userMessage)
              .then(insertedMessage => res.json(insertedMessage));
        })
        .catch(err => next(err));
  } else {
    next(result.error);
  }
});

module.exports = router;
