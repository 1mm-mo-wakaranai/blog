---
title: "【Git】.gitignoreの書き方 ― 不要ファイルをGitHubに上げない方法"
date: 2026-04-30
tags: ["Git", "初心者向け", "開発環境"]
description: ".gitignoreの書き方を初心者向けに解説。node_modules、.env、ビルドファイルなど、GitHubに上げてはいけないファイルの管理方法が分かります。"
draft: false
---

## この記事で解決すること

「node_modulesをGitHubにpushしてしまった」「.envファイルにAPIキーを書いたまま公開してしまった」

こうしたミスを防ぐのが `.gitignore` ファイルです。この記事では、.gitignoreの書き方と、よく使うパターンを解説します。

[GitHub](/posts/github-what-is-it/)を使い始めたばかりの方は、まずGitHubの基本を押さえてからこの記事を読むとスムーズです。

## .gitignoreとは

`.gitignore` は、Gitに「このファイルは追跡しないでください」と伝えるための設定ファイルです。

プロジェクトのルートディレクトリに `.gitignore` という名前のファイルを作り、無視したいファイルやフォルダのパターンを1行ずつ書きます。

```
# .gitignoreの例
node_modules/
.env
dist/
```

このファイルに書かれたパターンに一致するファイルは、`git add` しても追跡されません。

## なぜ.gitignoreが必要なのか

GitHubに上げてはいけないファイルは、大きく3つのカテゴリに分かれます。

### 機密情報

`.env` ファイルにはAPIキーやデータベースのパスワードが含まれていることがあります。これをGitHubに公開すると、第三者に悪用される危険があります。

環境変数の管理方法については[環境変数と.envファイルの使い方](/posts/env-variables-beginner/)で詳しく解説しています。

### 自動生成されるファイル

`node_modules/`（npm/yarnの依存パッケージ）や `dist/`（ビルド出力）は、コマンド一つで再生成できます。これらをリポジトリに含めると、容量が膨大になり、cloneやpullに時間がかかります。

[npm/yarnの基本](/posts/npm-yarn-beginner/)を理解していれば、`npm install` で `node_modules` が再生成されることが分かるはずです。

### OS・エディタ固有のファイル

`.DS_Store`（macOS）や `Thumbs.db`（Windows）、`.vscode/`（VS Code設定）など、開発環境に依存するファイルは、他の開発者には不要です。

{{< ad >}}

## .gitignoreの基本的な書き方

### ファイル名を直接指定する

```gitignore
# 特定のファイルを無視
.env
.DS_Store
Thumbs.db
```

### ディレクトリを指定する

末尾に `/` をつけると、ディレクトリ全体を無視します。

```gitignore
# ディレクトリを無視
node_modules/
dist/
build/
__pycache__/
```

### ワイルドカード（*）を使う

`*` は任意の文字列にマッチします。

```gitignore
# すべてのログファイルを無視
*.log

# すべての.tmpファイルを無視
*.tmp
```

### ダブルアスタリスク（**）を使う

`**` はディレクトリの深さに関係なくマッチします。

```gitignore
# どの階層にある.envファイルも無視
**/.env

# どの階層にあるnode_modulesも無視
**/node_modules/
```

### 否定パターン（!）を使う

`!` をつけると、無視ルールの例外を指定できます。

```gitignore
# すべてのログファイルを無視するが、error.logだけは追跡する
*.log
!error.log
```

### ディレクトリ内の特定ファイルを指定する

先頭に `/` をつけると、ルートディレクトリからの相対パスになります。

```gitignore
# ルート直下の.envだけ無視（サブディレクトリの.envは追跡する）
/.env

# srcディレクトリ内のテストファイルを無視
src/**/*.test.js
```

### コメントを書く

`#` で始まる行はコメントです。何を無視しているか説明を書いておくと、後から見たときに分かりやすくなります。

```gitignore
# 依存パッケージ
node_modules/

# 環境変数（APIキーなどの機密情報）
.env
.env.local

# ビルド出力
dist/
build/
```

## 言語・フレームワーク別のよく使うパターン

### JavaScript / TypeScript（Node.js）

```gitignore
# 依存パッケージ
node_modules/

# ビルド出力
dist/
build/
.next/
out/

# 環境変数
.env
.env.local
.env.*.local

# ログ
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# OS固有
.DS_Store
Thumbs.db
```

