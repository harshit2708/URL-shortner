const express = require('express');
const { getShortURL, getLongURL } = require('../controllers/urlController');
const router = express.Router()
router.post('/link', getShortURL)
router.get('/:id', getLongURL)
module.exports = router