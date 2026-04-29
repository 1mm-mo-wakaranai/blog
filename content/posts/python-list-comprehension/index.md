---
title: "【Python】リスト内包表記が分からない人へ ― for文との違いを図解"
date: 2026-04-29
tags: ["Python", "初心者向け"]
description: "Pythonのリスト内包表記を初心者向けに解説。for文との書き換え比較で、いつ使うべきか・読み方のコツが分かります。"
draft: false
---

## この記事で解決すること

「リスト内包表記って何？普通のfor文と何が違うの？」

リスト内包表記の読み方・書き方・使いどころを、for文との比較で解説します。Pythonの環境構築がまだの方は、[Python仮想環境（venv）の使い方](/posts/python-venv-beginner/)を先に読んでおくとスムーズです。

{{< ad >}}

## リスト内包表記とは

「リストを1行で作る書き方」です。

### for文で書く場合

```python
# 1〜5の2乗のリストを作る
squares = []
for i in range(1, 6):
    squares.append(i ** 2)

print(squares)  # [1, 4, 9, 16, 25]
```

3行かかります。

### リスト内包表記で書く場合

```python
# 同じことを1行で
squares = [i ** 2 for i in range(1, 6)]

print(squares)  # [1, 4, 9, 16, 25]
```

1行で同じ結果が得られます。パッケージのインストールでエラーが出た場合は[pip installでエラーが出たときの対処法](/posts/python-pip-install-error/)を確認してみてください。

## 基本の構文

```python
[式 for 変数 in イテラブル]
```

日本語に訳すと：

```
[「変数を使った計算」 を 「イテラブルの各要素」 について繰り返す]
```

### 読み方のコツ

右から左に読むと分かりやすいです。

```python
[i * 2 for i in range(5)]
#  ↑         ↑
#  何をする   何を繰り返す
#
# range(5)の各iについて → i * 2 を計算 → リストにする
```

## パターン別の使い方

### パターン1: 変換する

```python
# 文字列のリストを大文字に変換
names = ["alice", "bob", "charlie"]
upper_names = [name.upper() for name in names]
print(upper_names)  # ['ALICE', 'BOB', 'CHARLIE']
```

for文で書くと：

```python
upper_names = []
for name in names:
    upper_names.append(name.upper())
```

### パターン2: フィルタする（if付き）

```python
# 偶数だけを抽出
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
evens = [n for n in numbers if n % 2 == 0]
print(evens)  # [2, 4, 6, 8, 10]
```

構文：

```python
[式 for 変数 in イテラブル if 条件]
```

for文で書くと：

```python
evens = []
for n in numbers:
    if n % 2 == 0:
        evens.append(n)
```

### パターン3: 変換 + フィルタ

```python
# 偶数だけを2乗する
numbers = [1, 2, 3, 4, 5, 6]
result = [n ** 2 for n in numbers if n % 2 == 0]
print(result)  # [4, 16, 36]
```

### パターン4: if-else付き

```python
# 偶数なら"偶数"、奇数なら"奇数"
numbers = [1, 2, 3, 4, 5]
labels = ["偶数" if n % 2 == 0 else "奇数" for n in numbers]
print(labels)  # ['奇数', '偶数', '奇数', '偶数', '奇数']
```

注意：if-elseの場合は `for` の前に書きます。ifだけの場合は `for` の後です。

```python
# ifだけ（フィルタ）→ forの後
[n for n in numbers if n > 3]

# if-else（変換）→ forの前
["大" if n > 3 else "小" for n in numbers]
```

## 実践例

### 例1: CSVデータの処理

```python
# カンマ区切りの文字列を数値リストに変換
csv_line = "85,92,78,95,88"
scores = [int(s) for s in csv_line.split(",")]
print(scores)      # [85, 92, 78, 95, 88]
print(sum(scores))  # 438
```

### 例2: ファイル名のフィルタ

```python
import os

# カレントディレクトリの.pyファイルだけ取得
py_files = [f for f in os.listdir(".") if f.endswith(".py")]
print(py_files)
```

ファイル操作の自動化に興味がある方は、[Pythonでファイル整理を自動化する方法](/posts/python-auto-file-organizer/)も参考にしてみてください。

### 例3: 辞書からの抽出

```python
users = [
    {"name": "田中", "age": 25, "active": True},
    {"name": "鈴木", "age": 30, "active": False},
    {"name": "佐藤", "age": 22, "active": True},
]

# アクティブなユーザーの名前だけ取得
active_names = [u["name"] for u in users if u["active"]]
print(active_names)  # ['田中', '佐藤']
```

## 使わない方がいい場面

リスト内包表記は万能ではありません。以下の場合はfor文の方が読みやすいです。正規表現を使った複雑なフィルタリングなどは、[正規表現入門](/posts/regex-beginner/)を参考にしつつ、for文で書いた方が可読性が高くなります。

### NG: 複雑すぎる処理

