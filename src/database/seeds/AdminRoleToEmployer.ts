import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { SeederFactoryManager } from 'typeorm-extension/dist/seeder';

import { Employer } from '@modules/users/entities/Employer';
import { Role } from '@modules/users/entities/Role';

class AdminRoleToEmployerSeeder implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    const employerRepository = dataSource.getRepository(Employer);
    const roleRepository = dataSource.getRepository(Role);

    const admin = await employerRepository.findOne({
      where: { email: 'admin@gmail.com' },
    });

    const role = await roleRepository.findOne({ where: { name: 'admin' } });
    if (admin && role) {
      admin.roles = [role];
      await employerRepository.save(admin);
    }
  }
}
export { AdminRoleToEmployerSeeder };
