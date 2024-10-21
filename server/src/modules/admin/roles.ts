import { adminRoles, PERMISIONS } from './admin.constants';

const { ADMIN } = adminRoles;

const COMMON_PERMISSIONS = [PERMISIONS.GET_NOTIFICATION];

const allRoles = {
  [ADMIN]: [...COMMON_PERMISSIONS, PERMISIONS.CREATE_NOTIFICATION, PERMISIONS.CREATE_NOTIFICATION],
};

export const roles: string[] = Object.keys(allRoles);
export const roleRights: Map<string, string[]> = new Map(Object.entries(allRoles));
