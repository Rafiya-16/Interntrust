const express = require('express');
const router = express.Router();
const authGuard = require('../middleware/authGuard');
const { createPosting, getAllPostings, getPostingById } = require('../controllers/postingsController');

router.post('/', authGuard, createPosting);
router.get('/', authGuard, getAllPostings);
router.get('/:id', authGuard, getPostingById);

module.exports = router;