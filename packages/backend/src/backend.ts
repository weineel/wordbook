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