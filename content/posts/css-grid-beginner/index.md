---
title: "【CSS】Grid入門｜FlexboxとGridの使い分けが分かる"
date: 2026-04-24
tags: ["CSS", "Grid", "レイアウト", "初心者"]
description: "CSS Gridって結局いつ使うの？ Flexboxとの違いと基本的な使い方を、実際のコードで解説します。"
---

## この記事で分かること

CSS Gridの基本的な使い方と、Flexboxとの使い分けを理解できます。

「Flexboxは分かるけど、Gridはいつ使えばいいの？」という疑問を解消します。

## FlexboxとGridの違い

ざっくり言うと：

- **Flexbox** → 一方向（横並び or 縦並び）のレイアウト
- **Grid** → 二次元（縦横同時）のレイアウト

カードを横に並べるだけならFlexbox。ヘッダー・サイドバー・メイン・フッターのようなページ全体のレイアウトにはGridが向いています。

Flexboxの基本については[CSS Flexbox入門](/posts/css-flexbox-beginner/)で詳しく解説しています。まだ読んでいない方は先にそちらを確認しておくと、Gridとの違いがより明確になります。

## 手順

### ステップ1: 基本のGridを作る

まず、3列のグリッドを作ってみます。

```html
<div class="grid-container">
  <div class="item">1</div>
  <div class="item">2</div>
  <div class="item">3</div>
  <div class="item">4</div>
  <div class="item">5</div>
  <div class="item">6</div>
</div>
```

```css
/* 親要素にdisplay: gridを指定 */
.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr; /* 3等分 */
  gap: 16px; /* 要素間の余白 */
}

.item {
  background: #e0f2fe;
  padding: 24px;
  text-align: center;
  border-radius: 8px;
}
```

`grid-template-columns` で列の数と幅を指定します。`1fr` は「残りのスペースを均等に分ける」という意味です。fraction（分数）の略ですね。

これだけで、6つの要素が3列×2行に並びます。

### ステップ2: 列幅を変える

均等分割だけでなく、列ごとに幅を変えられます。

```css
/* サイドバー200px + メイン（残り全部） */
.grid-container {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 16px;
}
```

`px` と `fr` を混ぜて使えるのがGridの便利なところです。サイドバーは固定幅、メインは画面幅に合わせて伸縮します。

### ステップ3: repeat()で繰り返す

同じ幅の列をたくさん作るなら `repeat()` が便利です。

```css
/* 4列を均等に */
.grid-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}
```

`repeat(4, 1fr)` は `1fr 1fr 1fr 1fr` と同じ意味です。列数が多いときにコードがすっきりします。

### ステップ4: レスポンシブ対応

画面幅に応じて列数を自動調整するには `auto-fit` と `minmax()` を組み合わせます。

```css
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
}
```

これは「各列は最低250px、余裕があれば均等に広がる。入りきらなければ自動で折り返す」という意味です。メディアクエリなしでレスポンシブになります。

要素の中央揃えで困ったことがある方は、[CSSで中央揃えする方法まとめ](/posts/html-css-center/)も参考にしてください。Gridの `place-items: center` を使えば、縦横の中央揃えが1行で実現できます。

### ステップ5: ページレイアウトを組む

Gridの本領発揮です。ヘッダー・サイドバー・メイン・フッターのレイアウトを作ります。

```css
.page {
  display: grid;
  grid-template-columns: 240px 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  min-height: 100vh;
}

.header  { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main    { grid-area: main; }
.footer  { grid-area: footer; }
```

`grid-template-areas` で名前をつけてレイアウトを視覚的に定義できます。どこに何が配置されるか、CSSを見ただけで分かるのがGridの強みです。

HTMLの基本構造に不安がある方は、[HTMLの基本構造を理解する](/posts/html-basic-structure/)を先に読んでおくとスムーズです。

## 完成コード

コピペで動くページレイアウトの全体コードです。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CSS Grid レイアウト</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }

    .page {
      display: grid;
      grid-template-columns: 240px 1fr;
      grid-template-rows: auto 1fr auto;
      grid-template-areas:
        "header header"
        "sidebar main"
        "footer footer";
      min-height: 100vh;
      gap: 1px;
    }

    .header {
      grid-area: header;
      background: #1e293b;
      color: white;
      padding: 16px 24px;
    }

    .sidebar {
      grid-area: sidebar;
      background: #f1f5f9;
      padding: 16px;
    }

    .main {
      grid-area: main;
      padding: 24px;
    }

    .footer {
      grid-area: footer;
      background: #1e293b;
      color: white;
      padding: 16px 24px;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="page">
    <header class="header">ヘッダー</header>
    <aside class="sidebar">サイドバー</aside>
    <main class="main">メインコンテンツ</main>
    <footer class="footer">フッター</footer>
  </div>
</body>
</html>
```

## よくある質問（FAQ）

### Q: FlexboxとGridはどちらを先に覚えるべきですか？

A: Flexboxを先に覚えるのがおすすめです。Flexboxは一方向のレイアウトに特化しているため、理解しやすいです。Flexboxに慣れてから、二次元レイアウトが必要になったときにGridを学ぶとスムーズに理解できます。

### Q: GridとFlexboxを同時に使ってもいいですか？

A: はい、むしろ組み合わせて使うのが一般的です。ページ全体のレイアウトはGridで組み、各セクション内の要素の並びはFlexboxで制御する、という使い分けがよく行われます。

### Q: `fr` 単位と `%` の違いは何ですか？

A: `%` は親要素の幅に対する割合です。`fr` は `gap` などの固定サイズを差し引いた「残りのスペース」を分配する単位です。`gap` を使う場合、`%` だとはみ出すことがありますが、`fr` なら自動で調整されます。

### Q: Internet Explorerでも CSS Grid は使えますか？

A: IE11では部分的にしか対応していません。ただし、IE11は2022年にサポートが終了しているため、現在の開発では気にする必要はほぼありません。モダンブラウザ（Chrome、Firefox、Safari、Edge）ではすべて対応しています。

### Q: Grid レイアウトのデバッグ方法はありますか？

A: ChromeやFirefoxの開発者ツール（F12）にGrid専用のデバッグ機能があります。要素を選択すると、グリッド線やエリア名が視覚的に表示されます。レイアウトの確認に便利です。

## まとめと次のステップ

- **Flexbox** → 一方向の並び（ナビバー、カード横並び）
- **Grid** → 二次元のレイアウト（ページ全体、ダッシュボード）

迷ったら「行と列の両方を制御したいか？」で判断すると分かりやすいです。

次のステップとして、`grid-column` や `grid-row` で要素を複数セルにまたがらせる方法を試してみてください。

---
### あわせて読みたい
- [CSS Flexbox入門 ― 横並びレイアウトの基本](/posts/css-flexbox-beginner/)
- [CSSで中央揃えする方法まとめ](/posts/html-css-center/)

<!-- affiliate -->
## 関連リソース

📘 [Web開発の入門書をAmazonで探す](https://YOUR-AFFILIATE-LINK/amazon-web)

<!-- /affiliate -->
