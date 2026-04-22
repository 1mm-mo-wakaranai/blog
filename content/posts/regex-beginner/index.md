---
title: "【初心者向け】正規表現とは？よく使うパターン7選"
date: 2026-04-22
tags: ["初心者向け", "開発環境"]
description: "正規表現とは何か、よく使うパターンを7つに絞って初心者向けに解説。検索・置換が劇的に楽になります。"
draft: false
---

## この記事で解決すること

「正規表現って何？難しそう…」

正規表現は「文字のパターンを指定する書き方」です。よく使う7パターンだけ覚えれば、検索や置換が劇的に楽になります。

## 正規表現とは

正規表現（Regular Expression、略してregex）は、「こういうパターンの文字列を探して」と指定するための書き方です。

例えば「メールアドレスっぽい文字列を全部探して」「電話番号の形式になっているものだけ抽出して」といったことができます。

{{< ad >}}

## よく使うパターン7選

### 1. `.`（任意の1文字）

```
a.c → abc, adc, a1c, a c にマッチ
```

`.` はどんな文字でも1文字にマッチします。

### 2. `*`（0回以上の繰り返し）

```
ab*c → ac, abc, abbc, abbbc にマッチ
```

直前の文字が0回以上繰り返されるパターンにマッチします。

### 3. `+`（1回以上の繰り返し）

```
ab+c → abc, abbc, abbbc にマッチ（acにはマッチしない）
```

`*` と似ていますが、最低1回は必要です。

### 4. `\d`（数字1文字）

```
\d\d\d → 123, 456, 789 にマッチ
```

`\d` は0〜9の数字1文字にマッチします。

### 5. `[]`（文字クラス）

```
[abc] → a, b, c のどれか1文字にマッチ
[0-9] → 0〜9の数字にマッチ（\dと同じ）
[a-z] → 小文字のアルファベットにマッチ
```

### 6. `^` と `$`（行頭と行末）

```
^Hello → 行頭が「Hello」で始まる行にマッチ
world$ → 行末が「world」で終わる行にマッチ
```

### 7. `()`（グループ化）

```
(abc)+ → abc, abcabc, abcabcabc にマッチ
```

複数の文字をまとめて繰り返しの対象にできます。

## 実践例

### メールアドレスを探す

```
[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}
```

複雑に見えますが、分解すると：
- `[a-zA-Z0-9._%+-]+` → @の前の部分
- `@` → @マーク
- `[a-zA-Z0-9.-]+` → ドメイン名
- `\.[a-zA-Z]{2,}` → .com や .jp の部分

### 電話番号を探す

```
0\d{1,4}-\d{1,4}-\d{4}
```

- `0` → 最初の0
- `\d{1,4}` → 1〜4桁の数字
- `-` → ハイフン

### 空白行を削除する（VS Codeの置換）

検索：`^\s*$\n`
置換：（空欄）

## どこで使えるか

- **VS Code** → `Ctrl + H` で置換、正規表現ボタンをオン
- **Excel** → VBAで使える
- **Python** → `re` モジュール
- **JavaScript** → `RegExp` オブジェクト
- **grep** → ターミナルでのファイル検索

## まとめ

- 正規表現は「文字のパターンを指定する書き方」
- `.` `*` `+` `\d` `[]` `^$` `()` の7つを覚えれば十分
- VS Codeの検索・置換で使うのが一番手軽
- 最初は簡単なパターンから試してみる

---

### あわせて読みたい
- [VS Codeの最初に覚えるべき設定とショートカット10選](/posts/vscode-shortcuts-beginner/)
- [Markdownとは？よく使う書き方10選](/posts/markdown-beginner/)

<!-- affiliate -->
## 関連リソース

プログラミングをもっと学びたい方へ：

<!-- START MoshimoAffiliateEasyLink --><script type="text/javascript">(function(b,c,f,g,a,d,e){b.MoshimoAffiliateObject=a;b[a]=b[a]||function(){arguments.currentScript=c.currentScript||c.scripts[c.scripts.length-2];(b[a].q=b[a].q||[]).push(arguments)};c.getElementById(a)||(d=c.createElement(f),d.src=g,d.id=a,e=c.getElementsByTagName("body")[0],e.appendChild(d))})(window,document,"script","//dn.msmstatic.com/site/cardlink/bundle.js?20220329","msmaflink");msmaflink({"n":"実践Claude Code入門ー現場で活用するためのAIコーディングの思考法 [ 西見 公宏 ]","b":"","t":"","d":"https:\/\/thumbnail.image.rakuten.co.jp","c_p":"","p":["\/@0_mall\/book\/cabinet\/3540\/9784297153540_1_34.jpg"],"u":{"u":"https:\/\/item.rakuten.co.jp\/book\/18439208\/","t":"rakuten","r_v":""},"v":"2.1","b_l":[{"id":1,"u_tx":"楽天市場で見る","u_bc":"#f76956","u_url":"https:\/\/item.rakuten.co.jp\/book\/18439208\/","a_id":5490814,"p_id":54,"pl_id":27059,"pc_id":54,"s_n":"rakuten","u_so":1}],"eid":"a8XaY","s":"s"});</script><div id="msmaflink-a8XaY">リンク</div><!-- MoshimoAffiliateEasyLink END -->
<!-- /affiliate -->
