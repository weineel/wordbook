import { Word, Result } from '@wordbook/common'

/**
 * 添加一个单词
 * @param word 单词对象
 */
export function add(word: Word): Promise<Result<void>>

/**
 * 搜索单词
 */
export function search(page?: any): Promise<Result<Word[]>>
