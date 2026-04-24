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


{{< ad >}}

## なぜこのエラーが出るのか

PCに複数のPythonが入っていることが原因です。

たとえば：
- Python 3.10 と Python 3.12 が両方入っている
- `pip install` したのは3.10の方
- `python` コマンドで動くのは3.12の方

別々のPythonなので、片方にインストールしたライブラリはもう片方からは見えません。

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

これで、この仮想環境の中にだけ `requests` がインストールされます。

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

これで、VS Code内のターミナルでは自動的に仮想環境が有効になります。

## 仮想環境を終了するとき

```bash
deactivate
```

これだけです。

## まとめと次のステップ

- `ModuleNotFoundError` は「そのPythonにはライブラリが入っていない」という意味
- 仮想環境を使えば、プロジェクトごとにライブラリを管理できる
- `python -m venv .venv` → `activate` → `pip install` の3ステップ

慣れると、新しいプロジェクトを始めるときに無意識にやるようになります。

---
### あわせて読みたい
- [pip installでエラーが出たときの対処法まとめ](/posts/python-pip-install-error/)
- [ダウンロードフォルダを自動整理するPythonスクリプトの作り方](/posts/python-auto-file-organizer/)

<!-- affiliate -->
## 関連リソース

Pythonをもっと学びたい方へ：

<!-- START MoshimoAffiliateEasyLink --><script type="text/javascript">(function(b,c,f,g,a,d,e){b.MoshimoAffiliateObject=a;b[a]=b[a]||function(){arguments.currentScript=c.currentScript||c.scripts[c.scripts.length-2];(b[a].q=b[a].q||[]).push(arguments)};c.getElementById(a)||(d=c.createElement(f),d.src=g,d.id=a,e=c.getElementsByTagName("body")[0],e.appendChild(d))})(window,document,"script","//dn.msmstatic.com/site/cardlink/bundle.js?20220329","msmaflink");msmaflink({"n":"スッキリわかるPython入門 第2版","b":"","t":"","d":"https:\/\/thumbnail.image.rakuten.co.jp","c_p":"","p":[""],"u":{"u":"https:\/\/search.rakuten.co.jp\/search\/mall\/%E3%82%B9%E3%83%83%E3%82%AD%E3%83%AA%E3%82%8F%E3%81%8B%E3%82%8BPython%E5%85%A5%E9%96%80\/","t":"rakuten","r_v":""},"v":"2.1","b_l":[{"id":1,"u_tx":"楽天市場で見る","u_bc":"#f76956","u_url":"https:\/\/search.rakuten.co.jp\/search\/mall\/%E3%82%B9%E3%83%83%E3%82%AD%E3%83%AA%E3%82%8F%E3%81%8B%E3%82%8BPython%E5%85%A5%E9%96%80\/","a_id":5490814,"p_id":54,"pl_id":27059,"pc_id":54,"s_n":"rakuten","u_so":1},{"u_bc":"#f79256","u_tx":"Amazonで見る","u_url":"https:\/\/www.amazon.co.jp\/s\/ref=nb_sb_noss_1?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&url=search-alias%3Daps&field-keywords=%E3%82%B9%E3%83%83%E3%82%AD%E3%83%AA%E3%82%8F%E3%81%8B%E3%82%8BPython%E5%85%A5%E9%96%80%20%E7%AC%AC2%E7%89%88","s_n":"amazon","u_so":2,"a_id":5490817,"p_id":170,"pc_id":185,"pl_id":27060,"id":2}],"eid":"WqTQs","s":"s"});</script><div id="msmaflink-WqTQs">リンク</div><!-- MoshimoAffiliateEasyLink END -->
<!-- /affiliate -->
