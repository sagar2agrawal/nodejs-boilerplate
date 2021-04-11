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
Company Rating: Later on:
Company id:

-- embedded data
Salary: {
  currency: INR,
}

-- embedded data
skills : {
  skillname: string
  expertise level: Expert
  type of need: must to have, nice to have
}

-- embedded data
tests: {
  type: [QA, MarsilexTest],
  Question:
  test_id:
}

years of experience (min - max)
locations - tags
Opportunity type - Freelance project, Job, Contract, Internship,
Min-education requirements -
No. of vacancy
About the Job:
Roles & Responsibilities:

-- Changing data
Status of the job - (active, draft, closed, paused)
Total Applications
job_close_datetime
job_active_datetime

*/
