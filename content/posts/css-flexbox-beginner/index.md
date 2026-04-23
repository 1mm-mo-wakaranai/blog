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
