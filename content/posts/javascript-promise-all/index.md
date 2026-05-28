---
title: "【JavaScript】Promise.allの使い方 ― 複数の非同期処理を並列実行する方法"
date: 2026-05-13
tags: ["JavaScript", "Promise", "非同期処理", "async/await", "初心者向け"]
categories: ["JavaScript"]
description: "JavaScriptのPromise.allを使って複数の非同期処理を並列実行する方法を解説。Promise.allSettledやPromise.raceとの違い、エラーハンドリング、実践的なコード例を紹介します。"
draft: false
cover:
  image: "images/cover.png"
  alt: "JavaScript Promise.all 非同期処理 並列実行"
  relative: true
  hidden: false
---

## この記事で分かること

{{< chat name="初心者ちゃん" icon="/images/rin-icon.png" direction="left" >}}
複数のAPIを同時に呼びたいんだけど、1個ずつawaitするしかないの？
{{< /chat >}}

{{< chat name="全知全能くん" icon="/images/zenchi-icon.png" direction="right" >}}
Promise.allを使えば並列で実行できるよ。3つのAPIを同時に呼んで、全部終わったら次に進む、ってことができるんだ。
{{< /chat >}}

「複数のAPI呼び出しを同時に実行したい」
「Promise.allの使い方がよく分からない」

この記事では、Promise.allの基本から実践的な使い方まで解説します。エラーハンドリングや他のPromiseメソッドとの違いも紹介していきます。

{{< ad >}}

## Promise.allとは

Promise.allは、複数のPromiseを並列に実行し、すべてが完了するのを待つメソッドです。

通常、[async/await](/posts/javascript-async-await/)で非同期処理を書くと、1つずつ順番に実行されます。しかし、互いに依存しない処理なら同時に実行した方が効率的です。

```javascript
// 直列実行（遅い）
const users = await fetchUsers();    // 1秒
const posts = await fetchPosts();    // 1秒
const comments = await fetchComments(); // 1秒
// 合計: 約3秒

// 並列実行（速い）
const [users, posts, comments] = await Promise.all([
  fetchUsers(),    // 1秒
  fetchPosts(),    // 1秒
  fetchComments(), // 1秒
]);
// 合計: 約1秒（最も遅い処理に合わせる）
```

並列実行なら、最も時間がかかる処理の分だけ待てば済みます。

## 基本構文と使い方

### 基本構文

```javascript
// Promise.allにPromiseの配列を渡す
const results = await Promise.all([promise1, promise2, promise3]);
```

引数にPromiseの配列を渡します。戻り値は、各Promiseの結果が入った配列です。結果の順番は、渡した配列の順番と一致します。

### 分割代入との組み合わせ

```javascript
// 分割代入で個別の変数に受け取る
const [userData, settingsData, notificationData] = await Promise.all([
  fetchUserData(),
  fetchSettings(),
  fetchNotifications(),
]);

console.log(userData);         // ユーザー情報
console.log(settingsData);     // 設定情報
console.log(notificationData); // 通知情報
```

[配列の分割代入](/posts/javascript-array-methods/)を使うと、結果を個別の変数に受け取れます。コードの可読性が上がるのでおすすめです。

## 具体的な使用例

### 複数のAPIを同時に呼ぶ

Webアプリでは、画面表示に必要なデータを複数のAPIから取得することがよくあります。

```javascript
// ダッシュボード画面のデータ取得
async function loadDashboard() {
  const [users, orders, analytics] = await Promise.all([
    fetch('/api/users').then(res => res.json()),
    fetch('/api/orders').then(res => res.json()),
    fetch('/api/analytics').then(res => res.json()),
  ]);

  // 3つのデータが揃ってから画面を描画
  renderDashboard({ users, orders, analytics });
}
```

[fetch API](/posts/javascript-fetch-api/)と組み合わせるパターンは実務で頻出します。

### 複数のファイルを同時に読み込む

Node.js環境では、複数ファイルの読み込みにも使えます。

