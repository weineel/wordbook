import db from './database'
import { Word, Result } from './index'

export function add(word: Word): Promise<Result> {
  return new Promise((resolve, reject) => {
    db().run(
      'INSERT INTO "word" ("word", "pos", "explanation", "tag", "updated", "created") VALUES (?, ?, ?, ?, datetime("now"), datetime("now"))',
      [word.word, word.pos.join(','), word.explanation, word.tag.join(',')],
      function(err: Error) {
        if (err) {
          console.error(err)
          reject(err)
        } else {
          console.log(`添加${word.word}成功`)
          resolve({
            code: 200,
            message: 'success'
          })
        }
      }
    )
  })
}