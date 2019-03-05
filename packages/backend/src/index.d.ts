export interface Word {
  word: string,
  pos: string[],
  explanation: string,
  tag: string[],  // 数据库中是逗号隔开的字符串
  sample: string[],
  note: string[]
}

export interface Result {
  code: number,
  message: string,
  data?: any
}

export function add(word: Word): Promise<any>
