---
title: "【初心者向け】localhost接続が拒否されたときの対処法"
date: 2026-04-16
tags: ["初心者向け", "エラー解決", "開発環境"]
description: "localhostに接続できない、ERR_CONNECTION_REFUSEDが出たときの原因と解決方法を初心者向けに解説します。"
draft: false
---

## この記事で解決すること

ブラウザで `localhost:3000` や `localhost:8080` にアクセスしたら、こんなエラーが出た。

```
このサイトにアクセスできません
localhost で接続が拒否されました
ERR_CONNECTION_REFUSED
```

プログラミングの学習中によく出るエラーです。原因は単純なので、順番に確認すれば解決します。

## 原因1：サーバーが起動していない（最も多い）

一番多い原因です。ブラウザでlocalhostにアクセスする前に、サーバーを起動する必要があります。

### 確認方法

ターミナルを見てください。サーバーが起動していれば、こんな表示があるはずです。

```
Server running on http://localhost:3000
```

この表示がなければ、サーバーが起動していません。

### 解決方法

使っているフレームワークに応じて、サーバーを起動してください。

```bash
# Node.js / Express
node app.js

# React
npm start

# Python / Flask
python app.py

# Python / Django
python manage.py runserver
```

## 原因2：ポート番号が違う

サーバーは起動しているけど、ブラウザでアクセスしているポート番号が違う場合。

### 確認方法

ターミナルの表示を確認してください。

```
Server running on http://localhost:8000
```

この場合、`localhost:3000` ではなく `localhost:8000` にアクセスする必要があります。

## 原因3：ポートが他のプログラムに使われている

同じポート番号を別のプログラムが使っていると、サーバーが起動できません。

### 確認方法（Windows）

```bash
netstat -ano | findstr :3000
```

何か表示されたら、そのポートは使用中です。

### 解決方法

別のポート番号でサーバーを起動するか、使用中のプログラムを終了してください。

## 原因4：ファイアウォールにブロックされている

会社のPCや、セキュリティソフトが入っているPCで起きることがあります。

### 解決方法

一時的にファイアウォールを無効にして試してみてください。それで接続できたら、ファイアウォールの設定でlocalhostへの接続を許可してください。

## まとめ

- まずサーバーが起動しているか確認
- ポート番号が合っているか確認
- ポートが他のプログラムに使われていないか確認
- ファイアウォールを確認

---
### あわせて読みたい
- [コマンドラインが怖い人へ ― 覚えるコマンド5つだけ](/posts/command-line-scary/)
- [VS Code最初に覚えるべき設定とショートカット10選](/posts/vscode-shortcuts-beginner/)

{{< ad >}}

<!-- affiliate -->
## 関連リソース

Web開発をもっと学びたい方へ：

<!-- START MoshimoAffiliateEasyLink --><script type="text/javascript">(function(b,c,f,g,a,d,e){b.MoshimoAffiliateObject=a;b[a]=b[a]||function(){arguments.currentScript=c.currentScript||c.scripts[c.scripts.length-2];(b[a].q=b[a].q||[]).push(arguments)};c.getElementById(a)||(d=c.createElement(f),d.src=g,d.id=a,e=c.getElementsByTagName("body")[0],e.appendChild(d))})(window,document,"script","//dn.msmstatic.com/site/cardlink/bundle.js?20220329","msmaflink");msmaflink({"n":"Webを支える技術 ― HTTP、URI、HTML、そしてREST","b":"","t":"","d":"https:\/\/thumbnail.image.rakuten.co.jp","c_p":"","p":[""],"u":{"u":"https:\/\/search.rakuten.co.jp\/search\/mall\/Web%E3%82%92%E6%94%AF%E3%81%88%E3%82%8B%E6%8A%80%E8%A1%93%20HTTP%20REST\/","t":"rakuten","r_v":""},"v":"2.1","b_l":[{"id":1,"u_tx":"楽天市場で見る","u_bc":"#f76956","u_url":"https:\/\/search.rakuten.co.jp\/search\/mall\/Web%E3%82%92%E6%94%AF%E3%81%88%E3%82%8B%E6%8A%80%E8%A1%93%20HTTP%20REST\/","a_id":5490814,"p_id":54,"pl_id":27059,"pc_id":54,"s_n":"rakuten","u_so":1},{"u_bc":"#f79256","u_tx":"Amazonで見る","u_url":"https:\/\/www.amazon.co.jp\/s\/ref=nb_sb_noss_1?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&url=search-alias%3Daps&field-keywords=Web%E3%82%92%E6%94%AF%E3%81%88%E3%82%8B%E6%8A%80%E8%A1%93%20HTTP%20URI%20HTML%20REST","s_n":"amazon","u_so":2,"a_id":5490817,"p_id":170,"pc_id":185,"pl_id":27060,"id":2}],"eid":"K30oZ","s":"s"});</script><div id="msmaflink-K30oZ">リンク</div><!-- MoshimoAffiliateEasyLink END -->
<!-- /affiliate -->
