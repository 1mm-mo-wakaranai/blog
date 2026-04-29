---
title: "【初心者向け】async/awaitが分からない人へ ― 非同期処理を図解で理解"
date: 2026-04-28
tags: ["JavaScript", "初心者向け"]
description: "JavaScriptのasync/awaitを初心者向けに解説。コールバック地獄からPromise、そしてasync/awaitへの進化を段階的に理解できます。"
draft: false
---

## この記事で解決すること

「async/awaitって何？なんで必要なの？」

非同期処理の概念から、async/awaitの使い方まで段階的に解説します。

{{< ad >}}

## そもそも非同期処理とは

JavaScriptは基本的に「上から順番に実行」されます。でも、時間がかかる処理（API通信、ファイル読み込みなど）を待っている間、画面が固まったら困りますよね。

```
同期処理（待つ）：
料理を注文 → 料理が来るまでボーッと待つ → 食べる

非同期処理（待たない）：
料理を注文 → 待ってる間にスマホを見る → 料理が来たら食べる
```

非同期処理は「待っている間に他のことをする」仕組みです。

## 歴史: なぜasync/awaitが生まれたか

### 時代1: コールバック（地獄）

```javascript
// データを取得して、加工して、保存する
getData(function(data) {
  processData(data, function(processed) {
    saveData(processed, function(result) {
      console.log(result);
      // さらにネストが深くなる...
    });
  });
});
```

ネストが深くなり、読みにくい。これが「コールバック地獄」です。

### 時代2: Promise（チェーン）

```javascript
getData()
  .then(data => processData(data))
  .then(processed => saveData(processed))
  .then(result => console.log(result))
  .catch(error => console.error(error));
```

だいぶ読みやすくなりました。でも `.then()` のチェーンが長くなると、まだ複雑です。

### 時代3: async/await（現在）

```javascript
async function main() {
  try {
    const data = await getData();
    const processed = await processData(data);
    const result = await saveData(processed);
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}
```

普通の同期処理のように読める！これがasync/awaitの最大のメリットです。

## async/awaitの基本ルール

### ルール1: `await`は`async`関数の中でしか使えない

```javascript
// NG: asyncがない関数内でawaitは使えない
function fetchUser() {
  const response = await fetch('/api/user'); // エラー！
}

// OK: async を付ける
async function fetchUser() {
  const response = await fetch('/api/user'); // OK！
}
```

### ルール2: `await`は Promiseの完了を待つ

```javascript
async function example() {
  console.log('1: 開始');
  
  // fetchはPromiseを返す。awaitで完了を待つ
  const response = await fetch('https://api.example.com/data');
  
  console.log('2: データ取得完了');
  
  const data = await response.json();
  
  console.log('3: JSON変換完了', data);
}
```

実行順序は必ず 1 → 2 → 3 になります。

### ルール3: async関数は必ずPromiseを返す

```javascript
async function greet() {
  return 'こんにちは';
}

// 実際にはPromiseが返される
greet().then(message => console.log(message)); // こんにちは
```

## 実践例

### 例1: APIからデータを取得する

```javascript
async function getWeather(city) {
  try {
    const response = await fetch(`https://api.weather.com/${city}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('天気の取得に失敗:', error.message);
    return null;
  }
}

// 使い方
const weather = await getWeather('tokyo');
```

### 例2: 複数のAPIを順番に呼ぶ

```javascript
async function getUserPosts(userId) {
  // まずユーザー情報を取得
  const user = await fetch(`/api/users/${userId}`).then(r => r.json());
  
  // ユーザー情報をもとに投稿を取得
  const posts = await fetch(`/api/posts?author=${user.name}`).then(r => r.json());
  
  return { user, posts };
}
```

### 例3: 複数のAPIを同時に呼ぶ（Promise.all）

```javascript
async function getDashboardData() {
  // 3つのAPIを同時に呼ぶ（待ち時間短縮）
  const [users, posts, comments] = await Promise.all([
    fetch('/api/users').then(r => r.json()),
    fetch('/api/posts').then(r => r.json()),
    fetch('/api/comments').then(r => r.json()),
  ]);

  return { users, posts, comments };
}
```

`Promise.all` を使うと、独立した複数の処理を並列実行できます。

## よくあるエラーと対処法

### エラー1: `await is only valid in async functions`

```javascript
// NG
function main() {
  const data = await fetchData(); // エラー
}

// OK: asyncを付ける
async function main() {
  const data = await fetchData();
}
```

### エラー2: awaitを付け忘れてPromiseオブジェクトが返る

```javascript
async function example() {
  // NG: awaitがないのでPromiseオブジェクトが入る
  const data = fetch('/api/data');
  console.log(data); // Promise { <pending> }

  // OK: awaitを付ける
  const data2 = await fetch('/api/data');
  const json = await data2.json();
  console.log(json); // 実際のデータ
}
```

## まとめ

- 非同期処理は「待っている間に他のことをする」仕組み
- `async`を関数に付けると、その中で`await`が使える
- `await`はPromiseの完了を待って結果を返す
- エラー処理は`try/catch`で囲む
- 独立した処理は`Promise.all`で並列実行すると速い

---

### あわせて読みたい
- [JavaScriptの配列メソッドまとめ ― map, filter, reduceを使いこなす](/posts/javascript-array-methods/)
- [TypeScriptを始めるべき理由 ― 型があると何が嬉しいのか](/posts/typescript-beginner/)

<!-- affiliate -->
## 関連リソース

JavaScriptをもっと学びたい方へ：

<!-- START MoshimoAffiliateEasyLink --><script type="text/javascript">(function(b,c,f,g,a,d,e){b.MoshimoAffiliateObject=a;b[a]=b[a]||function(){arguments.currentScript=c.currentScript||c.scripts[c.scripts.length-2];(b[a].q=b[a].q||[]).push(arguments)};c.getElementById(a)||(d=c.createElement(f),d.src=g,d.id=a,e=c.getElementsByTagName("body")[0],e.appendChild(d))})(window,document,"script","//dn.msmstatic.com/site/cardlink/bundle.js?20220329","msmaflink");msmaflink({"n":"JavaScript本格入門 ― モダンスタイルによる基礎から現場での応用まで","b":"","t":"","d":"https:\/\/thumbnail.image.rakuten.co.jp","c_p":"","p":[""],"u":{"u":"https:\/\/search.rakuten.co.jp\/search\/mall\/JavaScript+%E6%9C%AC%E6%A0%BC%E5%85%A5%E9%96%80\/","t":"rakuten","r_v":""},"v":"2.1","b_l":[{"id":1,"u_tx":"楽天市場で見る","u_bc":"#f76956","u_url":"https:\/\/search.rakuten.co.jp\/search\/mall\/JavaScript+%E6%9C%AC%E6%A0%BC%E5%85%A5%E9%96%80\/","a_id":5490814,"p_id":54,"pl_id":27059,"pc_id":54,"s_n":"rakuten","u_so":1},{"u_bc":"#f79256","u_tx":"Amazonで見る","u_url":"https:\/\/www.amazon.co.jp\/s\/ref=nb_sb_noss_1?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&url=search-alias%3Daps&field-keywords=JavaScript+%E6%9C%AC%E6%A0%BC%E5%85%A5%E9%96%80","s_n":"amazon","u_so":2,"a_id":5490817,"p_id":170,"pc_id":185,"pl_id":27060,"id":2}],"eid":"asyncJs","s":"s"});</script><div id="msmaflink-asyncJs">リンク</div><!-- MoshimoAffiliateEasyLink END -->
<!-- /affiliate -->
