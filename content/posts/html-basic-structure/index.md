---
title: "【HTML】最低限のHTMLファイルの書き方 ― コピペで使えるテンプレート付き"
date: 2026-04-16
tags: ["HTML", "初心者向け"]
description: "HTMLファイルの基本構造を初心者向けに解説。コピペで使えるテンプレート付きで、最初の一歩を踏み出せます。"
draft: false
---

## この記事で解決すること

「HTMLを書いてみたいけど、何から始めればいいか分からない」

この記事では、HTMLファイルの最低限の構造と、コピペで使えるテンプレートを紹介します。

## HTMLとは

HTMLは、Webページの「骨組み」を作る言語です。ブラウザで見ているすべてのWebページは、HTMLで書かれています。

HTMLは「プログラミング言語」ではなく「マークアップ言語」です。計算や処理をするのではなく、「ここは見出し」「ここは段落」「ここは画像」と、コンテンツの構造を指定するだけです。

HTMLで作ったページの見た目を整えるにはCSSを使います。レイアウトの基本は[CSS Flexboxの解説記事](/posts/css-flexbox-beginner/)で紹介しています。

## 最低限のHTMLテンプレート

以下をコピペして、`index.html` というファイル名で保存してください。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>はじめてのWebページ</title>
</head>
<body>
  <h1>はじめてのWebページ</h1>
  <p>HTMLで作った最初のページです。</p>
</body>
</html>
```

保存したファイルをブラウザにドラッグ＆ドロップすると、Webページとして表示されます。

作ったHTMLファイルをインターネットに公開したい場合は、[GitHub Pagesを使ったデプロイ方法](/posts/github-pages-deploy/)が手軽でおすすめです。

## 各行の意味

### `<!DOCTYPE html>`

「このファイルはHTML5で書かれています」という宣言です。おまじないだと思ってください。必ず1行目に書きます。

### `<html lang="ja">`

HTMLの始まりを示すタグです。`lang="ja"` は「このページは日本語です」という意味。

### `<head>` の中身

ページの「裏方情報」を書く場所です。ブラウザの画面には表示されません。

- `<meta charset="UTF-8">` → 文字化けを防ぐ設定
- `<meta name="viewport" ...>` → スマホで見たときにちゃんと表示される設定
- `<title>` → ブラウザのタブに表示されるタイトル

### `<body>` の中身

ここに書いたものがブラウザに表示されます。

- `<h1>` → 一番大きい見出し
- `<p>` → 段落（普通の文章）

{{< ad >}}

## よく使うタグ一覧

```html
<!-- 見出し（h1が最大、h6が最小） -->
<h1>大見出し</h1>
<h2>中見出し</h2>
<h3>小見出し</h3>

<!-- 段落 -->
<p>これは段落です。</p>

<!-- リンク -->
<a href="https://example.com">リンクテキスト</a>

<!-- 画像 -->
<img src="photo.jpg" alt="写真の説明">

<!-- リスト -->
<ul>
  <li>項目1</li>
  <li>項目2</li>
  <li>項目3</li>
</ul>

<!-- 太字 -->
<strong>太字のテキスト</strong>

<!-- 改行 -->
<br>

<!-- 水平線 -->
<hr>
```

## 実践：自己紹介ページを作ってみよう

以下をコピペして `profile.html` として保存し、ブラウザで開いてみてください。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>自己紹介</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 600px;
      margin: 0 auto;
      padding: 2rem;
      background: #f5f5f5;
    }
    h1 { color: #333; }
    .card {
      background: white;
      padding: 1.5rem;
      border-radius: 10px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
  </style>
</head>
<body>
  <div class="card">
    <h1>自己紹介</h1>
    <p>名前：あなたの名前</p>
    <p>趣味：プログラミング学習</p>
    <h2>好きな技術</h2>
    <ul>
      <li>HTML / CSS</li>
      <li>Python</li>
      <li>JavaScript</li>
    </ul>
    <h2>リンク</h2>
    <a href="https://github.com">GitHub</a>
  </div>
</body>
</html>
```

`<style>` タグの中にCSSを書くと、見た目を変えられます。色やフォントを変えて遊んでみてください。

CSSで要素を中央に配置したいときは、[CSSの中央揃えパターン集](/posts/html-css-center/)が参考になります。また、レイアウトを本格的に組みたくなったら[CSS Gridの基本](/posts/css-grid-beginner/)も確認してみてください。

