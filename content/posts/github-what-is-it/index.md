---
title: "【GitHub】アカウントを作ったけど何すればいい？最初の使い方ガイド"
date: 2026-04-16
tags: ["Git", "初心者向け", "開発環境"]
description: "GitHubのアカウントを作ったけど何をすればいいか分からない初心者向けに、GitHubの使い方を最初の一歩から解説します。"
draft: false
---

## この記事で解決すること

「GitHubのアカウントを作りました。で、何すればいいの？」

プログラミングを始めると「GitHubにコードを上げましょう」と言われます。でもGitHubを開いても、英語だらけで何をすればいいか分からない。

この記事では、GitHubで最初にやることだけに絞って説明します。


{{< ad >}}

## GitHubとは何か（30秒で理解）

GitHubは「コードの保管場所」です。

Googleドライブがファイルの保管場所であるように、GitHubはプログラムのコードを保管する場所です。

違いは：
- コードの変更履歴が全部残る（いつ、誰が、何を変えたか）
- 間違えても過去の状態に戻せる
- 他の人とコードを共有できる

## 最初にやること：リポジトリを作る

「リポジトリ」はプロジェクトのフォルダのようなものです。1つのプロジェクトにつき1つのリポジトリを作ります。

### ステップ1: 新しいリポジトリを作る

1. GitHubにログイン
2. 右上の「+」ボタン → 「New repository」をクリック
3. 以下を入力：
   - Repository name: `my-first-repo`（好きな名前でOK）
   - Description: `はじめてのリポジトリ`（省略可）
   - Public を選択
   - 「Add a README file」にチェック ✅
4. 「Create repository」をクリック

これでリポジトリが作られました。

### ステップ2: READMEを編集してみる

リポジトリのページに `README.md` というファイルがあります。これはプロジェクトの説明書です。

1. `README.md` をクリック
2. 右上の鉛筆アイコン（✏️）をクリック
3. 内容を書き換える：

```markdown
# はじめてのリポジトリ

GitHubの練習用リポジトリです。

## 今日やったこと
- GitHubのアカウントを作った
- リポジトリを作った
- READMEを編集した
```

4. 下にスクロールして「Commit changes」をクリック

`Commit` は「変更を保存する」という意味です。普通の「保存」と違って、変更の履歴が記録されます。

### ステップ3: 変更履歴を見る

1. リポジトリのトップページに戻る
2. 「2 commits」のようなリンクをクリック

さっきの変更が記録されています。いつ、何を変えたかが全部残っています。

## よく見る画面の意味

### Code タブ
ファイルの一覧。普通のフォルダと同じ。

### Issues タブ
「ここにバグがある」「この機能がほしい」などのメモを残す場所。自分用のTODOリストとしても使えます。

### Pull requests タブ
コードの変更を提案する機能。チームで開発するときに使います。最初は気にしなくてOK。

### Settings タブ
リポジトリの設定。名前の変更や削除ができます。

## GitHubでやってはいけないこと

### パスワードやAPIキーを上げない

コードと一緒にパスワードやAPIキー（サービスの鍵のようなもの）をGitHubに上げると、世界中の人に見られます。Publicリポジトリは誰でも見られるので注意。

もし間違えて上げてしまったら、すぐにそのパスワードやキーを変更してください。

### 他人のコードをそのまま自分のものとして上げない

GitHubのコードにはライセンス（使用条件）があります。コピーして使う場合は、ライセンスを確認しましょう。

## 次にやること

GitHubの画面上でファイルを編集するのは練習としてはOKですが、実際の開発では自分のPCでコードを書いて、それをGitHubにアップロード（push）します。

その方法は別の記事で解説しています：

👉 [git pushしたら「rejected」と言われたときの対処法](/posts/git-first-push-error/)

## まとめ

- GitHubは「コードの保管場所」
- リポジトリ = プロジェクトのフォルダ
- Commit = 変更履歴付きの保存
- パスワードは絶対に上げない

最初は「コードの保管場所」として使うだけで十分です。慣れてきたら、他の人のコードを見たり、自分のポートフォリオとして活用したりできます。

---
### あわせて読みたい
- [git pushでrejectedエラーが出たときの対処法](/posts/git-first-push-error/)
- [GitHub Copilot無料プランでAIにコードを書いてもらう方法](/posts/github-copilot-free/)

<!-- affiliate -->
## 関連リソース

GitHubをもっと学びたい方へ：

<!-- START MoshimoAffiliateEasyLink --><script type="text/javascript">(function(b,c,f,g,a,d,e){b.MoshimoAffiliateObject=a;b[a]=b[a]||function(){arguments.currentScript=c.currentScript||c.scripts[c.scripts.length-2];(b[a].q=b[a].q||[]).push(arguments)};c.getElementById(a)||(d=c.createElement(f),d.src=g,d.id=a,e=c.getElementsByTagName("body")[0],e.appendChild(d))})(window,document,"script","//dn.msmstatic.com/site/cardlink/bundle.js?20220329","msmaflink");msmaflink({"n":"いちばんやさしいGit&GitHubの教本 第2版","b":"","t":"","d":"https:\/\/thumbnail.image.rakuten.co.jp","c_p":"","p":[""],"u":{"u":"https:\/\/search.rakuten.co.jp\/search\/mall\/%E3%81%84%E3%81%A1%E3%81%B0%E3%82%93%E3%82%84%E3%81%95%E3%81%97%E3%81%84Git%20GitHub%20%E6%95%99%E6%9C%AC\/","t":"rakuten","r_v":""},"v":"2.1","b_l":[{"id":1,"u_tx":"楽天市場で見る","u_bc":"#f76956","u_url":"https:\/\/search.rakuten.co.jp\/search\/mall\/%E3%81%84%E3%81%A1%E3%81%B0%E3%82%93%E3%82%84%E3%81%95%E3%81%97%E3%81%84Git%20GitHub%20%E6%95%99%E6%9C%AC\/","a_id":5490814,"p_id":54,"pl_id":27059,"pc_id":54,"s_n":"rakuten","u_so":1},{"u_bc":"#f79256","u_tx":"Amazonで見る","u_url":"https:\/\/www.amazon.co.jp\/s\/ref=nb_sb_noss_1?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&url=search-alias%3Daps&field-keywords=%E3%81%84%E3%81%A1%E3%81%B0%E3%82%93%E3%82%84%E3%81%95%E3%81%97%E3%81%84Git%26GitHub%E3%81%AE%E6%95%99%E6%9C%AC","s_n":"amazon","u_so":2,"a_id":5490817,"p_id":170,"pc_id":185,"pl_id":27060,"id":2}],"eid":"FzXXe","s":"s"});</script><div id="msmaflink-FzXXe">リンク</div><!-- MoshimoAffiliateEasyLink END -->
<!-- /affiliate -->
