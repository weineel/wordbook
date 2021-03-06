import db from './database'
import { Word, Result, SearchOptions } from '@wordbook/common'
import { rows2word } from './utils'

const debug = require('debug')('backend')

const _db = db()

export function close(cb?: () => {}) {
  _db.close(cb)
} 

export function add(word: Word): Promise<Result<void>> {
  return new Promise((resolve, reject) => {
    _db.run(
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
  })
}

export function getByWord(word: string): Promise<Result<Word>> {
  return new Promise((resolve, reject) => {
    _db.get(
      'select * from word where word = ? limit 1',
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
  })
}

export function deleteByWords(words: string[]): Promise<Result<any>> {
  return new Promise(resolve => {
    const stmt = _db.prepare('delete from word where word = ?')
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
  })
}

export function updateByWord(word: Word): Promise<Result<void>> {
  return new Promise((resolve, reject) => {
    _db.run(
      'update word set pos = ?, explanation = ?, tag = ?, updated = datetime("now") where word = ?',
      [word.pos.join(','), word.explanation, word.tag.join(','), word.word],
      function(err: any) {
        if (err) {
          resolve(Result.failure('failure: ' + err))
        } else {
          resolve(Result.success(`修改【${word.word}】成功`))
        }
      }
    )
  })
}

export function search(options: SearchOptions): Promise<Result<Word[]>> {
  const page = options.page || 1
  const length = options.length || 10
  let sql = `select * from word`
  const condition = []
  if (options.keyword) {
    if (options.word) {
      condition.push(`word like "%${options.keyword}%"`)
    }
    if (options.explanation) {
      condition.push(`explanation like "%${options.keyword}%"`)
    }
  }
  let prefix = ' where '
  if (condition.length) {
    sql += `${prefix}${condition.join(' or ')}`
  }
  prefix = condition.length ? '' : prefix
  if (options.tag) {
    if (prefix) {
      sql += `${prefix} tag like "%${options.tag}%"`
    } else {
      sql += ` and tag like "%${options.tag}%"`
    }
  }
  sql += ` limit ${length} offset ${(page - 1) * length}`
  debug(sql)
  return new Promise((resolve, reject) => {
    _db.all(
      sql,
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
  })
}
