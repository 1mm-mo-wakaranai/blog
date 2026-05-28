---
title: "【Python】try-exceptの書き方入門！エラー処理を基礎から解説"
date: 2026-05-21
tags: ["Python", "エラー処理", "初心者向け"]
description: "Pythonのtry-except文を初心者向けに解説。基本構文からよくあるエラーの種類、実践的な使い方まで紹介します。"
draft: false
cover:
  image: "images/cover.png"
  alt: "Pythonのtry-except文を解説する記事のカバー画像"
  relative: true
  hidden: false
---

## この記事で分かること

{{< chat name="初心者ちゃん" icon="/images/rin-icon.png" direction="left" >}}
プログラムが途中で止まっちゃう…。エラーが出ても動き続ける方法ってないの？
{{< /chat >}}

{{< chat name="全知全能くん" icon="/images/zenchi-icon.png" direction="right" >}}
try/exceptを使えば、エラーが起きても処理を続けられるよ。エラー処理の基本を一緒に見ていこう。
{{< /chat >}}

「Pythonでエラーが出てプログラムが止まる。try-exceptって何？どう書けばいいの？」

Pythonのtry-except文は、エラーが起きてもプログラムを止めずに処理を続けるための仕組みです。この記事では、基本的な書き方から実践的な使い方まで解説します。

{{< ad >}}

## try-exceptとは

try-exceptは、Pythonの「例外処理」の仕組みです。

例外処理とは、プログラム実行中に発生するエラー（例外）をキャッチして、適切に対処するための構文です。

### try-exceptがない場合

```python
# ユーザーに数値を入力してもらう
num = int(input("数字を入力してください: "))
print(f"入力された数字: {num}")
```

このコードで「abc」と入力すると、以下のエラーが出てプログラムが停止します。

```
ValueError: invalid literal for int() with base 10: 'abc'
```

### try-exceptがある場合

```python
# エラーが起きても止まらない
try:
    num = int(input("数字を入力してください: "))
    print(f"入力された数字: {num}")
except ValueError:
    print("数字を入力してください。文字は受け付けません。")
```

「abc」と入力しても、エラーメッセージを表示してプログラムは正常に続行します。

## なぜtry-exceptが必要なのか

プログラムが予期しないエラーで突然停止すると、以下の問題が起きます。

- ユーザーに不親切なエラーメッセージが表示される
- 処理途中のデータが失われる
- サーバーアプリケーションが落ちてサービスが停止する

try-exceptを使えば、エラーが起きても「想定内」として処理できます。

## 基本構文

### 最もシンプルな形

```python
try:
    # エラーが起きるかもしれない処理
    result = 10 / 0
except ZeroDivisionError:
    # エラーが起きたときの処理
    print("0で割ることはできません")
```

### 構文の構造

```python
try:
    # 試したい処理（ここでエラーが起きる可能性がある）
    pass
except エラーの種類:
    # エラーが起きたときに実行する処理
    pass
else:
    # エラーが起きなかったときに実行する処理（省略可）
    pass
finally:
    # エラーの有無に関わらず必ず実行する処理（省略可）
    pass
```

### 各ブロックの役割

| ブロック | 実行タイミング | 必須？ |
|----------|---------------|--------|
| try | 最初に実行される | 必須 |
| except | エラーが起きたとき | 必須（1つ以上） |
| else | エラーが起きなかったとき | 省略可 |
| finally | 常に実行される | 省略可 |

## よくあるエラーの種類

Pythonでよく遭遇するエラー（例外）の種類を紹介します。

### ValueError — 値が不正

```python
try:
    num = int("abc")  # 文字列を数値に変換できない
except ValueError as e:
    print(f"値エラー: {e}")
```

### TypeError — 型が不正

```python
try:
    result = "hello" + 123  # 文字列と数値は足せない
except TypeError as e:
    print(f"型エラー: {e}")
```

### FileNotFoundError — ファイルが見つからない

