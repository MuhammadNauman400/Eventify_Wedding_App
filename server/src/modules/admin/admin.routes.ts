import express, { Router, Request, Response } from 'express';

const router: Router = express.Router();
import { validate } from '@core/middlewares';
import * as adminController from './admin.controller';
import * as adminValidation from './admin.validate';

router.post('/', validate(adminValidation.createAdmin), adminController.createAdmin);
router.get('/', validate(adminValidation.queryAdmins), adminController.getAdmins);
router.put(
  '/:adminId/profile',
  validate(adminValidation.updateAdmin),
  adminController.updateAdminProfileById,
);
router.delete('/:adminId/profile', adminController.deleteAdmin);
router.post('/auth/login', validate(adminValidation.login), adminController.login);

export default router;
