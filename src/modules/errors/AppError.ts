class AppError {
  public statusCode: number;
  public msg: string;

  constructor(message: string, statusCode = 400) {
    this.msg = message;
    this.statusCode = statusCode;
  }
}

export default AppError;
