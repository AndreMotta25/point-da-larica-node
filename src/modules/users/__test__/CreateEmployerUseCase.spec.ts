import AppError from '@errors/AppError';
import ErrorField from '@errors/ErrorField';
import CodeGenerator from '@modules/coupons/providers/implementations/CodeGenerator';
import ICodeGenerator from '@modules/coupons/providers/interfaces/ICodeGenerator';

import { ISendMail } from '../../../emailProvider/ISendMail';
import { SendMailMock } from '../../../emailProvider/mock/SendMailMock';
import { IEmployerRepository } from '../repositories/IEmployerRepository';
import { EmployerRepositoryInMemory } from '../repositories/in-memory/EmployerRepositoryInMemory';
import { PermissionRepositoryInMemory } from '../repositories/in-memory/PermissionRepositoryInMemory';
import { RoleRepositoryInMemory } from '../repositories/in-memory/RoleRepositoryInMemory';
import { IPermissionRepository } from '../repositories/IPermissionRepository';
import { IRoleRepository } from '../repositories/IRoleRepository';
import { CreateEmployerUseCase } from '../useCases/CreateEmployer/CreateEmployerUseCase';
import { CreateRoleUseCase } from '../useCases/CreateRole/CreateRoleUseCase';

let codeGenerator: ICodeGenerator;
let sendEmail: ISendMail;

let employerRepository: IEmployerRepository;
let roleRepository: IRoleRepository;
let permissionRepository: IPermissionRepository;

let createRoleUseCase: CreateRoleUseCase;
let createEmployerUseCase: CreateEmployerUseCase;

describe('Criar um Empregado', () => {
  beforeEach(() => {
    codeGenerator = new CodeGenerator();
    sendEmail = new SendMailMock();

    employerRepository = new EmployerRepositoryInMemory();
    roleRepository = new RoleRepositoryInMemory();
    permissionRepository = new PermissionRepositoryInMemory();

    createEmployerUseCase = new CreateEmployerUseCase(
      employerRepository,
      roleRepository,
      sendEmail,
      codeGenerator
    );

    createRoleUseCase = new CreateRoleUseCase(
      roleRepository,
      permissionRepository
    );
  });
  test('Deveria cadastrar um usuario', async () => {
    const roleManager = await createRoleUseCase.execute({
      name: 'Manager',
      description: 'Manager teste',
      permissions: [],
    });

    const employer = await createEmployerUseCase.execute({
      cpf: 'xxx.xxx.xxx.xx',
      email: 'teste@gmail.com',
      name: 'tester',
      roles: [roleManager.id],
    });

    expect(employer).toHaveProperty('id');
  });

  test('Deveria ocorrer um erro caso o usuario já tenha um cpf já cadastrado', async () => {
    await expect(async () => {
      const roleManager = await createRoleUseCase.execute({
        name: 'Manager',
        description: 'Manager teste',
        permissions: [],
      });

      await createEmployerUseCase.execute({
        cpf: 'xxx.xxx.xxx.xx',
        email: 'teste@gmail.com',
        name: 'tester',
        roles: [roleManager.id],
      });

      await createEmployerUseCase.execute({
        cpf: 'xxx.xxx.xxx.xx',
        email: 'teste@gmail.com',
        name: 'tester',
        roles: [roleManager.id],
      });
    }).rejects.toBeInstanceOf(ErrorField);
  });

  test('Deveria ocorrer um erro caso o email já tenha sido cadastrado', async () => {
    await expect(async () => {
      const roleManager = await createRoleUseCase.execute({
        name: 'Manager',
        description: 'Manager teste',
        permissions: [],
      });

      await createEmployerUseCase.execute({
        cpf: '2xx.xxx.xxx.x2',
        email: 'teste@gmail.com',
        name: 'tester',
        roles: [roleManager.id],
      });

      await createEmployerUseCase.execute({
        cpf: '1xx.xxx.xxx.x1',
        email: 'teste@gmail.com',
        name: 'tester',
        roles: [roleManager.id],
      });
    }).rejects.toBeInstanceOf(ErrorField);
  });

  test('Deveria ocorrer um erro caso nenhuma role tenha sido passada para o usuario', async () => {
    await expect(async () => {
      await createEmployerUseCase.execute({
        cpf: 'xxx.xxx.xxx.xx',
        email: 'teste@gmail.com',
        name: 'tester',
        roles: [],
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
