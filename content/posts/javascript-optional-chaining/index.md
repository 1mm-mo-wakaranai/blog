---
title: "【JavaScript】?.と??の使い方 ― undefinedエラーをもう出さない"
date: 2026-06-10
tags: ["JavaScript", "ES2020", "初心者向け"]
description: "JavaScriptのオプショナルチェーン(?.)とNullish Coalescing(??)の使い方を初心者向けに解説。Cannot read properties of undefinedエラーの原因と対処法が分かります。"
draft: false
---

## この記事で分かること

{{< chat name="初心者ちゃん" icon="/images/rin-icon.png" direction="left" >}}
「Cannot read properties of undefined」ってエラーが出て動かないの…。何が原因か分からなくて泣きそう…
{{< /chat >}}

{{< chat name="全知全能くん" icon="/images/zenchi-icon.png" direction="right" >}}
それ、JavaScriptで一番よく見るエラーの1つだね。`?.` と `??` を使えば、このエラーをほぼゼロにできるよ。
{{< /chat >}}

この記事では、JavaScript ES2020で追加された**オプショナルチェーン（`?.`）**と**Nullish Coalescing（`??`）**の使い方を解説します。「Cannot read properties of undefined」エラーに悩まされている人は、この記事を読めば解決します。

---

## こんな場面で困っていませんか？

以下のコードを見てください。

```javascript
const user = {
  name: "田中",
  address: {
    city: "東京"
  }
};

// 正常に動く
console.log(user.address.city); // "東京"

// エラー！（addressがないユーザーの場合）
const user2 = { name: "佐藤" };
console.log(user2.address.city); // TypeError: Cannot read properties of undefined
```

APIから返ってきたデータにプロパティがないことはよくあります。そのたびに `if (user2.address)` とチェックするのは面倒ですよね。

**`?.` を使えば、この問題が1文字で解決します。**

{{< ad >}}

## 一言で説明すると

- `?.`（オプショナルチェーン）= 「存在すればアクセス、なければundefined」
- `??`（Nullish Coalescing）= 「nullかundefinedのときだけ代わりの値を使う」

この2つを組み合わせると、安全かつ簡潔にデータにアクセスできます。

## なぜ「Cannot read properties of undefined」が起きるのか

JavaScriptでは、`null` や `undefined` に対してプロパティアクセス（`.`）をすると即座にエラーになります。

```javascript
const data = undefined;
console.log(data.name); // TypeError!
```

これは「存在しないモノの中身を見ようとした」のが原因です。

APIレスポンスやDBのデータは、値があったりなかったりします。全てのプロパティが必ず存在する保証はありません。

```javascript
// APIから返ってきたユーザーデータ（住所が未登録の場合）
const apiResponse = {
  user: {
    name: "田中太郎",
    address: null  // ← 住所未登録
  }
};

// これはエラーになる
console.log(apiResponse.user.address.city);
// TypeError: Cannot read properties of null
```

## オプショナルチェーン `?.` の使い方

### 基本構文

```javascript
// 従来の書き方（冗長）
const city = user && user.address && user.address.city;

// ?.を使った書き方（簡潔）
const city = user?.address?.city;
```

`?.` は左側が `null` または `undefined` の場合、**エラーを出さずに `undefined` を返して止まります。**

### パターン1: プロパティアクセス

```javascript
const user = { name: "田中" };

// address が存在しなくても安全
console.log(user?.address?.city); // undefined（エラーにならない）
```

### パターン2: メソッド呼び出し

```javascript
const user = {
  name: "田中",
  greet() {
    return "こんにちは";
  }
};

// メソッドが存在すれば実行、なければundefined
console.log(user.greet?.()); // "こんにちは"
console.log(user.goodbye?.()); // undefined（エラーにならない）
```

### パターン3: 配列の要素アクセス

```javascript
const users = [{ name: "田中" }, { name: "佐藤" }];

// インデックスが範囲外でも安全
console.log(users?.[5]?.name); // undefined（エラーにならない）
```

### パターン4: ネストが深いオブジェクト

