---
title: "【初心者向け】fetch APIが分からない人へ ― APIからデータを取得する基本"
date: 2026-04-29
tags: ["JavaScript", "初心者向け"]
description: "JavaScriptのfetch APIを初心者向けに解説。APIからデータを取得して画面に表示するまでの流れを、実際のコードで理解できます。"
draft: false
---

## この記事で解決すること

「fetchって何？APIからデータを取るってどういうこと？」

fetch APIの基本から、実際にデータを取得して画面に表示するまでを解説します。

{{< ad >}}

## fetchとは

`fetch` は、JavaScriptからWebサーバーにリクエストを送って、データを受け取るための機能です。

```
イメージ：
あなた（ブラウザ） → 「天気のデータください」 → サーバー
あなた（ブラウザ） ← 「東京は晴れ、25度です」 ← サーバー
```

この「データください」→「はいどうぞ」のやり取りを、JavaScriptのコード1行で実行できるのが `fetch` です。APIの基本的な仕組みについては[APIとは何か？](/posts/api-what-is-it/)で解説しています。

## 最小限のコード

```javascript
// サーバーからデータを取得する
const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
const data = await response.json();
console.log(data);
```

これだけで、サーバーからユーザー情報を取得できます。

### 何が起きているか

1. `fetch(URL)` → サーバーにリクエストを送る
2. `await` → レスポンスが返ってくるまで待つ
3. `response.json()` → 返ってきたデータをJavaScriptのオブジェクトに変換
4. `console.log(data)` → データを表示

## ステップ1: GETリクエスト（データを取得する）

最も基本的な使い方です。サーバーからデータを「もらう」操作です。

```javascript
async function getUser() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users/1');

    // レスポンスが正常か確認
    if (!response.ok) {
      throw new Error(`HTTPエラー: ${response.status}`);
    }

    const user = await response.json();
    console.log(user.name);  // "Leanne Graham"
    console.log(user.email); // "Sincere@april.biz"
  } catch (error) {
    console.error('データの取得に失敗:', error.message);
  }
}

getUser();
```

### ポイント

- `response.ok` でリクエストが成功したか確認する（404や500エラーを検出）
- `try/catch` でエラーを処理する（ネットワーク切断などに対応）
- [async/awaitが分からない方はこちら](/posts/javascript-async-await/)

## ステップ2: 取得したデータを画面に表示する

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>fetch APIの練習</title>
</head>
<body>
    <h1>ユーザー一覧</h1>
    <ul id="user-list"></ul>

    <script>
    async function displayUsers() {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            const users = await response.json();

            const list = document.getElementById('user-list');

            users.forEach(user => {
                const li = document.createElement('li');
                li.textContent = `${user.name} (${user.email})`;
                list.appendChild(li);
            });
        } catch (error) {
            console.error('取得失敗:', error.message);
        }
    }

    displayUsers();
    </script>
</body>
</html>
```

このHTMLファイルをブラウザで開くと、10人のユーザー名とメールアドレスが一覧表示されます。取得したデータを `map` や `filter` で加工する方法は[JavaScriptの配列メソッド入門 ― map・filter・reduceの使い方](/posts/javascript-array-methods/)で詳しく解説しています。

## ステップ3: POSTリクエスト（データを送信する）

サーバーにデータを「送る」操作です。

```javascript
async function createPost() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: '初めての投稿',
        body: 'fetch APIで送信しました',
        userId: 1,
      }),
    });

    const result = await response.json();
    console.log('作成成功:', result);
  } catch (error) {
    console.error('送信失敗:', error.message);
  }
}

createPost();
```

### GETとPOSTの違い

| | GET | POST |
|---|---|---|
| 目的 | データを取得する | データを送信する |
| fetchの書き方 | `fetch(URL)` | `fetch(URL, { method: 'POST', ... })` |
| bodyの有無 | なし | あり（送信するデータ） |
| 例 | ユーザー一覧を取得 | 新しい投稿を作成 |

## ステップ4: クエリパラメータを使う

URLの末尾に `?key=value` を付けて、条件を指定できます。

```javascript
async function searchPosts(userId) {
  // URLにクエリパラメータを追加
  const url = `https://jsonplaceholder.typicode.com/posts?userId=${userId}`;
  const response = await fetch(url);
  const posts = await response.json();

  console.log(`ユーザー${userId}の投稿数: ${posts.length}`);
  posts.forEach(post => {
    console.log(`- ${post.title}`);
  });
}

