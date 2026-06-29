---
title: "【GitHub Actions】pushしたら自動テスト！初心者向けCI/CD入門"
date: 2026-06-29
draft: false
tags: ["GitHub", "CI/CD", "初心者向け"]
categories: ["GitHub"]
description: "GitHub Actionsって何？pushするだけでテストが自動で走る仕組みを、最小構成のワークフローで体験しながら解説します。"
cover:
  image: "images/cover.png"
  alt: "GitHub Actionsで自動テストを設定する方法の解説"
  relative: true
  hidden: false
---

## この記事で分かること

{{< chat name="初心者ちゃん" icon="/images/rin-icon.png" direction="left" >}}
CI/CDって聞いたことあるけど、何のことか全然分かんない…。手動でテスト走らせるんじゃダメなの？
{{< /chat >}}

{{< chat name="全知全能くん" icon="/images/zenchi-icon.png" direction="right" >}}
手動でもいいけど、忘れることあるでしょ？pushしたら自動でテストが走って、壊れてたらすぐ教えてくれる。それがCI/CDの基本だよ。GitHub Actionsなら無料で始められるんだ。
{{< /chat >}}

「CI/CDって何？」「GitHub Actionsの設定ファイル、何を書けばいいか分からない」

この悩み、プログラミング学習中の人にめちゃくちゃ多いです。この記事では、**最小構成のワークフローファイル1つ**を作って、pushしたらテストが自動で走る体験をします。

## CI/CDとは何か

一言で説明すると、**「コードを変更するたびに自動でテスト・ビルド・デプロイしてくれる仕組み」** です。

- **CI（Continuous Integration）**: コードを変更したら自動でテストする
- **CD（Continuous Delivery / Deployment）**: テストが通ったら自動でデプロイする

この記事ではCI（自動テスト）に絞って解説します。

### なぜCIが必要なのか

手動テストだけに頼ると、こういう事故が起きます：

```
❌ CIなし
  1. 新機能を実装した → テスト忘れてpush
  2. mainブランチに壊れたコードがマージされた
  3. 他のメンバーが pull して全員が影響を受ける
  4. 「誰が壊した？」で30分消える
```

CIがあると：

```
✅ CIあり
  1. 新機能を実装した → pushした瞬間にテストが自動実行
  2. テスト失敗 → GitHub上に❌マークが表示
  3. 壊れたコードはマージされない
  4. 自分のPCで直してから再push
```

テストを忘れる人間の代わりに、機械が毎回チェックしてくれるわけです。

{{< ad >}}

## GitHub Actionsとは

GitHub Actionsは、GitHubが提供するCI/CDサービスです。リポジトリの中に設定ファイルを置くだけで使えます。

### 他のCI/CDツールとの違い

| ツール | 特徴 |
|--------|------|
| GitHub Actions | GitHubに組み込み。設定ファイルをリポジトリに置くだけ |
| Jenkins | 自分でサーバーを立てる必要がある。大規模向け |
| CircleCI | 外部サービス。GitHub連携が必要 |

初心者が一番始めやすいのはGitHub Actionsです。追加の登録や連携設定が不要で、リポジトリにYAMLファイルを1つ置くだけで動きます。

GitHubの基本的な使い方については[GitHubとは？アカウント作成から最初の使い方まで](/posts/github-what-is-it/)で解説しています。

## 最小構成で始めるワークフロー

### ステップ1：リポジトリを準備する

まず、テスト対象となるシンプルなNode.jsプロジェクトを用意します。

```json
// package.json
{
  "name": "ci-demo",
  "version": "1.0.0",
  "scripts": {
    "test": "node test.js"
  }
}
```

```javascript
// test.js
const assert = require('assert');

// テスト対象の関数
function add(a, b) {
  return a + b;
}

// テスト
assert.strictEqual(add(1, 2), 3);
assert.strictEqual(add(-1, 1), 0);
assert.strictEqual(add(0, 0), 0);

console.log('✅ すべてのテストが通りました');
```

