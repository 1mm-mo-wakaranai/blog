---
title: "CSSで中央揃えができない全ての人へ ― 2026年版の正解パターン"
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

中央揃えはCSSで最も検索される悩みの1つです。パターンごとに「これを使えばOK」という正解を整理しました。

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

`flexbox` は要素の配置を柔軟に制御できるCSSの仕組みです。中央揃えに限らず、レイアウト全般で使います。

`100vh` は「画面の高さ100%」という意味です。`vh` は viewport height の略。

## パターン4: gridを使う方法（最短コード）

flexboxよりさらに短く書けます。

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

`margin: auto` はブロック要素にしか効きません。`span` や `a` などのインライン要素には効かないので、`display: block` を追加するか、flexboxを使ってください。

## 結局どれを使えばいい？

迷ったらこれ：

```css
display: flex;
justify-content: center;
align-items: center;
```

この3行を覚えておけば、ほとんどの中央揃えは解決します。

## まとめと次のステップ

- テキストの中央揃え → `text-align: center`
- ブロック要素の水平中央 → `margin: auto`（幅の指定が必要）
- 上下左右ど真ん中 → `flexbox` か `grid`
- 効かないときは親要素の高さを確認

<!-- affiliate -->
## 関連リソース

CSS・Web開発をもっと学びたい方へ：

- [Web開発の入門書をAmazonで探す](https://YOUR-AFFILIATE-LINK/amazon-web)
<!-- /affiliate -->
