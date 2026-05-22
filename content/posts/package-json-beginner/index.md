---
title: "【初心者向け】package.jsonとは？中身の読み方をやさしく解説"
date: 2026-05-20
draft: false
tags: ["初心者向け", "開発環境", "npm"]
description: "package.jsonの中身を初心者向けに解説。name、version、scripts、dependenciesなど各項目の意味と読み方が分かります。"
cover:
  image: "images/cover.png"
  alt: "package.jsonの読み方を初心者向けに解説"
  relative: true
  hidden: false
---

## この記事で分かること

{< chat name="初心者ちゃん" icon="/images/rin-icon.png" direction="left" >}
package.jsonとは？中身の読み方をやさしく解説って何？初心者でも分かるように教えて…！
{< /chat >}

{< chat name="全知全能くん" icon="/images/zenchi-icon.png" direction="right" >}
もちろん！package.jsonとは？中身の読み方をやさしく解説について、初心者でも分かるように解説するよ。一緒に見ていこう。
{< /chat >}


「package.jsonって何が書いてあるの？」「触っていいの？壊れない？」という方へ。

この記事では、Node.jsプロジェクトに必ずあるpackage.jsonの中身を、一つずつやさしく解説します。

{{< ad >}}

## package.jsonとは

package.jsonは、Node.jsプロジェクトの「設定ファイル」です。

プロジェクトの名前、バージョン、使っているライブラリ、実行コマンドなどが書かれています。人間が読めるJSON形式（テキストファイル）なので、テキストエディタで開けます。

### どこにあるか

プロジェクトのルートフォルダ（一番上の階層）に置かれています。

```
my-project/
├── package.json    ← これ
├── node_modules/
├── src/
└── index.js
```

## 実際のpackage.jsonを見てみよう

シンプルな例を見てみましょう。

```json
{
  "name": "my-app",
  "version": "1.0.0",
  "description": "はじめてのNode.jsアプリ",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.18.2"
  },
  "devDependencies": {
    "nodemon": "^3.0.1",
    "jest": "^29.7.0"
  }
}
```

一つずつ見ていきます。

## 各項目の意味

### name — プロジェクト名

```json
"name": "my-app"
```

プロジェクトの名前です。npmに公開する場合は一意である必要がありますが、個人プロジェクトなら好きな名前でOKです。

ルール:
- 小文字のみ
- スペースは使えない（ハイフンかアンダースコアで代用）
- 214文字以内

### version — バージョン

```json
"version": "1.0.0"
```

プロジェクトのバージョンです。`メジャー.マイナー.パッチ` の形式で書きます。

| 部分 | 意味 | 例 |
|------|------|-----|
| メジャー | 大きな変更（互換性なし） | 1.0.0 → 2.0.0 |
| マイナー | 機能追加（互換性あり） | 1.0.0 → 1.1.0 |
| パッチ | バグ修正 | 1.0.0 → 1.0.1 |

### description — 説明文

```json
"description": "はじめてのNode.jsアプリ"
```

プロジェクトの簡単な説明です。npm検索で表示されます。個人プロジェクトなら空でも問題ありません。

### main — エントリーポイント

```json
"main": "index.js"
```

このプロジェクトを `require()` で読み込んだときに実行されるファイルです。ライブラリを作るとき以外はあまり気にしなくてOKです。

### scripts — コマンド定義（最重要）

```json
"scripts": {
  "start": "node index.js",
  "dev": "nodemon index.js",
  "test": "jest"
}
```

`npm run ○○` で実行できるコマンドを定義する場所です。初心者が一番よく使う項目です。

| コマンド | 実行方法 | 何が起きるか |
|----------|----------|-------------|
| start | `npm start` | node index.js が実行される |
| dev | `npm run dev` | nodemon index.js が実行される |
| test | `npm test` | jest が実行される |

`start` と `test` だけは `npm run` を省略できます（`npm start`、`npm test`）。それ以外は `npm run dev` のように `run` が必要です。

詳しくは[npmとyarnの基本解説](/posts/npm-yarn-beginner/)も参考にしてください。

### dependencies — 本番で使うライブラリ

```json
"dependencies": {
  "express": "^4.18.2"
}
```

