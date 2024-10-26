import mongoose from "mongoose";

const Schema = mongoose.Schema;

// resume, tech_stack, field_of_interest, experience_level, bio
const UsersSchema = new Schema({
    email: {
        type: String,
        required: true
    },
	password: {
		type: String,
		required: true
	},
    profileImageUrl: {
		type: String,
		required: true,
        default: null

    },
    resume: {
        type: String,
        required: true,
		default: ''
    },
    tech_stack: {
        type: String,
        required: true,
		default: ''
    },
    field_of_interest: {
        type: String,
        required: true,
		default: ''
    },
    experience_level: {
        type: Number,
		default: null
    },
    bio: {
        type: String,
        required: true,
		default: ''
    }
})

const Users = mongoose.model("User", UsersSchema);
export default Users;
