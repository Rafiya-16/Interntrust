const express = require('express');
const router = express.Router();
const authGuard = require('../middleware/authGuard');
const { getMyProfile, upsertMyProfile } = require('../controllers/profileController');

router.get('/me', authGuard, getMyProfile);
router.put('/me', authGuard, upsertMyProfile);

module.exports = router;