### Python

```gitignore
# 仮想環境
venv/
.venv/
env/

# バイトコードキャッシュ
__pycache__/
*.py[cod]
*.pyo

# 配布・ビルド
dist/
build/
*.egg-info/

# 環境変数
.env

# IDE
.idea/
.vscode/
```

Pythonの仮想環境については[Python仮想環境（venv）の使い方](/posts/python-venv-beginner/)で解説しています。

### Java

```gitignore
# コンパイル出力
*.class
target/
build/

# IDE
.idea/
*.iml
.eclipse/
.settings/

# ログ
*.log
```

## すでに追跡されているファイルを無視する方法

`.gitignore` に追加しても、すでにGitが追跡しているファイルは無視されません。追跡を解除するには、以下のコマンドを実行します。

### ステップ1: キャッシュからファイルを削除する

```bash
# 特定のファイルの追跡を解除（ファイル自体は削除されない）
git rm --cached .env

# ディレクトリの追跡を解除
git rm --cached -r node_modules/
```

`--cached` オプションをつけることで、ローカルのファイルは残したまま、Gitの追跡だけを解除できます。

### ステップ2: .gitignoreに追加する

```gitignore
.env
node_modules/
```

### ステップ3: コミットする

```bash
git add .gitignore
git commit -m ".envとnode_modulesの追跡を解除"
```

[Gitブランチの基本](/posts/git-branch-beginner/)を理解していれば、この変更を別ブランチで行ってからマージすることもできます。

## gitignore.ioで自動生成する