プログラミングを続けていると、HTMLと一緒にJavaScriptも使うようになります。データのやり取りには[JSON形式](/posts/json-what-is-it/)がよく使われるので、あわせて知っておくと理解が深まります。

## よくある質問（FAQ）

### Q: HTMLファイルはどのエディタで書けばいいですか？
A: VS Code（Visual Studio Code）がおすすめです。HTMLの入力補完やプレビュー機能が充実しています。[VS Codeの便利なショートカット](/posts/vscode-shortcuts-beginner/)を覚えると、さらに効率よく書けます。

### Q: HTMLだけでWebサイトは作れますか？
A: HTMLだけでもWebページは表示できますが、見た目を整えるにはCSSが必要です。さらに動きをつけたい場合はJavaScriptも使います。まずはHTMLの基本構造を理解してから、CSSに進むのがおすすめです。

### Q: `<div>` タグと `<span>` タグの違いは何ですか？
A: `<div>` はブロック要素で、前後に改行が入ります。セクションやグループを作るときに使います。`<span>` はインライン要素で、文中の一部分だけを囲むときに使います。たとえば文章の一部だけ色を変えたいときは `<span>` を使います。

### Q: HTMLのバージョンは気にする必要がありますか？
A: 現在は「HTML5」が標準です。`<!DOCTYPE html>` と書けばHTML5として扱われます。古いバージョンを意識する必要はほとんどありません。

### Q: HTMLファイルの拡張子は `.html` と `.htm` のどちらが正しいですか？
A: どちらでも動作しますが、`.html` を使うのが一般的です。現在のWebでは `.html` が標準的な拡張子として広く使われています。

## まとめ

- HTMLはWebページの「骨組み」を作る言語
- `<!DOCTYPE html>` `<html>` `<head>` `<body>` が基本構造
- `<head>` は裏方情報、`<body>` が表示される内容
- まずはテンプレートをコピペして、中身を変えてみる

---
### あわせて読みたい
- [CSSで中央揃えができないときの解決パターン集](/posts/html-css-center/)
- [JSONとは？5分で分かるデータ形式の基本](/posts/json-what-is-it/)

<!-- affiliate -->
## 関連リソース

Web開発をもっと学びたい方へ：

<!-- START MoshimoAffiliateEasyLink --><script type="text/javascript">(function(b,c,f,g,a,d,e){b.MoshimoAffiliateObject=a;b[a]=b[a]||function(){arguments.currentScript=c.currentScript||c.scripts[c.scripts.length-2];(b[a].q=b[a].q||[]).push(arguments)};c.getElementById(a)||(d=c.createElement(f),d.src=g,d.id=a,e=c.getElementsByTagName("body")[0],e.appendChild(d))})(window,document,"script","//dn.msmstatic.com/site/cardlink/bundle.js?20220329","msmaflink");msmaflink({"n":"1冊ですべて身につくHTML & CSSとWebデザイン入門講座","b":"","t":"","d":"https:\/\/thumbnail.image.rakuten.co.jp","c_p":"","p":[""],"u":{"u":"https:\/\/search.rakuten.co.jp\/search\/mall\/HTML%20CSS%20Web%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E5%85%A5%E9%96%80%E8%AC%9B%E5%BA%A7\/","t":"rakuten","r_v":""},"v":"2.1","b_l":[{"id":1,"u_tx":"楽天市場で見る","u_bc":"#f76956","u_url":"https:\/\/search.rakuten.co.jp\/search\/mall\/HTML%20CSS%20Web%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E5%85%A5%E9%96%80%E8%AC%9B%E5%BA%A7\/","a_id":5490814,"p_id":54,"pl_id":27059,"pc_id":54,"s_n":"rakuten","u_so":1},{"u_bc":"#f79256","u_tx":"Amazonで見る","u_url":"https:\/\/www.amazon.co.jp\/s\/ref=nb_sb_noss_1?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&url=search-alias%3Daps&field-keywords=1%E5%86%8A%E3%81%A7%E3%81%99%E3%81%B9%E3%81%A6%E8%BA%AB%E3%81%AB%E3%81%A4%E3%81%8FHTML%20CSS%20Web%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3%E5%85%A5%E9%96%80%E8%AC%9B%E5%BA%A7","s_n":"amazon","u_so":2,"a_id":5490817,"p_id":170,"pc_id":185,"pl_id":27060,"id":2}],"eid":"oMbfp","s":"s"});</script><div id="msmaflink-oMbfp">リンク</div><!-- MoshimoAffiliateEasyLink END -->
<!-- /affiliate -->
