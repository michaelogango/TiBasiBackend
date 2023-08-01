import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';


const signup = async (req, res) => {
    console.log(req.body)
        const { name, email, phoneNumber, password, location,confirmPassword } = req.body;
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
            location
          });
          res.status(200).json({ message: 'User created' });


    }


export {signup}