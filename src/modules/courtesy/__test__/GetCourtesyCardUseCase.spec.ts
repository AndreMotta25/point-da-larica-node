import 'reflect-metadata';

import { mock, MockProxy } from 'jest-mock-extended';
import { v4 } from 'uuid';

import { ICourtesyCardRepository } from '../repositories/ICourtesyCardRepository';
import { GetCourtesyCardUseCase } from '../useCases/GetCourtesyCard/GetCourtesyCardUseCase';

let courtesyCardRepository: MockProxy<ICourtesyCardRepository>;
let getCourtesyCardUseCase: GetCourtesyCardUseCase;

describe('Cria um cartão cortesia', () => {
  beforeEach(() => {
    courtesyCardRepository = mock();
    getCourtesyCardUseCase = new GetCourtesyCardUseCase(courtesyCardRepository);
  });

  test('Deveria achar um cartão cortesia', async () => {
    courtesyCardRepository.getCourtesyCardByCodeAndCpf.mockResolvedValue({
      id: v4(),
      code: '1S3S',
      cpf: '523.740.050-70',
      created_at: new Date(),
      employer: {
        cpf: '717.039.590-86',
        created_at: new Date(),
        email: 'teste@gmail.com',
        hashToken: v4(),
        id: v4(),
        name: 'teste',
        password: 'teste',
        roles: [],
        situation: true,
      },
      expiresIn: new Date(),
      motivation: '',
      used: false,
      value: 10,
    });
    const cortesy = await getCourtesyCardUseCase.execute({
      code: '1S3S',
      cpf_client: '523.740.050-70',
    });
    expect(cortesy.id).not.toBeNull();
  });

  test('Deveria ocorrer um erro ao não achar o cartão', async () => {
    await expect(async () => {
      await getCourtesyCardUseCase.execute({
        code: '1S3S',
        cpf_client: '523.740.050-70',
      });
    }).rejects.toHaveProperty('msg', 'Cartão cortesia não Achado');
  });
});
