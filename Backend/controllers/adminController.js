const Admin = require('../models/adminModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')

// Generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: '30d'
    });
  };

  // Register new admin
exports.registerAdmin = async (req, res) => {
    const { name, email, password } = req.body;
  
    const adminExists = await Admin.findOne({ email });
  
    if (adminExists) {
      return res.status(400).json({ message: 'Admin already exists' });
    }
  
    const admin = await Admin.create({ name, email, password });
  
    if (admin) {
      res.status(201).json({
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        token: generateToken(admin._id)
      });
    } else {
      res.status(400).json({ message: 'Invalid admin data' });
    }
  };


  // Authenticate admin & get token
exports.authAdmin = async (req, res) => {
    const { email, password } = req.body;
  
    const admin = await Admin.findOne({ email });
  
    if (admin && (await admin.matchPassword(password))) {
      res.json({
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        token: generateToken(admin._id)
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  };


  // Get admin profile
exports.getAdminProfile = async (req, res) => {
    const admin = await Admin.findById(req.admin._id);
  
    if (admin) {
      res.json({
        _id: admin._id,
        name: admin.name,
        email: admin.email
      });
    } else {
      res.status(404).json({ message: 'Admin not found' });
    }
  };
  

  // Get admin profile
exports.getProfile = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.user.id).select('-password');
  res.json(admin);
});

// Change admin password
exports.changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const admin = await Admin.findById(req.user.id);

  if (!admin) {
    res.status(404);
    throw new Error('Admin not found');
  }

  const isMatch = await bcrypt.compare(oldPassword, admin.password);
  if (!isMatch) {
    res.status(400);
    throw new Error('Old password is incorrect');
  }

  admin.password = await bcrypt.hash(newPassword, 10);
  await admin.save();

  res.status(200).json({ message: 'Password changed successfully' });
});