import { Router } from 'express';

import * as jobController from './jobs.controller';
import * as jobValidator from './jobs.validate';
import { validate } from '@core/middlewares';
import { auth } from '@modules/auth';

const router = Router();

router.post('/', auth(), validate(jobValidator.createJob), jobController.createJob);
router.get('/', auth(), validate(jobValidator.queryJobs), jobController.getJobs);
router.get('/latest', jobController.latestJobs);
router.get('/query', validate(jobValidator.queryJobs), jobController.queryJobs);

export default router;
