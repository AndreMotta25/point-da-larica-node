import 'reflect-metadata';
// import { unlink } from 'fs/promises';
import { mock } from 'jest-mock-extended';
import { MockProxy } from 'jest-mock-extended/lib/Mock';
import { ISendMail } from 'src/provider/email/ISendMail';
import { IExcelManager } from 'src/provider/worksheet/IExcelManager';
import { v4 } from 'uuid';

import { Role } from '@modules/users/entities/Role';
import { IEmployerRepository } from '@modules/users/repositories/IEmployerRepository';

import { GenerateReportUseCase } from '../useCases/GenerateReport/GenerateReportUseCase';

let excelManager: MockProxy<IExcelManager>;
let sendMail: MockProxy<ISendMail>;
let employerRepository: MockProxy<IEmployerRepository>;
let generateReportUseCase: GenerateReportUseCase;

// não precisei importar o useCase dele acima
jest.mock('@modules/orders/useCases/SalesOfWeek/SalesOfWeekUseCase', () => {
  return {
    SalesOfWeekUseCase: jest.fn().mockImplementation(() => {
      return {
        execute: jest.fn(),
      };
    }),
  };
});

jest.mock('fs/promises');

describe('Enviando relatorio semanal', () => {
  beforeEach(() => {
    excelManager = mock();
    sendMail = mock();
    employerRepository = mock();

    generateReportUseCase = new GenerateReportUseCase(
      excelManager,
      employerRepository,
      sendMail
    );
  });
  test('Deveria ocorrer um erro ao não achar o usuario', async () => {
    await expect(async () => {
      employerRepository.findByEmail.mockResolvedValue(null);
      await generateReportUseCase.execute('relaie22@gmail.com');
    }).rejects.toHaveProperty('msg', 'Empregado não achado');
    expect(sendMail.sendEmail).not.toHaveBeenCalled();
    expect(excelManager.setData).not.toHaveBeenCalled();
    expect(excelManager.save).not.toHaveBeenCalled();
  });

  test('Deveria enviar o relatorio', async () => {
    const role = new Role();
    Object.assign(role, {
      id: v4(),
      name: 'tester',
      description: 'isso é um teste',
      permissions: [
        {
          id: v4(),
          name: 'received_report',
          description: 'email teste',
        },
      ],
    });

    employerRepository.findByEmail.mockResolvedValue({
      id: v4(),
      cpf: 'xxx.xxx.xxx-xx',
      email: 'teste@gmail.com',
      created_at: new Date('2023-05-30'),
      hashToken: v4(),
      name: 'teste',
      password: '12345',
      situation: true,
      roles: [role],
    });
    await generateReportUseCase.execute('teste@gmail.com');

    expect(employerRepository.findByEmail).toHaveBeenCalled();
    expect(sendMail.sendEmail).toHaveBeenCalled();
    expect(excelManager.setData).toHaveBeenCalled();
    expect(excelManager.save).toHaveBeenCalled();
  });

  test('Deveria ocorrer um erro ao usuario não ter permissoes o suficiente', async () => {
    await expect(async () => {
      const role = new Role();
      Object.assign(role, {
        id: v4(),
        name: 'tester',
        description: 'isso é um teste',
        permissions: [],
      });

      employerRepository.findByEmail.mockResolvedValue({
        id: v4(),
        cpf: 'xxx.xxx.xxx-xx',
        email: 'teste@gmail.com',
        created_at: new Date('2023-05-30'),
        hashToken: v4(),
        name: 'teste',
        password: '12345',
        situation: true,
        roles: [role],
      });

      await generateReportUseCase.execute('teste@gmail.com');
    }).rejects.toHaveProperty(
      'msg',
      'Função não permitida para o email em questão'
    );
  });
});
