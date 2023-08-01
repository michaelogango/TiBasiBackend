import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
            required: [true, 'Please enter your name'],
        
      },
      email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true
      },
      phoneNumber: {
        type: String,
        required: [true, 'Please enter your phoneNumber'],
      },
      password: {
        type: String,
        required: [true, 'Please enter your password'],
      },
      location:{
        type:String,
        required: [true, 'Please enter your location'],
      }
    })

const User = mongoose.model('User', userSchema);

export default User;
