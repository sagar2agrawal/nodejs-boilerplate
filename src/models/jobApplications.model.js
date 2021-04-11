import mongoose from 'mongoose';

const jobApplicationSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    maxlength: 64,
  },
});

const JobApplication = mongoose.model('JobApplication', jobApplicationSchema);
export default JobApplication;

/**
 * model for the Job Applications
 *
 * Company id
 * user id
 * application status
 * total_experience
 * name
 * current_location
 * current_salary
 * expectations
 * Skills {}
 * Test results
 */
