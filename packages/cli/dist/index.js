#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = __importDefault(require("commander"));
var chalk_1 = __importDefault(require("chalk"));
var backend_1 = require("@wordbook/backend");
var common_1 = require("@wordbook/common");
var utils_1 = require("./utils");
commander_1.default
    .version(require('../package.json').version, '-v, --version')
    // .option('-x, --xe <xee>', 'xxxxx')  // 根选项, 优先级比子命令高(同名时，子命令将不会被解析到)。
    .usage('<command> [options]'); // 用法说明（BNF 范式指导），会在 --help 时显示。
commander_1.default
    .command('add <word>')
    .description('添加一个单词，不能添加已经存在的单词。')
    .option('-p, --pos <a>[,b]*', 'Part of speech，词性。多个时使用 , 隔开。', list)
    .option('-e, --explanation <explanation>', '解释。')
    .option('-s, --sample <sample>', '例句。')
    .option('-n, --note <note>', '笔记。')
    .option('-t, --tag <a>[,b]*', '标签，多个时使用 , 隔开。', list)
    .action(function (word, cmd) { return __awaiter(_this, void 0, void 0, function () {
    var inputWord, ex_1, recommendCmd;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                inputWord = utils_1.cmd2wordObj(word, cmd);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, 4, 5]);
                return [4 /*yield*/, utils_1.lp(backend_1.add(inputWord))];
            case 2:
                _a.sent();
                return [3 /*break*/, 5];
            case 3:
                ex_1 = _a.sent();
                if (ex_1.code === common_1.ErrorCode.Exist) {
                    recommendCmd = utils_1.modifyRecommendCmd(inputWord);
                    console.log();
                    console.log("\u5EFA\u8BAE\u4F7F\u7528\uFF1A" + chalk_1.default.yellow(recommendCmd) + " \u547D\u4EE4\u8FDB\u884C\u4FEE\u6539");
                }
                else {
                    console.error(ex_1);
                }
                return [3 /*break*/, 5];
            case 4:
                backend_1.close();
                return [7 /*endfinally*/];
            case 5: return [2 /*return*/];
        }
    });
}); });
commander_1.default
    .command('delete <word> [otherWords...]')
    .description('删除单词')
    .action(function (word, otherWords, cmd) { return __awaiter(_this, void 0, void 0, function () {
    var ex_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, 3, 4]);
                return [4 /*yield*/, utils_1.lp(backend_1.deleteByWords([word].concat(otherWords)))];
            case 1:
                _a.sent();
                return [3 /*break*/, 4];
            case 2:
                ex_2 = _a.sent();
                console.log(ex_2);
                return [3 /*break*/, 4];
            case 3:
                backend_1.close();
                return [7 /*endfinally*/];
            case 4: return [2 /*return*/];
        }
    });
}); });
commander_1.default
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
    .action(function (word, cmd) { return __awaiter(_this, void 0, void 0, function () {
    var inputWord, wordObj, ex_3, recommendCmd;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                inputWord = utils_1.cmd2wordObj(word, cmd);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, 5, 6]);
                return [4 /*yield*/, utils_1.lpPure(backend_1.getByWord(word))];
            case 2:
                wordObj = _a.sent();
                if (inputWord.pos.length) {
                    wordObj.pos = inputWord.pos;
                }
                if (inputWord.tag.length) {
                    wordObj.tag = inputWord.tag;
                }
                if (inputWord.explanation) {
                    wordObj.explanation = inputWord.explanation;
                }
                return [4 /*yield*/, utils_1.lp(backend_1.updateByWord(wordObj))];
            case 3:
                _a.sent();
                return [3 /*break*/, 6];
            case 4:
                ex_3 = _a.sent();
                // 单词可能不存在
                if (ex_3.code === common_1.ErrorCode.NotExist) {
                    recommendCmd = utils_1.addRecommendCmd(inputWord);
                    console.log();
                    console.log("\u5EFA\u8BAE\u4F7F\u7528\uFF1A" + chalk_1.default.yellow(recommendCmd) + " \u547D\u4EE4\u8FDB\u884C\u6DFB\u52A0");
                }
                else {
                    console.error(ex_3);
                }
                return [3 /*break*/, 6];
            case 5:
                backend_1.close();
                return [7 /*endfinally*/];
            case 6: return [2 /*return*/];
        }
    });
}); });
commander_1.default
    .command('show <word>')
    .description('显示单词的详情')
    .action(function (word, cmd) { return __awaiter(_this, void 0, void 0, function () {
    var wordObj, ex_4, recommendCmd;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, 3, 4]);
                return [4 /*yield*/, utils_1.lp(backend_1.getByWord(word))];
            case 1:
                wordObj = _a.sent();
                if (wordObj)
                    utils_1.printTintingWrod(wordObj);
                return [3 /*break*/, 4];
            case 2:
                ex_4 = _a.sent();
                // 单词可能不存在
                if (ex_4.code === common_1.ErrorCode.NotExist) {
                    recommendCmd = "wordbook add " + word;
                    console.log();
                    console.log("\u5EFA\u8BAE\u4F7F\u7528\uFF1A" + chalk_1.default.yellow(recommendCmd) + " \u547D\u4EE4\u8FDB\u884C\u6DFB\u52A0");
                }
                else {
                    console.error(ex_4);
                }
                return [3 /*break*/, 4];
            case 3:
                backend_1.close();
                return [7 /*endfinally*/];
            case 4: return [2 /*return*/];
        }
    });
}); });
commander_1.default
    .command('search [keyword]')
    .description('模糊搜索单词，默认搜索 word、explanation 字段')
    .option('-w, --no-word', '不搜索 word 字段。')
    .option('-e, --no-explanation', '不搜索解释字段。')
    .option('-s, --sample', '搜索例句字段。')
    .option('-n, --note', '搜索笔记字段。')
    .option('-t, --tag [a][,b]*', '指定搜索的标签(精确匹配)，多个时使用 , 隔开。', list)
    .option('-p, --page <page>', '页码，从1开始')
    .option('-l, --length <length>', '每页的个数, 默认10')
    .action(function (keyword, cmd) { return __awaiter(_this, void 0, void 0, function () {
    var words, _i, words_1, word, ex_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, 3, 4]);
                return [4 /*yield*/, utils_1.lp(backend_1.search({
                        keyword: keyword,
                        tag: cmd.tag,
                        word: cmd.word,
                        explanation: cmd.explanation,
                        page: cmd.page,
                        length: cmd.length
                    }))];
            case 1:
                words = _a.sent();
                if (words.length) {
                    for (_i = 0, words_1 = words; _i < words_1.length; _i++) {
                        word = words_1[_i];
                        utils_1.printTintingWrod(word);
                    }
                }
                else {
                    console.log(chalk_1.default.yellow('没找到符合条件的单词。'));
                }
                return [3 /*break*/, 4];
            case 2:
                ex_5 = _a.sent();
                console.log(ex_5);
                return [3 /*break*/, 4];
            case 3:
                backend_1.close();
                return [7 /*endfinally*/];
            case 4: return [2 /*return*/];
        }
    });
}); });
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
    console.log("  " + chalk_1.default.red("\u672A\u77E5\u7684\u547D\u4EE4 " + chalk_1.default.yellow(cmd) + "."));
    console.log();
});
// add some useful info on help
commander_1.default.on('--help', function () {
    // program.outputHelp()
    console.log();
    console.log("  \u4F7F\u7528 " + chalk_1.default.cyan("wordbook <command> --help") + " \u67E5\u770B\u6307\u5B9A\u5B50\u547D\u4EE4\u7684\u7528\u6CD5\u3002");
    console.log();
});
commander_1.default.commands.forEach(function (c) { return c.on('--help', function () { return console.log(); }); });
commander_1.default.parse(process.argv);
function list(val) {
    return val.split(',');
}
//# sourceMappingURL=index.js.map