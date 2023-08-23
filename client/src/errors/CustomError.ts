export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

export class UnexpectedError extends Error {
  constructor(message?: string) {
    super(message ? message : '예상치 못한 에러가 발생했습니다.');
    this.name = 'UnexpectedError';
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

export class CustomError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CustomError';
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}
