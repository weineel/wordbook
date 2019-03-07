import ora from 'ora'
import { Result, Word } from '@wordbook/common'
import chalk from 'chalk'


export interface TintingOption {
  pos?: boolean,
  explanation?: boolean,
  tag?: boolean,
  sample?: boolean,
  note?: boolean
}

// spinner.stop()/spinner.succeed() 等停止函数会重写上一行的 log
const spinner = ora()

// 着色, 全角中括号着色为黄色。
function tintingForKeyword(message: string): string {
  return message.replace(/【.*?】/g, m => chalk.yellow(m))
}

export function cmd2wordObj(word: string, cmd: any): Word {
  return {
    word,
    pos: cmd.pos || [],
    explanation: cmd.explanation,
    tag: cmd.tag || [],
    sample: [],
    note: []
  }
}

/**
 * 等待 异步接口, 默认操作
 */
export async function lp(p: Promise<Result<any>>, loadingMessage?: string): Promise<any | undefined> {
  spinner.start(loadingMessage || 'loading...')
  const result: Result<any> = await p
  try {
    const data = Result.parse(result)
    spinner.succeed(tintingForKeyword(result.message))
    return data
  } catch (ex) {
    spinner.fail(chalk.red(tintingForKeyword(result.message)))
    throw ex
  }
}

export async function lpPure(p: Promise<Result<any>>): Promise<any | undefined> {
  const result: Result<any> = await p
  try {
    return Result.parse(result)
  } catch (ex) {
    throw ex
  }
}

function buildCmdOption(word: Word): string {
  let cmdOption = ''

  if (word.pos.length) {
    cmdOption += ` -p ${word.pos.join(',')}`
  }
  if (word.explanation) {
    cmdOption += ` -e ${word.explanation}`
  }
  if (word.tag.length) {
    cmdOption += ` -t ${word.tag.join(',')}`
  }
  return cmdOption
}

/**
 * 对象转换为 add 命令行
 * @param word 单词对象
 */
export function addRecommendCmd(word: Word): string {
  return `wordbook add${buildCmdOption(word)} ${word.word}`
}

/**
 * 对象转换为 modify 命令行
 * @param word 单词对象
 */
export function modifyRecommendCmd(word: Word): string {
  return `wordbook modify${buildCmdOption(word)} ${word.word}`
}

/**
 * 打印单词
 * @param word 要输出的单词
 * @param options 输出参数
 */
export function printTintingWrod(word: Word, options: TintingOption = {
  pos: true,
  explanation: true,
  tag: true
}) {
  console.log()
  let str: string = `🚩 ${chalk.blueBright(word.word)}`
  if (options.pos) {
    str += ` ${word.pos.join(', ')}.`
  }
  if (options.explanation) {
    str += ` ${chalk.yellow(word.explanation)}\n`
  }
  if (options.tag) {
    str += `${chalk.grey('标签:')} ${word.tag.join(' ')}`
  }
  console.log(str)
  console.log()
}
