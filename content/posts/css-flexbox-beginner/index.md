---
title: "【CSS】Flexboxが分からない人へ ― 図解で覚える基本パターン5つ"
date: 2026-04-23
draft: false
tags: ["CSS", "初心者向け", "Web制作"]
categories: ["Web制作"]
description: "CSS Flexboxの基本を図解で解説。横並び、中央寄せ、均等配置など、よく使う5パターンをコピペで使えるコード付きで紹介します。"
---

## この記事で解決すること

「Flexboxって便利らしいけど、何がどう動くのか分からない…」

CSSで要素を横に並べたい、中央に寄せたい。そんなときに使うのがFlexboxです。覚えるべきパターンは5つだけ。コピペで使えるコードと一緒に解説します。

なお、CSSの前提となるHTMLの書き方に不安がある方は、先に[HTMLの基本構造を理解しよう](/posts/html-basic-structure/)を読んでおくとスムーズです。

## Flexboxとは

Flexboxは、CSSで要素の配置を簡単にコントロールするための仕組みです。

従来は `float` や `inline-block` を使って横並びにしていましたが、Flexboxなら1行で実現できます。

```css
/* これだけで子要素が横並びになる */
.container {
  display: flex;
}
```

### 基本の考え方

Flexboxには「親要素（コンテナ）」と「子要素（アイテム）」の関係があります。

```html
<div class="container">  ← 親（display: flexを指定）
  <div class="item">A</div>  ← 子
  <div class="item">B</div>  ← 子
  <div class="item">C</div>  ← 子
</div>
```

親に `display: flex` を指定すると、子要素の並び方をコントロールできるようになります。

{{< ad >}}

## パターン1：横並び

最も基本的な使い方です。

```css
.container {
  display: flex;
}
```

```
変更前：        変更後：
┌───┐          ┌───┐┌───┐┌───┐
│ A │          │ A ││ B ││ C │
└───┘          └───┘└───┘└───┘
┌───┐
│ B │
└───┘
┌───┐
│ C │
└───┘
```

`display: flex` を指定するだけで、子要素が自動的に横並びになります。

## パターン2：中央寄せ（上下左右）

ページの真ん中にコンテンツを配置したいとき。

```css
.container {
  display: flex;
  justify-content: center;  /* 横方向の中央 */
  align-items: center;      /* 縦方向の中央 */
  height: 100vh;            /* 画面の高さいっぱい */
}
```

```
┌─────────────────────┐
│                     │
│                     │
│       ┌───┐         │
│       │ A │         │
│       └───┘         │
│                     │
│                     │
└─────────────────────┘
```

`justify-content` が横方向、`align-items` が縦方向の配置を決めます。この2つはセットで覚えましょう。

中央寄せにはFlexbox以外にもいくつかの方法があります。パターン別に整理した記事もあるので、あわせて参考にしてみてください。
👉 [HTML/CSSで「中央寄せ」する方法まとめ](/posts/html-css-center/)

## パターン3：均等配置（スペース均等）

ナビゲーションメニューなどで、要素を均等に配置したいとき。

```css
.container {
  display: flex;
  justify-content: space-between;
}
```

```
┌───┐          ┌───┐          ┌───┐
│ A │          │ B │          │ C │
└───┘          └───┘          └───┘
←──────────────────────────────→
```

`space-between` は最初と最後の要素を端に寄せて、残りを均等に配置します。

他にもよく使う値：
- `space-around` → 各要素の左右に均等なスペース
- `space-evenly` → すべての間隔が完全に均等

## パターン4：折り返し（レスポンシブ対応）

画面幅が狭くなったときに、自動で折り返したいとき。

```css
.container {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.item {
  width: 200px;
}
```

```
画面が広いとき：
┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐
│  A   │ │  B   │ │  C   │ │  D   │
└──────┘ └──────┘ └──────┘ └──────┘

画面が狭いとき：
┌──────┐ ┌──────┐
│  A   │ │  B   │
└──────┘ └──────┘
┌──────┐ ┌──────┐
│  C   │ │  D   │
└──────┘ └──────┘
```

`flex-wrap: wrap` を追加するだけで、入りきらない要素が自動で次の行に移動します。`gap` で要素間のスペースも指定できます。