[gitignore.io](https://www.toptal.com/developers/gitignore)は、言語やフレームワークを選ぶだけで `.gitignore` を自動生成してくれるWebツールです。

### 使い方

1. [gitignore.io](https://www.toptal.com/developers/gitignore) にアクセスする
2. 使用する言語やツールを入力する（例：Node, Python, macOS）
3. 「Create」をクリックする
4. 生成された内容をプロジェクトの `.gitignore` にコピーする

コマンドラインからも使えます。

```bash
# Node.js + macOS用の.gitignoreを生成
curl -sL https://www.toptal.com/developers/gitignore/api/node,macos
```

## グローバル.gitignoreを設定する

`.DS_Store` や `.vscode/` のように、すべてのプロジェクトで無視したいファイルは、グローバル `.gitignore` に設定すると便利です。

```bash
# グローバル.gitignoreファイルを作成
git config --global core.excludesfile ~/.gitignore_global
```

`~/.gitignore_global` に共通の無視パターンを書きます。

```gitignore
# macOS
.DS_Store

# Windows
Thumbs.db
desktop.ini

# エディタ
.vscode/
.idea/
*.swp
*~
```

これで、プロジェクトごとの `.gitignore` にはプロジェクト固有のパターンだけを書けばよくなります。

## よくあるミスと注意点

### .envをpushしてしまった場合

APIキーやパスワードが含まれた `.env` をGitHubに公開してしまった場合、すぐに以下の対応を行ってください。

1. 漏洩したAPIキーやパスワードを無効化・再発行する
2. `git rm --cached .env` で追跡を解除する
3. `.gitignore` に `.env` を追加する
4. コミットしてpushする

**重要**: Gitの履歴にはファイルの内容が残り続けます。コミットを消しても、履歴をたどれば閲覧できます。漏洩した認証情報は必ず再発行してください。

### .gitignoreが効かない場合

`.gitignore` に書いたのに無視されない場合、そのファイルがすでにGitに追跡されている可能性があります。前述の `git rm --cached` で追跡を解除してください。

### 空のディレクトリを保持したい場合

Gitは空のディレクトリを追跡しません。空のディレクトリを残したい場合は、そのディレクトリに `.gitkeep` という空ファイルを作成する慣習があります。

```bash
# logsディレクトリを保持する
touch logs/.gitkeep
```

```gitignore
# logsディレクトリ内のファイルは無視するが、.gitkeepは残す
logs/*
!logs/.gitkeep
```

## よくある質問（FAQ）

### Q: .gitignoreはいつ作るべきですか？
A: プロジェクトの最初に作るのがベストです。`git init` の直後、最初のコミットの前に `.gitignore` を作成してください。後から追加すると、すでに追跡されているファイルの解除が必要になり、手間が増えます。

### Q: .gitignore自体はGitHubにpushすべきですか？
A: はい、pushしてください。`.gitignore` はプロジェクトの設定ファイルなので、チームメンバー全員が同じ無視ルールを共有する必要があります。`.gitignore` を `.gitignore` に書いてはいけません。

### Q: node_modulesをpushしてしまいました。どうすればいいですか？
A: `git rm --cached -r node_modules/` で追跡を解除し、`.gitignore` に `node_modules/` を追加してコミットしてください。ただし、Gitの履歴にはnode_modulesが残るため、リポジトリの容量は大きいままです。履歴からも完全に削除したい場合は `git filter-branch` や BFG Repo-Cleaner を使います。

### Q: .envファイルのテンプレートを共有したい場合はどうしますか？
A: `.env.example` というファイルを作り、変数名だけを書いて値は空にしておきます。`.env.example` はGitHubにpushし、`.env` は `.gitignore` で無視します。新しいメンバーは `.env.example` をコピーして `.env` を作り、自分の環境に合わせた値を設定します。

### Q: 特定のブランチだけで.gitignoreを変えることはできますか？
A: `.gitignore` もGitで管理されるファイルなので、ブランチごとに内容を変えることは技術的には可能です。ただし、ブランチを切り替えるたびに無視ルールが変わると混乱の原因になるため、おすすめしません。すべてのブランチで同じ `.gitignore` を使うのが一般的です。

## まとめ

- `.gitignore` はGitに「追跡しないファイル」を伝える設定ファイル
- `.env`（機密情報）、`node_modules/`（依存パッケージ）、ビルド出力は必ず無視する
- `*`、`**`、`!` を使ってパターンを柔軟に指定できる
- すでに追跡されているファイルは `git rm --cached` で解除する
- gitignore.io を使えば言語別のテンプレートを自動生成できる
- プロジェクトの最初に `.gitignore` を作るのがベスト

---
### あわせて読みたい
- [GitHubとは？アカウント作成から最初のリポジトリまで](/posts/github-what-is-it/)
- [Gitブランチの基本 ― 初心者向けに使い方を解説](/posts/git-branch-beginner/)

<!-- affiliate -->
## 関連リソース

Git・GitHubをもっと学びたい方へ：

<!-- START MoshimoAffiliateEasyLink --><script type="text/javascript">(function(b,c,f,g,a,d,e){b.MoshimoAffiliateObject=a;b[a]=b[a]||function(){arguments.currentScript=c.currentScript||c.scripts[c.scripts.length-2];(b[a].q=b[a].q||[]).push(arguments)};c.getElementById(a)||(d=c.createElement(f),d.src=g,d.id=a,e=c.getElementsByTagName("body")[0],e.appendChild(d))})(window,document,"script","//dn.msmstatic.com/site/cardlink/bundle.js?20220329","msmaflink");msmaflink({"n":"Git GitHub 教本","b":"","t":"","d":"https:\/\/thumbnail.image.rakuten.co.jp","c_p":"","p":[""],"u":{"u":"https:\/\/search.rakuten.co.jp\/search\/mall\/Git+GitHub+%E6%95%99%E6%9C%AC\/","t":"rakuten","r_v":""},"v":"2.1","b_l":[{"id":1,"u_tx":"楽天市場で見る","u_bc":"#f76956","u_url":"https:\/\/search.rakuten.co.jp\/search\/mall\/Git+GitHub+%E6%95%99%E6%9C%AC\/","a_id":5490814,"p_id":54,"pl_id":27059,"pc_id":54,"s_n":"rakuten","u_so":1},{"u_bc":"#f79256","u_tx":"Amazonで見る","u_url":"https:\/\/www.amazon.co.jp\/s\/ref=nb_sb_noss_1?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&url=search-alias%3Daps&field-keywords=Git+GitHub+%E6%95%99%E6%9C%AC","s_n":"amazon","u_so":2,"a_id":5490817,"p_id":170,"pc_id":185,"pl_id":27060,"id":2}],"eid":"Gt1gN","s":"s"});</script><div id="msmaflink-Gt1gN">リンク</div><!-- MoshimoAffiliateEasyLink END -->
<!-- /affiliate -->
