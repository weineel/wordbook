import ora from 'ora'
import { Result } from '@wordbook/common'
import chalk from 'chalk'

// spinner.stop()/spinner.succeed() 等停止函数会重写上一行的 log
const spinner = ora()

// 着色, 全角中括号着色为黄色。
function tintingForKeyword(message: string): string {
  return message.replace(/【.*?】/g, m => chalk.yellow(m))
}

/**
 * 等待 异步接口, 默认操作
 */
export async function lp(p: Promise<Result<any>>, loadingMessage?: string): Promise<Result<any>> {
  spinner.start(loadingMessage || 'loading...')
  const result: Result<any> = await p
  try {
    Result.parse(result)
    spinner.succeed(tintingForKeyword(result.message))
  } catch (ex) {
    spinner.fail(chalk.red(tintingForKeyword(result.message)))
  }
  return p
}
