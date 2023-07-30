import asyncHandler from "express-async-handler";
import User from "../models/user.js";
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";

const SECRET_KEY = 'thisisasecretkey';
//generate JWT Token
const generateJWTToken = (userId, name) => {
  return jwt.sign({ userId, name }, SECRET_KEY, { expiresIn: '1h' });
};


//register user
export const registerUser = asyncHandler(async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already exists' });
    }
    // Hash the password before saving the user
    const newUser = new User({ name, email, password });
    await newUser.save();
    res.status(200).json({ message: 'User registered successfully'});
    
  } catch (error) {
    console.error('Failed to register user:', error);
    res.status(500).json({ message: 'Failed to register user' });
  }
});
//login user
export const loginUser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }
    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Incorrect email or password'});
    }
    // Generate a JWT token and store in cookies
    const token = generateJWTToken(user._id, user.name);
    res.status(200).json({ message: 'User login successful', token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Login failed' });
  }
});