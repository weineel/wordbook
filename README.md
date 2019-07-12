# wordbook

单词本命令行工具

## Install

```shell
npm install -g @wordbook/cli
# or
yarn global add @wordbook/cli
```

## Usage

1. 设置别名（可选），在 `~/.zshrc`或`~/.bashrc`中添加一行 `alias wb='wordbook'`。

2. 使用示例：添加一个单词 weineel, 词性设置为: n(名词), 解释设置为: 微溺, 标签设置为: name 和 author。

```shell
wordbook add -p n -e 微溺 -t name,author weineel
# or 如果设置了别名
wb add -p n -e 微溺 -t name,author weineel

# 查看添加的结果
wordbook show weineel
```

3. 查看帮助

```shell
# 查看 wordbook 的详细用法
wordbook --help

# 查看 add 子命令的详细用法, 也可用同样的格式查看其它子命令的用法。
wordbook add --help
```

## Feature & Plan

### 1. `add [options] <word>` 添加一个单词，不能添加已经存在的单词。

* [x] `-p, --pos <a>[,b]*`               Part of speech，词性。多个时使用 , 隔开。
* [x] `-e, --explanation <explanation>`  解释。
* [ ] `-s, --sample <sample>`            例句。
* [ ] `-n, --note <note>`                笔记。
* [x] `-t, --tag <a>[,b]*`               标签，多个时使用 , 隔开。

### 2. `delete <word> [otherWords...]`  删除单词

* [x] 删除指定单词, 注意需要级联删除。

### 3. `modify [options] <word>`        修改一个单词

* [x] `-p, --pos <a>[,b]*`                         修改词性，多个时使用 , 隔开。
* [x] `-e, --explanation <explanation>`            修改解释。
* [x] `-t, --tag <a>[,b]*`                         修改标签，多个时使用 , 隔开。
* [ ] `--ns [nthSample][,nthSample]*`              要操作的例句下标。
* [ ] `--nn [nthNote][,nthNote]*`                  要操作的笔记下标。
* [ ] `-a, --add`                                  添加例句或笔记, 默认为true。
* [ ] `-d, --delete`                               删除例句或笔记。
* [ ] `-s, --sample <sample>`                      要修改成的例句内容。
* [ ] `-n, --note <note>`                          要修改成的笔记内容。

### 4. `show <word>`                    显示单词的详情

* [x] 显示单词信息

### 5. `search [options] [keyword]`     模糊搜索单词，默认搜索 word、explanation 字段

* [x] `-w, --no-word`          不搜索 word 字段。
* [x] `-e, --no-explanation`   不搜索解释字段。
* [ ] `-s, --sample`           搜索例句字段。
* [ ] `-n, --note`             搜索笔记字段。
* [x] `-t, --tag [a][,b]*`     指定搜索的标签(精确匹配)，多个时使用 , 隔开。
* [x] `-p, --page <page>`      页码，从1开始
* [x] `-l, --length <length>`  每页的个数, 默认10

### 6. `tags [options]`                 标签管理

* [ ] `-l, --list`  列出所有标签

### 7. `ui [options]`  打开webapp。

* [ ] `-p, --port`  设置端口

### 8. 交互式命令行（参考commitizen）或使用 Inquirer.js。

* [ ] 单选
* [ ] 多选
* [ ] 输入文本

### 9. `review [options]` 复习。（blessed 和 blessed-contrib）。

* [ ] `-n, --number <number>`  指定复习的个数
* [ ] `-o, --overview`  查看复习概况图表
