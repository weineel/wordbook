"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var knex_1 = __importDefault(require("knex"));
var knex = knex_1.default({
    client: 'sqlite3',
    connection: {
        filename: "~/.wordbook/data/db.sqlite"
    }
});
exports.default = require('bookshelf')(knex);
//# sourceMappingURL=bookshelf.js.map