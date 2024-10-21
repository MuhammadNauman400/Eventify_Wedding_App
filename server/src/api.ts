import { Router } from 'express';

import healthCheck from 'modules/healthcheck/healthCheck.router';
import { authRouter } from '@modules/auth';
import { categoryRouter } from '@modules/category';
import { adminRouter } from '@modules/admin';
import { userRouter } from '@modules/user';
import { marketplaceRouter } from '@modules/marketplace';
import { jobRouter } from '@modules/jobs';
import { emailRouter } from '@modules/email';

const router: Router = Router();

router.use(healthCheck);
router.use('/auth', authRouter);
router.use('/categories', categoryRouter);
router.use('/admins', adminRouter);
router.use('/users', userRouter);
router.use('/marketplace', marketplaceRouter);
router.use('/jobs', jobRouter);
router.use('/email', emailRouter);

export default router;
