"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var database_1 = __importDefault(require("./database"));
var common_1 = require("@wordbook/common");
var utils_1 = require("./utils");
function add(word) {
    return new Promise(function (resolve, reject) {
        database_1.default().run('INSERT INTO "word" ("word", "pos", "explanation", "tag", "updated", "created") VALUES (?, ?, ?, ?, datetime("now"), datetime("now"))', [word.word, word.pos.join(','), word.explanation, word.tag.join(',')], function (err) {
            if (err) {
                if (err.code === 'SQLITE_CONSTRAINT') {
                    resolve(common_1.Result.failure("\u3010" + word.word + "\u3011\u5DF2\u7ECF\u5B58\u5728\uFF0C\u4E0D\u80FD\u91CD\u590D\u6DFB\u52A0\uFF01"));
                }
                else {
                    resolve(common_1.Result.failure('failure: ' + err));
                }
            }
            else {
                resolve({
                    code: 200,
                    message: "\u6DFB\u52A0\u3010" + word.word + "\u3011\u6210\u529F"
                });
            }
        });
    });
}
exports.add = add;
function getByWord(word) {
    return new Promise(function (resolve, reject) {
        database_1.default().get('select * from word where word = ?', word, function (err, row) {
            if (err) {
                resolve(common_1.Result.failure('failure: ' + err));
            }
            else {
                var data = utils_1.rows2word(row);
                resolve({
                    code: 200,
                    message: "\u83B7\u53D6\u6210\u529F",
                    data: data
                });
            }
        });
    });
}
exports.getByWord = getByWord;
function search(page) {
    return new Promise(function (resolve, reject) {
        database_1.default().all('select * from word', function (err, rows) {
            if (err) {
                resolve(common_1.Result.failure('failure: ' + err));
            }
            else {
                var data = rows.map(function (e) { return utils_1.rows2word(e); });
                resolve({
                    code: 200,
                    message: "\u83B7\u53D6\u6210\u529F",
                    data: data
                });
            }
        });
    });
}
exports.search = search;
//# sourceMappingURL=backend.js.map