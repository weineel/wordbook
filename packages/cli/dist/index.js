#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = __importDefault(require("commander"));
var chalk_1 = __importDefault(require("chalk"));
var backend_1 = require("@wordbook/backend");
commander_1.default
    .version(require('../package.json').version, '-v, --version')
    .option('-x, --xe <xee>', 'xxxxx') // 根选项, 优先级比子命令高(同名时，子命令将不会被解析到)。
    .usage('<command> [options]'); // 用法说明（BNF 范式指导），会在 --help 时显示。
commander_1.default
    .command('add <word>')
    .description('添加一个单词，不能添加已经存在的单词。')
    .option('-p, --pos <a>[,b]*', 'Part of speech，词性。多个时使用 , 隔开。', list)
    .option('-e, --explanation <explanation>', '解释。')
    .option('-s, --sample <sample>', '例句。')
    .option('-n, --note <note>', '笔记。')
    .option('-t, --tag <a>[,b]*', '标签，多个时使用 , 隔开。', list)
    .action(function (word, cmd) {
    console.warn(word, cmd.pos, cmd.explanation);
    var wordObj = {
        word: word,
        pos: cmd.pos,
        explanation: cmd.explanation,
        tag: cmd.tag,
        sample: [],
        note: []
    };
    backend_1.add(wordObj);
});
commander_1.default
    .command('delete <word> [otherWords...]')
    .description('删除单词')
    .action(function (word, otherWords, cmd) {
    console.warn(word, otherWords, [word].concat(otherWords));
});
commander_1.default
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
    .action(function (word, cmd) {
    console.warn(word, cmd.nthSample, cmd.nthNote);
});
commander_1.default
    .command('show <word>')
    .description('显示单词的详情')
    .action(function (word, cmd) {
    console.warn(word);
});
commander_1.default
    .command('search <keyword>')
    .description('模糊搜索单词，默认搜索 word、explanation 字段')
    .option('-w, --no-word', '不搜索 word 字段。')
    .option('-e, --no-explanation', '不搜索解释字段。')
    .option('-s, --sample', '搜索例句字段。')
    .option('-n, --note', '搜索笔记字段。')
    .option('-t, --tag [a][,b]*', '指定搜索的标签(精确匹配)，多个时使用 , 隔开。', list)
    .option('-p, --page <page>', '页码，从1开始')
    .option('-l, --length <length>', '每页的个数, 默认10')
    .action(function (keyword, cmd) {
    console.warn(keyword, cmd.page || 1, cmd.length || 10, cmd.word, cmd.explanation, cmd.sample, cmd.note);
});
commander_1.default
    .command('tags')
    .description('标签管理')
    .option('-l, --list', '列出所有标签')
    .action(function (cmd) {
    console.warn(cmd);
});
// output help information on unknown commands
commander_1.default
    .arguments('<command>')
    .action(function (cmd) {
    commander_1.default.outputHelp();
    console.log("  " + chalk_1.default.red("Unknown command " + chalk_1.default.yellow(cmd) + "."));
    console.log();
});
// add some useful info on help
commander_1.default.on('--help', function () {
    // program.outputHelp()
    console.log();
    console.log("  Run " + chalk_1.default.cyan("wordbook <command> --help") + " for detailed usage of given command.");
    console.log();
});
commander_1.default.commands.forEach(function (c) { return c.on('--help', function () { return console.log(); }); });
commander_1.default.parse(process.argv);
function list(val) {
    return val.split(',');
}
//# sourceMappingURL=index.js.map