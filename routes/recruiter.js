import { Router } from express;
import { createJobListing, createRecruiter, loginRecruiter, uploadRecruiterData, viewApplications } from "../controllers/recruiter";
import auth from "../middlwares/recruiterAuth";

const router = Router();

router.post('/signup', createRecruiter);
router.post('/login', loginRecruiter);
router.post('/uploadData', auth, uploadRecruiterData);
router.post('/create-job-listing', auth, createJobListing);
router.post('/view-applications', auth, viewApplications);

export default router;