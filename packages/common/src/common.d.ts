export declare interface Word {
  word: string,
  pos: string[],
  explanation: string,
  tag: string[],  // 数据库中是逗号隔开的字符串
  sample: string[],
  note: string[]
}

export declare class Result<T> {
  code: number
  message: string
  data?: T

  constructor(code: number, message: string, data?: T)
  static success(message?: string, data?: any) : Result<any>
  static failure(message?: string, data?: any) : Result<any>
  static parse(result: Result<any>): any
}
