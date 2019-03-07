import db from './database'
import { Word, Result } from '@wordbook/common'
import { rows2word } from './utils'

export function add(word: Word): Promise<Result<void>> {
  return new Promise((resolve, reject) => {
    const d = db()
    d.run(
      'INSERT INTO "word" ("word", "pos", "explanation", "tag", "updated", "created") VALUES (?, ?, ?, ?, datetime("now"), datetime("now"))',
      [word.word, word.pos.join(','), word.explanation, word.tag.join(',')],
      function(err: any) {
        if (err) {
          if (err.code === 'SQLITE_CONSTRAINT') {
            resolve(Result.failureExist(word.word))
          } else {
            resolve(Result.failure('failure: ' + err))
          }
        } else {
          resolve(Result.success(`添加【${word.word}】成功`))
        }
      }
    )
    d.close()
  })
}

export function getByWord(word: string): Promise<Result<Word>> {
  return new Promise((resolve, reject) => {
    const d = db()
    d.get(
      'select * from word where word = ?',
      word,
      function(err: any, row: any) {
        if (err) {
          resolve(Result.failure('failure: ' + err))
        } else {
          if (row) {
            const data: Word = rows2word(row)
            resolve(Result.success('获取成功', data))
          } else {
            resolve(Result.failureNotExist(word))
          }
        }
      }
    )
    d.close()
  })
}

export function deleteByWords(words: string[]): Promise<Result<any>> {
  return new Promise(resolve => {
    const d = db()
    const stmt = d.prepare('delete from word where word = ?')
    for (const word of words) {
      stmt.run(word)
    }
    stmt.finalize(function(err: any) {
      if (err) {
        resolve(Result.failure('failure: ' + err))
      } else {
        resolve(Result.success('删除成功'))
      }
    })
    d.close()
  })
}

export function search(page?: any): Promise<Result<Word[]>> {
  return new Promise((resolve, reject) => {
    const d = db()
    d.all(
      'select * from word',
      function(err: any, rows: []) {
        if (err) {
          resolve(Result.failure('failure: ' + err))
        } else {
          const data: Word[] = rows.map((e: any) => rows2word(e))
          resolve({
            code: 200,
            message: `获取成功`,
            data
          })
        }
      }
    )
    d.close()
  })
}
