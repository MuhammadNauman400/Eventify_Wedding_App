import Joi from 'joi';
import { notificationTypes, notifiyDeliveryMethods } from './notification.constants';

export const createNotification = Joi.object().keys({
  refType: Joi.string()
    .required()
    .empty('')
    .default('')
    .valid(notificationTypes.GENERAL, notificationTypes.ANNOUNCEMENT),
  refId: Joi.string().empty('').default(''),
  scheduledFor: Joi.string().isoDate().required(),
  message: Joi.string().required().max(50).min(20),
  filters: Joi.object().keys({
    activeUsersOnly: Joi.boolean().default(false),
    lastLoginBefore: Joi.string().isoDate().empty('').default('').optional(),
  }),
  deliveryMethods: Joi.array().items(
    Joi.string().required().valid(notifiyDeliveryMethods.EMAIL, notifiyDeliveryMethods.SAVE),
  ),
});
