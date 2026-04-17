---
title: "【初心者向け】JSONとは？5分で分かるデータ形式の基本"
date: 2026-04-16
tags: ["初心者向け", "開発環境"]
description: "JSONとは何か、どう読むのか、どこで使われるのかを初心者向けに5分で解説します。"
draft: false
---

## この記事で解決すること

「JSONって何？ プログラミングの記事を読んでいるとよく出てくるけど、意味が分からない」

この記事を読めば、JSONが何なのか、どう読めばいいのかが5分で分かります。

## JSONとは

JSON（ジェイソン）は、データを整理して書くためのフォーマット（書き方のルール）です。

正式名称は「JavaScript Object Notation」ですが、名前は覚えなくて大丈夫です。

## 具体例を見てみよう

たとえば、「田中太郎さん、30歳、東京在住」という情報をJSONで書くとこうなります。

```json
{
  "name": "田中太郎",
  "age": 30,
  "city": "東京"
}
```

ルールはシンプルです。

- `{}` で全体を囲む
- `"項目名": 値` の形で書く
- 項目同士は `,` で区切る
- 文字列は `""` で囲む、数字はそのまま

## なぜJSONが使われるのか

プログラム同士がデータをやり取りするときに使います。

たとえば：
- 天気予報アプリがサーバーから天気データを受け取るとき
- Webサイトがログイン情報をサーバーに送るとき
- 設定ファイルに設定を保存するとき

人間にも読めて、プログラムにも読める。この「両方に優しい」のがJSONの強みです。

## もう少し複雑な例

リスト（配列）も書けます。

```json
{
  "name": "田中太郎",
  "age": 30,
  "hobbies": ["読書", "映画", "プログラミング"]
}
```

`[]` で囲むとリストになります。

入れ子（ネスト）もできます。

```json
{
  "name": "田中太郎",
  "address": {
    "city": "東京",
    "zip": "100-0001"
  }
}
```

`{}` の中に `{}` を入れると、データの中にデータを持てます。

## よくある間違い

### 最後のカンマ

```json
{
  "name": "田中太郎",
  "age": 30,
}
```

最後の項目の後にカンマ `,` をつけるとエラーになります。`30` の後のカンマを消してください。

### シングルクォート

```json
{
  'name': '田中太郎'
}
```

JSONではシングルクォート `'` は使えません。必ずダブルクォート `"` を使います。

### コメント

JSONにはコメントを書けません。`// これはコメント` のような書き方はエラーになります。

## どこで見かけるか

- `package.json`（Node.jsのプロジェクト設定）
- APIのレスポンス（Webサービスから返ってくるデータ）
- 設定ファイル（VS Codeの `settings.json` など）

プログラミングを続けていると、必ず出会うフォーマットです。

## まとめ

- JSONは「データを整理して書くフォーマット」
- `"項目名": 値` の形で書く
- 人間にもプログラムにも読みやすい
- リストや入れ子も書ける
- 最後のカンマとシングルクォートに注意

<!-- affiliate -->
## 関連リソース

プログラミングを始めたい方へ：

<!-- START MoshimoAffiliateEasyLink --><script type="text/javascript">(function(b,c,f,g,a,d,e){b.MoshimoAffiliateObject=a;b[a]=b[a]||function(){arguments.currentScript=c.currentScript||c.scripts[c.scripts.length-2];(b[a].q=b[a].q||[]).push(arguments)};c.getElementById(a)||(d=c.createElement(f),d.src=g,d.id=a,e=c.getElementsByTagName("body")[0],e.appendChild(d))})(window,document,"script","//dn.msmstatic.com/site/cardlink/bundle.js?20220329","msmaflink");msmaflink({"n":"実践Claude Code入門ー現場で活用するためのAIコーディングの思考法 [ 西見 公宏 ]","b":"","t":"","d":"https:\/\/thumbnail.image.rakuten.co.jp","c_p":"","p":["\/@0_mall\/book\/cabinet\/3540\/9784297153540_1_34.jpg"],"u":{"u":"https:\/\/item.rakuten.co.jp\/book\/18439208\/","t":"rakuten","r_v":""},"v":"2.1","b_l":[{"id":1,"u_tx":"楽天市場で見る","u_bc":"#f76956","u_url":"https:\/\/item.rakuten.co.jp\/book\/18439208\/","a_id":5490814,"p_id":54,"pl_id":27059,"pc_id":54,"s_n":"rakuten","u_so":1}],"eid":"a8XaY","s":"s"});</script><div id="msmaflink-a8XaY">リンク</div><!-- MoshimoAffiliateEasyLink END -->
<!-- /affiliate -->
