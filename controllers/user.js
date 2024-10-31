import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v2 as cloudinary } from 'cloudinary';
import path from 'path';
import FollowerFollowingSchema from '../models/follower_following.js'


export async function signup(req, res) {
    const { email, password } = req.body;

    let user = User.findOne({email: email});
    if (user) return res.status(400).send("User with this email already exists");

    bcrypt.hash(password, 2, (err, hash) => {
        if (err) return res.status(400).send("Could not hash password. User not saved")
        user = new User({
            email: email,
            password: hash
        })
        user.save()
            .then((res) => {return res.status(200).send("User signup successful")} )
            .catch((err) => {return res.status(400).send("Could not save user")} )
    })

    //TODO: implement nodemailer
}

export async function login(req, res) {
    const { email, password } = req.body;
    let user = User.findOne({email: email});
    if (!user) return res.status(404).send("User not found. Signup to register");

    bcrypt.compare(password, user.password, (err, result) => {
        if (err) return res.status(400).send("Invalid password");

        const token = jwt.sign(
            {
                "_id": user._id,
                "email": user.email,
                "profileImageUrl": user.profileImageUrl,
                "resume": user.resume,
                "tech_stack": user.tech_stack,
                "field_of_interest": user.field_of_interest,
                "bio":user.bio
            },
            process.env.JWT_ACCESS_TOKEN_SECRET,
            {expiresIn: '168h'}
        )
        return res.status(200).json({response:"Login successful", token: token});
    })

}

export async function uploadUserProfilePicture(req, res) {
    const email = req.user.email;
    let user = User.findOne({email: email});
    if (!user) return res.status(404).send("User not found");

    if (!req.file) return res.status(400).send("No Profile photo uploaded");

    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET,
    });

    const result = await cloudinary.uploader.upload(req.file.path);

    fs.unlinkSync(req.file.path);

    if (user.profileImageUrl) {
        const toDeleteImagePath = path.basename(user.profileImageUrl, path.extname(user.profileImageUrl));
        await cloudinary.uploader.destroy(toDeleteImagePath);
    }

    user.profileImageUrl = result.secure_url;
    user.save()
        .then((resp) => {
            return res.status(200).json({
                message: 'Profile image updated successfully.',
                imageUrl: user.profileImageUrl,
            });
        })
        .catch((err) => {
            return res.status(400).send("Could not save file url");
        })

}

export async function uploadUserData(req, res) {
    const email = req.user.email;

    let user = User.findOne({email: email});
    if (!user) return res.status(404).send("User not found");

    const tech_stack = req.body.tech_stack;
    const field_of_interest = req.body.field_of_interest;
    const experience_level = req.body.experience_level;
    const bio = req.body.bio;

    user.tech_stack = tech_stack;
    user.field_of_interest = field_of_interest;
    user.experience_level = experience_level;
    user.bio = bio;

    user.save()
        .then((resp) => { return res.status(200).send("uploaded user data")} )
        .catch((err) => { return res.status(400).send("could not upload user data")} );

}

export async function applyForJobListing(req, res) {

    const date = new Date()
    const application = new application({
        User_id: req.user._id,
        Job_id: req.user.job_id,
        status: "pending",
        applied_date: date
    })
    application.save()
        .then((resp) => {return res.status(200).send("uploaded application")} )
        .catch((err) => {return res.status(400).send("could not upload application")} );
}

export async function follow(req, res) {
	
	if (!req.body.following_id) return res.status(400).send("Following id not provided");

	const date = new Date();
	const follow = new FollowerFollowingSchema({
		follower_id: req.user._id,
		to_follow_id: req.body.following_id,
		follow_date: date
	});

	follow.save()
		.then((resp) => { return res.status(200).send("Followed successfully") })
		.catch((err) => { return res.status(400).send("Could not Follow") });

}

export async function unfollow(req, res) {

	if (!req.body.following_id) return res.status(400).send("Following id not provided");

	FollowerFollowingSchema.deleteOne({ follower_id: req.user._id, following_id: req.body.following_id })
		.then((resp) => { return res.status(200).send("Unfollowed successfully") })
		.catch((err) => { return res.status(400).send("Could not unfollow") });

}

export async function listFollowing(req, res) {

	FollowerFollowingSchema.find({ follower_id: req.user._id })
		.populate("to_follow_id")
        .then((users) => { return res.status(200).json({ following: users }) })
        .catch((err) => { return res.status(400).send("could not get users") });
}

export async function listFollowers(req, res) {

	FollowerFollowingSchema.find({ to_follow_id: req.user._id })
		.populate("follower_id")
        .then((users) => { return res.status(200).json({ followers: users }) })
        .catch((err) => { return res.status(400).send("could not get users") });
}
