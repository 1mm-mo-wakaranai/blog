---
title: "【初心者向け】Dockerとは？「環境構築が面倒」を解決する仕組み"
date: 2026-04-27T00:00:00+09:00
tags: ["初心者向け", "開発環境"]
description: "Dockerとは何か、なぜ必要なのかを初心者向けに解説。「自分のPCでは動くのに」問題をDockerがどう解決するか分かります。"
draft: false
---

## この記事で解決すること

「Dockerって何？なんで必要なの？」

プログラミングを学んでいると「Dockerで環境を作ってください」と言われることがあります。この記事では、Dockerが何を解決してくれるのかを説明します。

## 必要なもの

- この記事を読むだけなら何も不要です
- 試してみたい場合はDocker Desktop（無料）

## Dockerを一言で説明すると

Dockerは **「アプリの動作環境をまるごとパッケージにする仕組み」** です。

{{< ad >}}

## 手順

### ステップ1: Dockerが解決する問題を理解する

プログラミングでよくある困りごとがあります。

```
先輩「このコード動かしてみて」
自分「エラーが出ます…」
先輩「え、こっちでは動くけど」
```

これは「自分のPCでは動くのに」問題と呼ばれています。

原因は、PCごとに環境が違うからです。

- Pythonのバージョンが違う
- 必要なライブラリが入っていない
- OSが違う（Windows vs Mac）

Pythonの場合は[仮想環境（venv）](/posts/python-venv-beginner/)で環境を分離する方法もありますが、OS自体の違いまでは吸収できません。Dockerは、アプリが動く環境をまるごとパッケージにして、どのPCでも同じ環境を再現できるようにします。

### ステップ2: コンテナとイメージを理解する

Dockerには2つの重要な概念があります。

**イメージ** = 設計図

「Python 3.12 + Flask + PostgreSQL」のように、必要なものが全部書かれた設計図です。

**コンテナ** = 設計図から作った実体

イメージをもとに作られた、実際に動く環境です。起動・停止・削除が自由にできます。

```
イメージ（設計図）→ コンテナ（実体）
                  → コンテナ（実体）  ← 同じ設計図から何個でも作れる
                  → コンテナ（実体）
```

### ステップ3: 身近な例で理解する

Dockerを料理に例えると：

- **イメージ** = レシピ（材料と手順が書いてある）
- **コンテナ** = レシピ通りに作った料理
- **Dockerfile** = レシピを書くためのフォーマット
- **Docker Hub** = レシピ共有サイト（他の人が作ったレシピを使える）

### ステップ4: 実際のDockerfileを見てみる

Pythonアプリの場合、こんなファイルを書きます。

```dockerfile
# Python 3.12の環境を使う
FROM python:3.12

# 作業ディレクトリを設定
WORKDIR /app

# 必要なライブラリをインストール
COPY requirements.txt .
RUN pip install -r requirements.txt

# アプリのコードをコピー
COPY . .

# アプリを起動
CMD ["python", "app.py"]
```

このファイルがあれば、誰でも同じ環境を再現できます。Dockerfileの中で使われている `COPY` や `RUN` は、[コマンドラインの基本コマンド](/posts/command-line-scary/)と似た感覚で読めます。また、`requirements.txt` に書かれたライブラリは[pip install](/posts/python-pip-install-error/)で管理されているものです。

### ステップ5: 基本コマンド3つ

Dockerを使うときに覚えるコマンドは3つです。

```bash
# イメージからコンテナを作って起動
docker run python:3.12

# 動いているコンテナを確認
docker ps

# コンテナを停止
docker stop コンテナID
```

これらのコマンドはターミナルで実行します。ターミナル操作に不安がある方は、先に[コマンドラインの基本操作](/posts/command-line-scary/)を確認しておくと安心です。

## 仮想マシンとの違い

「仮想マシン（VM）と何が違うの？」という疑問があるかもしれません。

| | Docker | 仮想マシン |
|---|---|---|
| 起動速度 | 数秒 | 数分 |
| サイズ | 数十MB〜数百MB | 数GB |
| OS | ホストOSを共有 | 個別にOSが必要 |
| 用途 | アプリの実行環境 | OS丸ごとの再現 |

Dockerは仮想マシンより軽量で高速です。アプリの実行環境を作るだけなら、Dockerの方が適しています。

## 初心者がDockerを使う場面

今すぐDockerを使いこなす必要はありません。以下の場面で出会ったときに思い出してください。

- チーム開発で「docker-compose up で環境を立ち上げて」と言われたとき
- チュートリアルで「Dockerで環境を作ります」と書いてあるとき
- 「自分のPCでは動くのに」問題に遭遇したとき

