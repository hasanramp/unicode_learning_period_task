import mongoose from "mongoose";

const Schema = mongoose.Schema;

// resume, tech_stack, field_of_interest, experience_level, bio
const CompanySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    website_url: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    company_id: {
        type: Schema.Types.ObjectId,
        required: true,
        default: () => new mongoose.Types.ObjectId()
    }
})

const Company = mongoose.model("Company", CompanySchema);
export default Company;