### ステップ2：ワークフローファイルを作成する

リポジトリのルートに `.github/workflows/` フォルダを作り、YAMLファイルを置きます。

```bash
# フォルダを作成
mkdir -p .github/workflows
```

```yaml
# .github/workflows/test.yml
name: テスト実行

# いつ実行するか
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

# 何をするか
jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      # リポジトリのコードを取得
      - uses: actions/checkout@v4

      # Node.jsをセットアップ
      - uses: actions/setup-node@v4
        with:
          node-version: '20'

      # テストを実行
      - run: npm test
```

これだけです。たった20行でCI環境が完成します。

{{< chat name="初心者ちゃん" icon="/images/rin-icon.png" direction="left" >}}
え、これだけ？もっと複雑な設定が必要だと思ってた…
{{< /chat >}}

{{< chat name="全知全能くん" icon="/images/zenchi-icon.png" direction="right" >}}
最小構成ならこれだけだよ。YAMLの各行が何を意味するか、順番に見ていこう。
{{< /chat >}}

### ステップ3：YAMLの中身を理解する

```yaml
name: テスト実行              # ← ワークフローの名前（GitHub上に表示される）

on:                           # ← トリガー（いつ実行するか）
  push:
    branches: [main]          # ← mainブランチにpushしたとき
  pull_request:
    branches: [main]          # ← mainへのPRが作られたとき

jobs:                         # ← 実行するジョブの定義
  test:                       # ← ジョブ名（自由につけてOK）
    runs-on: ubuntu-latest    # ← 実行環境（Ubuntu仮想マシン）

    steps:                    # ← 実行するステップ一覧
      - uses: actions/checkout@v4      # ← コードを取得
      - uses: actions/setup-node@v4    # ← Node.jsをインストール
        with:
          node-version: '20'
      - run: npm test                  # ← テスト実行
```

ポイントは3つだけ覚えればOKです：

1. **`on`**: いつ実行するか（push、pull_request等）
2. **`runs-on`**: どこで実行するか（ubuntu-latest等）
3. **`steps`**: 何を実行するか（uses、run）

### ステップ4：pushして確認する

```bash
git add .
git commit -m "CI: GitHub Actionsでテスト自動化"
git push origin main
```

pushしたら、GitHubリポジトリのページを開いてください。

1. 「Actions」タブをクリック
2. ワークフローが実行中（黄色い丸）→ 完了（緑のチェック）
3. 緑のチェックマーク ✅ が表示されたら成功

テストが失敗した場合は ❌ が表示されます。クリックすればエラーログが見られます。

{{< ad >}}

## 実践例：よくあるカスタマイズ

### 複数のNode.jsバージョンでテストする

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [18, 20, 22]

    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
      - run: npm install
      - run: npm test
```

`matrix`を使うと、複数バージョンで並列テストできます。ライブラリ開発者はこれで互換性を確認しています。

### npm installのキャッシュで高速化する

```yaml
steps:
  - uses: actions/checkout@v4
  - uses: actions/setup-node@v4
    with:
      node-version: '20'
      cache: 'npm'          # ← これだけでキャッシュ有効
  - run: npm install
  - run: npm test
```

`cache: 'npm'` を追加するだけで、2回目以降の実行が大幅に速くなります。node_modulesをキャッシュして再利用するためです。

### Pythonプロジェクトの場合

```yaml
name: Pythonテスト

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: '3.12'
      - run: pip install -r requirements.txt
      - run: python -m pytest
```

言語が変わっても構造は同じです。`setup-node` が `setup-python` に変わるだけ。

ブランチの使い方が分からない方は[Gitのブランチを図解で理解する](/posts/git-branch-beginner/)を先に読むのがおすすめです。

## 筆者がハマったポイント

### YAMLのインデント

YAMLはインデントが命です。スペース2つとタブを混ぜると動きません。

```yaml
# ❌ タブとスペースが混在（エラーになる）
jobs:
	test:
    runs-on: ubuntu-latest

