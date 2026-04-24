---
title: "【Git】ブランチが分からない人へ ― 図解で理解する基本操作"
date: 2026-04-23
draft: false
tags: ["Git", "初心者向け", "開発環境"]
categories: ["Git"]
description: "Gitのブランチとは何か、なぜ必要なのかを図解で解説。作成・切り替え・マージの基本操作をコマンド付きで紹介します。"
---

## この記事で解決すること

「ブランチって何？なんで必要なの？」

Gitを使い始めると必ず出てくる「ブランチ」。概念が分かりにくいですが、図で理解すれば簡単です。基本操作をコマンド付きで解説します。

## ブランチとは

ブランチを一言で言うと、**「作業の分岐点」** です。

本のしおりをイメージしてください。今読んでいるページに「しおり」を挟んで、別のページを読みに行く。戻りたくなったら「しおり」のページに戻れる。ブランチはこれと同じです。

```
main ブランチ（本番）
  │
  ├── 機能Aを開発中（feature-a ブランチ）
  │
  └── バグ修正中（fix-bug ブランチ）
```

### なぜブランチが必要なのか

ブランチがないと、こうなります：

```
❌ ブランチなし
  Aさんが新機能を開発中 → 途中でバグ報告 → 開発途中のコードが混ざったまま修正
  → 何が壊れたか分からなくなる
```

ブランチがあると：

```
✅ ブランチあり
  main（安定版）は触らない
  → feature-a ブランチで新機能を開発
  → fix-bug ブランチでバグ修正
  → それぞれ完成したら main に合流（マージ）
```

作業を分離できるので、お互いの変更が干渉しません。

{{< ad >}}

## 基本操作1：ブランチを作る

### 新しいブランチを作成して切り替える

```bash
# ブランチを作成して切り替え（1コマンドで）
git checkout -b feature-login

# または（Git 2.23以降）
git switch -c feature-login
```

```
実行前：
  main ← 今ここ

実行後：
  main
    └── feature-login ← 今ここ
```

`-b`（または `-c`）オプションを付けると、作成と切り替えを同時にやってくれます。

### ブランチの一覧を確認

```bash
git branch
```

```
  main
* feature-login    ← * が付いているのが今いるブランチ
```

## 基本操作2：ブランチを切り替える

```bash
# mainブランチに戻る
git checkout main

# または
git switch main
```

切り替えると、ファイルの内容がそのブランチの状態に変わります。feature-loginで変更したファイルは、mainに切り替えると元に戻ります（feature-login側にちゃんと保存されています）。

### 注意：未コミットの変更がある場合

変更をコミットしていない状態でブランチを切り替えようとすると、エラーになることがあります。

```bash
# エラーが出たら、まずコミットする
git add .
git commit -m "作業途中を保存"

# または一時退避する（stash）
git stash
git switch main
# 戻ってきたら復元
git switch feature-login
git stash pop
```

## 基本操作3：マージする（合流）

feature-loginブランチでの作業が完了したら、mainブランチに合流させます。

```bash
# 1. mainブランチに切り替える
git switch main

# 2. feature-loginの変更をmainに取り込む
git merge feature-login
```

```
マージ前：
  main ──────────────
    └── feature-login ── A ── B ── C

マージ後：
  main ────────────── A ── B ── C（feature-loginの変更が合流）
```

### マージ後のブランチ削除

マージが完了したブランチは削除してOKです。

```bash
# ローカルブランチを削除
git branch -d feature-login

# リモートブランチも削除する場合
git push origin --delete feature-login
```

## 基本操作4：コンフリクト（競合）の解決

同じファイルの同じ箇所を、別々のブランチで変更していた場合、マージ時に「コンフリクト」が発生します。

```bash
git merge feature-login
# Auto-merging index.html
# CONFLICT (content): Merge conflict in index.html
```

ファイルを開くと、こんな表示になっています：

```
<<<<<<< HEAD
<h1>こんにちは</h1>
=======
<h1>ようこそ</h1>
>>>>>>> feature-login
```

- `<<<<<<< HEAD` 〜 `=======` → 今いるブランチ（main）の内容
- `=======` 〜 `>>>>>>> feature-login` → マージしようとしたブランチの内容

どちらかを選ぶか、両方を組み合わせて修正します：

```html
<h1>ようこそ</h1>
```

修正したらコミットします：

```bash
git add index.html
git commit -m "コンフリクトを解決"
```

