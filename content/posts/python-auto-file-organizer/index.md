---
title: "【Python】ダウンロードフォルダを自動整理するスクリプトの作り方"
date: 2026-04-15
tags: ["Python", "自動化", "初心者向け"]
description: "Pythonを使って、ダウンロードフォルダに溜まったファイルを拡張子ごとに自動で振り分けるスクリプトを作ります。プログラミング初心者でも10分で動くものが作れます。"
draft: false
---

## この記事で作るもの

ダウンロードフォルダに溜まったファイルを、拡張子ごとに自動でフォルダに振り分けるPythonスクリプトを作ります。

こんな感じに整理されます：

```
ダウンロード/
├── 画像/        ← .jpg, .png, .gif など
├── ドキュメント/ ← .pdf, .docx, .xlsx など
├── 動画/        ← .mp4, .mov など
├── 音楽/        ← .mp3, .wav など
└── その他/      ← 上記に当てはまらないもの
```


{{< ad >}}

## 必要なもの

- Python 3.8 以上（[公式サイト](https://www.python.org/downloads/)からインストール）
- テキストエディタ（メモ帳でもOK。[VS Codeの設定とショートカット](/posts/vscode-shortcuts-beginner/)を参考にセットアップしておくと快適です）

追加のライブラリは不要です。Pythonに最初から入っている機能だけで作れます。パッケージのインストールで困ったことがある方は、[pip installでエラーが出たときの対処法](/posts/python-pip-install-error/)もあわせてご覧ください。

## 手順

### ステップ1: スクリプトファイルを作る

好きな場所に `organize.py` というファイルを作り、以下のコードを書きます。

```python
import os
import shutil
from pathlib import Path

# 整理したいフォルダのパス（自分の環境に合わせて変更）
TARGET_DIR = Path.home() / "Downloads"

# 拡張子とフォルダ名の対応表
CATEGORIES = {
    "画像": [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".svg", ".webp"],
    "ドキュメント": [".pdf", ".doc", ".docx", ".xls", ".xlsx", ".ppt", ".pptx", ".txt", ".csv"],
    "動画": [".mp4", ".mov", ".avi", ".mkv", ".wmv"],
    "音楽": [".mp3", ".wav", ".flac", ".aac", ".ogg"],
    "圧縮ファイル": [".zip", ".rar", ".7z", ".tar", ".gz"],
    "プログラム": [".exe", ".msi", ".dmg"],
}
```

`CATEGORIES` は辞書（dict）と呼ばれるデータ構造で、「フォルダ名」と「そこに入れる拡張子のリスト」を対応づけています。JSONに似た構造なので、[JSONとは？データ形式の基本](/posts/json-what-is-it/)を読んでおくと理解が深まります。

### ステップ2: 振り分けの処理を書く

先ほどのコードの続きに、以下を追加します。

```python
def get_category(extension):
    """拡張子からカテゴリ名を返す。該当なしなら「その他」"""
    for category, extensions in CATEGORIES.items():
        if extension.lower() in extensions:
            return category
    return "その他"


def organize():
    """ダウンロードフォルダ内のファイルを整理する"""
    moved_count = 0

    for file_path in TARGET_DIR.iterdir():
        # フォルダはスキップ（ファイルだけ対象）
        if not file_path.is_file():
            continue

        # このスクリプト自身はスキップ
        if file_path.name == "organize.py":
            continue

        # 拡張子からカテゴリを判定
        category = get_category(file_path.suffix)

        # 振り分け先のフォルダを作る（なければ自動で作成）
        dest_dir = TARGET_DIR / category
        dest_dir.mkdir(exist_ok=True)

        # ファイルを移動
        dest_path = dest_dir / file_path.name

        # 同名ファイルがあったら番号をつける
        counter = 1
        while dest_path.exists():
            stem = file_path.stem
            suffix = file_path.suffix
            dest_path = dest_dir / f"{stem}_{counter}{suffix}"
            counter += 1

        shutil.move(str(file_path), str(dest_path))
        print(f"  {file_path.name} → {category}/")
        moved_count += 1

    return moved_count
```

`Path.iterdir()` はフォルダ内のファイルやサブフォルダを1つずつ取り出すメソッドです。`for` ループで順番に処理していきます。

### ステップ3: 実行部分を書く

最後に、スクリプトを実行したときに動く部分を追加します。

```python
if __name__ == "__main__":
    print(f"整理対象: {TARGET_DIR}")
    print("-" * 40)
    count = organize()
    print("-" * 40)
    print(f"完了！ {count} 個のファイルを整理しました。")
```

`if __name__ == "__main__":` は「このファイルを直接実行したときだけ動く」という意味のPythonの定型文です。

なお、プロジェクトごとにPython環境を分けたい場合は、[仮想環境（venv）の使い方入門](/posts/python-venv-beginner/)を参考にしてください。環境を分けておくと、他のプロジェクトとライブラリが混ざる心配がなくなります。

### ステップ4: 実行する

ターミナル（コマンドプロンプト）を開いて、以下を実行します。ターミナル操作に慣れていない方は、[コマンドラインが怖い人へ ― 覚えるコマンド5つだけ](/posts/command-line-scary/)を先に読んでおくと安心です。

```bash
python organize.py
```

こんな出力が表示されます：

```
整理対象: C:\Users\あなたの名前\Downloads
----------------------------------------
  report.pdf → ドキュメント/
  photo.jpg → 画像/
  music.mp3 → 音楽/
  setup.exe → プログラム/
----------------------------------------
完了！ 4 個のファイルを整理しました。
```

## 完成コード

コピペで動く全体のコードです。

```python
import os
import shutil
from pathlib import Path

# 整理したいフォルダのパス（自分の環境に合わせて変更）
TARGET_DIR = Path.home() / "Downloads"

# 拡張子とフォルダ名の対応表
CATEGORIES = {
    "画像": [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".svg", ".webp"],
    "ドキュメント": [".pdf", ".doc", ".docx", ".xls", ".xlsx", ".ppt", ".pptx", ".txt", ".csv"],
    "動画": [".mp4", ".mov", ".avi", ".mkv", ".wmv"],
    "音楽": [".mp3", ".wav", ".flac", ".aac", ".ogg"],
    "圧縮ファイル": [".zip", ".rar", ".7z", ".tar", ".gz"],
    "プログラム": [".exe", ".msi", ".dmg"],
}


def get_category(extension):
    """拡張子からカテゴリ名を返す。該当なしなら「その他」"""
    for category, extensions in CATEGORIES.items():
        if extension.lower() in extensions:
            return category
    return "その他"


def organize():
    """ダウンロードフォルダ内のファイルを整理する"""
    moved_count = 0

    for file_path in TARGET_DIR.iterdir():
        if not file_path.is_file():
            continue
        if file_path.name == "organize.py":
            continue

        category = get_category(file_path.suffix)
        dest_dir = TARGET_DIR / category
        dest_dir.mkdir(exist_ok=True)

        dest_path = dest_dir / file_path.name
        counter = 1
        while dest_path.exists():
            stem = file_path.stem
            suffix = file_path.suffix
            dest_path = dest_dir / f"{stem}_{counter}{suffix}"
            counter += 1

        shutil.move(str(file_path), str(dest_path))
        print(f"  {file_path.name} → {category}/")
        moved_count += 1

    return moved_count


if __name__ == "__main__":
    print(f"整理対象: {TARGET_DIR}")
    print("-" * 40)
    count = organize()
    print("-" * 40)
    print(f"完了！ {count} 個のファイルを整理しました。")
```

## よくある質問（FAQ）

### Q: スクリプトを実行したら「Permission denied」と出ました。どうすればいいですか？

A: ファイルの移動先フォルダに書き込み権限がない可能性があります。管理者権限でターミナルを開くか、`TARGET_DIR` を自分のユーザーフォルダ内のパスに変更してみてください。

### Q: 特定のファイルだけ整理対象から除外したいです。

A: `organize()` 関数の中にある `if file_path.name == "organize.py":` の部分を参考に、除外したいファイル名の条件を追加してください。例えば `if file_path.name.startswith("."):` で隠しファイルを除外できます。

### Q: Mac / Linux でも動きますか？

A: はい、動きます。`Path.home() / "Downloads"` はOSに合わせて自動的にパスを解決してくれます。Macなら `/Users/ユーザー名/Downloads`、Linuxなら `/home/ユーザー名/Downloads` になります。

### Q: 定期的に自動実行するにはどうすればいいですか？

A: Windowsならタスクスケジューラ、Mac/Linuxならcronを使います。例えばcronで毎日9時に実行するなら `0 9 * * * python /path/to/organize.py` と設定します。

### Q: 拡張子が大文字（.JPG や .PNG）のファイルも整理されますか？

A: はい。`get_category()` 関数内で `extension.lower()` と小文字に変換してから比較しているので、大文字の拡張子でも正しく振り分けられます。

{{< chat name="初心者ちゃん" icon="/images/rin-icon.png" direction="left" >}}
なるほど…！分かりやすかった。ありがとう！
{{< /chat >}}

{{< chat name="全知全能くん" icon="/images/zenchi-icon.png" direction="right" >}}
どういたしまして。分からないことがあったらいつでも聞いてね。
{{< /chat >}}

## まとめと次のステップ

Pythonの標準ライブラリだけで、ファイル整理の自動化ができました。

さらに発展させるなら：
- **定期実行**: Windowsのタスクスケジューラに登録すれば、毎日自動で整理される
- **カテゴリ追加**: `CATEGORIES` に好きな拡張子とフォルダ名を追加できる
- **ログ出力**: いつ何を移動したか記録するようにすると、あとから確認できて安心

---
### あわせて読みたい
- [Python仮想環境（venv）の使い方入門](/posts/python-venv-beginner/)
- [コマンドラインが怖い人へ ― 覚えるコマンド5つだけ](/posts/command-line-scary/)


