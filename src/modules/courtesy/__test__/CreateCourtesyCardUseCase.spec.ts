import { CalledWithMock, mock, MockProxy } from 'jest-mock-extended';
import { v4 } from 'uuid';

import ICodeGenerator from '@modules/coupons/providers/interfaces/ICodeGenerator';
import { Employer } from '@modules/users/entities/Employer';
import { IEmployerRepository } from '@modules/users/repositories/IEmployerRepository';

import { ICourtesyCardRepository } from '../repositories/ICourtesyCardRepository';
import { CourtesyCardRepositoryInMemory } from '../repositories/inMemory/CourtesyCardRepositoryInMemory';
import { CreateCourtesyCardUseCase } from '../useCases/CreateCourtesyCard/CreateCourtesyCardUseCase';

let createCourtesyCardUseCase: CreateCourtesyCardUseCase;
let codeGenerator: MockProxy<ICodeGenerator>;
let employerRepository: MockProxy<IEmployerRepository>;
let courtesyCardRepository: ICourtesyCardRepository;

describe('Cria um cartão cortesia', () => {
  beforeEach(() => {
    courtesyCardRepository = new CourtesyCardRepositoryInMemory();
    codeGenerator = mock();
    employerRepository = mock();
    createCourtesyCardUseCase = new CreateCourtesyCardUseCase(
      courtesyCardRepository,
      employerRepository,
      codeGenerator
    );
  });
  test('Deveria criar um cartão cortesia', async () => {
    const employerId = v4();

    employerRepository.findById.mockResolvedValue({
      cpf: '717.039.590-86',
      created_at: new Date(),
      email: 'teste@gmail.com',
      hashToken: v4(),
      id: employerId,
      name: 'teste',
      password: 'teste',
      roles: [],
      situation: true,
    });
    codeGenerator.generateCode.mockReturnValue('A3D3');

    const courtesyCard = await createCourtesyCardUseCase.execute({
      employer_id: employerId,
      cpf: '689.232.690-00',
      motivation: 'Isso é um teste',
      value: 10,
    });

    expect(courtesyCard.id).not.toBeNull();
    expect(courtesyCard.code).toBe('A3D3');
  });
  test('Deveria ocorrer um erro por não achar o employer', async () => {
    await expect(async () => {
      employerRepository.findById.mockResolvedValue(null);
      await createCourtesyCardUseCase.execute({
        employer_id: v4(),
        cpf: '689.232.690-00',
        motivation: 'Isso é um teste',
        value: 10,
      });
    }).rejects.toHaveProperty('msg', 'Empregado não achado');
    expect(employerRepository.findById).toBeCalled();
  });

  test('Deveria ocorer um erro se o empregado gerar um cartão para ele mesmo', async () => {
    await expect(async () => {
      const employerId = v4();

      employerRepository.findById.mockResolvedValue({
        cpf: '717.039.590-86',
        created_at: new Date(),
        email: 'teste@gmail.com',
        hashToken: v4(),
        id: employerId,
        name: 'teste',
        password: 'teste',
        roles: [],
        situation: true,
      });
      await createCourtesyCardUseCase.execute({
        employer_id: employerId,
        cpf: '717.039.590-86',
        motivation: 'Isso é um teste',
        value: 10,
      });
    }).rejects.toHaveProperty(
      'msg',
      'Um empregado não pode gerar um cartão para sí'
    );
  });
  test('Deveria ocorrer um erro caso o motivo da cortesia não seja mencionado', async () => {
    await expect(async () => {
      const employerId = v4();

      employerRepository.findById.mockResolvedValue({
        cpf: '717.039.590-86',
        created_at: new Date(),
        email: 'teste@gmail.com',
        hashToken: v4(),
        id: employerId,
        name: 'teste',
        password: 'teste',
        roles: [],
        situation: true,
      });
      await createCourtesyCardUseCase.execute({
        employer_id: employerId,
        cpf: '117.039.590-36',
        motivation: '',
        value: 10,
      });
    }).rejects.toHaveProperty('msg', 'Explique o motivo da cortesia!');
  });
});
