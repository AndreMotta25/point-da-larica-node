import { hash } from 'bcryptjs';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { SeederFactoryManager } from 'typeorm-extension/dist/seeder';

import { Employer } from '@modules/users/entities/Employer';

class AdminSeeder implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    const employerRepository = dataSource.getRepository(Employer);

    const adminExists = await employerRepository.findOne({
      where: { name: 'admin' },
    });

    if (!adminExists) {
      const adm = employerRepository.create({
        name: 'admin',
        password: await hash('admin', 8),
        cpf: 'xxx.xxx.xxx-xx',
        email: 'admin@gmail.com',
      });
      await employerRepository.save(adm);
      console.log('Criou o usuário');
    }
  }
}
export { AdminSeeder };