```python
try:
    with open("存在しないファイル.txt", "r") as f:
        content = f.read()
except FileNotFoundError:
    print("ファイルが見つかりません")
```

### KeyError — 辞書のキーが存在しない

```python
try:
    data = {"name": "太郎", "age": 25}
    print(data["email"])  # 存在しないキー
except KeyError as e:
    print(f"キーが見つかりません: {e}")
```

### IndexError — リストの範囲外

```python
try:
    fruits = ["りんご", "みかん", "バナナ"]
    print(fruits[10])  # インデックス10は存在しない
except IndexError:
    print("リストの範囲外です")
```

### ZeroDivisionError — ゼロ除算

```python
try:
    result = 100 / 0
except ZeroDivisionError:
    print("0で割ることはできません")
```

[Pythonの仮想環境（venv）の使い方](/posts/python-venv-beginner/)も合わせて覚えておくと、開発環境のトラブルを減らせます。

## 複数のエラーをキャッチする

### 個別に処理する

```python
try:
    num = int(input("数字: "))
    result = 100 / num
    print(f"結果: {result}")
except ValueError:
    print("数字を入力してください")
except ZeroDivisionError:
    print("0以外の数字を入力してください")
```

### まとめて処理する

```python
try:
    num = int(input("数字: "))
    result = 100 / num
except (ValueError, ZeroDivisionError) as e:
    print(f"入力エラー: {e}")
```

## elseとfinallyの使い方

### elseブロック

エラーが起きなかったときだけ実行したい処理を書きます。

```python
try:
    num = int(input("数字: "))
except ValueError:
    print("数字を入力してください")
else:
    # エラーが起きなかったときだけ実行
    print(f"入力された数字の2倍は {num * 2} です")
```

### finallyブロック

エラーの有無に関わらず、必ず実行したい処理を書きます。ファイルを閉じる、接続を切断するなどの「後片付け」に使います。

```python
try:
    f = open("data.txt", "r")
    content = f.read()
    print(content)
except FileNotFoundError:
    print("ファイルが見つかりません")
finally:
    # ファイルが開いていれば必ず閉じる
    if 'f' in locals() and not f.closed:
        f.close()
        print("ファイルを閉じました")
```

## 実践例：安全なユーザー入力

実際のプログラムでよく使うパターンを紹介します。

### 数値入力のリトライ

```python
def get_number(prompt):
    """ユーザーから数値を取得する。正しい入力があるまで繰り返す"""
    while True:
        try:
            return int(input(prompt))
        except ValueError:
            print("数字を入力してください。もう一度お願いします。")

# 使い方
age = get_number("年齢を入力してください: ")
print(f"あなたは{age}歳ですね")
```

### ファイル読み込みの安全な処理

```python
def read_config(filepath):
    """設定ファイルを読み込む。エラー時はデフォルト値を返す"""
    try:
        with open(filepath, "r", encoding="utf-8") as f:
            return f.read()
    except FileNotFoundError:
        print(f"設定ファイルが見つかりません: {filepath}")
        return None
    except PermissionError:
        print(f"ファイルの読み取り権限がありません: {filepath}")
        return None

config = read_config("settings.json")
if config is None:
    print("デフォルト設定を使用します")
```

### API呼び出しのエラーハンドリング

```python
import urllib.request
import json

def fetch_data(url):
    """URLからデータを取得する"""
    try:
        with urllib.request.urlopen(url, timeout=10) as response:
            data = json.loads(response.read())
            return data
    except urllib.error.URLError:
        print("ネットワーク接続に問題があります")
        return None
    except json.JSONDecodeError:
        print("レスポンスの形式が不正です")
        return None
    except TimeoutError:
        print("接続がタイムアウトしました")
        return None
```

[PythonでAPIを使う方法](/posts/javascript-fetch-api/)の基本も参考にしてみてください。

## やってはいけないパターン

### 全てのエラーを握りつぶす（NG）

