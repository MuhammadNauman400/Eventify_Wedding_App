import express, { Router, Request, Response } from 'express';

const router: Router = express.Router();

import * as userController from './user.controller';
import * as userValidation from './user.validate';
import { favouriteController, favouriteValidation } from '@modules/favourite';
import { auth } from '@modules/auth';
import { validate } from '@core/middlewares';

// router.put(
//   '/profile',
//   auth(),
//   validate(userValidation.updateProfile),
//   userController.updateProfile,
// );
// router.put(
//   '/password',
//   auth(),
//   validate(userValidation.resetPassword),
//   userController.resetPassword,
// );
// router.delete('/account', auth(), userController.deleteUserAccount);

// router.post(
//   '/favourites',
//   auth(),
//   validate(favouriteValidation.addFavItem),
//   favouriteController.addFavItem,
// );
// router.get(
//   '/favourites',
//   auth(),
//   validate(favouriteValidation.getFavItems),
//   favouriteController.getFavItems,
// );
// router.get(
//   '/favourites/details',
//   auth(),
//   validate(favouriteValidation.getFavItemsDetails),
//   favouriteController.getFavItemsDetails,
// );

// admin
router.get('/', validate(userValidation.getUsers), userController.getUsers);
router.get('/:userId', userController.getUserDetails);
router.put('/:userId', validate(userValidation.updateUser), userController.updateUser);

export default router;
