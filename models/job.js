import mongoose from "mongoose";

const Schema = mongoose.Schema;

const JobSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    requirements: {
        type: Array,
        required: true
    },
    Salary_range: {
        type: String,
        required: true
    },
    Location: {
        type: String,
        required: true
    },
    Job_type: {
        type: String,
        required: true
    },
    Recruiter_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    company_id: {
        type: Schema.Types.ObjectId,
        required: true,
    }
})

const Job = mongoose.model("Job", JobSchema);
export default Job;