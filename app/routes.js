const express = require('express')
const router = express.Router()
const Airtable = require('airtable');

// Add your routes here - above the module.exports line

const base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base('appd7IrBBFpAFhFpp');

router.post('/completion-page', function(req, res) {
  const filteredKeys = [
    'technology',
    'technology-other',
    'content-problems',
    'content-detail',
    'form-problems',
    'form-detail',
    'style',
    'comments'
  ]

  // Grab anything from session data that matches filteredKeys
  const filtered = filteredKeys
    .reduce((obj, key) => ({ ...obj, [key]: req.session.data[key] }), {});

  base('Responses').create(filtered, function(err, record) {
    if (err) { console.error(err); return; }
    console.log(record.getId());
  });

  res.render('completion-page');
});

module.exports = router
