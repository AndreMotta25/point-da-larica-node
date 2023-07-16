import { verifyRoles } from './verifyRoles.validation';
import { verifyUser } from './verifyUser.validation';

const removeRolesFromEmployerValidator = [
  verifyRoles('roles_ids'),
  verifyUser(),
];

export { removeRolesFromEmployerValidator };
