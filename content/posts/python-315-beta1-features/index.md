---
title: "【Python】3.15 beta1リリース！初心者が知っておくべき新機能5つ"
date: 2026-05-15
tags: ["Python", "アップデート", "Python 3.15", "初心者向け"]
description: "Python 3.15のbeta1がリリースされました。lazy imports、frozendict、UTF-8デフォルト化など、初心者にも影響する新機能を分かりやすく解説します。"
draft: false
cover:
  image: "images/cover.png"
  alt: "Python 3.15の新機能を解説するイメージ"
  relative: true
  hidden: false
---

## この記事で分かること

{< chat name="初心者ちゃん" icon="/images/rin-icon.png" direction="left" >}
3.15 beta1リリース！初心者が知っておくべき新機能5つって何？初心者でも分かるように教えて…！
{< /chat >}

{< chat name="全知全能くん" icon="/images/zenchi-icon.png" direction="right" >}
もちろん！3.15 beta1リリース！初心者が知っておくべき新機能5つについて、初心者でも分かるように解説するよ。一緒に見ていこう。
{< /chat >}


「Python 3.15って何が変わるの？自分のコードに影響ある？」

2026年5月11日、Python 3.15のbeta1がリリースされました。beta1は「機能フリーズ」のタイミングで、ここから新機能の追加はなく、バグ修正のみが行われます。正式リリースは2026年10月の予定です。

この記事では、Python 3.15で追加される主要な新機能を初心者向けに解説します。

{{< ad >}}

## Python 3.15の主な新機能一覧

| 機能 | 概要 | PEP |
|------|------|-----|
| Explicit Lazy Imports | importを遅延実行して起動を高速化 | PEP 810 |
| frozendict型 | 変更不可の辞書型がビルトインに | PEP 814 |
| UTF-8モードのデフォルト化 | テキストエンコーディングがUTF-8に統一 | PEP 686 |
| サンプリングプロファイラ | オーバーヘッドゼロのパフォーマンス計測 | - |
| JITコンパイラの高速化 | 実行速度のさらなる向上 | - |

それぞれ詳しく見ていきます。

## 新機能1: Explicit Lazy Imports（遅延インポート）

### 何が変わる？

従来のPythonでは、`import`文はファイルの先頭で即座に実行されていました。Python 3.15では、`import`を「使われるまで実行しない」ように指定できます。

### コード例

```python
# 従来の書き方（即座にインポートされる）
import pandas as pd

# Python 3.15の新しい書き方（使われるまでインポートされない）
from importlib import lazy
lazy.enable()
import pandas as pd  # この時点ではまだ読み込まれない

df = pd.DataFrame()  # ここで初めてpandasが読み込まれる
```

### なぜ嬉しい？

大きなライブラリ（pandas、numpyなど）をインポートすると、スクリプトの起動が遅くなります。lazy importを使えば、実際に使うまで読み込みを遅らせるので、起動時間が短縮されます。

CLIツールやWebアプリなど、起動速度が重要な場面で特に効果的です。

### 初心者への影響

すぐに書き方を変える必要はありません。従来の`import`文もそのまま動きます。ただし、今後のライブラリやフレームワークがlazy importを前提にする可能性があるので、概念だけ知っておくと安心です。

[Pythonの仮想環境（venv）の使い方](/posts/python-venv-beginner/)と合わせて、Python 3.15の環境を試してみるのもおすすめです。

## 新機能2: frozendict（変更不可の辞書）

### 何が変わる？

Pythonには変更不可のリスト（`tuple`）や変更不可の集合（`frozenset`）がありましたが、辞書（dict）には変更不可版がありませんでした。Python 3.15で`frozendict`がビルトイン型として追加されます。

### コード例

```python
# 通常の辞書（変更可能）
config = {"debug": True, "port": 8080}
config["debug"] = False  # 変更できる

# frozendict（変更不可）
from builtins import frozendict
config = frozendict({"debug": True, "port": 8080})
config["debug"] = False  # TypeError が発生する
```

### なぜ嬉しい？

- 設定値など「変更されたくないデータ」を安全に扱える
- 辞書をsetの要素や他の辞書のキーに使える（ハッシュ可能になるため）
- 関数のデフォルト引数に辞書を使うときの「ミュータブルデフォルト問題」を回避できる

### 初心者への影響

[Pythonのリスト内包表記](/posts/python-list-comprehension/)を学んだ方なら、`tuple`と`list`の関係と同じだと考えるとわかりやすいです。`dict`の変更不可版が`frozendict`です。

## 新機能3: UTF-8モードのデフォルト化

### 何が変わる？

Python 3.15では、テキストファイルの読み書き時のデフォルトエンコーディングがUTF-8に統一されます。

### 従来の問題

```python
# Windows環境で問題が起きやすかったコード
with open("data.txt", "r") as f:
    text = f.read()  # WindowsではShift-JISで読もうとしてエラーになることがあった
```

### Python 3.15以降

```python
# encoding指定なしでもUTF-8で読み書きされる
with open("data.txt", "r") as f:
    text = f.read()  # UTF-8として読み込む
```