Dockerを使うと、[環境変数（.envファイル）](/posts/env-variables-beginner/)でAPIキーやデータベースの接続先を管理することも多くなります。Docker Composeの設定ファイルでは[JSON形式](/posts/json-what-is-it/)に似たYAML形式が使われるので、データ形式の基本を知っておくと理解が早まります。

## よくある質問（FAQ）

### Q: Dockerは無料で使えますか？
A: Docker Desktopは個人利用や小規模チーム（従業員250人未満かつ年間売上1,000万ドル未満）であれば無料で使えます。大企業での利用には有料プランが必要です。学習目的であれば問題なく無料で使えます。

### Q: DockerとVirtualBox（仮想マシン）はどちらを使えばいいですか？
A: アプリの実行環境を作りたいだけならDockerがおすすめです。起動が速く、ファイルサイズも小さいです。OS丸ごと（Windowsの中でLinuxを動かすなど）を再現したい場合は仮想マシンが適しています。

### Q: Dockerを使うにはLinuxの知識が必要ですか？
A: 基本的なコマンド操作（ファイルの移動やコピーなど）が分かれば十分です。Dockerfileの中で使うコマンドはLinuxベースですが、よく使うものは限られています。まずは[コマンドラインの基本](/posts/command-line-scary/)を押さえておけば大丈夫です。

### Q: Docker Composeとは何ですか？
A: Docker Composeは、複数のコンテナをまとめて管理するツールです。たとえば「Webアプリ + データベース + キャッシュ」のように複数のサービスが必要なとき、`docker-compose.yml` というファイルに設定を書いて、`docker-compose up` の一発で全部起動できます。

### Q: Dockerのイメージはどこから取得するのですか？
A: Docker Hubという公式のレジストリ（イメージの共有サイト）から取得します。`docker run python:3.12` と実行すると、Docker Hubから自動的にPython 3.12のイメージがダウンロードされます。公式イメージを使えば、安全で信頼性の高い環境を手軽に構築できます。

## まとめと次のステップ

- Dockerは「アプリの動作環境をまるごとパッケージにする仕組み」
- 「自分のPCでは動くのに」問題を解決する
- イメージ（設計図）からコンテナ（実体）を作る
- 仮想マシンより軽量で高速

興味が出てきたら、Docker Desktop をインストールして `docker run hello-world` を実行してみてください。

---
### あわせて読みたい
- [コマンドラインが怖い人へ ― 覚えるコマンド5つだけ](/posts/command-line-scary/)
- [環境変数と.envファイルの使い方](/posts/env-variables-beginner/)

<!-- affiliate -->
## 関連リソース

Dockerをもっと学びたい方へ：

<!-- START MoshimoAffiliateEasyLink --><script type="text/javascript">(function(b,c,f,g,a,d,e){b.MoshimoAffiliateObject=a;b[a]=b[a]||function(){arguments.currentScript=c.currentScript||c.scripts[c.scripts.length-2];(b[a].q=b[a].q||[]).push(arguments)};c.getElementById(a)||(d=c.createElement(f),d.src=g,d.id=a,e=c.getElementsByTagName("body")[0],e.appendChild(d))})(window,document,"script","//dn.msmstatic.com/site/cardlink/bundle.js?20220329","msmaflink");msmaflink({"n":"仕組みと使い方がわかる Docker&Kubernetesのきほんのきほん","b":"","t":"","d":"https:\/\/thumbnail.image.rakuten.co.jp","c_p":"","p":[""],"u":{"u":"https:\/\/search.rakuten.co.jp\/search\/mall\/Docker+%E5%85%A5%E9%96%80+%E5%88%9D%E5%BF%83%E8%80%85\/","t":"rakuten","r_v":""},"v":"2.1","b_l":[{"id":1,"u_tx":"楽天市場で見る","u_bc":"#f76956","u_url":"https:\/\/search.rakuten.co.jp\/search\/mall\/Docker+%E5%85%A5%E9%96%80+%E5%88%9D%E5%BF%83%E8%80%85\/","a_id":5490814,"p_id":54,"pl_id":27059,"pc_id":54,"s_n":"rakuten","u_so":1},{"u_bc":"#f79256","u_tx":"Amazonで見る","u_url":"https:\/\/www.amazon.co.jp\/s\/ref=nb_sb_noss_1?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&url=search-alias%3Daps&field-keywords=Docker+%E5%85%A5%E9%96%80+%E5%88%9D%E5%BF%83%E8%80%85","s_n":"amazon","u_so":2,"a_id":5490817,"p_id":170,"pc_id":185,"pl_id":27060,"id":2}],"eid":"dK2mN","s":"s"});</script><div id="msmaflink-dK2mN">リンク</div><!-- MoshimoAffiliateEasyLink END -->
<!-- /affiliate -->
