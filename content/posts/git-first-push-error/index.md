---
title: "【初心者向け】git pushしたら「rejected」と言われたときの対処法"
date: 2026-04-14
tags: ["Git", "初心者向け", "エラー解決"]
description: "git pushしたらrejectedエラーが出て困っている初心者向けに、原因と解決方法をステップごとに解説します。"
draft: false
---

## この記事で解決すること

ターミナルで `git push` したら、こんなエラーが出た。

```
! [rejected]        main -> main (fetch first)
error: failed to push some refs to 'https://github.com/...'
```

「rejected」って何？ 壊した？ と焦るかもしれませんが、大丈夫です。よくあることで、簡単に直せます。

## なぜこのエラーが出るのか

GitHub上のコードと、あなたのPC上のコードが「ズレている」のが原因です。

たとえばこんな状況：
- GitHubの画面で直接ファイルを編集した
- 別のPCからpushした
- リポジトリを作るときにREADMEを自動生成した

GitHubの方が「先に進んでいる」ので、Gitが「まずそっちの変更を取り込んでからpushしてね」と言っています。

## 解決方法

### ステップ1: GitHubの変更を取り込む

```bash
git pull origin main
```

これでGitHub上の変更をあなたのPCに取り込みます。

`pull` は「引っ張ってくる」という意味で、GitHubからコードをダウンロードする操作です。

### ステップ2: もう一度pushする

```bash
git push origin main
```

これで通るはずです。

## pullしたら「conflict」と言われた場合

まれに、同じファイルの同じ場所を両方で編集していると「conflict（競合）」が起きます。

```
CONFLICT (content): Merge conflict in ファイル名
```

この場合は、該当ファイルを開くとこんな表示があります：

```
<<<<<<< HEAD
あなたのPCの内容
=======
GitHubの内容
>>>>>>> origin/main
```

残したい方を選んで、`<<<<<<<` `=======` `>>>>>>>` の行を削除してから：

```bash
git add .
git commit -m "conflictを解決"
git push origin main
```

## まとめと次のステップ

- `rejected` は「GitHubの方が先に進んでるよ」という意味
- `git pull` してから `git push` すれば解決
- conflictが出たら、ファイルを開いて残したい方を選ぶ

Gitに慣れないうちはこのエラーに何度も出会います。でも毎回やることは同じなので、すぐ慣れます。

<!-- affiliate -->
## 関連リソース

Gitをもっと学びたい方へ：

- [Gitの入門書をAmazonで探す](https://YOUR-AFFILIATE-LINK/amazon-git)
<!-- /affiliate -->
