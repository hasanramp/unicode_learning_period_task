import mongoose from "mongoose";

const Schema = mongoose.Schema;

const applicationSchema = new Schema({
    User_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    Job_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    applied_date: {
        type: Date,
        required: true
    }
})

const Application = mongoose.model("Application", applicationSchema);
export default Application;