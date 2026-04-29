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

HTMLを書くより圧倒的に簡単で、GitHubのREADME、ブログ記事、ドキュメントなど、あらゆる場所で使われています。[HTMLの基本構造](/posts/html-basic-structure/)を知っていると、Markdownがどれだけ手軽かが実感できます。

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

GitHubのREADMEでは、コードブロックを使ってインストール手順やコマンドを見やすく表示するのが一般的です。

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

- [GitHubでリポジトリを作って](/posts/github-what-is-it/) `README.md` を編集する
- VS Codeでプレビュー付きで書く（`Ctrl + Shift + V`）。[VS Codeのショートカット](/posts/vscode-shortcuts-beginner/)を覚えると効率が上がります
- https://dillinger.io/ でブラウザ上で試す

## Markdownの活用シーン

Markdownは開発のさまざまな場面で使われています。

### GitHubのREADME

リポジトリのトップに表示される `README.md` は、プロジェクトの説明書です。[GitHubの使い方](/posts/github-what-is-it/)を学ぶと、READMEの書き方がより実践的に理解できます。

### プルリクエストやIssue

GitHubの[プルリクエストやIssue](/posts/git-branch-beginner/)でもMarkdownが使えます。コードブロックやチェックリストを使って、分かりやすいレビューコメントが書けます。

### 技術ブログ

多くのブログプラットフォーム（Zenn、Qiita、Hugo、Gatsbyなど）がMarkdownに対応しています。一度書き方を覚えれば、どのプラットフォームでも使えるのが強みです。

### ドキュメント・メモ

Notion、Obsidian、HackMDなどのツールでもMarkdownが使えます。日常的なメモや議事録にも活用できます。

## よくある質問（FAQ）

### Q: MarkdownとHTMLはどちらを覚えるべきですか？
A: 用途が違うので、両方知っておくと便利です。Markdownはドキュメントやブログ記事を手軽に書くためのもの、[HTMLはWebページの構造を作る](/posts/html-basic-structure/)ためのものです。Markdownの方が覚えることが少ないので、先にMarkdownから始めるのがおすすめです。

### Q: Markdownで表（テーブル）は作れますか？
A: はい、作れます。`|` と `-` を使って表を作ります。たとえば `| 項目 | 値 |` のように書きます。ただし、複雑な表はHTMLで書いた方が見やすい場合もあります。

### Q: Markdownのプレビューがうまく表示されません。なぜですか？
A: 記号の前後にスペースが必要な場合があります。たとえば `#見出し` ではなく `# 見出し` のように、`#` の後にスペースを入れてください。また、箇条書きの `-` の後にもスペースが必要です。

### Q: Markdownファイルの拡張子は `.md` と `.markdown` のどちらですか？
A: どちらでも認識されますが、`.md` が一般的です。GitHubでも `.md` が標準的に使われています。

### Q: Markdownで画像のサイズを指定できますか？
A: 標準のMarkdownでは画像サイズの指定はできません。サイズを変えたい場合は、HTMLの `<img>` タグを直接書くか、使っているプラットフォーム独自の拡張記法を使います。

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

技術文書の書き方をもっと学びたい方へ：

<!-- START MoshimoAffiliateEasyLink --><script type="text/javascript">(function(b,c,f,g,a,d,e){b.MoshimoAffiliateObject=a;b[a]=b[a]||function(){arguments.currentScript=c.currentScript||c.scripts[c.scripts.length-2];(b[a].q=b[a].q||[]).push(arguments)};c.getElementById(a)||(d=c.createElement(f),d.src=g,d.id=a,e=c.getElementsByTagName("body")[0],e.appendChild(d))})(window,document,"script","//dn.msmstatic.com/site/cardlink/bundle.js?20220329","msmaflink");msmaflink({"n":"技術者のためのテクニカルライティング入門講座","b":"","t":"","d":"https:\/\/thumbnail.image.rakuten.co.jp","c_p":"","p":[""],"u":{"u":"https:\/\/search.rakuten.co.jp\/search\/mall\/%E3%83%86%E3%82%AF%E3%83%8B%E3%82%AB%E3%83%AB%E3%83%A9%E3%82%A4%E3%83%86%E3%82%A3%E3%83%B3%E3%82%B0%20%E5%85%A5%E9%96%80\/","t":"rakuten","r_v":""},"v":"2.1","b_l":[{"id":1,"u_tx":"楽天市場で見る","u_bc":"#f76956","u_url":"https:\/\/search.rakuten.co.jp\/search\/mall\/%E3%83%86%E3%82%AF%E3%83%8B%E3%82%AB%E3%83%AB%E3%83%A9%E3%82%A4%E3%83%86%E3%82%A3%E3%83%B3%E3%82%B0%20%E5%85%A5%E9%96%80\/","a_id":5490814,"p_id":54,"pl_id":27059,"pc_id":54,"s_n":"rakuten","u_so":1},{"u_bc":"#f79256","u_tx":"Amazonで見る","u_url":"https:\/\/www.amazon.co.jp\/s\/ref=nb_sb_noss_1?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&url=search-alias%3Daps&field-keywords=%E6%8A%80%E8%A1%93%E8%80%85%E3%81%AE%E3%81%9F%E3%82%81%E3%81%AE%E3%83%86%E3%82%AF%E3%83%8B%E3%82%AB%E3%83%AB%E3%83%A9%E3%82%A4%E3%83%86%E3%82%A3%E3%83%B3%E3%82%B0%E5%85%A5%E9%96%80%E8%AC%9B%E5%BA%A7","s_n":"amazon","u_so":2,"a_id":5490817,"p_id":170,"pc_id":185,"pl_id":27060,"id":2}],"eid":"AycaQ","s":"s"});</script><div id="msmaflink-AycaQ">リンク</div><!-- MoshimoAffiliateEasyLink END -->
<!-- /affiliate -->