```javascript
import { readFile } from 'fs/promises';

async function loadConfigs() {
  const [dbConfig, appConfig, envConfig] = await Promise.all([
    readFile('./config/database.json', 'utf-8'),
    readFile('./config/app.json', 'utf-8'),
    readFile('./config/env.json', 'utf-8'),
  ]);

  return {
    db: JSON.parse(dbConfig),
    app: JSON.parse(appConfig),
    env: JSON.parse(envConfig),
  };
}
```

### ユーザー情報と設定を同時に取得

ログイン後の初期化処理でよく使うパターンです。

```javascript
async function initializeApp(userId) {
  const [user, settings, permissions] = await Promise.all([
    fetchUser(userId),
    fetchUserSettings(userId),
    fetchUserPermissions(userId),
  ]);

  return {
    user,
    settings,
    permissions,
  };
}
```

3つのリクエストは互いに依存しないため、並列実行が適しています。

## Promise.allの挙動を理解する

### 全て成功した場合

すべてのPromiseが成功（resolve）すると、結果の配列が返ります。

```javascript
const results = await Promise.all([
  Promise.resolve('A'),
  Promise.resolve('B'),
  Promise.resolve('C'),
]);

console.log(results); // ['A', 'B', 'C']
```

配列の順番は、渡したPromiseの順番と同じです。完了した順番ではありません。

### 1つでも失敗した場合

1つでもPromiseが失敗（reject）すると、即座に全体がrejectされます。

```javascript
try {
  const results = await Promise.all([
    Promise.resolve('成功1'),
    Promise.reject(new Error('失敗!')),  // これが失敗
    Promise.resolve('成功2'),
  ]);
} catch (error) {
  console.error(error.message); // '失敗!'
  // 成功した結果は取得できない
}
```

これがPromise.allの重要な特徴です。「全部成功するか、1つでも失敗したら全体が失敗」という挙動になります。

## Promise.allSettledとの違い

Promise.allSettledは、すべてのPromiseが完了するまで待ちます。成功・失敗に関わらず、全結果を取得できます。

```javascript
const results = await Promise.allSettled([
  fetch('/api/users'),
  fetch('/api/posts'),    // これが失敗しても
  fetch('/api/comments'), // 他の結果も取得できる
]);

// 各結果にstatus（'fulfilled' or 'rejected'）が付く
results.forEach((result, index) => {
  if (result.status === 'fulfilled') {
    console.log(`リクエスト${index}: 成功`, result.value);
  } else {
    console.log(`リクエスト${index}: 失敗`, result.reason);
  }
});
```

### 使い分けの基準

| メソッド | 失敗時の挙動 | 使いどころ |
|---------|------------|-----------|
| `Promise.all` | 即座にreject | 全データが必須の場合 |
| `Promise.allSettled` | 全完了まで待つ | 部分的な失敗を許容する場合 |

「全部揃わないと意味がない」ならPromise.allを使います。「取れるものだけ取りたい」ならPromise.allSettledが適しています。

## Promise.raceとの違い

Promise.raceは、最初に完了した（成功 or 失敗）Promiseの結果だけを返します。

```javascript
// タイムアウト処理の実装例
async function fetchWithTimeout(url, timeoutMs) {
  const result = await Promise.race([
    fetch(url),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('タイムアウト')), timeoutMs)
    ),
  ]);
  return result;
}

// 3秒以内にレスポンスがなければタイムアウト
const response = await fetchWithTimeout('/api/data', 3000);
```

### 3つのメソッドの比較

| メソッド | 返す結果 | 主な用途 |
|---------|---------|---------|
| `Promise.all` | 全Promiseの結果配列 | 並列実行して全結果を取得 |
| `Promise.allSettled` | 全Promiseの状態と結果 | 失敗を許容して全結果を取得 |
| `Promise.race` | 最初に完了した1つ | タイムアウト処理 |

## エラーハンドリングのパターン

### 基本: try/catchで囲む

