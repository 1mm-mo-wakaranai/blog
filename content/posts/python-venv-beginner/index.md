---
title: "【Python】ModuleNotFoundErrorの原因と解決方法 ― 仮想環境入門"
date: 2026-04-13
tags: ["Python", "初心者向け", "エラー解決"]
description: "PythonでModuleNotFoundErrorが出る原因と、仮想環境（venv）を使った根本的な解決方法を初心者向けに解説します。"
draft: false
---

## この記事で解決すること

Pythonでコードを実行したら、こんなエラーが出た。

```
ModuleNotFoundError: No module named 'requests'
```

`pip install requests` したのに動かない。なぜ？

この記事では、このエラーの原因と「仮想環境」を使った根本的な解決方法を説明します。

pip installでエラーが出ている場合は、[pip installでエラーが出たときの対処法まとめ](/posts/python-pip-install-error/)もあわせて確認してみてください。


{{< ad >}}

## なぜこのエラーが出るのか

PCに複数のPythonが入っていることが原因です。

たとえば：
- Python 3.10 と Python 3.12 が両方入っている
- `pip install` したのは3.10の方
- `python` コマンドで動くのは3.12の方

別々のPythonなので、片方にインストールしたライブラリはもう片方からは見えません。

ターミナルでの操作に不安がある方は、[コマンドラインが怖い人へ ― 覚えるコマンド5つだけ](/posts/command-line-scary/)を先に読んでおくと安心です。

## 解決方法：仮想環境を使う

「仮想環境（venv）」を使えば、プロジェクトごとに専用のPython環境を作れます。ライブラリの混乱がなくなります。

### ステップ1: 仮想環境を作る

プロジェクトのフォルダで以下を実行します。

```bash
python -m venv .venv
```

`.venv` というフォルダが作られます。この中に、このプロジェクト専用のPythonが入ります。

`venv` は「virtual environment（仮想環境）」の略です。

### ステップ2: 仮想環境を有効にする

Windowsの場合：
```bash
.venv\Scripts\activate
```

Mac / Linuxの場合：
```bash
source .venv/bin/activate
```

成功すると、ターミナルの先頭に `(.venv)` と表示されます。

```
(.venv) C:\Users\あなた\project>
```

### ステップ3: ライブラリをインストールする

仮想環境が有効な状態で `pip install` します。

```bash
pip install requests
```

これで、この仮想環境の中にだけ `requests` がインストールされます。プロジェクトで使うライブラリを `requirements.txt` に記録しておくと、他の人や別のPCでも同じ環境を再現できます。環境変数の管理については[環境変数とは？.envファイルの使い方をゼロから解説](/posts/env-variables-beginner/)も参考になります。

### ステップ4: コードを実行する

```bash
python your_script.py
```

`ModuleNotFoundError` は出なくなります。

## 毎回activateするのが面倒な場合

VS Codeを使っているなら、自動で仮想環境を認識してくれます。

1. VS Codeでプロジェクトフォルダを開く
2. 右下のPythonバージョンをクリック
3. `.venv` のPythonを選択

これで、VS Code内のターミナルでは自動的に仮想環境が有効になります。VS Codeの基本操作については[VS Codeの最初に覚えるべき設定とショートカット10選](/posts/vscode-shortcuts-beginner/)で紹介しています。

## 仮想環境を終了するとき

```bash
deactivate
```

これだけです。

## よくある質問（FAQ）

### Q: `.venv` フォルダはGitにコミットすべきですか？

A: いいえ、コミットしないでください。`.gitignore` に `.venv/` を追加して除外するのが一般的です。代わりに `pip freeze > requirements.txt` でライブラリ一覧をファイルに書き出し、そちらをコミットします。Gitの基本操作については[Gitブランチの使い方入門](/posts/git-branch-beginner/)で解説しています。

### Q: 仮想環境を削除するにはどうすればいいですか？

A: `.venv` フォルダをそのまま削除するだけです。仮想環境はただのフォルダなので、特別なアンインストール手順は不要です。必要になったらまた `python -m venv .venv` で作り直せます。

### Q: `venv` と `virtualenv` と `conda` の違いは何ですか？

A: `venv` はPython 3.3以降に標準搭載されている仮想環境ツールです。`virtualenv` はサードパーティ製で、Python 2系でも使えます。`conda` はAnacondaに付属するパッケージ管理ツールで、Python以外のライブラリも管理できます。初心者には標準の `venv` がおすすめです。

### Q: 仮想環境を有効にしたかどうか、どうやって確認できますか？

A: ターミナルの先頭に `(.venv)` と表示されていれば有効です。もう一つの方法として、`which python`（Mac/Linux）や `where python`（Windows）を実行して、`.venv` フォルダ内のPythonが表示されるか確認できます。

### Q: VS Codeで仮想環境が自動認識されません。

A: プロジェクトのルートフォルダに `.venv` がある状態でVS Codeを開き直してみてください。それでも認識されない場合は、`Ctrl + Shift + P` → 「Python: Select Interpreter」で手動で `.venv` 内のPythonを選択できます。

## まとめと次のステップ

- `ModuleNotFoundError` は「そのPythonにはライブラリが入っていない」という意味
- 仮想環境を使えば、プロジェクトごとにライブラリを管理できる
- `python -m venv .venv` → `activate` → `pip install` の3ステップ

慣れると、新しいプロジェクトを始めるときに無意識にやるようになります。

---
### あわせて読みたい
- [pip installでエラーが出たときの対処法まとめ](/posts/python-pip-install-error/)
- [ダウンロードフォルダを自動整理するPythonスクリプトの作り方](/posts/python-auto-file-organizer/)


