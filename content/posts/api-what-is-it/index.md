---
title: "【初心者向け】APIとは？レストランの注文に例えて5分で理解する"
date: 2026-04-20
tags: ["初心者向け", "開発環境"]
description: "APIとは何かを、レストランの注文に例えて初心者向けに解説。なぜAPIが必要なのか、どこで使われているのかが5分で分かります。"
draft: false
---

## この記事で解決すること

「APIって何？プログラミングの記事を読んでいるとよく出てくるけど、意味が分からない」

この記事を読めば、APIが何なのか、なぜ必要なのかが5分で分かります。

## APIをレストランに例えると

APIは「ウェイター」です。

あなた（お客さん）は、キッチン（サーバー）に直接入って料理を作ることはできません。代わりに、ウェイター（API）に「カレーください」と注文します。ウェイターがキッチンに伝えて、料理ができたらあなたのテーブルに届けてくれます。

- あなた = アプリやWebサイト
- ウェイター = API
- キッチン = サーバー（データや機能を持っている場所）
- メニュー = APIドキュメント（何を注文できるかの一覧）

## 具体例

### 天気予報アプリ

天気予報アプリは、自分で天気を観測しているわけではありません。気象庁やOpenWeatherMapなどの「天気API」に「東京の天気を教えて」とリクエストを送り、返ってきたデータを画面に表示しています。

### Googleマップの埋め込み

Webサイトに地図を表示するとき、自分で地図を作る必要はありません。Google Maps APIを使えば、「この住所の地図を表示して」とリクエストするだけで地図が表示されます。

### ログイン機能

「Googleでログイン」「LINEでログイン」というボタンは、GoogleやLINEのAPIを使っています。自分でパスワード管理の仕組みを作らなくても、既存のサービスの認証機能を借りられます。

{{< ad >}}

## APIの仕組み（もう少し詳しく）

APIは基本的に「リクエスト」と「レスポンス」のやり取りです。

```
あなたのアプリ → リクエスト（「東京の天気を教えて」） → 天気API
天気API → レスポンス（「晴れ、25度」） → あなたのアプリ
```

リクエストとレスポンスのデータ形式には、JSONがよく使われます。

JSONについては別の記事で解説しています。
👉 [JSONとは？5分で分かるデータ形式の基本](/posts/json-what-is-it/)

## APIキーとは

多くのAPIは「APIキー」という鍵が必要です。これは「あなたが誰か」を識別するためのもので、無断で大量にアクセスされるのを防ぐ仕組みです。

APIキーはパスワードと同じくらい大切です。コードに直接書かず、環境変数で管理してください。

👉 [環境変数と.envファイルの使い方](/posts/env-variables-beginner/)

## まとめ

- APIは「アプリ同士がデータをやり取りする仕組み」
- レストランのウェイターのような役割
- 天気予報、地図、ログインなど、あらゆるところで使われている
- APIキーはパスワードと同じくらい大切に管理する

---
### あわせて読みたい
- [localhost接続が拒否されたときの対処法](/posts/localhost-refused/)

<!-- affiliate -->
## 関連リソース

Web APIをもっと学びたい方へ：

<!-- START MoshimoAffiliateEasyLink --><script type="text/javascript">(function(b,c,f,g,a,d,e){b.MoshimoAffiliateObject=a;b[a]=b[a]||function(){arguments.currentScript=c.currentScript||c.scripts[c.scripts.length-2];(b[a].q=b[a].q||[]).push(arguments)};c.getElementById(a)||(d=c.createElement(f),d.src=g,d.id=a,e=c.getElementsByTagName("body")[0],e.appendChild(d))})(window,document,"script","//dn.msmstatic.com/site/cardlink/bundle.js?20220329","msmaflink");msmaflink({"n":"Web APIの設計","b":"","t":"","d":"https:\/\/thumbnail.image.rakuten.co.jp","c_p":"","p":[""],"u":{"u":"https:\/\/search.rakuten.co.jp\/search\/mall\/Web%20API%20%E8%A8%AD%E8%A8%88%20%E5%85%A5%E9%96%80\/","t":"rakuten","r_v":""},"v":"2.1","b_l":[{"id":1,"u_tx":"楽天市場で見る","u_bc":"#f76956","u_url":"https:\/\/search.rakuten.co.jp\/search\/mall\/Web%20API%20%E8%A8%AD%E8%A8%88%20%E5%85%A5%E9%96%80\/","a_id":5490814,"p_id":54,"pl_id":27059,"pc_id":54,"s_n":"rakuten","u_so":1},{"u_bc":"#f79256","u_tx":"Amazonで見る","u_url":"https:\/\/www.amazon.co.jp\/s\/ref=nb_sb_noss_1?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&url=search-alias%3Daps&field-keywords=Web%20API%E3%81%AE%E8%A8%AD%E8%A8%88","s_n":"amazon","u_so":2,"a_id":5490817,"p_id":170,"pc_id":185,"pl_id":27060,"id":2}],"eid":"5OMqg","s":"s"});</script><div id="msmaflink-5OMqg">リンク</div><!-- MoshimoAffiliateEasyLink END -->
<!-- /affiliate -->
