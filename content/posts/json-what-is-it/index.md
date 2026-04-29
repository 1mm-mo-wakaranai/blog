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


{{< ad >}}

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

JavaScriptでは[fetch API](/posts/javascript-fetch-api/)を使ってサーバーからJSONデータを取得するのが一般的です。

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

## JSONを扱うプログラミング例

実際にプログラムでJSONを扱う例を見てみましょう。

### Pythonの場合

```python
import json

# JSON文字列をPythonの辞書に変換
data = json.loads('{"name": "田中太郎", "age": 30}')
print(data["name"])  # 田中太郎

# Pythonの辞書をJSON文字列に変換
json_str = json.dumps(data, ensure_ascii=False)
print(json_str)  # {"name": "田中太郎", "age": 30}
```

### JavaScriptの場合

```javascript
// JSON文字列をオブジェクトに変換
const data = JSON.parse('{"name": "田中太郎", "age": 30}');
console.log(data.name);  // 田中太郎

// オブジェクトをJSON文字列に変換
const jsonStr = JSON.stringify(data);
console.log(jsonStr);  // {"name":"田中太郎","age":30}
```

JavaScriptでサーバーからデータを取得するときは、[async/awaitの書き方](/posts/javascript-async-await/)と組み合わせてJSONを処理するのが一般的です。

## どこで見かけるか

- `package.json`（Node.jsのプロジェクト設定）
- APIのレスポンス（Webサービスから返ってくるデータ）
- 設定ファイル（VS Codeの `settings.json` など）

`package.json` は[npmやyarnでライブラリを管理する](/posts/npm-yarn-beginner/)ときに使うファイルです。また、[APIの仕組み](/posts/api-what-is-it/)を理解すると、JSONがどのようにデータのやり取りに使われているかがより分かります。

プログラミングを続けていると、必ず出会うフォーマットです。

## よくある質問（FAQ）

### Q: JSONとXMLの違いは何ですか？
A: どちらもデータを構造化して表現するフォーマットですが、JSONの方がシンプルで軽量です。XMLは `<tag>値</tag>` のようにタグで囲む書き方で、JSONより冗長になりがちです。現在のWeb開発ではJSONが主流です。

### Q: JSONファイルの拡張子は何ですか？
A: `.json` です。たとえば `package.json`、`settings.json`、`data.json` のように使います。テキストエディタで開いて編集できます。

### Q: JSONのバリデーション（正しいかチェック）はどうすればいいですか？
A: VS Codeで `.json` ファイルを開くと、構文エラーがあれば自動的にハイライトされます。オンラインツールの「JSONLint」を使って検証することもできます。

### Q: JSONとJavaScriptのオブジェクトは同じものですか？
A: 似ていますが、厳密には違います。JSONではキー名を必ずダブルクォートで囲む必要がありますが、JavaScriptのオブジェクトではクォートなしでも書けます。また、JSONには関数やコメントを含められません。

### Q: JSONで日本語は使えますか？
A: はい、使えます。値として日本語の文字列を入れることは問題ありません。ファイルの文字コードをUTF-8にしておけば、文字化けも起きません。

## まとめ

- JSONは「データを整理して書くフォーマット」
- `"項目名": 値` の形で書く
- 人間にもプログラムにも読みやすい
- リストや入れ子も書ける
- 最後のカンマとシングルクォートに注意

---
### あわせて読みたい
- [APIとは？レストランの注文に例えて5分で理解する](/posts/api-what-is-it/)
- [最低限のHTMLファイルの書き方 ― コピペで使えるテンプレート付き](/posts/html-basic-structure/)

<!-- affiliate -->
## 関連リソース

Web開発をもっと学びたい方へ：

<!-- START MoshimoAffiliateEasyLink --><script type="text/javascript">(function(b,c,f,g,a,d,e){b.MoshimoAffiliateObject=a;b[a]=b[a]||function(){arguments.currentScript=c.currentScript||c.scripts[c.scripts.length-2];(b[a].q=b[a].q||[]).push(arguments)};c.getElementById(a)||(d=c.createElement(f),d.src=g,d.id=a,e=c.getElementsByTagName("body")[0],e.appendChild(d))})(window,document,"script","//dn.msmstatic.com/site/cardlink/bundle.js?20220329","msmaflink");msmaflink({"n":"1冊ですべて身につくHTML & CSSとWebデザイン入門講座","b":"","t":"","d":"https:\/\/thumbnail.image.rakuten.co.jp","c_p":"","p":[""],"u":{"u":"https:\/\/search.rakuten.co.jp\/search\/mall\/Web%E9%96%8B%E7%99%BA%20%E5%85%A5%E9%96%80%20HTML%20CSS%20JavaScript\/","t":"rakuten","r_v":""},"v":"2.1","b_l":[{"id":1,"u_tx":"楽天市場で見る","u_bc":"#f76956","u_url":"https:\/\/search.rakuten.co.jp\/search\/mall\/Web%E9%96%8B%E7%99%BA%20%E5%85%A5%E9%96%80%20HTML%20CSS%20JavaScript\/","a_id":5490814,"p_id":54,"pl_id":27059,"pc_id":54,"s_n":"rakuten","u_so":1},{"u_bc":"#f79256","u_tx":"Amazonで見る","u_url":"https:\/\/www.amazon.co.jp\/s\/ref=nb_sb_noss_1?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&url=search-alias%3Daps&field-keywords=1%E5%86%8A%E3%81%A7%E3%81%99%E3%81%B9%E3%81%A6%E8%BA%AB%E3%81%AB%E3%81%A4%E3%81%8FHTML%20CSS%20Web%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E5%85%A5%E9%96%80%E8%AC%9B%E5%BA%A7","s_n":"amazon","u_so":2,"a_id":5490817,"p_id":170,"pc_id":185,"pl_id":27060,"id":2}],"eid":"GYCrv","s":"s"});</script><div id="msmaflink-GYCrv">リンク</div><!-- MoshimoAffiliateEasyLink END -->
<!-- /affiliate -->
