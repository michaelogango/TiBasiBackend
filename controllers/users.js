import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';

const signup = async (req, res) => {
  try {
    const { name, email, phoneNumber, password, location, confirmPassword } = req.body;

    // Check for missing data
    const missingData = [];
    if (!name) missingData.push('name');
    if (!email) missingData.push('email');
    if (!phoneNumber) missingData.push('phoneNumber');
    if (!password) missingData.push('password');
    if (!location) missingData.push('location');
    if (!confirmPassword) missingData.push('confirmPassword');

    if (missingData.length > 0) {
      return res.status(400).json({ message: `Fill the following data: ${missingData.join(', ')}` });
    }

    let user = await User.findOne({ $or: [{ email }, { phoneNumber }] });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user in the database
    user = await User.create({
      name,
      email,
      phoneNumber,
      password: hashedPassword,
      location,
    });

    res.status(200).json({ message: 'User created' });
  } catch (error) {
    // Handle errors
    console.error('Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Import necessary modules and models


// Login controller
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user with the provided email exists in the database
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare the provided password with the hashed password stored in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // If the email and password are valid, create a JWT token and send it back to the client
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    // Handle any errors that might occur during login
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};










export { signup,login };