```python
# ❌ 悪い例：何のエラーか分からなくなる
try:
    do_something()
except:
    pass
```

これをやると、バグがあっても気づけなくなります。

### 正しい書き方

```python
# ⭕ 良い例：想定するエラーだけキャッチする
try:
    do_something()
except ValueError as e:
    print(f"値が不正です: {e}")
except Exception as e:
    # 想定外のエラーはログに残す
    print(f"予期しないエラー: {e}")
    raise  # エラーを再送出して上位に伝える
```

### ポイント

- `except:` や `except Exception:` だけで全てキャッチしない
- 想定するエラーの種類を明示する
- 想定外のエラーは`raise`で再送出するか、ログに記録する

## エラーメッセージを取得する

`as e` を使うと、エラーの詳細メッセージを変数に格納できます。

```python
try:
    result = int("abc")
except ValueError as e:
    print(f"エラーの種類: {type(e).__name__}")
    print(f"エラーメッセージ: {e}")
```

出力：

```
エラーの種類: ValueError
エラーメッセージ: invalid literal for int() with base 10: 'abc'
```

デバッグ時やログ出力時に便利です。

[pip installでエラーが出たときの対処法](/posts/python-pip-install-error/)も合わせて読んでおくと、環境構築のトラブルに強くなれます。

## よくある質問（FAQ）

![この記事のポイント](images/point-takeaway.png)

### Q: try-exceptはどこに書けばいい？

A: 「外部とのやり取り」がある場所に書くのが基本です。ファイル操作、ネットワーク通信、ユーザー入力など、自分のコードだけでは制御できない部分に使います。

### Q: exceptを複数書く順番は？

A: 具体的なエラーを先に、汎用的なエラーを後に書きます。Pythonは上から順にマッチするため、`Exception`を先に書くと全てそこでキャッチされてしまいます。

### Q: try-exceptを使いすぎるのは良くない？

A: はい。全ての行をtry-exceptで囲むのは過剰です。エラーが起きる可能性がある箇所にだけ使いましょう。事前にチェックできるもの（例：`if x != 0:` でゼロ除算を防ぐ）は、try-exceptより条件分岐のほうが適切な場合もあります。

### Q: raiseって何？

A: `raise`はエラーを意図的に発生させる（または再送出する）キーワードです。except内で`raise`を書くと、キャッチしたエラーをそのまま上位の呼び出し元に伝えます。

### Q: try-exceptとif文、どっちを使うべき？

A: 「事前に防げるエラー」はif文、「実行してみないと分からないエラー」はtry-exceptが適切です。例えば、ファイルの存在確認は`os.path.exists()`でもできますが、確認してから開くまでの間にファイルが消される可能性もあるため、try-exceptのほうが確実です。

{{< chat name="初心者ちゃん" icon="/images/rin-icon.png" direction="left" >}}
except Exceptionで全部キャッチするのはダメなんだ…。具体的なエラーを指定するのが大事なのね。
{{< /chat >}}

{{< chat name="全知全能くん" icon="/images/zenchi-icon.png" direction="right" >}}
そう、何でもキャッチすると本当のバグを見逃しちゃうからね。FileNotFoundError、ValueErrorみたいに具体的に書こう。
{{< /chat >}}

## まとめ

- try-exceptはエラーが起きてもプログラムを止めないための仕組み
- `try`に試したい処理、`except`にエラー時の処理を書く
- エラーの種類（ValueError、FileNotFoundErrorなど）を明示する
- `else`はエラーなし時、`finally`は常に実行される
- 全てのエラーを`except:`で握りつぶすのはNG
- 外部とのやり取り（ファイル、ネットワーク、ユーザー入力）に使う

---

### あわせて読みたい

- [Pythonの仮想環境（venv）を使いこなす方法](/posts/python-venv-beginner/)
- [pip installでエラーが出たときの対処法](/posts/python-pip-install-error/)

