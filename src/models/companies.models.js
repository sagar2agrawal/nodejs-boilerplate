import mongoose from 'mongoose';

const CompaniesSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    maxlength: 64,
  },
});

const Companies = mongoose.model('Companies', CompaniesSchema);
export default Companies;

/**
 * model for the companies
 *
 * Company Name
 * Company summary
 * Company About
 * Company address
 * Company Logo
 * Company Cover Photo
 *
 * --Embedded
 * Linkedin URL
 * Website URL
 * Facebook id
 *
 * -- Changing data
 * Company Rating
 * Total Jobs
 * Total Employees
 * Staff [{
 *  user: objectid,
 *  role: admin,
 * }]
 *
 * Company Industry Market
 * Tags
 * Company Establishment date
 * Employee_Strength_range
 *
 * Company_status: [pending, active, delete, block]
 */
