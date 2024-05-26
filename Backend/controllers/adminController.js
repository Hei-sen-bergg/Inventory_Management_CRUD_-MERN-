const Admin = require('../models/adminModel');
const jwt = require('jsonwebtoken');

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
  