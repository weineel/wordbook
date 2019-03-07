import { Word } from '@wordbook/common'

/**
 * 多个数据行转换成一个单词对象。
 * @param wordRow 一个单词数据行
 * @param sampleRows 多个例句数据行
 * @param noteRows 多个笔记数据行
 */
export function rows2word(wordRow: any, sampleRows?: any[], noteRows?: any[]): Word {
  return {
    word: wordRow.word || '',
    pos: (wordRow.pos && wordRow.pos.split(',')) || [],
    explanation: wordRow.explanation || '',
    tag: (wordRow.tag && wordRow.tag.split(',')) || [],  // 数据库中是逗号隔开的字符串
    sample: [],
    note: []
  }
}
