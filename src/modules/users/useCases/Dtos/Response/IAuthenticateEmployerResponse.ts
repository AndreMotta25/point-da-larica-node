interface IAuthenticateEmployerResponse {
  user: {
    id: string;
    email: string;
  };
  token: string;
}
export { IAuthenticateEmployerResponse };