より複雑な2次元レイアウト（行と列の両方を同時にコントロールしたい場合）には、CSS Gridという仕組みもあります。詳しくは[CSS Gridの基本を図解で解説した記事](/posts/css-grid-beginner/)をご覧ください。

## パターン5：1つだけ右寄せ

ヘッダーで「ロゴは左、メニューは右」のようなレイアウト。

```css
.container {
  display: flex;
  align-items: center;
}

.menu {
  margin-left: auto;
}
```

```html
<div class="container">
  <div class="logo">ロゴ</div>
  <nav class="menu">メニュー</nav>
</div>
```

```
┌──────────────────────────────┐
│ ロゴ                 メニュー │
└──────────────────────────────┘
```

`margin-left: auto` を使うと、その要素が右端に寄ります。Flexboxの中で `auto` マージンを使うテクニックは覚えておくと便利です。

## よく使うプロパティ一覧

### 親要素（コンテナ）に指定するもの

| プロパティ | 役割 | よく使う値 |
|---|---|---|
| `display` | Flexboxを有効化 | `flex` |
| `justify-content` | 横方向の配置 | `center`, `space-between` |
| `align-items` | 縦方向の配置 | `center`, `stretch` |
| `flex-wrap` | 折り返し | `wrap`, `nowrap` |
| `gap` | 要素間のスペース | `16px`, `1rem` |
| `flex-direction` | 並ぶ方向 | `row`, `column` |

### 子要素（アイテム）に指定するもの

| プロパティ | 役割 | よく使う値 |
|---|---|---|
| `flex-grow` | 余白を埋める比率 | `1` |
| `flex-shrink` | 縮む比率 | `0`（縮まない） |
| `flex-basis` | 基本サイズ | `200px`, `auto` |
| `align-self` | 個別の縦配置 | `center`, `flex-end` |

コードを書くときは、エディタのショートカットを活用すると効率が上がります。[VS Codeのショートカット10選](/posts/vscode-shortcuts-beginner/)も参考にしてみてください。

## 実践例：よくあるレイアウトをFlexboxで作る

### カード型レイアウト

ブログの記事一覧やECサイトの商品一覧でよく見るカード型レイアウトは、Flexboxの折り返しパターンで実現できます。

```css
.card-list {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
}

.card {
  flex-basis: calc(33.333% - 16px); /* 3列 */
  min-width: 250px; /* 狭い画面では自動で折り返し */
}
```

`flex-basis` と `min-width` を組み合わせることで、画面幅に応じて3列→2列→1列と自動で切り替わります。メディアクエリを書かなくてもレスポンシブ対応ができるのがFlexboxの強みです。

### フッターを画面下部に固定する

コンテンツが少ないページでもフッターを画面の一番下に表示したいケースがあります。

```css
body {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex-grow: 1; /* 残りのスペースをすべて占める */
}
```

`flex-direction: column` で縦方向に並べ、`flex-grow: 1` でメインコンテンツが残りの高さを埋めるようにします。

## よくあるミスと注意点

### `display: flex` を子要素に指定してしまう

Flexboxは**親要素**に `display: flex` を指定します。子要素に指定しても、その子要素の中身がFlexレイアウトになるだけで、意図した動きにはなりません。

### `gap` が効かない古いブラウザ

`gap` プロパティはFlexboxでは比較的新しいサポートです。IE11では動作しません。古いブラウザに対応する必要がある場合は、`margin` で代用してください。

```css
/* gap の代わりに margin を使う */
.item {
  margin: 8px;
}
.container {
  margin: -8px; /* 外側の余白を打ち消す */
}
```

### `flex-shrink` を忘れて要素がつぶれる

Flexboxの子要素はデフォルトで `flex-shrink: 1` が設定されています。つまり、スペースが足りないと自動的に縮みます。画像やアイコンなど、縮んでほしくない要素には `flex-shrink: 0` を指定しましょう。

## よくある質問（FAQ）

### Q: FlexboxとCSS Gridはどう使い分ければいいですか？
A: Flexboxは「1方向（横または縦）の並び」に向いています。ナビゲーションやボタンの横並びなどが典型例です。一方、CSS Gridは「2次元（行と列の両方）のレイアウト」に向いています。ページ全体のレイアウトや、行と列を同時にコントロールしたい場合はGridが適しています。迷ったら、まずFlexboxで試してみて、うまくいかなければGridを検討するのがおすすめです。