VS Codeを使っている場合は、コンフリクト箇所に「Accept Current Change」「Accept Incoming Change」「Accept Both Changes」のボタンが表示されるので、クリックするだけで解決できます。

## よく使うブランチ名の付け方

| 接頭辞 | 用途 | 例 |
|---|---|---|
| `feature/` | 新機能の開発 | `feature/login` |
| `fix/` | バグ修正 | `fix/header-layout` |
| `hotfix/` | 緊急修正 | `hotfix/security-patch` |
| `refactor/` | リファクタリング | `refactor/api-client` |

チームで開発する場合は、命名ルールを決めておくとスムーズです。

## コマンド早見表

| やりたいこと | コマンド |
|---|---|
| ブランチ作成＋切り替え | `git switch -c ブランチ名` |
| ブランチ切り替え | `git switch ブランチ名` |
| ブランチ一覧 | `git branch` |
| マージ | `git merge ブランチ名` |
| ブランチ削除 | `git branch -d ブランチ名` |
| 一時退避 | `git stash` |
| 一時退避を復元 | `git stash pop` |

## まとめ

- ブランチは「作業の分岐点」。本番コードを安全に保つための仕組み
- `git switch -c` で作成＋切り替え、`git merge` で合流
- コンフリクトが起きたら、ファイルを手動で修正してコミット
- VS Codeならコンフリクト解決がボタン1つでできる
- ブランチ名は `feature/` `fix/` などの接頭辞を付けると分かりやすい

---

### あわせて読みたい
- [git pushで初回エラーが出たときの対処法](/posts/git-first-push-error/)
- [GitHubとは？アカウント作成から最初の使い方まで](/posts/github-what-is-it/)
- [コマンドラインが怖い人へ ― 最初に覚える10コマンド](/posts/command-line-scary/)

<!-- affiliate -->
## 関連リソース

Gitをもっと学びたい方へ：

<!-- START MoshimoAffiliateEasyLink --><script type="text/javascript">(function(b,c,f,g,a,d,e){b.MoshimoAffiliateObject=a;b[a]=b[a]||function(){arguments.currentScript=c.currentScript||c.scripts[c.scripts.length-2];(b[a].q=b[a].q||[]).push(arguments)};c.getElementById(a)||(d=c.createElement(f),d.src=g,d.id=a,e=c.getElementsByTagName("body")[0],e.appendChild(d))})(window,document,"script","//dn.msmstatic.com/site/cardlink/bundle.js?20220329","msmaflink");msmaflink({"n":"改訂2版 わかばちゃんと学ぶ Git使い方入門","b":"","t":"","d":"https:\/\/thumbnail.image.rakuten.co.jp","c_p":"","p":[""],"u":{"u":"https:\/\/search.rakuten.co.jp\/search\/mall\/%E3%82%8F%E3%81%8B%E3%81%B0%E3%81%A1%E3%82%83%E3%82%93%E3%81%A8%E5%AD%A6%E3%81%B6%20Git\/","t":"rakuten","r_v":""},"v":"2.1","b_l":[{"id":1,"u_tx":"楽天市場で見る","u_bc":"#f76956","u_url":"https:\/\/search.rakuten.co.jp\/search\/mall\/%E3%82%8F%E3%81%8B%E3%81%B0%E3%81%A1%E3%82%83%E3%82%93%E3%81%A8%E5%AD%A6%E3%81%B6%20Git\/","a_id":5490814,"p_id":54,"pl_id":27059,"pc_id":54,"s_n":"rakuten","u_so":1},{"u_bc":"#f79256","u_tx":"Amazonで見る","u_url":"https:\/\/www.amazon.co.jp\/s\/ref=nb_sb_noss_1?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&url=search-alias%3Daps&field-keywords=%E3%82%8F%E3%81%8B%E3%81%B0%E3%81%A1%E3%82%83%E3%82%93%E3%81%A8%E5%AD%A6%E3%81%B6Git%E4%BD%BF%E3%81%84%E6%96%B9%E5%85%A5%E9%96%80","s_n":"amazon","u_so":2,"a_id":5490817,"p_id":170,"pc_id":185,"pl_id":27060,"id":2}],"eid":"kW9mJ","s":"s"});</script><div id="msmaflink-kW9mJ">リンク</div><!-- MoshimoAffiliateEasyLink END -->
<!-- /affiliate -->
