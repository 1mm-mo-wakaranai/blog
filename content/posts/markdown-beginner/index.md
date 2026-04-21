---
title: "【初心者向け】Markdownとは？よく使う書き方10選"
date: 2026-04-21
tags: ["初心者向け", "開発環境"]
description: "Markdownとは何か、よく使う書き方を10個に絞って初心者向けに解説。README.mdやブログ記事を書くときに必須の知識です。"
draft: false
---

## この記事で解決すること

「README.mdって何？」「Markdownってどう書くの？」

GitHubやブログでよく使われるMarkdownの書き方を、よく使うものだけ10個に絞って解説します。

## Markdownとは

Markdownは、テキストに簡単な記号をつけるだけで、見出しや箇条書きなどの書式を表現できる書き方のルールです。

HTMLを書くより圧倒的に簡単で、GitHubのREADME、ブログ記事、ドキュメントなど、あらゆる場所で使われています。

## よく使う書き方10選

### 1. 見出し

```markdown
# 大見出し（h1）
## 中見出し（h2）
### 小見出し（h3）
```

`#` の数で見出しのレベルが変わります。

### 2. 太字・斜体

```markdown
**太字**
*斜体*
***太字＋斜体***
```

### 3. 箇条書き

```markdown
- 項目1
- 項目2
- 項目3
```

`-` の代わりに `*` でもOKです。

### 4. 番号付きリスト

```markdown
1. 最初にやること
2. 次にやること
3. 最後にやること
```

{{< ad >}}

### 5. リンク

```markdown
[表示テキスト](https://example.com)
```

例：`[Google](https://google.com)` → [Google](https://google.com)

### 6. 画像

```markdown
![代替テキスト](画像のURL)
```

### 7. コードブロック

````markdown
```python
print("Hello, World!")
```
````

言語名を指定すると、シンタックスハイライト（色分け）がつきます。

### 8. インラインコード

```markdown
`変数名` や `関数名` をこのように囲みます。
```

文中でコードを表示するときに使います。

### 9. 引用

```markdown
> これは引用文です。
> 他の人の言葉を引用するときに使います。
```

### 10. 水平線

```markdown
---
```

セクションの区切りに使います。

## どこで練習できる？

- GitHubでリポジトリを作って `README.md` を編集する
- VS Codeでプレビュー付きで書く（`Ctrl + Shift + V`）
- https://dillinger.io/ でブラウザ上で試す

## まとめ

- Markdownは「記号で書式を表現する」シンプルな書き方
- `#` で見出し、`**` で太字、`-` で箇条書き
- GitHubのREADMEやブログ記事で必須
- まずは10個だけ覚えれば十分

---

### あわせて読みたい
- [GitHubのアカウントを作ったけど何すればいい？](/posts/github-what-is-it/)
- [JSONとは？5分で分かるデータ形式の基本](/posts/json-what-is-it/)

<!-- affiliate -->
## 関連リソース

プログラミングをもっと学びたい方へ：

<!-- START MoshimoAffiliateEasyLink --><script type="text/javascript">(function(b,c,f,g,a,d,e){b.MoshimoAffiliateObject=a;b[a]=b[a]||function(){arguments.currentScript=c.currentScript||c.scripts[c.scripts.length-2];(b[a].q=b[a].q||[]).push(arguments)};c.getElementById(a)||(d=c.createElement(f),d.src=g,d.id=a,e=c.getElementsByTagName("body")[0],e.appendChild(d))})(window,document,"script","//dn.msmstatic.com/site/cardlink/bundle.js?20220329","msmaflink");msmaflink({"n":"実践Claude Code入門ー現場で活用するためのAIコーディングの思考法 [ 西見 公宏 ]","b":"","t":"","d":"https:\/\/thumbnail.image.rakuten.co.jp","c_p":"","p":["\/@0_mall\/book\/cabinet\/3540\/9784297153540_1_34.jpg"],"u":{"u":"https:\/\/item.rakuten.co.jp\/book\/18439208\/","t":"rakuten","r_v":""},"v":"2.1","b_l":[{"id":1,"u_tx":"楽天市場で見る","u_bc":"#f76956","u_url":"https:\/\/item.rakuten.co.jp\/book\/18439208\/","a_id":5490814,"p_id":54,"pl_id":27059,"pc_id":54,"s_n":"rakuten","u_so":1}],"eid":"a8XaY","s":"s"});</script><div id="msmaflink-a8XaY">リンク</div><!-- MoshimoAffiliateEasyLink END -->
<!-- /affiliate -->
