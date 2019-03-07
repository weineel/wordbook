export enum ErrorCode {
  Success = 200,
  Failure = 500,
  // 单词已存在
  Exist = 550,
  NotExist
}

export class ResultError extends Error {
  code: ErrorCode

  constructor(message: string, code: ErrorCode) {
    super(message)
    this.code = code
  }
}

export class Result<T> {
  code: ErrorCode
  message: string
  data?: T

  constructor(code: ErrorCode, message: string, data?: T) {
    this.code = code
    this.message = message
    this.data = data
  }

  static success(message?: string, data?: any): Result<any> {
    return new Result(ErrorCode.Success, message || 'success', data)
  }

  static failure(message?: string, data?: any): Result<any> {
    return new Result(ErrorCode.Failure, message || 'failure', data)
  }

  static failureExist(word?: string, data?: any): Result<any> {
    return new Result(ErrorCode.Exist, `【单词 ${word}】已存在`, data)
  }

  static failureNotExist(word?: string, data?: any): Result<any> {
    return new Result(ErrorCode.NotExist, `单词【 ${word}】不存在`, data)
  }

  static parse(result: Result<any>): any {
    if (result.code === ErrorCode.Success) {
      return result.data
    } else {
      throw new ResultError(result.message, result.code)
    }
  }
}