```javascript
async function loadData() {
  try {
    const [users, posts] = await Promise.all([
      fetchUsers(),
      fetchPosts(),
    ]);
    return { users, posts };
  } catch (error) {
    console.error('データ取得に失敗:', error.message);
    // フォールバック処理
    return { users: [], posts: [] };
  }
}
```

### 個別にエラーを処理する

各Promiseにcatchを付けると、個別にエラーハンドリングできます。

```javascript
async function loadDataSafely() {
  const [users, posts] = await Promise.all([
    fetchUsers().catch(err => {
      console.warn('ユーザー取得失敗:', err.message);
      return []; // デフォルト値を返す
    }),
    fetchPosts().catch(err => {
      console.warn('投稿取得失敗:', err.message);
      return []; // デフォルト値を返す
    }),
  ]);

  return { users, posts };
}
```

この方法なら、1つが失敗しても他の結果は取得できます。Promise.allSettledを使わずに部分的な失敗を許容するテクニックです。

### リトライ付きのパターン

```javascript
// リトライ関数
async function withRetry(fn, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === retries - 1) throw error;
      // 待機時間を徐々に増やす
      await new Promise(r => setTimeout(r, 1000 * (i + 1)));
    }
  }
}

// リトライ付きで並列実行
const [users, posts] = await Promise.all([
  withRetry(() => fetchUsers()),
  withRetry(() => fetchPosts()),
]);
```

## パフォーマンス比較: 直列 vs 並列

実際にどれくらい差が出るか、計測してみましょう。

```javascript
// 1秒かかるAPIを模擬
function slowAPI(name) {
  return new Promise(resolve => {
    setTimeout(() => resolve(`${name}の結果`), 1000);
  });
}

// 直列実行
async function sequential() {
  console.time('直列');
  const a = await slowAPI('API-1');
  const b = await slowAPI('API-2');
  const c = await slowAPI('API-3');
  console.timeEnd('直列'); // 約3000ms
  return [a, b, c];
}

// 並列実行
async function parallel() {
  console.time('並列');
  const [a, b, c] = await Promise.all([
    slowAPI('API-1'),
    slowAPI('API-2'),
    slowAPI('API-3'),
  ]);
  console.timeEnd('並列'); // 約1000ms
  return [a, b, c];
}
```

3つの独立した処理なら、並列実行で約3倍速くなります。API呼び出しが多いほど、この差は大きくなります。

ただし、注意点もあります。

- サーバーへの同時リクエスト数に制限がある場合がある
- 処理同士に依存関係がある場合は並列にできない
- 大量のPromiseを同時実行するとメモリを圧迫する可能性がある

## 実践的なコード例: fetch APIとの組み合わせ

実務でよく使うパターンをまとめます。

### 複数エンドポイントからデータ取得

```javascript
async function fetchMultipleEndpoints(endpoints) {
  const responses = await Promise.all(
    endpoints.map(url => fetch(url))
  );

  // レスポンスのステータスを確認
  for (const response of responses) {
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
  }

  // JSONに変換
  const data = await Promise.all(
    responses.map(res => res.json())
  );

  return data;
}

// 使用例
const [users, posts, tags] = await fetchMultipleEndpoints([
  'https://api.example.com/users',
  'https://api.example.com/posts',
  'https://api.example.com/tags',
]);
```

### 画像の一括プリロード

```javascript
// 画像を事前に読み込む
function preloadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`画像読み込み失敗: ${src}`));
    img.src = src;
  });
}

async function preloadAllImages(imageUrls) {
  try {
    const images = await Promise.all(
      imageUrls.map(url => preloadImage(url))
    );
    console.log(`${images.length}枚の画像を読み込みました`);
    return images;
  } catch (error) {
    console.error(error.message);
    return [];
  }
}
```

### データの一括更新

