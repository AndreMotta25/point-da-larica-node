import { mock, MockProxy } from 'jest-mock-extended';

import 'reflect-metadata';
import { v4 } from 'uuid';

import { ICourtesyCardRepository } from '../repositories/ICourtesyCardRepository';
import { UseCourtesyCardUseCase } from '../useCases/UseCourtesyCard/UseCourtesyCardUseCase';

let useCourtesyCardUseCase: UseCourtesyCardUseCase;
let courtesyCardRepository: MockProxy<ICourtesyCardRepository>;

describe('Usar um cartão cortersia', () => {
  beforeEach(() => {
    courtesyCardRepository = mock();
    useCourtesyCardUseCase = new UseCourtesyCardUseCase(courtesyCardRepository);
  });
  test('Deveria retornar a cortesia para ser usada', async () => {
    const expireDate = new Date().setDate(new Date().getDate() + 2);

    courtesyCardRepository.getCourtesyCardByCodeAndCpf.mockResolvedValue({
      code: 'A3D4',
      cpf: '532.135.650-59',
      id: v4(),
      motivation: 'isso é um teste',
      created_at: new Date(),
      employer: {} as any,
      expiresIn: new Date(expireDate),
      used: false,
      value: 10,
    });
    const coutesy = await useCourtesyCardUseCase.execute({
      code: 'A3D4',
      cpf_client: '532.135.650-59',
    });
    expect(coutesy.code).toEqual('A3D4');
  });
  test('Deveria ocorrer um erro pelo cliente não ter credito na loja.', async () => {
    await expect(async () => {
      courtesyCardRepository.getCourtesyCardByCodeAndCpf.mockResolvedValue(
        null
      );
      await useCourtesyCardUseCase.execute({
        code: 'A3D4',
        cpf_client: '532.135.650-59',
      });
    }).rejects.toHaveProperty('msg', 'O cliente não tem credito na loja!');
  });
  test('Deveria ocorrer um erro caso a cortesia tenha expirado', async () => {
    const expireDate = new Date('2023-07-20T00:00:00');
    await expect(async () => {
      courtesyCardRepository.getCourtesyCardByCodeAndCpf.mockResolvedValue({
        code: 'A3D4',
        cpf: '532.135.650-59',
        id: v4(),
        motivation: 'isso é um teste',
        created_at: new Date(),
        employer: {} as any,
        expiresIn: expireDate,
        used: false,
        value: 10,
      });
      await useCourtesyCardUseCase.execute({
        code: 'A3D4',
        cpf_client: '532.135.650-59',
      });
    }).rejects.toHaveProperty(
      'msg',
      `A cortesia expirou em ${expireDate.toLocaleString()}`
    );
  });
  test('Deveria ocorrer um erro caso o cartão não tenha mais saldo', async () => {
    await expect(async () => {
      const expireDate = new Date().setDate(new Date().getDate() + 2);

      courtesyCardRepository.getCourtesyCardByCodeAndCpf.mockResolvedValue({
        code: 'A3D4',
        cpf: '532.135.650-59',
        id: v4(),
        motivation: 'isso é um teste',
        created_at: new Date(),
        employer: {} as any,
        expiresIn: new Date(expireDate),
        used: false,
        value: 0,
      });

      await useCourtesyCardUseCase.execute({
        code: 'A3D4',
        cpf_client: '532.135.650-59',
      });
    }).rejects.toHaveProperty('msg', 'Cartão cortesia sem saldo suficiente');
  });
});
