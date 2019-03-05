import fs from 'fs'
import path from 'path'
import os from 'os'
const sqlite3 = require('sqlite3')

const dbPath = path.resolve(os.homedir(), '.wordbook', 'data')
const dbPathFile = path.resolve(dbPath, 'db.sqlite')

// 递归创建目录
function mkdirsSync(dirname: string) {
  if (fs.existsSync(dirname)) {
    return true;
  } else {
    if (mkdirsSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname);
      return true;
    }
  }
}

console.log(mkdirsSync(dbPath))

if (!fs.existsSync(dbPathFile)) {
  fs.copyFileSync(path.resolve(__dirname, '..', 'db-base.sqlite'), dbPathFile)
}

sqlite3.verbose()

// new sqlite3.Database(dbPathFile, )

export default () => new sqlite3.cached.Database(dbPathFile, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err: any) => {
  if (err) {
    console.error(err)
  }
})
