export class Result<T> {
  code: number
  message: string
  data?: T

  constructor(code: number, message: string, data?: T) {
    this.code = code
    this.message = message
    this.data = data
  }

  static success(message?: string, data?: any): Result<any> {
    return new Result(200, message || 'success', data)
  }

  static failure(message?: string, data?: any): Result<any> {
    return new Result(500, message || 'failure', data)
  }

  static parse(result: Result<any>): any {
    if (result.code === 200) {
      return result.data
    } else {
      throw new Error(result.message)
    }
  }
}