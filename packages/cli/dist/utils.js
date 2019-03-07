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
Object.defineProperty(exports, "__esModule", { value: true });
var ora_1 = __importDefault(require("ora"));
var common_1 = require("@wordbook/common");
var chalk_1 = __importDefault(require("chalk"));
// spinner.stop()/spinner.succeed() 等停止函数会重写上一行的 log
var spinner = ora_1.default();
// 着色, 全角中括号着色为黄色。
function tintingForKeyword(message) {
    return message.replace(/【.*?】/g, function (m) { return chalk_1.default.yellow(m); });
}
/**
 * 等待 异步接口, 默认操作
 */
function lp(p, loadingMessage) {
    return __awaiter(this, void 0, void 0, function () {
        var result, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    spinner.start(loadingMessage || 'loading...');
                    return [4 /*yield*/, p];
                case 1:
                    result = _a.sent();
                    try {
                        data = common_1.Result.parse(result);
                        spinner.succeed(tintingForKeyword(result.message));
                        return [2 /*return*/, data];
                    }
                    catch (ex) {
                        spinner.fail(chalk_1.default.red(tintingForKeyword(result.message)));
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.lp = lp;
/**
 * 打印单词
 * @param word 要输出的单词
 * @param options 输出参数
 */
function printTintingWrod(word, options) {
    if (options === void 0) { options = {
        pos: true,
        explanation: true,
        tag: true
    }; }
    console.log();
    var str = "\uD83D\uDEA9 " + chalk_1.default.blueBright(word.word);
    if (options.pos) {
        str += " " + word.pos + ".";
    }
    if (options.explanation) {
        str += " " + chalk_1.default.yellow(word.explanation) + "\n";
    }
    if (options.tag) {
        str += chalk_1.default.grey('标签:') + " " + word.tag.join(' ');
    }
    console.log(str);
    console.log();
}
exports.printTintingWrod = printTintingWrod;
//# sourceMappingURL=utils.js.map