```javascript
// APIレスポンスの例
const response = {
  data: {
    user: {
      profile: {
        avatar: {
          url: "https://example.com/image.png"
        }
      }
    }
  }
};

// 従来: 地獄のif文
let url;
if (response && response.data && response.data.user 
    && response.data.user.profile && response.data.user.profile.avatar) {
  url = response.data.user.profile.avatar.url;
}

// ?.を使えば1行
const url = response?.data?.user?.profile?.avatar?.url;
```

エラー処理をif文で書いていた部分を`?.`で置き換える方法は、[JavaScriptのtry-catch入門](/posts/python-try-except-beginner/)の考え方にも通じます。

{{< chat name="初心者ちゃん" icon="/images/rin-icon.png" direction="left" >}}
あの長いif文が1行になるの…!? これはすごい…！
{{< /chat >}}

{{< chat name="全知全能くん" icon="/images/zenchi-icon.png" direction="right" >}}
可読性も上がるし、バグも減る。APIデータを扱うなら必須テクニックだよ。
{{< /chat >}}

## Nullish Coalescing `??` の使い方

### 基本構文

```javascript
// 「nullかundefinedのときだけ」右の値を使う
const value = data ?? "デフォルト値";
```

### `??` と `||` の違い（重要）

ここが最大のポイントです。

```javascript
const count = 0;

// || は「falsy」な値（0, "", false, null, undefined）で右を返す
console.log(count || 10); // 10 ← 0が無視される！

// ?? は「null/undefined」のときだけ右を返す
console.log(count ?? 10); // 0 ← 0は有効な値として扱われる
```

`||` を使うと、`0`（ゼロ）や `""`（空文字）も「値がない」扱いになってしまいます。`??` なら `null` と `undefined` だけを判定するので、意図しない上書きが起きません。

### 実践例: フォーム入力のデフォルト値

```javascript
// ユーザーが「0」と入力した場合
const inputAge = 0;

// || だと「0はfalsy」なのでデフォルト値に上書きされる
const age1 = inputAge || 20; // 20 ← バグ！ユーザーは0歳と入力したのに

// ?? なら「0は有効な値」として保持される
const age2 = inputAge ?? 20; // 0 ← 正しい
```

### 実践例: API設定のデフォルト値

```javascript
function fetchData(options) {
  const timeout = options?.timeout ?? 5000; // 未指定なら5秒
  const retries = options?.retries ?? 3;    // 未指定なら3回
  const cache = options?.cache ?? true;     // 未指定ならキャッシュ有効

  // timeout=0 も有効な値として扱われる（即座にタイムアウト）
  console.log({ timeout, retries, cache });
}

fetchData({ timeout: 0 }); // { timeout: 0, retries: 3, cache: true }
```

## `?.` と `??` を組み合わせる（最強パターン）

この2つを組み合わせると「安全にアクセスして、なければデフォルト値」が1行で書けます。

```javascript
// ユーザーの表示名を取得（なければ「匿名」）
const displayName = user?.profile?.nickname ?? "匿名";

// 設定値を取得（なければデフォルト）
const theme = config?.appearance?.theme ?? "light";

// 配列の最初の要素を取得（なければ空配列）
const firstItem = response?.data?.items?.[0] ?? null;
```

APIからデータを取得する処理全般については[Fetch APIの基本](/posts/javascript-fetch-api/)も参照してみてください。

## やってはいけないこと（初心者がやりがちなNG例）

### NG1: 全てに `?.` をつける

```javascript
// ❌ 過剰な使用（確実に存在するものにまでつける）
const name = user?.name; // userが必ず存在するなら不要

// ✅ 不確実な部分だけにつける
const city = user.address?.city; // addressがないかもしれない場合
```

**存在が保証されているプロパティに `?.` をつけると、バグを隠してしまう可能性があります。**「ここはnullになり得る」という箇所だけに使いましょう。

### NG2: `??` と `||` を混同する

```javascript
// ❌ 空文字やゼロを「値なし」として扱いたい場合は ||
const label = inputText ?? "デフォルト";
// "" が入ると空文字がそのまま使われる

// ✅ 空文字もデフォルトにしたい場合は ||
const label = inputText || "デフォルト";
```

