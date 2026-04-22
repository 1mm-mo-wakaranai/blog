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

中央揃えはCSSで最も検索される悩みの1つです。パターンごとに「これを使えばOK」という正解を整理しました。


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

---
### あわせて読みたい
- [最低限のHTMLファイルの書き方 ― コピペで使えるテンプレート付き](/posts/html-basic-structure/)
- [VS Code最初に覚えるべき設定とショートカット10選](/posts/vscode-shortcuts-beginner/)

<!-- affiliate -->
## 関連リソース

HTML/CSSをもっと学びたい方へ：

<!-- START MoshimoAffiliateEasyLink --><script type="text/javascript">(function(b,c,f,g,a,d,e){b.MoshimoAffiliateObject=a;b[a]=b[a]||function(){arguments.currentScript=c.currentScript||c.scripts[c.scripts.length-2];(b[a].q=b[a].q||[]).push(arguments)};c.getElementById(a)||(d=c.createElement(f),d.src=g,d.id=a,e=c.getElementsByTagName("body")[0],e.appendChild(d))})(window,document,"script","//dn.msmstatic.com/site/cardlink/bundle.js?20220329","msmaflink");msmaflink({"n":"これだけで基本がしっかり身につく HTML\/CSS&Webデザイン1冊目の本","b":"","t":"","d":"https:\/\/thumbnail.image.rakuten.co.jp","c_p":"","p":[""],"u":{"u":"https:\/\/search.rakuten.co.jp\/search\/mall\/HTML%20CSS%20Web%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%201%E5%86%8A%E7%9B%AE%E3%81%AE%E6%9C%AC\/","t":"rakuten","r_v":""},"v":"2.1","b_l":[{"id":1,"u_tx":"楽天市場で見る","u_bc":"#f76956","u_url":"https:\/\/search.rakuten.co.jp\/search\/mall\/HTML%20CSS%20Web%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%201%E5%86%8A%E7%9B%AE%E3%81%AE%E6%9C%AC\/","a_id":5490814,"p_id":54,"pl_id":27059,"pc_id":54,"s_n":"rakuten","u_so":1},{"u_bc":"#f79256","u_tx":"Amazonで見る","u_url":"https:\/\/www.amazon.co.jp\/s\/ref=nb_sb_noss_1?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&url=search-alias%3Daps&field-keywords=HTML%20CSS%20Web%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B31%E5%86%8A%E7%9B%AE%E3%81%AE%E6%9C%AC","s_n":"amazon","u_so":2,"a_id":5490817,"p_id":170,"pc_id":185,"pl_id":27060,"id":2}],"eid":"Ezfvt","s":"s"});</script><div id="msmaflink-Ezfvt">リンク</div><!-- MoshimoAffiliateEasyLink END -->
<!-- /affiliate -->
