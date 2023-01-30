import { Router } from 'express';
import {
  deactivateUser,
  getUser,
  updateUser,
} from '../controllers/userController';

const router: Router = Router();

router.get('/', getUser);
router.delete('/', deactivateUser);
router.put('/', updateUser);

export default router;
