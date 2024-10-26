import { Router } from express;
import uploadCompanyData from "../controllers/company";

const router = Router();

router.post('uploadData', uploadCompanyData);