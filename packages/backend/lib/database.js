"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var os_1 = __importDefault(require("os"));
var sqlite3 = require('sqlite3');
var dbPath = path_1.default.resolve(os_1.default.homedir(), '.wordbook', 'data');
var dbPathFile = path_1.default.resolve(dbPath, 'db.sqlite');
// 递归创建目录
function mkdirsSync(dirname) {
    if (fs_1.default.existsSync(dirname)) {
        return true;
    }
    else {
        if (mkdirsSync(path_1.default.dirname(dirname))) {
            fs_1.default.mkdirSync(dirname);
            return true;
        }
    }
}
mkdirsSync(dbPath);
if (!fs_1.default.existsSync(dbPathFile)) {
    fs_1.default.copyFileSync(path_1.default.resolve(__dirname, '..', 'db-base.sqlite'), dbPathFile);
}
sqlite3.verbose();
// new sqlite3.Database(dbPathFile, )
exports.default = (function () { return new sqlite3.cached.Database(dbPathFile, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, function (err) {
    if (err) {
        console.error(err);
    }
}); });
//# sourceMappingURL=database.js.map