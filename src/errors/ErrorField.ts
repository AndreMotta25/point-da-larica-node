class ErrorField {
  public value: string;
  public msg: string;
  public param?: string;
  public location: string;
  public statusCode: number;

  constructor(value: string, msg: string, param?: string, statusCode = 400) {
    this.value = value;
    this.msg = msg;
    this.statusCode = statusCode;
    this.param = param;
  }
}

export default ErrorField;
