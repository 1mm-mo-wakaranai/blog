---
title: "【初心者向け】npxとは？npmとの違いを具体例で解説"
date: 2026-05-20
draft: false
tags: ["初心者向け", "開発環境", "npm"]
description: "npxとは何か、npmとの違いを初心者向けに解説。インストールせずにパッケージを実行できる仕組みと、よく使う場面を具体例付きで紹介します。"
cover:
  image: "images/cover.png"
  alt: "npxとnpmの違いを初心者向けに解説"
  relative: true
  hidden: false
---

## この記事で分かること

{{< chat name="初心者ちゃん" icon="/images/rin-icon.png" direction="left" >}}
npxって何？npmとは違うの？いつ使うの？
{{< /chat >}}

{{< chat name="全知全能くん" icon="/images/zenchi-icon.png" direction="right" >}}
パッケージをインストールせずに一回だけ実行できるコマンドだよ。create-react-appとかで使ったことあるはず。
{{< /chat >}}


「npxって何？npmと何が違うの？」「npx create-react-appってなぜnpxなの？」という方へ。

この記事では、npxの仕組みとnpmとの違いを、具体例を使ってやさしく解説します。

{{< ad >}}

## npxとは

npxは「npmパッケージを一時的に実行するコマンド」です。

npmがパッケージを「インストールする」ためのツールなのに対し、npxはパッケージを「インストールせずに実行する」ためのツールです。

### npmとnpxの違い（一言で）

| コマンド | 役割 |
|----------|------|
| npm | パッケージをインストール・管理する |
| npx | パッケージをインストールせずに実行する |

## なぜnpxが必要なのか

### 問題: グローバルインストールの面倒さ

npxがなかった時代、一度だけ使いたいツールでもグローバルインストールが必要でした。

```bash
# 昔のやり方（グローバルインストールが必要）
npm install -g create-react-app
create-react-app my-app
```

この方法には問題があります。

- PCにツールがどんどん溜まる
- バージョンが古くなっても気づかない
- チームメンバーと違うバージョンを使ってしまう

### 解決: npxなら一時実行できる

```bash
# npxを使う方法（インストール不要）
npx create-react-app my-app
```

npxは以下の流れで動きます。

1. パッケージがローカルにあるか確認
2. なければ一時的にダウンロード
3. 実行する
4. 終わったら一時ファイルを削除

つまり、PCを汚さずにツールを使えます。

## よく使うnpxの場面

### 1. プロジェクトの初期化

新しいプロジェクトを作るときに最もよく使います。

```bash
# Reactプロジェクトを作成
npx create-react-app my-app

# Next.jsプロジェクトを作成
npx create-next-app my-app

# Viteプロジェクトを作成
npx create-vite my-app
```

これらのコマンドは「一度だけ実行すればいい」ので、npxが最適です。

### 2. ローカルにインストールしたツールの実行

プロジェクトにインストールしたツールを直接実行するときにも使います。

```bash
# プロジェクトにインストールしたeslintを実行
npx eslint src/

# プロジェクトにインストールしたjestを実行
npx jest
```

`npm run` でscriptsに登録して実行する方法もありますが、npxなら登録なしで直接実行できます。

### 3. バージョンを指定して実行

特定のバージョンで実行したいときにも便利です。

```bash
# 特定バージョンのTypeScriptコンパイラを使う
npx typescript@5.0.0 --version
```

## npmとnpxの使い分け

### npmを使う場面

```bash
# プロジェクトにライブラリを追加する
npm install express

# 開発用ツールを追加する
npm install --save-dev jest

# scriptsに登録したコマンドを実行する
npm run dev
npm start
```

### npxを使う場面

```bash
# プロジェクトを新規作成する（一度きり）
npx create-next-app my-app

# インストール済みのツールを直接実行する
npx eslint .

# 試しに使ってみたいツールを実行する
npx cowsay "Hello"
```

### 判断基準

| 状況 | 使うコマンド |
|------|-------------|
| ライブラリをプロジェクトに追加したい | npm install |
| 追加したライブラリをコードで使う | npm（importで使う） |
| ツールを一度だけ実行したい | npx |
| プロジェクトを新規作成したい | npx |
| package.jsonのscriptsを実行したい | npm run |

## npxの注意点

### 初回実行は少し遅い

npxは実行のたびにパッケージをダウンロードする場合があるので、初回は少し時間がかかります。頻繁に使うツールはプロジェクトにインストールしておく方が効率的です。

### 確認プロンプトが出ることがある

初めて実行するパッケージの場合、「インストールしていいですか？」と聞かれることがあります。

```
Need to install the following packages:
  create-next-app@14.0.0
Ok to proceed? (y)
```

`y` を入力してEnterを押せばOKです。

### npxはnpmに同梱されている

npxはnpm 5.2以降に標準で含まれています。Node.jsをインストールすれば、npmと一緒にnpxも使えるようになります。

```bash
# npxが使えるか確認
npx --version
```

## 実践: npxでプロジェクトを作ってみよう

実際にnpxを使ってViteプロジェクトを作ってみましょう。

```bash
# 1. npxでViteプロジェクトを作成
npx create-vite my-first-app

# 2. プロジェクトフォルダに移動
cd my-first-app

# 3. 依存パッケージをインストール（ここはnpm）
npm install

# 4. 開発サーバーを起動（ここもnpm）
npm run dev
```

このように、npxは「最初の一回」で使い、その後の日常的な操作はnpmを使います。

## よくある質問（FAQ）

### Q: npxとnpm execは同じですか？

A: ほぼ同じです。npm 7以降では `npm exec` コマンドが追加され、npxと同じ機能を持っています。npxの方が短くて打ちやすいので、npxを使う人が多いです。

### Q: npxで実行したパッケージはPCに残りますか？

A: 基本的には残りません。一時的にダウンロードして実行後に削除されます。ただし、キャッシュに残る場合があります。

### Q: npxを使わずにcreate-react-appをグローバルインストールしてもいいですか？

A: 非推奨です。グローバルインストールするとバージョンが古くなりがちで、公式もnpxでの実行を推奨しています。

### Q: npxが「command not found」と出ます

A: Node.jsのバージョンが古い可能性があります。Node.js 8.2以降（npm 5.2以降）であればnpxが使えます。`node --version` でバージョンを確認してください。

{{< chat name="初心者ちゃん" icon="/images/rin-icon.png" direction="left" >}}
グローバルインストールしなくていいのが便利なんだね…！
{{< /chat >}}

{{< chat name="全知全能くん" icon="/images/zenchi-icon.png" direction="right" >}}
そう。常に最新版が使えるし、PCを汚さないのがメリット。npx create-next-appとかは定番だよ。
{{< /chat >}}

## まとめ

- npxは「パッケージをインストールせずに実行する」コマンド
- プロジェクト作成（create-react-app等）で最もよく使う
- npmは「インストール・管理」、npxは「一時実行」
- Node.jsをインストールすればnpxも使える
- 頻繁に使うツールはnpm installでプロジェクトに入れる方が効率的

---
### あわせて読みたい
- [npmとは？yarnとの違いも含めて5分で解説](/posts/npm-yarn-beginner/)
- [package.jsonとは？中身の読み方をやさしく解説](/posts/package-json-beginner/)
