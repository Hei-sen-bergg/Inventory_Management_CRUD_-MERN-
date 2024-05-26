const express = require('express');
const { registerAdmin, authAdmin, getAdminProfile } = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', registerAdmin);
router.post('/login', authAdmin);
router.get('/profile', protect, getAdminProfile);

module.exports = router;