### Q: `justify-content` と `align-items` の違いが覚えられません。
A: `justify-content` は「主軸（メインの並び方向）」の配置、`align-items` は「交差軸（主軸と直角の方向）」の配置です。デフォルトでは主軸が横方向なので、`justify-content` が横、`align-items` が縦になります。`flex-direction: column` にすると主軸が縦になるため、役割が入れ替わる点に注意してください。

### Q: Flexboxで要素を縦並びにするにはどうすればいいですか？
A: `flex-direction: column` を親要素に指定します。これで子要素が縦方向に並びます。縦並びの中で中央寄せしたい場合は、`align-items: center`（横方向の中央）と `justify-content: center`（縦方向の中央）を使います。

### Q: IE11でFlexboxは使えますか？
A: IE11はFlexboxの基本的な機能に対応していますが、バグや未対応のプロパティがあります。特に `gap` プロパティはIE11では動作しません。2022年6月にIE11のサポートは終了しているため、新規プロジェクトではIE11対応を気にする必要はほぼありません。

### Q: `flex: 1` と書くのは何の省略形ですか？
A: `flex: 1` は `flex-grow: 1; flex-shrink: 1; flex-basis: 0%` の省略形です。「余ったスペースを均等に分け合う」という意味になります。複数の子要素に `flex: 1` を指定すると、すべて同じ幅になります。

## まとめ

- Flexboxは親に `display: flex` を指定するだけで始められる
- 横並び、中央寄せ、均等配置、折り返し、右寄せの5パターンでほぼ対応できる
- `justify-content`（横）と `align-items`（縦）はセットで覚える
- `flex-wrap: wrap` でレスポンシブ対応も簡単
- 迷ったらまずこの5パターンのどれに当てはまるか考える

---

### あわせて読みたい
- [HTML/CSSで「中央寄せ」する方法まとめ](/posts/html-css-center/)
- [HTMLの基本構造を理解しよう](/posts/html-basic-structure/)
- [VS Codeのショートカット10選](/posts/vscode-shortcuts-beginner/)

<!-- affiliate -->
## 関連リソース

CSS・Web制作をもっと学びたい方へ：

<!-- START MoshimoAffiliateEasyLink --><script type="text/javascript">(function(b,c,f,g,a,d,e){b.MoshimoAffiliateObject=a;b[a]=b[a]||function(){arguments.currentScript=c.currentScript||c.scripts[c.scripts.length-2];(b[a].q=b[a].q||[]).push(arguments)};c.getElementById(a)||(d=c.createElement(f),d.src=g,d.id=a,e=c.getElementsByTagName("body")[0],e.appendChild(d))})(window,document,"script","//dn.msmstatic.com/site/cardlink/bundle.js?20220329","msmaflink");msmaflink({"n":"1冊ですべて身につくHTML & CSSとWebデザイン入門講座","b":"","t":"","d":"https:\/\/thumbnail.image.rakuten.co.jp","c_p":"","p":[""],"u":{"u":"https:\/\/search.rakuten.co.jp\/search\/mall\/HTML%20CSS%20Web%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%20%E5%85%A5%E9%96%80%E8%AC%9B%E5%BA%A7\/","t":"rakuten","r_v":""},"v":"2.1","b_l":[{"id":1,"u_tx":"楽天市場で見る","u_bc":"#f76956","u_url":"https:\/\/search.rakuten.co.jp\/search\/mall\/HTML%20CSS%20Web%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%20%E5%85%A5%E9%96%80%E8%AC%9B%E5%BA%A7\/","a_id":5490814,"p_id":54,"pl_id":27059,"pc_id":54,"s_n":"rakuten","u_so":1},{"u_bc":"#f79256","u_tx":"Amazonで見る","u_url":"https:\/\/www.amazon.co.jp\/s\/ref=nb_sb_noss_1?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&url=search-alias%3Daps&field-keywords=HTML%20CSS%20Web%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E5%85%A5%E9%96%80%E8%AC%9B%E5%BA%A7","s_n":"amazon","u_so":2,"a_id":5490817,"p_id":170,"pc_id":185,"pl_id":27060,"id":2}],"eid":"bQ4nT","s":"s"});</script><div id="msmaflink-bQ4nT">リンク</div><!-- MoshimoAffiliateEasyLink END -->
<!-- /affiliate -->
