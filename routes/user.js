import { signup, login, uploadUserProfilePicture, uploadUserData, applyForJobListing } from '../controllers/user.js';
import auth from '../middlwares/userAuth.js';
import { Router } from 'express';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({storage: storage});

const router = Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/upload-profile-picture', auth, upload.single('file'), uploadUserProfilePicture);
router.post('/upload-user-data', auth, uploadUserData);
router.post('/apply-for-job', auth, applyForJobListing)

export default router;
