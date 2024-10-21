import { Router } from 'express';
import { categoryController, categoryValidation } from '.';
import { validate } from '@core/middlewares';

const router = Router();

router.post('/', validate(categoryValidation.addCategory), categoryController.createCategory);
router.put(
  '/:categoryId',
  validate(categoryValidation.updateCategory),
  categoryController.updateCategory,
);
router.delete('/:categoryId', categoryController.deleteCategory);
router.get('/', validate(categoryValidation.getCategories), categoryController.getCategories);
router.get('/all', categoryController.getAllCategories);

export default router;
