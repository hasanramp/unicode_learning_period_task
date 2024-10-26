import Recruiter from '../models/recruiter.js';
import Job from '../models/job.js';
import Application from '../models/application.js';

export async function createRecruiter(req, res) {
    const { email, password } = req.body;
    let recruiter = Recruiter.findOne({ email: email });

    if (recruiter) return res.status(400).send("Recruiter with this email already exists");

    bcrypt.hash(password, 2, (err, hash) => {
        if (err) return res.status(400).send("Could not hash password. User not saved")
        recruiter = new Recruiter({
            email: email,
            password: hash
        })
        recruiter.save()
            .then((res) => {return res.status(200).send("Recruiter signup successful")} )
            .catch((err) => {return res.status(400).send("Could not save Recruiter")} )
    })
}

export async function loginRecruiter(req, res) {
    const { email, password } = req.body;
    let recruiter = Recruiter.findOne({email: email});
    if (!recruiter) return res.status(404).send("User not found. Signup to register");

    bcrypt.compare(password, recruiter.password, (err, result) => {
        if (err) return res.status(400).send("Invalid password");

        const token = jwt.sign(
            {
                "_id": recruiter._id,
                "email": recruiter.email,
                "name": recruiter.name,
                "company_id": recruiter.company_id
            },
            process.env.JWT_ACCESS_TOKEN_SECRET,
            {expiresIn: '168h'}
        )
        return res.status(200).json({response:"Login successful", token: token});
    })
}

export async function uploadRecruiterData(req, res) {

    const email = req.user.email;
    const recruiter = Recruiter.findOne({ email: email });

    if (!recruiter) return res.status(404).send("recruiter not found");

    recruiter.name = req.body.name;
    recruiter.gender = req.body.gender;
    recruiter.age = Number(req.body.age);
    recruiter.Join_date = Date(req.body.Join_date);
    recruiter.qualification = req.body.qualification;
    recruiter.current_postition = req.body.current_postition;
    recruiter.salary = req.body.salary;
    recruiter.company_id = req.body.company_id;

    recruiter.save()
        .then((resp) => { return res.status(200).send("Recruiter data uploaded")} )
        .catch((err) => { return res.status(400).send("Could not save Recruiter data")} );

}

export async function createJobListing(req, res) {

    // title description requirements salary_range Location Job_type Recruiter_id company_id
    const job = new Job({
        title: req.body.title,
        description: req.body.description,
        requirements: req.body.requirements,
        salary_range: req.body.salary_range,
        Location: req.body.location,
        Job_type: req.body.job_type,
        Recruiter_id: req.user._id,
        company_id: req.user.company_id
    })

    job.save()
        .then((resp) => {return res.status(200).send("created job listing")} )
        .catch((err) => {return res.status(400).send("could not create job listing")} );
}

export async function viewApplications(req, res) {

    const job = Job.findById(req.body.job_id);

    if (job) {
        if (job.recruiter_id !== req.recruiter._id) return res.status(400).send("Cannot view application");
    }
    // return res.status(200).json({ applications: applications });
    Application.find({ Job_id: req.body.job_id })
        .populate("User_id")
        .then((users) => { return res.status(200).json({ applicants: users }) })
        .catch((err) => { return res.status(400).send("could not get users") });
}