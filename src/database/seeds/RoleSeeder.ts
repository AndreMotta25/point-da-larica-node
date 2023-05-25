import { DataSource, In } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { SeederFactoryManager } from 'typeorm-extension/dist/seeder';

import { Role } from '@modules/users/entities/Role';

class RoleSeeder implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    const repository = dataSource.getRepository(Role);

    const roles = [
      {
        name: 'admin',
        description: 'Administrator',
      },
      {
        name: 'manager',
        description: 'Manager',
      },
      {
        name: 'cashier',
        description: 'Cashier',
      },
    ];
    const rolesExists = (
      await repository.find({
        where: { name: In(roles.map((r) => r.name)) },
      })
    ).map((r) => r.name);

    const newRoles = roles.filter((r) => !rolesExists.includes(r.name));
    const rolesToSave = repository.create(newRoles);
    await repository.save(rolesToSave);
    console.log('Inseriu as Roles');
  }
}
export { RoleSeeder };
