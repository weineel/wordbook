"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var database_1 = __importDefault(require("./database"));
function add(word) {
    return new Promise(function (resolve, reject) {
        database_1.default().run('INSERT INTO "word" ("word", "pos", "explanation", "tag", "updated", "created") VALUES (?, ?, ?, ?, datetime("now"), datetime("now"))', [word.word, word.pos.join(','), word.explanation, word.tag.join(',')], function (err) {
            if (err) {
                console.error(err);
                reject(err);
            }
            else {
                console.log("\u6DFB\u52A0" + word.word + "\u6210\u529F");
                resolve({
                    code: 200,
                    message: 'success'
                });
            }
        });
    });
}
exports.add = add;
//# sourceMappingURL=backend.js.map