# ✅ スペース2つで統一
jobs:
  test:
    runs-on: ubuntu-latest
```

筆者は最初これで30分ハマりました。VS Codeの設定で「タブをスペース2に変換」をオンにしておくと防げます。VS Codeの便利な使い方は[VS Codeショートカットキー20選](/posts/vscode-shortcuts-beginner/)でも紹介しています。

### ワークフローが実行されない

`.github/workflows/` のパスを間違えていることが多いです。

```
❌ .github/workflow/test.yml   ← "s"が抜けてる
❌ github/workflows/test.yml   ← ドットが抜けてる
✅ .github/workflows/test.yml  ← 正解
```

### secretsを直接書いてしまう

APIキーやパスワードをYAMLに直接書かないでください。GitHubの「Settings → Secrets and variables → Actions」に登録して、`${{ secrets.MY_SECRET }}` で参照します。

環境変数の扱い方は[環境変数とは？初心者がつまずくPATHの仕組み](/posts/env-variables-beginner/)も合わせてどうぞ。

## よくある質問（FAQ）

### Q: GitHub Actionsは無料ですか？

A: パブリックリポジトリなら完全無料です。プライベートリポジトリは月2,000分まで無料。個人の学習用途なら無料枠で十分足ります。

### Q: テストが落ちたらmainにマージされますか？

A: デフォルトではマージできてしまいます。リポジトリの Settings → Branches → Branch protection rules で「Require status checks to pass before merging」を有効にすると、テストが通らない限りマージをブロックできます。

### Q: ワークフローファイルは複数作れますか？

A: はい。`.github/workflows/` フォルダに何個でもYAMLファイルを置けます。テスト用、デプロイ用、lint用など目的別に分けるのが一般的です。

### Q: push以外でも実行できますか？

A: できます。`on: schedule` でcron式に定期実行したり、`on: workflow_dispatch` で手動実行ボタンを追加したりできます。

```yaml
on:
  schedule:
    - cron: '0 9 * * 1'  # 毎週月曜9時に実行
  workflow_dispatch:       # 手動実行ボタン
```

## やってはいけないこと

### 1. secretsをログに出力する

```yaml
# ❌ 絶対にやらない
- run: echo ${{ secrets.API_KEY }}
```

ログにAPIキーが残ります。GitHubはマスクしてくれますが、環境変数として渡して使うのが正しい方法です。

### 2. mainブランチで直接テストする

ワークフロー自体の動作確認は、別ブランチで行いましょう。mainに壊れたワークフローをpushすると、全PRのCIが壊れます。

### 3. タイムアウトを設定しない

無限ループするテストがあると、6時間（デフォルト上限）まで実行され続けます。

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    timeout-minutes: 10    # ← 10分で強制終了
```

## まとめ

{{< chat name="初心者ちゃん" icon="/images/rin-icon.png" direction="left" >}}
思ってたより全然シンプルだった！YAMLファイル1個置くだけで自動テストできるんだね。
{{< /chat >}}

{{< chat name="全知全能くん" icon="/images/zenchi-icon.png" direction="right" >}}
そうそう。最初はテスト自動化だけで十分。慣れてきたらデプロイの自動化にも挑戦してみてね。
{{< /chat >}}

- GitHub Actionsは「pushしたら自動で何かする」仕組み
- YAMLファイルを `.github/workflows/` に置くだけで動く
- 最小構成は `on` + `runs-on` + `steps` の3要素
- パブリックリポジトリなら完全無料
- まずはテスト自動化から始めて、慣れたらデプロイやlintを追加する

---

### あわせて読みたい
- [GitHubとは？アカウント作成から最初の使い方まで](/posts/github-what-is-it/)
- [Gitのブランチを図解で理解する基本操作](/posts/git-branch-beginner/)
