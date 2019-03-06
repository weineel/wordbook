#!/usr/bin/env node

import program from 'commander'
import chalk from 'chalk'
import { add, search } from '@wordbook/backend'
import { Word } from '@wordbook/common'
import { lp } from './utils'

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
    const wordObj: Word = {
      word,
      pos: cmd.pos,
      explanation: cmd.explanation,
      tag: cmd.tag,
      sample: [],
      note: []
    }
    await lp(add(wordObj))
  })
  
program
  .command('delete <word> [otherWords...]')
  .description('删除单词')
  .action((word, otherWords, cmd) => {
    console.warn(word, otherWords, [word, ...otherWords])
  })

program
  .command('modify <word>')
  .description('修改一个单词')
  .option('-p, --pos <a>[,b]*', '修改词性，多个时使用 , 隔开。')
  .option('-e, --explanation <explanation>', '修改解释。')
  .option('-t, --tag <a>[,b]*', '修改标签，多个时使用 , 隔开。')
  // wordbook modify word -s , nthSample 为 true； wordbook modify word， nthSample 为 undefined
  .option('-s, --nth-sample [nthSample][,nthSample]*', '要操作的例句下标。', list)
  .option('-n, --nth-note [nthNote][,nthNote]*', '要操作的笔记下标。', list)
  .option('--add-sample <smaple>', '添加例句。')
  .option('--add-note <note>', '添加笔记。')
  .option('--delete', '删除例句或笔记。')
  .option('--sample <sample>', '要修改成的例句内容。')
  .option('--note <note>', '要修改成的笔记内容。')
  .action((word, cmd) => {
    console.warn(word, cmd.nthSample, cmd.nthNote)
  })

program
  .command('show <word>')
  .description('显示单词的详情')
  .action((word, cmd) => {
    console.warn(word)
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
    console.warn(keyword, cmd.page || 1, cmd.length || 10, cmd.word, cmd.explanation, cmd.sample, cmd.note)
    console.log(JSON.stringify(await lp(search())))
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
