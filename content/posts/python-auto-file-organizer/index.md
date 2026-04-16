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

## 必要なもの

- Python 3.8 以上（[公式サイト](https://www.python.org/downloads/)からインストール）
- テキストエディタ（メモ帳でもOK）

追加のライブラリは不要です。Pythonに最初から入っている機能だけで作れます。

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

`CATEGORIES` は辞書（dict）と呼ばれるデータ構造で、「フォルダ名」と「そこに入れる拡張子のリスト」を対応づけています。

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

### ステップ4: 実行する

ターミナル（コマンドプロンプト）を開いて、以下を実行します。

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

## まとめと次のステップ

Pythonの標準ライブラリだけで、ファイル整理の自動化ができました。

さらに発展させるなら：
- **定期実行**: Windowsのタスクスケジューラに登録すれば、毎日自動で整理される
- **カテゴリ追加**: `CATEGORIES` に好きな拡張子とフォルダ名を追加できる
- **ログ出力**: いつ何を移動したか記録するようにすると、あとから確認できて安心

<!-- affiliate -->
## 関連リソース

Pythonをもっと学びたい方へ：

<!-- START MoshimoAffiliateEasyLink --><script type="text/javascript">(function(b,c,f,g,a,d,e){b.MoshimoAffiliateObject=a;b[a]=b[a]||function(){arguments.currentScript=c.currentScript||c.scripts[c.scripts.length-2];(b[a].q=b[a].q||[]).push(arguments)};c.getElementById(a)||(d=c.createElement(f),d.src=g,d.id=a,e=c.getElementsByTagName("body")[0],e.appendChild(d))})(window,document,"script","//dn.msmstatic.com/site/cardlink/bundle.js?20220329","msmaflink");msmaflink({"n":"新・明解Python入門 第2版 [ 柴田 望洋 ]","b":"","t":"","d":"https:\/\/thumbnail.image.rakuten.co.jp","c_p":"\/@0_mall\/book\/cabinet\/7837","p":["\/9784815617837_1_2.jpg","\/9784815617837_2.jpg","\/9784815617837_3.jpg"],"u":{"u":"https:\/\/item.rakuten.co.jp\/book\/17550690\/","t":"rakuten","r_v":""},"v":"2.1","b_l":[{"id":1,"u_tx":"楽天市場で見る","u_bc":"#f76956","u_url":"https:\/\/item.rakuten.co.jp\/book\/17550690\/","a_id":5490814,"p_id":54,"pl_id":27059,"pc_id":54,"s_n":"rakuten","u_so":1}],"eid":"PHPfR","s":"s"});</script><div id="msmaflink-PHPfR">リンク</div><!-- MoshimoAffiliateEasyLink END -->
<!-- /affiliate -->
