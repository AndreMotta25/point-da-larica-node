import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { SeederFactoryManager } from 'typeorm-extension/dist/seeder';
import { v4 } from 'uuid';

import { Permission } from '@modules/users/entities/Permission';
import { Role } from '@modules/users/entities/Role';

export interface IPermission {
  id: string;
  name: string;
  description: string;
}
class PermissionSeeder implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    const permissions: IPermission[] = [
      {
        id: v4(),
        name: 'create_user',
        description: 'Create a User',
      },
      {
        id: v4(),
        name: 'block_user',
        description: 'Block a User',
      },
      {
        id: v4(),
        name: 'create_coupon',
        description: 'Create a Coupon',
      },
      {
        id: v4(),
        name: 'get_coupon',
        description: 'Get a Coupon',
      },
      {
        id: v4(),
        name: 'invalid_coupon',
        description: 'Invalid a Coupon',
      },
      {
        id: v4(),
        name: 'register_order',
        description: 'Register a Order',
      },
      {
        id: v4(),
        name: 'cancel_order',
        description: 'Cancel a Order',
      },
      {
        id: v4(),
        name: 'get_order',
        description: 'Get a Order',
      },
      {
        id: v4(),
        name: 'send_order',
        description: 'Send a Order',
      },
      {
        id: v4(),
        name: 'create_product',
        description: 'Create a Product',
      },
      {
        id: v4(),
        name: 'get_product',
        description: 'Get a Product',
      },
      {
        id: v4(),
        name: 'create_role',
        description: 'Create a Role',
      },
      {
        id: v4(),
        name: 'get_role',
        description: 'Get a Role',
      },
      {
        id: v4(),
        name: 'assign_role',
        description: 'Assign a Role',
      },
      {
        id: v4(),
        name: 'remove_role',
        description: 'Remove a Role',
      },
      {
        id: v4(),
        name: 'create_permission',
        description: 'Create a Permission',
      },
      {
        id: v4(),
        name: 'create_courtesy',
        description: 'Create a Courtesy Card',
      },
      {
        id: v4(),
        name: 'get_courtesy',
        description: 'Get a Courtesy Card',
      },
      {
        id: v4(),
        name: 'get_sales_of_week',
        description: 'Get Sales Of Week',
      },
      {
        id: v4(),
        name: 'fire_employer',
        description: 'Fire An Employer',
      },
    ];

    const repository = dataSource.getRepository(Permission);
    const roleRepository = dataSource.getRepository(Role);

    const permissionsFiltered = (
      await Promise.all(
        permissions.map(async (p) => {
          const permissionExists = await repository.findOne({
            where: { name: p.name },
          });
          if (!(permissionExists && permissionExists.name === p.name)) {
            return p;
          }
          return false;
        })
      )
    ).filter((p) => p !== false) as IPermission[];

    if (permissionsFiltered.length > 0) {
      await repository.insert(permissionsFiltered);

      // populate roles_permissions
      const roleAdmin = (await roleRepository.findOne({
        where: {
          name: 'admin',
        },
        relations: { permissions: true },
      })) as Role;

      roleAdmin.permissions = [
        ...permissionsFiltered,
        ...roleAdmin.permissions,
      ];
      await roleRepository.save(roleAdmin);

      console.log('Inseriu as Permissoes');
    }
  }
}
export { PermissionSeeder };
