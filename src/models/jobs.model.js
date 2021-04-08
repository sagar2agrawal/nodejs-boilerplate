import mongoose from 'mongoose';

const JobsSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    maxlength: 64,
  },
});

const Jobs = mongoose.model('Jobs', JobsSchema);
export default Jobs;

/*

Duplicated Data

Company Logo:
Compnay Name:
Summary About the company:
Company Rating: Later on

Salary range
Neuration type:

years of experience
locations - tags
skills required - tags
Opportunity type - Freelance project, Job, Contract, Internship,

About the Job:
Roles & Responsibilities:

Total Applications
*/