**判断基準:**
- `null`/`undefined` だけ除外したい → `??`
- `0`, `""`, `false` も除外したい → `||`

### NG3: 代入の左辺に使う（これはOK）

```javascript
// 実はこれも書ける（ES2021のLogical Assignment）
const user = {};
user.profile ??= {}; // profileがnull/undefinedなら空オブジェクトを代入
user.profile.theme ??= "dark"; // themeがなければ"dark"を代入
```

## 筆者がハマったポイント

筆者が実務で `?.` を使い始めたとき、最初にハマったのは**TypeScriptとの組み合わせ**でした。

```typescript
// TypeScriptでは型が string | undefined になる
const city = user?.address?.city;
// city の型: string | undefined

// ?? で確定させれば string になる
const city = user?.address?.city ?? "未設定";
// city の型: string
```

TypeScriptを使っている場合、`?.` だけだと型が `T | undefined` になるので、`??` でデフォルト値を指定して型を確定させるパターンが多いです。

もう1つハマったのは**短絡評価の挙動**です。

```javascript
const obj = null;
console.log(obj?.a.b.c); // undefined（aでエラーにならない！）
```

`?.` の左が `null`/`undefined` だった時点で**右側は一切評価されません**。`obj?.a.b.c` は `obj` が `null` なので `.a.b.c` の部分は実行されず、安全に `undefined` が返ります。

## ブラウザ・Node.js対応状況

| 環境 | 対応バージョン |
|------|---------------|
| Chrome | 80以降 |
| Firefox | 72以降 |
| Safari | 13.1以降 |
| Edge | 80以降 |
| Node.js | 14以降 |

2026年現在、主要ブラウザは全て対応しています。IE11のサポートが必要な場合を除き、安心して使えます（IE11は2022年にサポート終了済み）。

## よくある質問（FAQ）

### Q: `?.` はReactでも使えますか？
A: はい。React（JSX）の中でも普通に使えます。APIから取得したstateの表示で特に重宝します。

```jsx
// Reactコンポーネントでの使用例
const UserProfile = ({ user }) => (
  <div>
    <p>{user?.name ?? "名前未設定"}</p>
    <p>{user?.address?.city ?? "住所未登録"}</p>
  </div>
);
```

### Q: `?.` を使うとパフォーマンスは落ちますか？
A: 体感できる差はありません。内部的にはif文と同じ処理なので、パフォーマンスの心配は不要です。

### Q: Pythonにも同じような機能はありますか？
A: Pythonには `?.` に相当する構文はありません。代わりに `getattr(obj, 'prop', default)` や `dict.get('key', default)` を使います。

### Q: Vue.jsのテンプレート内でも使えますか？
A: はい。Vue 3のテンプレート内で `{{ user?.name }}` のように使えます。Vue 2では使えないので注意してください。

{{< chat name="初心者ちゃん" icon="/images/rin-icon.png" direction="left" >}}
ReactでもVueでも使えるんだね！さっそくAPIからデータ取ってくるところで使ってみる！
{{< /chat >}}

{{< chat name="全知全能くん" icon="/images/zenchi-icon.png" direction="right" >}}
APIレスポンスを扱う部分は `?.` の出番が多いから、まずそこから書き換えてみるといいよ。コードが見違えるほどスッキリするはず。
{{< /chat >}}

## まとめ

- `?.`（オプショナルチェーン）は「nullかundefinedなら止まってundefinedを返す」演算子
- `??`（Nullish Coalescing）は「nullかundefinedのときだけデフォルト値を使う」演算子
- `||` との違い: `??` は `0` や `""` を有効な値として扱う
- APIレスポンスやネストの深いオブジェクトで特に便利
- 「必ず存在する」プロパティには使わない（バグを隠さないため）
- 2026年現在、全主要ブラウザ・Node.js 14+で対応済み

---
### あわせて読みたい
- [【図解】JavaScriptのイベントループとは？非同期処理の実行順序を理解する](/posts/javascript-event-loop/)
- [JavaScriptのFetch APIの使い方 ― GETとPOSTを実例で解説](/posts/javascript-fetch-api/)
