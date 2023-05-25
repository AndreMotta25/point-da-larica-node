interface IEmployerRequestDTO {
  name: string;
  username: string;
  password: string;
  cpf: string;
  email: string;
  roles: string[];
  id?: string;
}
export { IEmployerRequestDTO };
