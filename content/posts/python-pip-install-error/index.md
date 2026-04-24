---
title: "【Python】pip installでエラーが出たときの対処法まとめ"
date: 2026-04-16
tags: ["Python", "初心者向け", "エラー解決"]
description: "pip installでよく出るエラーの原因と解決方法を初心者向けにまとめました。Permission denied、timeout、バージョン不一致など。"
draft: false
---

## この記事で解決すること

`pip install` したらエラーが出た。何が起きているのか分からない。

この記事では、pip installでよく出るエラーを5つ取り上げて、それぞれの原因と解決方法を説明します。


{{< ad >}}

## エラー1: Permission denied（権限エラー）

```
ERROR: Could not install packages due to an EnvironmentError: [Errno 13] Permission denied
```

### 原因

システム全体のPythonにインストールしようとして、権限が足りない状態です。

### 解決方法

`--user` オプションをつけてインストールします。

```bash
pip install --user パッケージ名
```

もしくは、仮想環境を使うのが根本的な解決策です。

```bash
python -m venv .venv
.venv\Scripts\activate   # Windowsの場合
pip install パッケージ名
```

仮想環境については別の記事で詳しく解説しています。

👉 [ModuleNotFoundErrorの原因と解決方法](/posts/python-venv-beginner/)

## エラー2: No matching distribution found

```
ERROR: No matching distribution found for パッケージ名
```

### 原因

以下のどれかです。

- パッケージ名のスペルミス
- そのパッケージが自分のPythonバージョンに対応していない
- そのパッケージがOSに対応していない

### 解決方法

まずスペルを確認してください。大文字小文字やハイフンとアンダースコアの違いに注意。

```bash
# NG
pip install Requests
# OK
pip install requests
```

Pythonのバージョンを確認するには：

```bash
python --version
```

パッケージの対応バージョンはPyPI（https://pypi.org）で確認できます。

## エラー3: Connection timeout（接続タイムアウト）

```
WARNING: Retrying (Retry(total=4, connect=None, read=None, redirect=None, status=None))
ERROR: Could not fetch URL https://pypi.org/...
```

### 原因

インターネット接続の問題か、会社のプロキシに阻まれています。

### 解決方法

まずインターネット接続を確認。接続できているなら、ミラーサーバーを使います。

```bash
pip install パッケージ名 --index-url https://pypi.tuna.tsinghua.edu.cn/simple
```

会社のプロキシ環境の場合：

```bash
pip install パッケージ名 --proxy http://プロキシアドレス:ポート番号
```

## エラー4: ModuleNotFoundError（インストールしたのに見つからない）

```
ModuleNotFoundError: No module named 'requests'
```

### 原因

`pip install` したPythonと、`python` コマンドで動くPythonが別物です。PCに複数のPythonが入っている場合に起きます。

### 解決方法

`python -m pip` を使ってインストールします。

```bash
python -m pip install requests
```

これで「今動いているPython」に確実にインストールされます。

## エラー5: Could not build wheels

```
ERROR: Could not build wheels for パッケージ名
```

### 原因

パッケージのビルドに必要なツール（C言語のコンパイラなど）がPCに入っていません。

### 解決方法

まず pip と setuptools を最新にします。

```bash
python -m pip install --upgrade pip setuptools wheel
```

それでもダメな場合は、ビルド済みのバージョンを指定してインストールします。

```bash
pip install パッケージ名==バージョン番号
```

## まとめ

- Permission denied → `--user` か仮想環境を使う
- No matching distribution → スペルとPythonバージョンを確認
- Connection timeout → ネット接続確認、ミラーサーバーを使う
- ModuleNotFoundError → `python -m pip install` を使う
- Could not build wheels → pip/setuptools を更新

---
### あわせて読みたい
- [ModuleNotFoundErrorの原因と解決方法 ― 仮想環境入門](/posts/python-venv-beginner/)
- [環境変数とは？.envファイルの使い方をゼロから解説](/posts/env-variables-beginner/)

<!-- affiliate -->
## 関連リソース

Pythonをもっと学びたい方へ：

<!-- START MoshimoAffiliateEasyLink --><script type="text/javascript">(function(b,c,f,g,a,d,e){b.MoshimoAffiliateObject=a;b[a]=b[a]||function(){arguments.currentScript=c.currentScript||c.scripts[c.scripts.length-2];(b[a].q=b[a].q||[]).push(arguments)};c.getElementById(a)||(d=c.createElement(f),d.src=g,d.id=a,e=c.getElementsByTagName("body")[0],e.appendChild(d))})(window,document,"script","//dn.msmstatic.com/site/cardlink/bundle.js?20220329","msmaflink");msmaflink({"n":"Python1年生 第2版 体験してわかる！会話でまなべる！プログラミングのしくみ","b":"","t":"","d":"https:\/\/thumbnail.image.rakuten.co.jp","c_p":"","p":[""],"u":{"u":"https:\/\/search.rakuten.co.jp\/search\/mall\/Python1%E5%B9%B4%E7%94%9F%20%E5%85%A5%E9%96%80\/","t":"rakuten","r_v":""},"v":"2.1","b_l":[{"id":1,"u_tx":"楽天市場で見る","u_bc":"#f76956","u_url":"https:\/\/search.rakuten.co.jp\/search\/mall\/Python1%E5%B9%B4%E7%94%9F%20%E5%85%A5%E9%96%80\/","a_id":5490814,"p_id":54,"pl_id":27059,"pc_id":54,"s_n":"rakuten","u_so":1},{"u_bc":"#f79256","u_tx":"Amazonで見る","u_url":"https:\/\/www.amazon.co.jp\/s\/ref=nb_sb_noss_1?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&url=search-alias%3Daps&field-keywords=Python1%E5%B9%B4%E7%94%9F%20%E7%AC%AC2%E7%89%88","s_n":"amazon","u_so":2,"a_id":5490817,"p_id":170,"pc_id":185,"pl_id":27060,"id":2}],"eid":"1Zu0Q","s":"s"});</script><div id="msmaflink-1Zu0Q">リンク</div><!-- MoshimoAffiliateEasyLink END -->
<!-- /affiliate -->