searchPosts(1); // ユーザー1の投稿だけ取得
```

## よくあるエラーと対処法

### エラー1: CORSエラー

```
Access to fetch at '...' has been blocked by CORS policy
```

ブラウザのセキュリティ機能です。別のドメインのAPIにアクセスしようとすると発生します。

対処法：
- API側でCORSを許可してもらう
- 開発中はプロキシサーバーを使う
- [CORSエラーの詳しい解説はこちら](/posts/cors-error-beginner/)

APIとは何か、どういう仕組みで動いているかについては[APIとは何か？](/posts/api-what-is-it/)で基本から解説しています。

### エラー2: `response.json()` でエラー

```
SyntaxError: Unexpected token < in JSON at position 0
```

サーバーがJSONではなくHTMLを返している場合に起きます。URLが正しいか確認してください。JSONの基本については[JSONとは何か？](/posts/json-what-is-it/)で解説しています。

### エラー3: `await` が使えない

```
SyntaxError: await is only valid in async functions
```

`await` は `async` 関数の中でしか使えません。関数に `async` を付けてください。

## よくある質問（FAQ）

### Q: fetchとaxiosの違いは何ですか？

A: `fetch` はブラウザに標準で組み込まれている機能で、追加のインストールは不要です。`axios` は外部ライブラリで、レスポンスの自動JSON変換やリクエストのキャンセルなど、便利な機能が追加されています。小規模なプロジェクトなら `fetch` で十分です。

### Q: fetchでタイムアウトを設定できますか？

A: `fetch` 自体にはタイムアウト機能がありませんが、`AbortController` を使って実現できます。`const controller = new AbortController()` を作成し、`fetch(url, { signal: controller.signal })` と指定します。`setTimeout` で `controller.abort()` を呼べばタイムアウトになります。

### Q: `response.ok` と `response.status` の違いは何ですか？

A: `response.ok` はステータスコードが200〜299の場合に `true` になるプロパティです。`response.status` は具体的なステータスコード（200、404、500など）を数値で返します。まず `response.ok` で成功/失敗を判定し、詳細が必要なときに `response.status` を確認するのが一般的です。

### Q: fetchでファイルをアップロードできますか？

A: はい、`FormData` オブジェクトを使えばファイルをアップロードできます。`body` に `FormData` を指定し、`Content-Type` ヘッダーは自動設定されるので指定しないでください。

### Q: fetchはNode.jsでも使えますか？

A: Node.js 18以降では標準で `fetch` が使えます。それ以前のバージョンでは `node-fetch` パッケージをインストールする必要があります。パッケージ管理については[npm/yarnの使い方入門](/posts/npm-yarn-beginner/)を参考にしてください。

## まとめ

- `fetch` はサーバーとデータをやり取りするための機能
- `GET` でデータ取得、`POST` でデータ送信
- `response.ok` でエラーチェック、`try/catch` で例外処理
- `response.json()` でJSONデータをオブジェクトに変換

---

### あわせて読みたい
- [async/awaitが分からない人へ ― 非同期処理を図解で理解](/posts/javascript-async-await/)
- [CORSエラーが出たときの対処法 ― 初心者が最初にハマる壁](/posts/cors-error-beginner/)

<!-- affiliate -->
## 関連リソース

JavaScriptをもっと学びたい方へ：

<!-- START MoshimoAffiliateEasyLink --><script type="text/javascript">(function(b,c,f,g,a,d,e){b.MoshimoAffiliateObject=a;b[a]=b[a]||function(){arguments.currentScript=c.currentScript||c.scripts[c.scripts.length-2];(b[a].q=b[a].q||[]).push(arguments)};c.getElementById(a)||(d=c.createElement(f),d.src=g,d.id=a,e=c.getElementsByTagName("body")[0],e.appendChild(d))})(window,document,"script","//dn.msmstatic.com/site/cardlink/bundle.js?20220329","msmaflink");msmaflink({"n":"JavaScript本格入門 ― モダンスタイルによる基礎から現場での応用まで","b":"","t":"","d":"https:\/\/thumbnail.image.rakuten.co.jp","c_p":"","p":[""],"u":{"u":"https:\/\/search.rakuten.co.jp\/search\/mall\/JavaScript+%E6%9C%AC%E6%A0%BC%E5%85%A5%E9%96%80\/","t":"rakuten","r_v":""},"v":"2.1","b_l":[{"id":1,"u_tx":"楽天市場で見る","u_bc":"#f76956","u_url":"https:\/\/search.rakuten.co.jp\/search\/mall\/JavaScript+%E6%9C%AC%E6%A0%BC%E5%85%A5%E9%96%80\/","a_id":5490814,"p_id":54,"pl_id":27059,"pc_id":54,"s_n":"rakuten","u_so":1},{"u_bc":"#f79256","u_tx":"Amazonで見る","u_url":"https:\/\/www.amazon.co.jp\/s\/ref=nb_sb_noss_1?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&url=search-alias%3Daps&field-keywords=JavaScript+%E6%9C%AC%E6%A0%BC%E5%85%A5%E9%96%80","s_n":"amazon","u_so":2,"a_id":5490817,"p_id":170,"pc_id":185,"pl_id":27060,"id":2}],"eid":"fetchApi","s":"s"});</script><div id="msmaflink-fetchApi">リンク</div><!-- MoshimoAffiliateEasyLink END -->
<!-- /affiliate -->
