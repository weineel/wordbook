import { Word, Result } from '@wordbook/common'

/**
 * 添加一个单词
 * @param word 单词对象
 */
export function add(word: Word): Promise<Result<void>>

/**
 * 获取单词信息
 * @param word 单词对象
 */
export function getByWord(word: string): Promise<Result<Word>>

/**
 * 删除单词
 * @param {string[]} words 要删除的单词数组
 */
export function deleteByWords(words: string[]): Promise<Result<any>>

/**
 * 搜索单词
 */
export function search(page?: any): Promise<Result<Word[]>>
