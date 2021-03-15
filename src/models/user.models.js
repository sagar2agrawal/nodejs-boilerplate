import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    maxlength: 64,
  },
  email: {
    type: String,
    required: true,
    index: { unique: true },
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 32,
  },
  profilePhoto: {
    type: String,
  },
  role: {
    type: String,
    enum: ['user', 'staff', 'admin'],
  },
});

const User = mongoose.model('User', UserSchema);
export default User;
