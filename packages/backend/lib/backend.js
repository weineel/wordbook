"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var database_1 = __importDefault(require("./database"));
var common_1 = require("@wordbook/common");
var utils_1 = require("./utils");
var debug = require('debug')('backend');
var _db = database_1.default();
function close(cb) {
    _db.close(cb);
}
exports.close = close;
function add(word) {
    return new Promise(function (resolve, reject) {
        _db.run('INSERT INTO "word" ("word", "pos", "explanation", "tag", "updated", "created") VALUES (?, ?, ?, ?, datetime("now"), datetime("now"))', [word.word, word.pos.join(','), word.explanation, word.tag.join(',')], function (err) {
            if (err) {
                if (err.code === 'SQLITE_CONSTRAINT') {
                    resolve(common_1.Result.failureExist(word.word));
                }
                else {
                    resolve(common_1.Result.failure('failure: ' + err));
                }
            }
            else {
                resolve(common_1.Result.success("\u6DFB\u52A0\u3010" + word.word + "\u3011\u6210\u529F"));
            }
        });
    });
}
exports.add = add;
function getByWord(word) {
    return new Promise(function (resolve, reject) {
        _db.get('select * from word where word = ? limit 1', word, function (err, row) {
            if (err) {
                resolve(common_1.Result.failure('failure: ' + err));
            }
            else {
                if (row) {
                    var data = utils_1.rows2word(row);
                    resolve(common_1.Result.success('获取成功', data));
                }
                else {
                    resolve(common_1.Result.failureNotExist(word));
                }
            }
        });
    });
}
exports.getByWord = getByWord;
function deleteByWords(words) {
    return new Promise(function (resolve) {
        var stmt = _db.prepare('delete from word where word = ?');
        for (var _i = 0, words_1 = words; _i < words_1.length; _i++) {
            var word = words_1[_i];
            stmt.run(word);
        }
        stmt.finalize(function (err) {
            if (err) {
                resolve(common_1.Result.failure('failure: ' + err));
            }
            else {
                resolve(common_1.Result.success('删除成功'));
            }
        });
    });
}
exports.deleteByWords = deleteByWords;
function updateByWord(word) {
    return new Promise(function (resolve, reject) {
        _db.run('update word set pos = ?, explanation = ?, tag = ?, updated = datetime("now") where word = ?', [word.pos.join(','), word.explanation, word.tag.join(','), word.word], function (err) {
            if (err) {
                resolve(common_1.Result.failure('failure: ' + err));
            }
            else {
                resolve(common_1.Result.success("\u4FEE\u6539\u3010" + word.word + "\u3011\u6210\u529F"));
            }
        });
    });
}
exports.updateByWord = updateByWord;
function search(options) {
    var page = options.page || 1;
    var length = options.length || 10;
    var sql = "select * from word";
    var condition = [];
    if (options.keyword) {
        if (options.word) {
            condition.push("word like \"%" + options.keyword + "%\"");
        }
        if (options.explanation) {
            condition.push("explanation like \"%" + options.keyword + "%\"");
        }
    }
    var prefix = ' where ';
    if (condition.length) {
        sql += "" + prefix + condition.join(' or ');
    }
    prefix = condition.length ? '' : prefix;
    if (options.tag) {
        if (prefix) {
            sql += prefix + " tag like \"%" + options.tag + "%\"";
        }
        else {
            sql += " and tag like \"%" + options.tag + "%\"";
        }
    }
    sql += " limit " + length + " offset " + (page - 1) * length;
    debug(sql);
    return new Promise(function (resolve, reject) {
        _db.all(sql, function (err, rows) {
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