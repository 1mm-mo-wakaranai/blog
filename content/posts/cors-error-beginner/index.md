---
title: "【初心者向け】CORSエラーとは？原因と解決方法をやさしく解説"
date: 2026-04-21
tags: ["初心者向け", "エラー解決", "開発環境"]
description: "CORSエラーが出て困っている初心者向けに、なぜ起きるのか、どう解決するのかをやさしく解説します。"
draft: false
---

## この記事で解決すること

ブラウザの開発者ツールにこんなエラーが出た。

```
Access to fetch at 'https://api.example.com' from origin 'http://localhost:3000'
has been blocked by CORS policy
```

「CORS」って何？なぜブロックされるの？

## CORSとは

CORSは「Cross-Origin Resource Sharing（クロスオリジンリソースシェアリング）」の略です。

簡単に言うと、ブラウザのセキュリティ機能です。「別のサイトのデータを勝手に取りに行くのを防ぐ」仕組みです。

### なぜ必要なのか

もしCORSがなかったら、悪意のあるサイトがあなたのブラウザを使って、銀行のサイトやメールのデータを勝手に取得できてしまいます。それを防ぐために、ブラウザが「このリクエストは許可されていません」とブロックしています。

## なぜ開発中に出るのか

開発中は `http://localhost:3000` でサイトを動かして、`https://api.example.com` にデータを取りに行くことが多いです。

この2つは「別のオリジン（出所）」なので、ブラウザがブロックします。

オリジンとは「プロトコル + ドメイン + ポート番号」の組み合わせです。

```
http://localhost:3000  ← オリジンA
https://api.example.com ← オリジンB（別のオリジン）
```

{{< ad >}}

## 解決方法

### 方法1：サーバー側でCORSを許可する（正攻法）

APIサーバー側で、特定のオリジンからのアクセスを許可する設定を追加します。

Node.js（Express）の場合：

```javascript
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:3000'
}));
```

Pythonの場合：

```python
from flask_cors import CORS
CORS(app, origins=['http://localhost:3000'])
```

### 方法2：プロキシを使う（フロントエンド側で対処）

自分のサーバーを経由してAPIにアクセスする方法です。ブラウザから見ると同じオリジンなので、CORSエラーが出ません。

### 方法3：開発中だけブラウザの制限を無効にする

Chrome拡張「Allow CORS」を使うと、開発中だけCORSを無効にできます。ただし本番環境では使えないので、あくまで一時的な対処です。

## やってはいけないこと

```javascript
// NG：すべてのオリジンを許可
app.use(cors({ origin: '*' }));
```

本番環境で `*`（すべて許可）にすると、セキュリティリスクになります。許可するオリジンは具体的に指定してください。

## まとめ

- CORSはブラウザのセキュリティ機能
- 別のオリジンへのリクエストがブロックされる
- サーバー側で許可設定を追加するのが正攻法
- 本番環境では `*` を使わない

---

### あわせて読みたい
- [localhostの接続が拒否されたときの対処法](/posts/localhost-refused/)
- [APIとは？レストランの注文に例えて解説](/posts/api-what-is-it/)

<!-- affiliate -->
## 関連リソース

Web技術をもっと学びたい方へ：

<!-- START MoshimoAffiliateEasyLink --><script type="text/javascript">(function(b,c,f,g,a,d,e){b.MoshimoAffiliateObject=a;b[a]=b[a]||function(){arguments.currentScript=c.currentScript||c.scripts[c.scripts.length-2];(b[a].q=b[a].q||[]).push(arguments)};c.getElementById(a)||(d=c.createElement(f),d.src=g,d.id=a,e=c.getElementsByTagName("body")[0],e.appendChild(d))})(window,document,"script","//dn.msmstatic.com/site/cardlink/bundle.js?20220329","msmaflink");msmaflink({"n":"Webを支える技術 ― HTTP、URI、HTML、そしてREST","b":"","t":"","d":"https:\/\/thumbnail.image.rakuten.co.jp","c_p":"","p":[""],"u":{"u":"https:\/\/search.rakuten.co.jp\/search\/mall\/Web%E3%82%92%E6%94%AF%E3%81%88%E3%82%8B%E6%8A%80%E8%A1%93%20HTTP%20REST\/","t":"rakuten","r_v":""},"v":"2.1","b_l":[{"id":1,"u_tx":"楽天市場で見る","u_bc":"#f76956","u_url":"https:\/\/search.rakuten.co.jp\/search\/mall\/Web%E3%82%92%E6%94%AF%E3%81%88%E3%82%8B%E6%8A%80%E8%A1%93%20HTTP%20REST\/","a_id":5490814,"p_id":54,"pl_id":27059,"pc_id":54,"s_n":"rakuten","u_so":1},{"u_bc":"#f79256","u_tx":"Amazonで見る","u_url":"https:\/\/www.amazon.co.jp\/s\/ref=nb_sb_noss_1?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&url=search-alias%3Daps&field-keywords=Web%E3%82%92%E6%94%AF%E3%81%88%E3%82%8B%E6%8A%80%E8%A1%93%20HTTP%20URI%20HTML%20REST","s_n":"amazon","u_so":2,"a_id":5490817,"p_id":170,"pc_id":185,"pl_id":27060,"id":2}],"eid":"B4BRp","s":"s"});</script><div id="msmaflink-B4BRp">リンク</div><!-- MoshimoAffiliateEasyLink END -->
<!-- /affiliate -->
