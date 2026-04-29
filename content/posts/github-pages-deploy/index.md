---
title: "【初心者向け】GitHub Pagesで無料でサイトを公開する方法 ― 10分で完了"
date: 2026-04-28
tags: ["GitHub", "初心者向け", "Web開発"]
description: "GitHub Pagesを使って、HTMLサイトを無料でインターネットに公開する方法を初心者向けに解説。GitHubアカウントがあれば10分で完了します。"
draft: false
---

## この記事で解決すること

「作ったWebページをインターネットに公開したいけど、サーバー代がかかるのは嫌」

GitHub Pagesなら、完全無料でHTMLサイトを公開できます。

{{< ad >}}

## GitHub Pagesとは

GitHubが提供する無料のWebホスティングサービスです。

- 料金: 完全無料
- URL: `https://ユーザー名.github.io/リポジトリ名/`
- 対応: HTML, CSS, JavaScript（静的サイト）
- 制限: サーバーサイドの処理（PHP, データベースなど）は使えない

ポートフォリオサイト、ブログ、ドキュメントサイトなどに最適です。GitHubのアカウントをまだ持っていない方は、[GitHubとは？アカウント作成から最初の使い方ガイド](/posts/github-what-is-it/)を先に読んでおくとスムーズです。

## 手順

### ステップ1: リポジトリを作成する

1. GitHubにログイン
2. 右上の「+」→「New repository」をクリック
3. 以下を設定:
   - Repository name: `my-website`（好きな名前）
   - Public を選択（Privateだと有料プランが必要）
   - 「Add a README file」にチェック
4. 「Create repository」をクリック

### ステップ2: HTMLファイルをアップロードする

方法A: GitHub上で直接作成する場合

1. リポジトリページで「Add file」→「Create new file」
2. ファイル名に `index.html` と入力
3. 以下のコードを貼り付け:

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Website</title>
    <style>
        body {
            font-family: sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 2rem;
            background-color: #f5f5f5;
        }
        h1 {
            color: #333;
        }
    </style>
</head>
<body>
    <h1>Hello, World!</h1>
    <p>GitHub Pagesで公開した最初のサイトです。</p>
</body>
</html>
```

4. 「Commit changes」をクリック

方法B: gitコマンドで push する場合

```bash
# リポジトリをクローン
git clone https://github.com/ユーザー名/my-website.git
cd my-website

# index.htmlを作成（上のHTMLを保存）

# プッシュ
git add .
git commit -m "Add index.html"
git push
```

### ステップ3: GitHub Pagesを有効にする

1. リポジトリの「Settings」タブをクリック
2. 左メニューの「Pages」をクリック
3. 「Source」で以下を設定:
   - Branch: `main`
   - Folder: `/ (root)`
4. 「Save」をクリック

### ステップ4: 公開を確認する

1〜2分待つと、以下のURLでサイトが公開されます。

```
https://ユーザー名.github.io/my-website/
```

SettingsのPagesページにURLが表示されるので、クリックして確認しましょう。

## サイトを更新する方法

ファイルを編集してcommit & pushするだけで、自動的にサイトが更新されます。

```bash
# ファイルを編集した後
git add .
git commit -m "Update content"
git push
```

反映まで1〜2分かかることがあります。pushでエラーが出た場合は、[git pushでrejectedエラーが出たときの対処法](/posts/git-first-push-error/)を参考にしてください。

## よくあるトラブル

### 404エラーが表示される

- `index.html` のファイル名が正しいか確認（大文字小文字に注意）
- Pagesの設定でBranchとFolderが正しいか確認
- 有効化してから数分待つ

### CSSやJSが読み込まれない

パスの指定を確認してください。

```html
<!-- NG: 絶対パス -->
<link rel="stylesheet" href="/css/style.css">

