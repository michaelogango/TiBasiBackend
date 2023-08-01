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

export { signup };
