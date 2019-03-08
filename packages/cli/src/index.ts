#!/usr/bin/env node

import program from 'commander'
import chalk from 'chalk'
import { close, add, search, getByWord, deleteByWords, updateByWord } from '@wordbook/backend'
import { Word, ErrorCode, SearchOptions } from '@wordbook/common'
import { lp, lpPure, printTintingWrod, cmd2wordObj, addRecommendCmd, modifyRecommendCmd } from './utils'

program
  .version(require('../package.json').version, '-v, --version')
  // .option('-x, --xe <xee>', 'xxxxx')  // 根选项, 优先级比子命令高(同名时，子命令将不会被解析到)。
  .usage('<command> [options]')  // 用法说明（BNF 范式指导），会在 --help 时显示。

program
  .command('add <word>')
  .description('添加一个单词，不能添加已经存在的单词。')
  .option('-p, --pos <a>[,b]*', 'Part of speech，词性。多个时使用 , 隔开。', list)
  .option('-e, --explanation <explanation>', '解释。')
  .option('-s, --sample <sample>', '例句。')
  .option('-n, --note <note>', '笔记。')
  .option('-t, --tag <a>[,b]*', '标签，多个时使用 , 隔开。', list)
  .action(async (word, cmd) => {
    const inputWord: Word = cmd2wordObj(word, cmd)
    try {
      await lp(add(inputWord))
    } catch (ex) {
      if (ex.code === ErrorCode.Exist) {
        const recommendCmd = modifyRecommendCmd(inputWord)
        console.log()
        console.log(`建议使用：${chalk.yellow(recommendCmd)} 命令进行修改`)
      } else {
        console.error(ex)
      }
    } finally {
      close()
    }
  })
  
program
  .command('delete <word> [otherWords...]')
  .description('删除单词')
  .action(async (word, otherWords, cmd) => {
    try {
      await lp(deleteByWords([word, ...otherWords]))
    } catch (ex) {
      console.log(ex)
    } finally {
      close()
    }
  })

program
  .command('modify <word>')
  .description('修改一个单词')
  .option('-p, --pos <a>[,b]*', '修改词性，多个时使用 , 隔开。', list)
  .option('-e, --explanation <explanation>', '修改解释。')
  .option('-t, --tag <a>[,b]*', '修改标签，多个时使用 , 隔开。', list)
  // wordbook modify word --ns: nthSample 为 true； wordbook modify word: nthSample 为 undefined
  .option('--ns [nthSample][,nthSample]*', '要操作的例句下标。', list)
  .option('--nn [nthNote][,nthNote]*', '要操作的笔记下标。', list)
  .option('-a, --add', '添加例句或笔记。')
  .option('-d, --delete', '删除例句或笔记。')
  .option('-s, --sample <sample>', '要修改成的例句内容。')
  .option('-n, --note <note>', '要修改成的笔记内容。')
  .action(async (word, cmd) => {
    const inputWord = cmd2wordObj(word, cmd)
    try {
      const wordObj: Word = await lpPure(getByWord(word))
      if (inputWord.pos.length) {
        wordObj.pos = inputWord.pos
      }
      if (inputWord.tag.length) {
        wordObj.tag = inputWord.tag
      }
      if (inputWord.explanation) {
        wordObj.explanation = inputWord.explanation
      }
      await lp(updateByWord(wordObj))
    } catch (ex) {
      // 单词可能不存在
      if (ex.code === ErrorCode.NotExist) {
        const recommendCmd = addRecommendCmd(inputWord)
        console.log()
        console.log(`建议使用：${chalk.yellow(recommendCmd)} 命令进行添加`)
      } else {
        console.error(ex)
      }
    } finally {
      close()
    }
  })

program
  .command('show <word>')
  .description('显示单词的详情')
  .action(async(word, cmd) => {
    try {
      const wordObj: Word = await lp(getByWord(word))
      if (wordObj) printTintingWrod(wordObj)
    } catch (ex) {
      // 单词可能不存在
      if (ex.code === ErrorCode.NotExist) {
        const recommendCmd = `wordbook add ${word}`
        console.log()
        console.log(`建议使用：${chalk.yellow(recommendCmd)} 命令进行添加`)
      } else {
        console.error(ex)
      }
    } finally {
      close()
    }
  })

program
  .command('search [keyword]')
  .description('模糊搜索单词，默认搜索 word、explanation 字段')
  .option('-w, --no-word', '不搜索 word 字段。')
  .option('-e, --no-explanation', '不搜索解释字段。')
  .option('-s, --sample', '搜索例句字段。')
  .option('-n, --note', '搜索笔记字段。')
  .option('-t, --tag [a][,b]*', '指定搜索的标签(精确匹配)，多个时使用 , 隔开。', list)
  .option('-p, --page <page>', '页码，从1开始')
  .option('-l, --length <length>', '每页的个数, 默认10')
  .action(async (keyword, cmd) => {
    try {
      const words: Word[] = await lp(search({
        keyword,
        tag: cmd.tag,
        word: cmd.word,
        explanation: cmd.explanation,
        page: cmd.page,
        length: cmd.length
      }))
      if (words.length) {
        for (const word of words) {
          printTintingWrod(word)
        }
      } else {
        console.log(chalk.yellow('没找到符合条件的单词。'))
      }
      // printTintingWrod(wordObj)
    } catch (ex) {
      console.log(ex)
    } finally {
      close()
    }
  })

program
  .command('tags')
  .description('标签管理')
  .option('-l, --list', '列出所有标签')
  .action(cmd => {
    console.warn(cmd)
  })

// output help information on unknown commands
program
  .arguments('<command>')
  .action((cmd: any) => {
    program.outputHelp()
    console.log(`  ` + chalk.red(`未知的命令 ${chalk.yellow(cmd)}.`))
    console.log()
  })

// add some useful info on help
program.on('--help', () => {
  // program.outputHelp()
  console.log()
  console.log(`  使用 ${chalk.cyan(`wordbook <command> --help`)} 查看指定子命令的用法。`)
  console.log()
})

program.commands.forEach((c: any) => c.on('--help', () => console.log()))

program.parse(process.argv)

function list(val: string) {
  return val.split(',')
}
