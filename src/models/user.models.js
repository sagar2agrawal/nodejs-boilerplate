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

/**
 * Date modeling for the user
 *
 * Experience {
 *  title,
 *  start,
 *  end,
 *  skills
 *  summary,
 *  url,
 *  photo,
 *  organization,
 *  type [experience, project, achievements]
 * }
 *
 * skills {
 *  name,
 *  level [beginner, intermeddiate, expert],
 * }
 * hobbies
 * Introduction_video
 * Profile Summary
 * Cover photo
 *
 * gender: [male, female, other],
 *
 * Looking for job{
 *  reason for change,
 *  current salary
 *  expected salary,
 *  job profiles,
 *  notice period,
 *  last working day,
 *  resume link,
 *  total_experience_in_months
 *  preferred_locations: [],
 * }
 *
 * Address {
 *  street address 1
 *  street address 2
 *  city
 *  state
 *  country
 *  pin code
 *  Name of the address
 *  current, hometown
 * }
 *
 * account_type : [],
 * account_status : [active, delete, block]
 */