```python
# これは読みにくい（やめた方がいい）
result = [x * 2 + 1 for x in range(100) if x % 3 == 0 and x % 5 != 0 and x > 10]

# for文で書いた方が分かりやすい
result = []
for x in range(100):
    if x % 3 == 0 and x % 5 != 0 and x > 10:
        result.append(x * 2 + 1)
```

### NG: 副作用がある処理

```python
# これはNG（リスト内包表記の目的外使用）
[print(x) for x in range(5)]

# 普通のfor文を使う
for x in range(5):
    print(x)
```

### 判断基準

| 状況 | 使うべき書き方 |
|---|---|
| 単純な変換・フィルタ | リスト内包表記 |
| 1行で読める | リスト内包表記 |
| 条件が複雑 | for文 |
| 副作用がある（print, ファイル書き込み等） | for文 |
| ネストが2段以上 | for文 |

## よくある質問（FAQ）

### Q: リスト内包表記と `map()` / `filter()` はどちらを使うべきですか？

A: Pythonでは一般的にリスト内包表記の方が読みやすいとされています。特に条件付きのフィルタリングでは、リスト内包表記の方がシンプルに書けます。ただし、既存の関数をそのまま適用する場合（例: `list(map(int, strings))`）は `map()` の方が簡潔なこともあります。

### Q: リスト内包表記はメモリを大量に使いますか？

A: リスト内包表記は結果をすべてメモリに保持するため、大量のデータ（数百万件以上）を扱う場合はメモリ不足になる可能性があります。その場合は、ジェネレータ式 `(式 for 変数 in イテラブル)` を使うと、要素を1つずつ生成するのでメモリ効率が良くなります。

### Q: 辞書やセットでも内包表記は使えますか？

A: はい、使えます。辞書内包表記は `{key: value for 変数 in イテラブル}`、セット内包表記は `{式 for 変数 in イテラブル}` と書きます。リスト内包表記と同じ感覚で使えます。

### Q: ネストした（2重の）リスト内包表記は使ってもいいですか？

A: 技術的には可能ですが、読みにくくなるため推奨しません。2重ループが必要な場合は、通常のfor文で書いた方がチームメンバーにも理解しやすいコードになります。

### Q: リスト内包表記の中でインデックス番号を使いたい場合はどうしますか？

A: `enumerate()` を組み合わせます。例: `[f"{i}: {name}" for i, name in enumerate(names)]` のように書くと、インデックス付きのリストが作れます。

## まとめ

- リスト内包表記は「リストを1行で作る書き方」
- `[式 for 変数 in イテラブル]` が基本構文
- `if` を付けてフィルタ、`if-else` で条件分岐もできる
- 複雑になりすぎたらfor文に戻す。読みやすさが最優先

---

### あわせて読みたい
- [Python仮想環境（venv）の使い方 ― プロジェクトごとに環境を分ける](/posts/python-venv-beginner/)
- [pip installでエラーが出たときの対処法](/posts/python-pip-install-error/)

<!-- affiliate -->
## 関連リソース

Pythonをもっと学びたい方へ：

<!-- START MoshimoAffiliateEasyLink --><script type="text/javascript">(function(b,c,f,g,a,d,e){b.MoshimoAffiliateObject=a;b[a]=b[a]||function(){arguments.currentScript=c.currentScript||c.scripts[c.scripts.length-2];(b[a].q=b[a].q||[]).push(arguments)};c.getElementById(a)||(d=c.createElement(f),d.src=g,d.id=a,e=c.getElementsByTagName("body")[0],e.appendChild(d))})(window,document,"script","//dn.msmstatic.com/site/cardlink/bundle.js?20220329","msmaflink");msmaflink({"n":"Python1年生 ― 体験してわかる！会話でまなべる！プログラミングのしくみ","b":"","t":"","d":"https:\/\/thumbnail.image.rakuten.co.jp","c_p":"","p":[""],"u":{"u":"https:\/\/search.rakuten.co.jp\/search\/mall\/Python+1%E5%B9%B4%E7%94%9F+%E5%85%A5%E9%96%80\/","t":"rakuten","r_v":""},"v":"2.1","b_l":[{"id":1,"u_tx":"楽天市場で見る","u_bc":"#f76956","u_url":"https:\/\/search.rakuten.co.jp\/search\/mall\/Python+1%E5%B9%B4%E7%94%9F+%E5%85%A5%E9%96%80\/","a_id":5490814,"p_id":54,"pl_id":27059,"pc_id":54,"s_n":"rakuten","u_so":1},{"u_bc":"#f79256","u_tx":"Amazonで見る","u_url":"https:\/\/www.amazon.co.jp\/s\/ref=nb_sb_noss_1?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&url=search-alias%3Daps&field-keywords=Python+1%E5%B9%B4%E7%94%9F+%E5%85%A5%E9%96%80","s_n":"amazon","u_so":2,"a_id":5490817,"p_id":170,"pc_id":185,"pl_id":27060,"id":2}],"eid":"listComp","s":"s"});</script><div id="msmaflink-listComp">リンク</div><!-- MoshimoAffiliateEasyLink END -->
<!-- /affiliate -->
