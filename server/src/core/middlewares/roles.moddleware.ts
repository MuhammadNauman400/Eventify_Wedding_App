const allRoles = {
  admin: [],
  vendor: [],
  buyer: [],
};

export const roles: string[] = Object.keys(allRoles);
export const roleRights: Map<string, string[]> = new Map(
  Object.entries(allRoles),
);
