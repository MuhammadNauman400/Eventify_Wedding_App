import { Router } from 'express';

import * as emailController from './email.controller';

const router = Router();

router.post('/contact-us', emailController.contactUs);
router.post('/job-proposal', emailController.submitJobProposal);
router.post('/request-pricing', emailController.submitRequestPricing);

export default router;
