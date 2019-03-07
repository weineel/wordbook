"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 多个数据行转换成一个单词对象。
 * @param wordRow 一个单词数据行
 * @param sampleRows 多个例句数据行
 * @param noteRows 多个笔记数据行
 */
function rows2word(wordRow, sampleRows, noteRows) {
    return {
        word: wordRow.word || '',
        pos: (wordRow.pos && wordRow.pos.split(',')) || [],
        explanation: wordRow.explanation || '',
        tag: (wordRow.tag && wordRow.tag.split(',')) || [],
        sample: [],
        note: []
    };
}
exports.rows2word = rows2word;
//# sourceMappingURL=utils.js.map