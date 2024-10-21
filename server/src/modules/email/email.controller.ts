import { Request, Response } from 'express';

import { Types } from 'mongoose';

import { catchAsync } from '@core/utils';
import * as emailService from './email.service';
import * as jobService from '@modules/jobs/jobs.service';
import * as marketPlaceService from '@modules/marketplace/marketplace.service';
import httpStatus from 'http-status';

export const contactUs = catchAsync(async (req: Request, res: Response) => {
  const { email, username, subject, message } = req.body;
  await emailService.contactUsEmail(email, username, subject, message);
  res.status(200).json({
    status: true,
    message: 'Email sent successfully',
  });
});

export const submitJobProposal = catchAsync(async (req: Request, res: Response) => {
  const { jobId, message, firstname, lastname, email, phoneNumber } = req.body;
  const job: any = await jobService.getJobById(new Types.ObjectId(jobId));
  await emailService.jobRequestByVendorEmail(email, phoneNumber, job.createdBy.email, message, job.description);
  res.status(200).json({
    status: true,
    message: 'Email sent successfully',
  });
});

export const submitRequestPricing = catchAsync(async (req: Request, res: Response) => {
  const { serviceId, message, firstName, lastName, email, phoneNumber } = req.body;
  const service: any = await marketPlaceService.getServiceDetailById(new Types.ObjectId(serviceId));
  await emailService.requestPricingEmail(
    email,
    service.createdBy.email,
    phoneNumber,
    `${firstName} ${lastName}`,
    service.createdBy.name,
    service.name,
    message,
  );
  res.status(httpStatus.OK).json({
    status: true,
    message: 'Email sent successfully',
  });
});
