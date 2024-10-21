import httpStatus from 'http-status';
import { Router, Request, Response } from 'express';
import { ApiError } from '@core/errors';

const router: Router = Router();
const resBody = httpStatus[httpStatus.NOT_FOUND];
router.all('*', (req: Request, res: Response) => {
  throw new ApiError(httpStatus.NOT_FOUND, 'Not Found');
});

export default router;
