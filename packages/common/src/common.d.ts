export declare interface Word {
  word: string,
  pos: string[],
  explanation: string,
  tag: string[],  // 数据库中是逗号隔开的字符串
  sample: string[],
  note: string[]
}

export declare enum ErrorCode {
  Success,
  Failure,
  // 单词已存在
  Exist,
  // 单词不存在
  NotExist,
}

export declare class ResultError extends Error {
  code: ErrorCode
}

export declare class Result<T> {
  code: ErrorCode
  message: string
  data?: T

  constructor(code: ErrorCode, message: string, data?: T)
  static success(message?: string, data?: any) : Result<any>
  static failure(message?: string, data?: any) : Result<any>
  static failureExist(word?: string, data?: any): Result<any>
  static failureNotExist(word?: string, data?: any): Result<any>
  static parse(result: Result<any>): any
}