### なぜ嬉しい？

特にWindows環境で、`encoding="utf-8"`を毎回書かなくてもUTF-8で処理されるようになります。「文字化け」や「UnicodeDecodeError」に悩まされることが減ります。

### 初心者への影響

これは初心者にとって大きなメリットです。Windowsで`open()`を使うときに`encoding="utf-8"`を書き忘れてエラーになる、というよくあるトラブルが解消されます。

[pip installでエラーが出たときの対処法](/posts/python-pip-install-error/)でもエンコーディング関連のトラブルに触れていますが、Python 3.15ではこの種の問題が大幅に減るはずです。

## 新機能4: サンプリングプロファイラ

### 何が変わる？

Python 3.15に、オーバーヘッドがほぼゼロの新しいプロファイラが標準ライブラリに追加されます。

### 従来の問題

```python
# 従来のプロファイラ（cProfile）は実行速度に影響する
import cProfile
cProfile.run('my_function()')  # 計測自体が処理を遅くする
```

### Python 3.15の新プロファイラ

```python
# サンプリング方式で、実行速度への影響がほぼない
import profiling  # 新しい標準ライブラリ

with profiling.start():
    my_function()  # 通常とほぼ同じ速度で実行される
```

### なぜ嬉しい？

- 本番環境でもプロファイリングが可能に
- 「どの関数が遅いか」を実際の動作中に特定できる
- 外部ライブラリ不要で使える

### 初心者への影響

すぐに使う場面は少ないかもしれませんが、「自分のコードのどこが遅いか」を調べたいときに便利なツールが標準で使えるようになります。

## 新機能5: JITコンパイラの高速化

### 何が変わる？

Python 3.13で実験的に導入されたJIT（Just-In-Time）コンパイラが、Python 3.15でさらに高速化されました。

### JITコンパイラとは

通常のPythonは「インタプリタ方式」で、コードを1行ずつ解釈して実行します。JITコンパイラは、よく実行される部分を機械語に変換して高速化する仕組みです。

### 初心者への影響

特に何もしなくても、Pythonの実行速度が自動的に向上します。特にループ処理や数値計算で効果が出やすいです。

ただし、Python 3.15時点ではまだ「実験的」な位置づけです。すべてのコードが高速化されるわけではありません。

## Python 3.15を試す方法

beta版なので本番環境には使えませんが、試してみたい場合は以下の方法があります。

```bash
# pyenvを使う場合
pyenv install 3.15.0b1
pyenv local 3.15.0b1

# Dockerを使う場合
docker run -it python:3.15-rc python
```

[Pythonの仮想環境（venv）の使い方](/posts/python-venv-beginner/)を参考に、既存の環境を壊さずに試すのがおすすめです。

## 正式リリースまでのスケジュール

| 日程 | マイルストーン |
|------|--------------|
| 2026年5月11日 | beta1（機能フリーズ） |
| 2026年8月頃 | リリース候補（RC） |
| 2026年10月1日 | 正式リリース予定 |

## よくある質問（FAQ）

### Q: 今すぐPython 3.15にアップグレードすべき？

A: いいえ。beta版は検証用です。本番環境ではPython 3.14系を使い続けてください。正式リリース後も、ライブラリの対応状況を確認してからアップグレードするのが安全です。

### Q: 既存のコードは動かなくなる？

A: 基本的には互換性が保たれています。ただし、UTF-8デフォルト化により、Shift-JISのファイルを`encoding`指定なしで読んでいたコードは影響を受ける可能性があります。

### Q: Python 3.14との違いは？

A: Python 3.14はfree-threading（GILなし）の実験的サポートが目玉でした。3.15ではlazy importsとfrozendictが主要な新機能です。

### Q: lazy importは全部のimportに適用すべき？

A: いいえ。起動速度が重要な場面（CLIツール、Webアプリ）で効果的です。小さなスクリプトでは従来通りで問題ありません。

### Q: Windows環境でUTF-8デフォルト化の影響は？

A: Shift-JISのファイルを扱っている場合は、明示的に`encoding="shift_jis"`を指定する必要があります。UTF-8のファイルしか扱わない場合は、むしろ楽になります。

{< chat name="初心者ちゃん" icon="/images/rin-icon.png" direction="left" >}
なるほど…！分かりやすかった。ありがとう！
{< /chat >}

{< chat name="全知全能くん" icon="/images/zenchi-icon.png" direction="right" >}
どういたしまして。分からないことがあったらいつでも聞いてね。
{< /chat >}

## まとめ

- Python 3.15 beta1が2026年5月11日にリリース
- lazy imports（PEP 810）で起動速度が向上
- frozendict（PEP 814）で変更不可の辞書が使える
- UTF-8がデフォルトエンコーディングに（Windows環境で特に恩恵大）
- サンプリングプロファイラが標準ライブラリに追加
- JITコンパイラがさらに高速化
- 正式リリースは2026年10月予定

---

### あわせて読みたい

- [Pythonの仮想環境（venv）の使い方](/posts/python-venv-beginner/)
- [pip installでエラーが出たときの対処法](/posts/python-pip-install-error/)


