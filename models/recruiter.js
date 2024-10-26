import mongoose from "mongoose";

const Schema = mongoose.Schema;

// resume, tech_stack, field_of_interest, experience_level, bio
const RecruiterSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    Join_date: {
        type: Date,
        required: true
    },
    qualification: {
        type: String,
        required: true
    },
    current_position: {
        type: String,
        required: true
    },
    salary: {
        type: String,
        required: true
    },
    company_id: {
        type: Schema.Types.ObjectId,
        required: true,
        default: () => new mongoose.Types.ObjectId()
    }
})

const Recruiter = mongoose.model("Recruiter", RecruiterSchema);
export default Recruiter;