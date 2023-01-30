import {
  getCompany,
  getCompanies,
  updateCompany,
  addNewCompany,
} from './../controllers/companyController';
import { Router } from 'express';

const router: Router = Router();

router.get('/:companyID', getCompany);
router.get('/', getCompanies);
router.put('/:companyID', updateCompany);
router.post('/', addNewCompany);

export default router;
