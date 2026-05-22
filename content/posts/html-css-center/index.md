---
title: "【CSS】中央揃えができないときの解決パターン集 ― 2026年版"
date: 2026-04-12
tags: ["CSS", "HTML", "初心者向け"]
description: "CSSで要素を中央揃えにする方法を、パターン別に整理しました。コピペで使えるコード付き。"
draft: false
---

## この記事で解決すること

CSSで何かを「真ん中に置きたい」だけなのに、なぜかうまくいかない。

```css
text-align: center;  /* 効かない… */
margin: auto;         /* これも効かない… */
```

中央揃えはCSSで最も検索される悩みの1つです。パターンごとに「これを使えばOK」という正解を整理しました。HTMLの基本構造がまだ不安な方は、[最低限のHTMLファイルの書き方 ― コピペで使えるテンプレート付き](/posts/html-basic-structure/)を先に確認しておくと理解しやすくなります。


{{< ad >}}

## パターン1: テキストを中央揃え

```html
<p class="center-text">このテキストを中央に</p>
```

```css
.center-text {
  text-align: center;
}
```

これは素直に動きます。テキストや `inline` 要素（画像など）の水平方向の中央揃えはこれでOK。

## パターン2: ブロック要素を水平方向に中央揃え

`div` などのブロック要素を中央に置きたい場合。

```html
<div class="center-box">中央に置きたいボックス</div>
```

```css
.center-box {
  width: 300px;        /* 幅の指定が必要 */
  margin-left: auto;
  margin-right: auto;
}
```

ポイントは `width` を指定すること。幅が決まっていないと `margin: auto` は効きません。

ブロック要素とは、`div` や `p` のように横幅いっぱいに広がる要素のことです。

## パターン3: 上下左右ど真ん中（最も使う）

ページやコンテナの中で、要素を完全に中央に置きたい場合。2026年の正解はこれです。

```html
<div class="container">
  <div class="centered">ど真ん中</div>
</div>
```

```css
.container {
  display: flex;
  justify-content: center;  /* 水平方向 */
  align-items: center;      /* 垂直方向 */
  height: 100vh;            /* 画面の高さいっぱい */
}
```

`flexbox` は要素の配置を柔軟に制御できるCSSの仕組みです。中央揃えに限らず、レイアウト全般で使います。詳しくは[CSS Flexbox入門](/posts/css-flexbox-beginner/)で解説しています。

`100vh` は「画面の高さ100%」という意味です。`vh` は viewport height の略。

## パターン4: gridを使う方法（最短コード）

flexboxよりさらに短く書けます。CSS Gridについては[CSS Grid入門](/posts/css-grid-beginner/)で詳しく解説しています。

```css
.container {
  display: grid;
  place-items: center;
  height: 100vh;
}
```

`place-items: center` の1行で上下左右中央揃えが完了します。

## よくある「効かない」原因

### 高さが指定されていない

垂直方向の中央揃えは、親要素に高さがないと効きません。

```css
/* NG: 高さがないので垂直方向の中央揃えが効かない */
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  /* height がない */
}

/* OK */
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;  /* または具体的な高さ */
}
```

### margin: auto が効かない

`margin: auto` はブロック要素にしか効きません。`span` や `a` などのインライン要素には効かないので、`display: block` を追加するか、flexboxを使ってください。作ったページを公開したい場合は、[GitHub Pagesで無料でサイトを公開する方法](/posts/github-pages-deploy/)も参考にしてみてください。

## 結局どれを使えばいい？

迷ったらこれ：

```css
display: flex;
justify-content: center;
align-items: center;
```

この3行を覚えておけば、ほとんどの中央揃えは解決します。

## よくある質問（FAQ）

### Q: `text-align: center` と `margin: auto` の違いは何ですか？

A: `text-align: center` はテキストやインライン要素を水平方向に中央揃えします。`margin: auto` はブロック要素（`div` など）を水平方向に中央揃えします。対象となる要素の種類が異なるので、使い分けが必要です。

### Q: `vertical-align: middle` で垂直方向の中央揃えができないのはなぜですか？

A: `vertical-align` はインライン要素やテーブルセル内でしか効きません。ブロック要素の垂直中央揃えには `flexbox` の `align-items: center` か `grid` の `place-items: center` を使ってください。

### Q: flexboxとgridのどちらを使えばいいですか？

A: 中央揃えだけが目的なら、`grid` + `place-items: center` が最短コードです。中央揃え以外のレイアウト（横並び、間隔調整など）も必要な場合は `flexbox` が柔軟に対応できます。

### Q: 画像を中央揃えにするにはどうすればいいですか？

A: `img` タグはインライン要素なので、親要素に `text-align: center` を指定するか、`img` に `display: block` と `margin: auto` を指定します。flexboxを使う方法もあります。

### Q: レスポンシブデザインで中央揃えが崩れます。どうすればいいですか？

A: `width` を固定値（px）ではなく `max-width` と `%` で指定すると、画面サイズに応じて調整されます。flexboxやgridを使っていれば、基本的にレスポンシブでも中央揃えは維持されます。

## まとめと次のステップ

- テキストの中央揃え → `text-align: center`
- ブロック要素の水平中央 → `margin: auto`（幅の指定が必要）
- 上下左右ど真ん中 → `flexbox` か `grid`
- 効かないときは親要素の高さを確認

---
### あわせて読みたい
- [最低限のHTMLファイルの書き方 ― コピペで使えるテンプレート付き](/posts/html-basic-structure/)
- [VS Code最初に覚えるべき設定とショートカット10選](/posts/vscode-shortcuts-beginner/)


