import db from './database'
import { Word, Result } from '@wordbook/common'

export function add(word: Word): Promise<Result<void>> {
  return new Promise((resolve, reject) => {
    db().run(
      'INSERT INTO "word" ("word", "pos", "explanation", "tag", "updated", "created") VALUES (?, ?, ?, ?, datetime("now"), datetime("now"))',
      [word.word, word.pos.join(','), word.explanation, word.tag.join(',')],
      function(err: any) {
        if (err) {
          if (err.code === 'SQLITE_CONSTRAINT') {
            resolve(Result.failure(`【${word.word}】已经存在，不能重复添加！`))
          } else {
            resolve(Result.failure('failure: ' + err))
          }
        } else {
          resolve({
            code: 200,
            message: `添加【${word.word}】成功`
          })
        }
      }
    )
  })
}

export function search(page?: any): Promise<Result<Word[]>> {
  return new Promise((resolve, reject) => {
    db().all(
      'select * from word',
      function(err: any, rows: []) {
        if (err) {
          resolve(Result.failure('failure: ' + err))
        } else {
          const data: Word[] = rows.map((e: any) => ({
            word: e.word,
            pos: e.pos,
            explanation: e.explanation,
            tag: e.tag && e.tag.split(','),  // 数据库中是逗号隔开的字符串
            sample: [],
            note: []
          }))
          resolve({
            code: 200,
            message: `获取成功`,
            data
          })
        }
      }
    )
  })
}