アプリが動くために必要なライブラリの一覧です。`npm install express` すると、ここに自動で追加されます。

### devDependencies — 開発時だけ使うライブラリ

```json
"devDependencies": {
  "nodemon": "^3.0.1",
  "jest": "^29.7.0"
}
```

開発中だけ使うツール（テストツール、自動リロードなど）の一覧です。`npm install --save-dev jest` すると、ここに追加されます。

本番環境にデプロイするときは、devDependenciesのライブラリはインストールされません。

## バージョン記号の意味

dependenciesのバージョン番号の前についている記号が気になりますよね。

```json
"express": "^4.18.2"
```

| 記号 | 意味 | 例 |
|------|------|-----|
| `^` | マイナーバージョンまで自動更新 | ^4.18.2 → 4.19.0はOK、5.0.0はNG |
| `~` | パッチバージョンのみ自動更新 | ~4.18.2 → 4.18.3はOK、4.19.0はNG |
| なし | 完全固定 | 4.18.2 のみ |

`^`（キャレット）が最もよく使われます。`npm install` したときにデフォルトで付きます。

## よくある疑問

### package.jsonを直接編集していいの？

はい、編集できます。ただし以下に注意してください。

- JSON形式を崩さない（カンマの付け忘れ、余計なカンマに注意）
- dependenciesを手動で書き換えた場合は `npm install` を再実行する
- scriptsの追加・変更は自由にできる

### package-lock.jsonとの違いは？

| ファイル | 役割 |
|----------|------|
| package.json | 「このライブラリを使う」という宣言 |
| package-lock.json | 「実際にインストールされたバージョン」の記録 |

package-lock.jsonは自動生成されるので、手動で編集する必要はありません。Gitにはコミットしましょう（チーム全員が同じバージョンを使うため）。

### node_modulesフォルダとの関係は？

`npm install` を実行すると、package.jsonに書かれたライブラリが `node_modules/` フォルダにダウンロードされます。

node_modulesは容量が大きいのでGitにはコミットしません（[.gitignoreの書き方](/posts/gitignore-beginner/)を参照）。

## package.jsonを作る方法

新しいプロジェクトを始めるときは、以下のコマンドで作成できます。

```bash
# 対話形式で作成（質問に答えていく）
npm init

# デフォルト設定で即作成（質問なし）
npm init -y
```

`npm init -y` を使えば、すべてデフォルト値で一瞬で作成されます。

## よくある質問（FAQ）

### Q: package.jsonがないとどうなりますか？

A: `npm install` が実行できません。Node.jsプロジェクトとして認識されないので、まず `npm init -y` で作成しましょう。

### Q: scriptsに何を書けばいいですか？

A: よく使うコマンドを登録しておくと便利です。`"dev"` に開発サーバー起動、`"build"` にビルドコマンド、`"test"` にテスト実行を入れるのが定番です。

### Q: dependenciesとdevDependenciesの使い分けが分かりません

A: 「本番で動くときに必要か？」で判断します。Webサーバー（express）やデータベース接続は dependencies。テストツール（jest）やコード整形（prettier）は devDependencies です。

### Q: バージョンの `^` を外した方が安全ですか？

A: 厳密にはそうですが、通常は `^` のままで問題ありません。package-lock.jsonがバージョンを固定してくれるので、チーム開発でも安心です。

{< chat name="初心者ちゃん" icon="/images/rin-icon.png" direction="left" >}
なるほど…！分かりやすかった。ありがとう！
{< /chat >}

{< chat name="全知全能くん" icon="/images/zenchi-icon.png" direction="right" >}
どういたしまして。分からないことがあったらいつでも聞いてね。
{< /chat >}

## まとめ

- package.jsonはNode.jsプロジェクトの設定ファイル
- scripts でよく使うコマンドを定義できる
- dependencies は本番用、devDependencies は開発用のライブラリ一覧
- バージョンの `^` はマイナーアップデートまで許可する記号
- `npm init -y` で簡単に作成できる

---
### あわせて読みたい
- [npmとは？yarnとの違いも含めて5分で解説](/posts/npm-yarn-beginner/)
- [.gitignoreの書き方入門](/posts/gitignore-beginner/)
