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

プログラミングの学習中に出てくる用語は他にもたくさんあります。たとえば[JSONとは？5分で分かるデータ形式の基本](/posts/json-what-is-it/)も、APIと一緒に理解しておくと役立ちます。

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

### GitHub API

開発者にとって身近な例として、[GitHub](/posts/github-what-is-it/)のAPIがあります。GitHub APIを使うと、リポジトリの情報を取得したり、Issueを自動で作成したりできます。多くの開発ツールがGitHub APIを活用して連携機能を実現しています。

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

## APIを実際に使ってみる

APIの概念が分かったら、実際にコードからAPIを呼び出してみましょう。JavaScriptでは `fetch` という関数を使ってAPIにリクエストを送ることができます。

```javascript
// 天気APIにリクエストを送る例
fetch('https://api.example.com/weather?city=tokyo')
  .then(response => response.json())
  .then(data => console.log(data));
```

`fetch` の使い方について詳しくは[JavaScript fetch APIの使い方](/posts/javascript-fetch-api/)で解説しています。

APIを呼び出すとき、レスポンスが返ってくるまで少し時間がかかります。この「待ち時間」を扱うのが非同期処理です。JavaScriptでは `async/await` という書き方で非同期処理を分かりやすく書けます。詳しくは[async/awaitの使い方](/posts/javascript-async-await/)をご覧ください。

## APIを使うときの注意点

### レート制限（Rate Limit）

多くのAPIには「1分間に60回まで」のようなリクエスト回数の制限があります。制限を超えると一時的にアクセスがブロックされます。APIドキュメントでレート制限を確認しておきましょう。

### エラーハンドリング

APIは常に正常なレスポンスを返すとは限りません。ネットワークエラーやサーバーエラーが起きることもあります。エラー時の処理を書いておかないと、アプリが突然止まってしまいます。

### CORSエラー

ブラウザからAPIを呼び出すと「CORSエラー」に遭遇することがあります。これはブラウザのセキュリティ機能によるもので、サーバー側の設定で解決できます。詳しくは[CORSエラーの原因と解決方法](/posts/cors-error-beginner/)で解説しています。

## よくある質問（FAQ）

### Q: APIは無料で使えますか？
A: APIによります。多くのAPIは無料プラン（月に一定回数まで無料）を提供しています。たとえばOpenWeatherMapの天気APIは、月1,000回まで無料で使えます。大量にリクエストを送る場合や、商用利用の場合は有料プランが必要になることがあります。

### Q: REST APIとは何ですか？
A: REST APIは、Web APIの設計スタイルの一つです。HTTPメソッド（GET、POST、PUT、DELETEなど）を使ってデータの取得・作成・更新・削除を行います。現在のWeb APIの多くはREST形式で作られています。URLでリソース（データ）を指定し、HTTPメソッドで操作を指定するのが特徴です。

### Q: APIドキュメントの読み方が分かりません。
A: APIドキュメントで最初に確認すべきポイントは3つです。①エンドポイント（リクエストを送るURL）、②必要なパラメータ（何を指定すればいいか）、③レスポンスの形式（どんなデータが返ってくるか）。この3つが分かれば、APIを使い始められます。

### Q: APIキーを間違えてGitHubに公開してしまいました。どうすればいいですか？
A: すぐにそのAPIキーを無効化（再発行）してください。GitHubの履歴にはキーが残り続けるため、コミットを消しても安全ではありません。今後は[環境変数と.envファイル](/posts/env-variables-beginner/)を使い、`.gitignore` に `.env` を追加して管理しましょう。

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