```javascript
async function updateMultipleRecords(records) {
  const results = await Promise.all(
    records.map(record =>
      fetch(`/api/records/${record.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(record),
      })
    )
  );

  // 全レスポンスが成功か確認
  const allSuccessful = results.every(res => res.ok);
  if (!allSuccessful) {
    throw new Error('一部のレコード更新に失敗しました');
  }

  return results;
}
```

## よくあるミスと注意点

### ミス1: awaitの付け忘れ

```javascript
// ❌ awaitを忘れるとPromiseオブジェクトが返る
const results = Promise.all([fetchUsers(), fetchPosts()]);
console.log(results); // Promise { <pending> }

// ✅ awaitを付ける
const results = await Promise.all([fetchUsers(), fetchPosts()]);
console.log(results); // [ユーザーデータ, 投稿データ]
```

### ミス2: 配列ではなく個別に渡す

```javascript
// ❌ 配列で渡していない
const results = await Promise.all(fetchUsers(), fetchPosts());
// TypeError: fetchPosts is not iterable

// ✅ 配列で渡す
const results = await Promise.all([fetchUsers(), fetchPosts()]);
```

Promise.allの引数は「Promiseの配列」です。配列リテラル `[]` で囲むのを忘れないようにしましょう。

### ミス3: 関数を呼び忘れる

```javascript
// ❌ 関数を呼んでいない（Promiseではなく関数が渡される）
const results = await Promise.all([fetchUsers, fetchPosts]);

// ✅ 関数を呼ぶ（()を付ける）
const results = await Promise.all([fetchUsers(), fetchPosts()]);
```

### ミス4: 依存関係のある処理を並列にする

```javascript
// ❌ userIdが必要なのに並列にしている
const [user, posts] = await Promise.all([
  fetchUser(),
  fetchPostsByUserId(user.id), // userがまだ取得できていない!
]);

// ✅ 依存関係がある場合は直列にする
const user = await fetchUser();
const posts = await fetchPostsByUserId(user.id);
```

処理同士に依存関係がある場合は、並列実行できません。[async/awaitの基本](/posts/javascript-async-await/)を押さえた上で、並列にできる部分を見極めましょう。

## FAQ

### Q. Promise.allに渡せるPromiseの数に上限はありますか？

JavaScript仕様上の上限はありません。ただし、数百〜数千のリクエストを同時に送ると、サーバーやブラウザの接続数制限に引っかかる場合があります。大量の処理を実行する場合は、バッチに分割して実行するのがおすすめです。

### Q. Promise.allの中で1つだけ遅い処理があるとどうなりますか？

全体の完了時間は、最も遅い処理に合わせられます。例えば3つのうち1つが5秒かかるなら、Promise.all全体も5秒かかります。速い処理が先に終わっても、全部揃うまで結果は返りません。

### Q. async/awaitを使わずにPromise.allを使えますか？

使えます。`.then()` チェーンでも利用可能です。

```javascript
Promise.all([fetchUsers(), fetchPosts()])
  .then(([users, posts]) => {
    console.log(users, posts);
  })
  .catch(error => {
    console.error(error);
  });
```

ただし、[async/await](/posts/javascript-async-await/)を使った方がコードが読みやすくなります。

### Q. Promise.allとPromise.allSettledはどちらを使うべきですか？

「全データが揃わないと処理を続行できない」場合はPromise.allを使います。「一部が失敗しても残りの結果を使いたい」場合はPromise.allSettledが適しています。例えば、ダッシュボードで複数のウィジェットを表示する場合、1つのデータ取得が失敗しても他は表示したいならPromise.allSettledを選びます。

### Q. for文の中でPromise.allを使っても大丈夫ですか？

大丈夫ですが、ループごとにPromise.allを呼ぶと直列実行になります。全体を並列にしたい場合は、mapで配列を作ってからPromise.allに渡しましょう。

```javascript
// ✅ 全ユーザーの処理を並列実行
const userIds = [1, 2, 3, 4, 5];
const results = await Promise.all(
  userIds.map(id => fetchUser(id))
);
```

## あわせて読みたい

- [async/awaitが分からない人へ ― 非同期処理を図解で理解](/posts/javascript-async-await/)
- [fetch APIの使い方 ― GETとPOSTリクエストの基本](/posts/javascript-fetch-api/)
