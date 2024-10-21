import express, { Router, Request, Response } from 'express';

const router: Router = express.Router();
import { validate } from '@core/middlewares';
import * as marketplaceController from './marketplace.controller';
import * as marketplaceValidator from './marketplace.validate';
import { auth } from '@modules/auth';

router.post('/service', auth(), validate(marketplaceValidator.addService), marketplaceController.addService);
router.post('/services/:serviceId/review', auth(), marketplaceController.addServiceReview);
router.get('/services', validate(marketplaceValidator.getServices), marketplaceController.getServices);
router.get('/services/my', auth(), validate(marketplaceValidator.getServices), marketplaceController.getMyServices);
router.get('/services/popular', marketplaceController.getPopularServices);
router.get('/services/query', marketplaceController.getQueryServices);
router.get('/services/:serviceId/details', marketplaceController.getServiceDetail);

// add review

export default router;
