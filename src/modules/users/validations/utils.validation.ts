import { isValidCPF } from '@brazilian-utils/brazilian-utils';

const isCpf = (value: string) => {
  if (isValidCPF(value)) return true;
  throw new Error('Cpf inválido');
};
export { isCpf };

const isString = (value: unknown): value is string => {
  if (typeof value === 'string') return true;
  return false;
};

const emailIsValid = (value: string) => {
  if (
    (isString(value) && !value.includes('.com') && !value.includes('.br')) ||
    !isString(value)
  ) {
    throw new Error('Email inválido! O email deve terminar com .com ou .br');
  } else {
    return true;
  }
};
export { emailIsValid };
