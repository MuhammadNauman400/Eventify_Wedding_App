import { Router } from 'express';
import { authValidation, authController } from '.';
import { validate } from '@core/middlewares';
import auth from './auth.middleware';

const router: Router = Router();

router.post('/login', validate(authValidation.login), authController.login);
router.post('/register', validate(authValidation.register), authController.register);
router.post('/logout', validate(authValidation.logout), authController.logout);

export default router;
