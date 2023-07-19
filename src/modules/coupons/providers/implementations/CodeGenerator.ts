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
    const LETTER = 1;
    let initiate = false;

    for (let i = 1; i <= totalOfCaracter; i += 1) {
      const lastIndex = this.code.length - 1;

      if (initiate) {
        if (!this.code[lastIndex].match(/[0-9]/))
          this.code.push(this.random(0, 10).toString());
        else if (!this.code[lastIndex].match(/^[a-zA-Z]*$/))
          this.code.push(this.toLetter());
        // eslint-disable-next-line prettier/prettier
      } 
      else {
        if (this.random(0, 2) === LETTER) this.code.push(this.toLetter());
        else this.code.push(this.random(0, 10).toString());

        initiate = true;
      }
    }
    // tenho que verificar se o codigo gerado está certo
    return this.code.join('');
  }

  private random(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
  }
}
export default CodeGenerator;
