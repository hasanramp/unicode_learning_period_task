import mongoose from "mongoose";
const Schema = mongoose.Schema;


const FollowerFollowingSchema = new Schema({
    follower_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    to_follow_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
	follow_date: {
		type: Date,
		required: true
	}
});

export default FollowerFollowingSchema;
