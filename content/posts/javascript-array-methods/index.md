---
title: "【JavaScript】配列メソッド入門｜map・filter・reduceの使い方"
date: 2026-04-24
tags: ["JavaScript", "配列", "初心者", "メソッド"]
description: "for文を卒業したい人へ。map、filter、reduceの違いと使いどころを実例で解説します。"
---

## この記事で分かること

JavaScriptの配列メソッド `map`、`filter`、`reduce` の使い方が分かります。

「for文で書けるけど、もっとスマートに書きたい」という人向けです。[TypeScriptを始めるべき理由](/posts/typescript-beginner/)を読んでおくと、型付きの配列操作も理解しやすくなります。

## 前提知識

- 配列（`[1, 2, 3]`）が何か分かる
- アロー関数（`() => {}`）を見たことがある

分からなくても、コード例を見れば雰囲気はつかめます。APIから取得した[JSONデータ](/posts/json-what-is-it/)を配列メソッドで処理する場面も多いので、あわせて知っておくと実践で役立ちます。

## 手順

### ステップ1: map — 全要素を変換する

`map` は配列の各要素に処理を適用して、新しい配列を返します。

```javascript
const prices = [100, 200, 300];

// 全商品を10%値上げ
const newPrices = prices.map((price) => price * 1.1);

console.log(newPrices); // [110, 220, 330]
```

元の配列 `prices` は変更されません。新しい配列が返ってくるのがポイントです。

for文で書くとこうなります：

```javascript
// for文バージョン（同じ結果）
const newPrices = [];
for (let i = 0; i < prices.length; i++) {
  newPrices.push(prices[i] * 1.1);
}
```

`map` の方がやりたいことが一目で分かりますよね。

### ステップ2: filter — 条件に合う要素だけ取り出す

`filter` は条件を満たす要素だけを集めた新しい配列を返します。

```javascript
const scores = [45, 82, 67, 93, 31, 78];

// 60点以上だけ取り出す
const passed = scores.filter((score) => score >= 60);

console.log(passed); // [82, 67, 93, 78]
```

コールバック関数が `true` を返した要素だけが残ります。コールバック関数やアロー関数の書き方に慣れていない方は、[async/awaitが分からない人へ ― 非同期処理を図解で理解](/posts/javascript-async-await/)でも関数の基本に触れています。

実務でよく使うパターン：

```javascript
const users = [
  { name: "田中", active: true },
  { name: "佐藤", active: false },
  { name: "鈴木", active: true },
];

// アクティブなユーザーだけ取得
const activeUsers = users.filter((user) => user.active);

console.log(activeUsers);
// [{ name: "田中", active: true }, { name: "鈴木", active: true }]
```

### ステップ3: reduce — 配列を1つの値にまとめる

`reduce` は配列の全要素を処理して、1つの値にまとめます。合計値を出すのが典型的な使い方です。

```javascript
const numbers = [10, 20, 30, 40];

// 合計を計算
const total = numbers.reduce((sum, num) => sum + num, 0);

console.log(total); // 100
```

第1引数の `sum` が「これまでの累積値」、第2引数の `num` が「今の要素」です。最後の `0` は初期値です。

処理の流れ：
1. `sum = 0, num = 10` → `0 + 10 = 10`
2. `sum = 10, num = 20` → `10 + 20 = 30`
3. `sum = 30, num = 30` → `30 + 30 = 60`
4. `sum = 60, num = 40` → `60 + 40 = 100`

### ステップ4: 組み合わせて使う

これらのメソッドはチェーン（連結）できます。

```javascript
const products = [
  { name: "りんご", price: 150, inStock: true },
  { name: "バナナ", price: 100, inStock: true },
  { name: "みかん", price: 200, inStock: false },
  { name: "ぶどう", price: 350, inStock: true },
];

// 在庫ありの商品の合計金額
const total = products
  .filter((p) => p.inStock)       // 在庫ありだけ
  .map((p) => p.price)            // 価格だけ取り出す
  .reduce((sum, price) => sum + price, 0); // 合計

console.log(total); // 600
```

上から下に読むだけで「何をしているか」が分かります。APIから取得したデータに対してこのようなチェーン処理を行うことも多いです。APIからのデータ取得については[fetch APIが分からない人へ ― APIからデータを取得する基本](/posts/javascript-fetch-api/)で解説しています。

### ステップ5: その他の便利メソッド

よく使うものをまとめておきます。

```javascript
const nums = [1, 2, 3, 4, 5];

// find — 条件に合う最初の1つを返す
const found = nums.find((n) => n > 3);
console.log(found); // 4

// some — 1つでも条件を満たせばtrue
const hasLarge = nums.some((n) => n > 4);
console.log(hasLarge); // true

// every — 全部が条件を満たせばtrue
const allPositive = nums.every((n) => n > 0);
console.log(allPositive); // true

// includes — 特定の値が含まれるか
const has3 = nums.includes(3);
console.log(has3); // true
```

## 使い分け早見表

| やりたいこと | メソッド |
|---|---|
| 全要素を変換したい | `map` |
| 条件で絞り込みたい | `filter` |
| 1つの値にまとめたい | `reduce` |
| 条件に合う最初の1つ | `find` |
| 1つでも条件を満たすか | `some` |
| 全部が条件を満たすか | `every` |

## よくある質問（FAQ）

### Q: `map` と `forEach` の違いは何ですか？

A: `map` は新しい配列を返しますが、`forEach` は何も返しません（`undefined`）。変換した結果を使いたい場合は `map`、単に各要素に対して処理を実行したいだけなら `forEach` を使います。

### Q: `reduce` の初期値は省略できますか？

A: 省略すると配列の最初の要素が初期値になります。ただし、空配列で `reduce` を呼ぶとエラーになるため、初期値は常に指定しておくのが安全です。

### Q: 配列メソッドをチェーンすると処理が遅くなりませんか？

A: 配列を何度もループするため、数万件以上のデータでは `for` 文の方が速い場合があります。ただし、通常のWebアプリで扱うデータ量であれば、体感できるほどの差はありません。可読性を優先して問題ありません。

### Q: `find` と `filter` の違いは何ですか？

A: `find` は条件に合う最初の1つだけを返します。`filter` は条件に合うすべての要素を配列で返します。1つだけ欲しい場合は `find`、複数欲しい場合は `filter` を使い分けてください。

### Q: 元の配列を変更する（破壊的な）メソッドはどれですか？

A: `push`、`pop`、`splice`、`sort`、`reverse` などは元の配列を変更します。一方、`map`、`filter`、`reduce`、`find`、`slice` は元の配列を変更せず、新しい値を返します。意図しない変更を防ぐため、非破壊的なメソッドを優先して使うのがおすすめです。

## まとめと次のステップ

- `map` → 変換（元の配列と同じ長さの新配列）
- `filter` → 絞り込み（条件に合う要素だけの新配列）
- `reduce` → 集約（配列を1つの値に）

まずは普段 for文で書いている処理を `map` や `filter` に置き換えてみてください。コードが短くなるだけでなく、意図が伝わりやすくなります。

<!-- affiliate -->
## 関連リソース

📘 [JavaScriptの入門書をAmazonで探す](https://YOUR-AFFILIATE-LINK/amazon-js)

📚 [Udemyで学ぶ](https://YOUR-AFFILIATE-LINK/udemy)

<!-- /affiliate -->