<!-- OK: 相対パス -->
<link rel="stylesheet" href="./css/style.css">
```

HTMLの基本的な構造については[最低限のHTMLファイルの書き方 ― コピペで使えるテンプレート付き](/posts/html-basic-structure/)で解説しています。CSSのレイアウトで困ったときは[CSSで中央揃えができないときの解決パターン集](/posts/html-css-center/)も参考にしてみてください。

### 更新が反映されない

- ブラウザのキャッシュをクリア（Ctrl + Shift + R）
- GitHubのActionsタブでデプロイが完了しているか確認
- ターミナル操作に不安がある方は[コマンドラインが怖い人へ ― 最初に覚える10コマンド](/posts/command-line-scary/)も参考にしてください

## 独自ドメインを設定する（オプション）

お名前.comなどで取得したドメインを使うこともできます。

1. Settings → Pages → Custom domain にドメインを入力
2. ドメイン管理画面でCNAMEレコードを設定:
   - ホスト: `www`
   - 値: `ユーザー名.github.io`

## よくある質問（FAQ）

### Q: GitHub Pagesは本当に完全無料ですか？

A: はい、パブリックリポジトリであれば完全無料です。プライベートリポジトリでGitHub Pagesを使う場合は、GitHub Proプラン（有料）が必要になります。

### Q: GitHub PagesでWordPressのようなブログは作れますか？

A: WordPressは動的サイト（サーバーサイド処理が必要）なので、GitHub Pagesでは動きません。代わりに、Hugo、Jekyll、Astroなどの静的サイトジェネレーターを使えば、ブログを構築できます。

### Q: 独自ドメインを設定するとHTTPS（SSL）は使えますか？

A: はい、GitHub Pagesは独自ドメインでも無料でHTTPSを提供しています。Settings → Pages → 「Enforce HTTPS」にチェックを入れるだけで有効になります。

### Q: 1つのアカウントで複数のサイトを公開できますか？

A: はい、リポジトリごとにGitHub Pagesを有効にできます。URLは `https://ユーザー名.github.io/リポジトリ名/` の形式になります。また、`ユーザー名.github.io` という名前のリポジトリを作ると、`https://ユーザー名.github.io/` でアクセスできるメインサイトになります。

### Q: GitHub Pagesにアクセス制限（パスワード保護）をかけられますか？

A: GitHub Pages自体にはアクセス制限の機能はありません。パブリックリポジトリのGitHub Pagesは誰でもアクセスできます。アクセス制限が必要な場合は、別のホスティングサービスを検討してください。

## まとめ

- GitHub Pagesは完全無料の静的サイトホスティング
- リポジトリ作成 → HTMLアップロード → Pages有効化の3ステップ
- `index.html`があれば公開できる
- 更新はpushするだけで自動反映

---

### あわせて読みたい
- [GitHubとは何か ― アカウント作成から最初のリポジトリまで](/posts/github-what-is-it/)
- [git pushでrejectedエラーが出たときの対処法](/posts/git-first-push-error/)

<!-- affiliate -->
## 関連リソース

Web開発をもっと学びたい方へ：

<!-- START MoshimoAffiliateEasyLink --><script type="text/javascript">(function(b,c,f,g,a,d,e){b.MoshimoAffiliateObject=a;b[a]=b[a]||function(){arguments.currentScript=c.currentScript||c.scripts[c.scripts.length-2];(b[a].q=b[a].q||[]).push(arguments)};c.getElementById(a)||(d=c.createElement(f),d.src=g,d.id=a,e=c.getElementsByTagName("body")[0],e.appendChild(d))})(window,document,"script","//dn.msmstatic.com/site/cardlink/bundle.js?20220329","msmaflink");msmaflink({"n":"1冊ですべて身につくHTML & CSSとWebデザイン入門講座","b":"","t":"","d":"https:\/\/thumbnail.image.rakuten.co.jp","c_p":"","p":[""],"u":{"u":"https:\/\/search.rakuten.co.jp\/search\/mall\/HTML+CSS+Web%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3+%E5%85%A5%E9%96%80\/","t":"rakuten","r_v":""},"v":"2.1","b_l":[{"id":1,"u_tx":"楽天市場で見る","u_bc":"#f76956","u_url":"https:\/\/search.rakuten.co.jp\/search\/mall\/HTML+CSS+Web%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3+%E5%85%A5%E9%96%80\/","a_id":5490814,"p_id":54,"pl_id":27059,"pc_id":54,"s_n":"rakuten","u_so":1},{"u_bc":"#f79256","u_tx":"Amazonで見る","u_url":"https:\/\/www.amazon.co.jp\/s\/ref=nb_sb_noss_1?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&url=search-alias%3Daps&field-keywords=HTML+CSS+Web%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3+%E5%85%A5%E9%96%80","s_n":"amazon","u_so":2,"a_id":5490817,"p_id":170,"pc_id":185,"pl_id":27060,"id":2}],"eid":"ghPages","s":"s"});</script><div id="msmaflink-ghPages">リンク</div><!-- MoshimoAffiliateEasyLink END -->
<!-- /affiliate -->
