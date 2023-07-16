import { verifyRoles } from './verifyRoles.validation';
import { verifyUser } from './verifyUser.validation';

const assignRolesValidator = [verifyRoles('roles'), verifyUser()];
export { assignRolesValidator };
