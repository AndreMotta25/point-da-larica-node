import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { runSeeder, SeederFactoryManager } from 'typeorm-extension/dist/seeder';

import { AdminRoleToEmployerSeeder } from './AdminRoleToEmployer';
import { AdminSeeder } from './AdminSeeder';
import { PermissionSeeder } from './PermissionSeeder';
import { RoleSeeder } from './RoleSeeder';

class MainSeeder implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    await runSeeder(dataSource, AdminSeeder);
    await runSeeder(dataSource, RoleSeeder);
    await runSeeder(dataSource, PermissionSeeder);

    await runSeeder(dataSource, AdminRoleToEmployerSeeder);
  }
}
export { MainSeeder };
