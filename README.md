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

* [ ] `-p, --pos <a>[,b]*`               Part of speech，词性。多个时使用 , 隔开。
* [ ] `-e, --explanation <explanation>`  解释。
* [ ] `-s, --sample <sample>`            例句。
* [ ] `-n, --note <note>`                笔记。
* [ ] `-t, --tag <a>[,b]*`               标签，多个时使用 , 隔开。


### 2. `delete <word> [otherWords...]`  删除单词

* [ ] 删除指定单词

### 3. `modify [options] <word>`        修改一个单词

* [ ] `-p, --pos <a>[,b]*`                        修改词性，多个时使用 , 隔开。
* [ ] `-e, --explanation <explanation>`            修改解释。
* [ ] `-t, --tag <a>[,b]*`                         修改标签，多个时使用 , 隔开。
* [ ] `-s, --nth-sample [nthSample][,nthSample]*`  要操作的例句下标。
* [ ] `-n, --nth-note [nthNote][,nthNote]*`        要操作的笔记下标。
* [ ] `--add-sample <smaple>`                      添加例句。
* [ ] `--add-note <note>`                          添加笔记。
* [ ] `--delete`                                   删除例句或笔记。
* [ ] `--sample <sample>`                          要修改成的例句内容。
* [ ] `--note <note>`                              要修改成的笔记内容。

### 4. `show <word>`                    显示单词的详情

* [ ] 显示单词信息

### 5. `search [options] <keyword>`     模糊搜索单词，默认搜索 word、explanation 字段

* [ ] -w, --no-word          不搜索 word 字段。
* [ ] -e, --no-explanation   不搜索解释字段。
* [ ] -s, --sample           搜索例句字段。
* [ ] -n, --note             搜索笔记字段。
* [ ] -t, --tag `[a][,b]*`     指定搜索的标签(精确匹配)，多个时使用 , 隔开。
* [ ] -p, --page `<page>`      页码，从1开始
* [ ] -l, --length `<length>`  每页的个数, 默认10

### 6. `tags [options]`                 标签管理

* [ ] `-l, --list`  列出所有标签


### 7. `ui [options]`  打开webapp。

* [ ] `-p, --port`  设置端口

### 8. 交互式命令行（参考commitizen）。

* [ ] 单选
* [ ] 多选
* [ ] 输入文本
