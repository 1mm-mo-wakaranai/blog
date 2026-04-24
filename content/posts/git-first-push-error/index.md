---
title: "【Git】git pushでrejectedエラーが出たときの対処法"
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


{{< ad >}}

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

---
### あわせて読みたい
- [GitHubアカウントを作ったけど何すればいい？最初の使い方ガイド](/posts/github-what-is-it/)
- [コマンドラインが怖い人へ ― 覚えるコマンド5つだけ](/posts/command-line-scary/)

<!-- affiliate -->
## 関連リソース

Gitをもっと学びたい方へ：

<!-- START MoshimoAffiliateEasyLink --><script type="text/javascript">(function(b,c,f,g,a,d,e){b.MoshimoAffiliateObject=a;b[a]=b[a]||function(){arguments.currentScript=c.currentScript||c.scripts[c.scripts.length-2];(b[a].q=b[a].q||[]).push(arguments)};c.getElementById(a)||(d=c.createElement(f),d.src=g,d.id=a,e=c.getElementsByTagName("body")[0],e.appendChild(d))})(window,document,"script","//dn.msmstatic.com/site/cardlink/bundle.js?20220329","msmaflink");msmaflink({"n":"いちばんやさしいGit&GitHubの教本 第2版","b":"","t":"","d":"https:\/\/thumbnail.image.rakuten.co.jp","c_p":"","p":[""],"u":{"u":"https:\/\/search.rakuten.co.jp\/search\/mall\/%E3%81%84%E3%81%A1%E3%81%B0%E3%82%93%E3%82%84%E3%81%95%E3%81%97%E3%81%84Git%20GitHub%20%E6%95%99%E6%9C%AC\/","t":"rakuten","r_v":""},"v":"2.1","b_l":[{"id":1,"u_tx":"楽天市場で見る","u_bc":"#f76956","u_url":"https:\/\/search.rakuten.co.jp\/search\/mall\/%E3%81%84%E3%81%A1%E3%81%B0%E3%82%93%E3%82%84%E3%81%95%E3%81%97%E3%81%84Git%20GitHub%20%E6%95%99%E6%9C%AC\/","a_id":5490814,"p_id":54,"pl_id":27059,"pc_id":54,"s_n":"rakuten","u_so":1},{"u_bc":"#f79256","u_tx":"Amazonで見る","u_url":"https:\/\/www.amazon.co.jp\/s\/ref=nb_sb_noss_1?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&url=search-alias%3Daps&field-keywords=%E3%81%84%E3%81%A1%E3%81%B0%E3%82%93%E3%82%84%E3%81%95%E3%81%97%E3%81%84Git%26GitHub%E3%81%AE%E6%95%99%E6%9C%AC","s_n":"amazon","u_so":2,"a_id":5490817,"p_id":170,"pc_id":185,"pl_id":27060,"id":2}],"eid":"XohKm","s":"s"});</script><div id="msmaflink-XohKm">リンク</div><!-- MoshimoAffiliateEasyLink END -->
<!-- /affiliate -->
