const express = require('express');
const { registerAdmin, authAdmin, getAdminProfile } = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');
const { getProfile, changePassword } = require('../controllers/adminController');
const router = express.Router();

router.post('/register', registerAdmin);
router.post('/login', authAdmin);
router.get('/profile', protect, getAdminProfile);
router.put('/change-password',protect, changePassword);

module.exports = router;