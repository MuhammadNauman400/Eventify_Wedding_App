import { ICategory, ICategoryDoc, UpdateCategory } from './category.interfaces';
import { ApiError } from '@core/errors';
import httpStatus from 'http-status';
import Category from './category.model';
import { Types } from 'mongoose';

/**
 * add category
 * @param {string} name
 * @returns {Promise<ICategoryDoc>}
 */
export function generateSlug(name: string): string {
  let slug = name.trim().toLowerCase();
  slug = slug.replace(/[^a-z0-9]+/g, '-');
  slug = slug.replace(/[^a-z0-9-]+/g, '');
  return slug;
}

/**
 * add category
 * @param {ICategory} categoryBody
 * @returns {Promise<ICategoryDoc>}
 */

export const addCategory = async (categoryBody: ICategory): Promise<ICategoryDoc> => {
  const { name } = categoryBody;
  const category = await Category.findOne({ name }).lean();
  const slug = generateSlug(name);
  if (category && category.slug == slug && (categoryBody.parent == '' || !categoryBody.parent)) {
    throw new ApiError(httpStatus.CONFLICT, 'Category already exists');
  }
  const data = {
    ...categoryBody,
    slug,
  };
  return Category.create(data);
};

/**
 * get for categories
 * @param {string} parent
 * @returns {Promise<ICategoryDoc[]>}
 */
export const getCategories = async (parent: string, sub: boolean): Promise<ICategoryDoc[]> =>
  sub
    ? Category.find({ parent: { $ne: '' } })
    : Category.find({
        parent: parent ? new Types.ObjectId(parent) : '',
      });

/**
 * get for all arranged categories
 * @returns {[Array]}
 */
export const getAllCategories = async () => {
  const categories = await Category.find({}, {});
  const parentCategories = categories.filter((c) => c.parent === '');
  return parentCategories.map((category) => ({
    category,
    subcategories: categories.filter((c) => c.parent && c.parent === category.id),
  }));
};

/**
 * find for categories
 * @param {string} parent
 * @returns {Promise<ICategoryDoc[]>}
 */
export const findCategories = async (filter: object, projection: object, options: object): Promise<ICategoryDoc[]> => {
  let categories = await Category.find(filter, projection, options);
  return categories;
};

export const findCategoryById = async (id: string): Promise<ICategoryDoc> => {
  return await Category.findById(new Types.ObjectId(id));
};

/**
 * update category
 * @param {UpdateCategory} categoryBody
 * @returns {Promise<ICategoryDoc>}
 */
export const updateCategory = async (id: string, categoryBody: UpdateCategory): Promise<ICategoryDoc> => {
  const category = await Category.findById(new Types.ObjectId(id));
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  }
  Object.assign(category, categoryBody);
  const slug = generateSlug(category.name);
  category.slug = slug;
  return await category.save();
};

/**
 * update category
 * @param {ICategoryDoc} category
 * @param {UpdateCategory} categoryBody
 * @returns {Promise<ICategoryDoc>}
 */
const setCategory = async (category: ICategoryDoc, categoryBody: any): Promise<ICategoryDoc> => {
  Object.assign(category, categoryBody);
  const slug = generateSlug(category.name);
  category.slug = slug;
  return await category.save();
};

/**
 * delete category
 * @param {id} id
 * @returns {Promise<ICategoryDoc>}
 */
export const deleteCategory = async (id: string): Promise<ICategoryDoc> => {
  const categoryId = new Types.ObjectId(id);
  const category = await Category.findOne(categoryId);
  if (!category) {
    throw new ApiError(httpStatus.CONFLICT, 'Category not exists');
  }
  const deletedCategory = await Category.findByIdAndDelete(categoryId);
  await Category.deleteMany({ parent: id });
  return deletedCategory.value;
};

/**
 * query categoires
 * @param {object} filters
 * @param {object} options
 * @returns {Promise<ICategoryDoc[]>}
 */
export const queryCategories = async (filters: object, options: object): Promise<ICategoryDoc[]> => {
  return Category.find(filters, {}, options);
};

/**
 * get category by slug
 * @param {string} slug
 * @returns {ICategoryDoc}
 */
export const getCategoryBySlug = async (slug: string): Promise<ICategoryDoc> => {
  const category = await Category.findOne({ slug });
  return category;
};
