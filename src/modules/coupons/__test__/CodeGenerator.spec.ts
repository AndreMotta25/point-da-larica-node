import CodeGenerator from '../providers/implementations/CodeGenerator';
import ICodeGenerator from '../providers/interfaces/ICodeGenerator';

let codeGenerator: ICodeGenerator;

describe('Gerar um codigo', () => {
  beforeEach(() => {
    codeGenerator = new CodeGenerator();
  });

  test('Deveria gerar um codigo aleatorio com a quantidade de caracteres passados', () => {
    const code = codeGenerator.generateCode(5);

    expect(code).toHaveLength(5);
  });

  test('Deveria gerar um codigo aleatório que contem letras e numeros', () => {
    const code = codeGenerator.generateCode(5);

    expect(code).toMatch(/^(?=.*[a-zA-Z])(?=.*\d).*$/);
  });
});
