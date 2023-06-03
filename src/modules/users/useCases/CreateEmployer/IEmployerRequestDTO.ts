interface IEmployerRequestDTO {
  name: string;
  password: string;
  cpf: string;
  email: string;
  roles: string[];
  id?: string;
}
export { IEmployerRequestDTO };
