import ICodeGenerator from '../interfaces/ICodeGenerator';

class CodeGenerator implements ICodeGenerator {
  private code: string[];

  constructor() {
    this.code = [];
  }

  private toLetter(): string {
    const letter = String.fromCharCode(this.random(65, 90));
    return letter;
  }

  generateCode(totalOfCaracter: number): string {
    for (let i = 1; i <= totalOfCaracter; i += 1) {
      if (this.random(0, 2) === 1) this.code.push(this.toLetter());
      else this.code.push(this.random(0, 10).toString());
    }
    return this.code.join('');
  }

  private random(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
  }
}
export default CodeGenerator;
