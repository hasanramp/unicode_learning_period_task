import mongoose from "mongoose";
const Schema = mongoose.Schema;


const BlogSchema = new Schema({
    author_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
	title: {
		type: String,
		required: true
	},
	content: {
		type: String,
		required: true
	},
	tags: {
		type: Array,
		required: true
	},
	created_at: {
		type: Date,
		required: true
	}
});

export default BlogSchema;
