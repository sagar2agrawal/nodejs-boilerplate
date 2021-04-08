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
  },
  salt: {
    type: String,
  },
  profilePhoto: {
    type: String,
  },
  role: {
    type: String,
    enum: ['seeker', 'recruiter', 'admin', 'superadmin'],
  },
});

const User = mongoose.model('User', UserSchema);
export default User;
