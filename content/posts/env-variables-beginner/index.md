---
title: "【初心者向け】環境変数とは？.envファイルの使い方をゼロから解説"
date: 2026-04-18
tags: ["初心者向け", "開発環境", "エラー解決"]
description: "環境変数とは何か、.envファイルの使い方を初心者向けにゼロから解説。APIキーの管理方法も紹介します。"
draft: false
---

## この記事で解決すること

「環境変数って何？」「.envファイルって何のためにあるの？」

プログラミングを始めると必ず出会う「環境変数」を、ゼロから解説します。

## 環境変数とは

環境変数は、PCやアプリに「設定値」を渡すための仕組みです。

たとえば：
- APIキー（外部サービスにアクセスするための鍵）
- データベースの接続先
- 開発モードか本番モードかの切り替え

これらをコードに直接書くと、GitHubに上げたときに全世界に公開されてしまいます。環境変数を使えば、コードと設定値を分離できます。

[GitHubの基本的な使い方](/posts/github-what-is-it/)を学ぶと、なぜコードと設定値を分離する必要があるのかがより実感できます。

## なぜ環境変数が必要なのか

### NG：コードに直接書く

```python
api_key = "sk-abc123xyz456"  # これがGitHubに公開される！
```

### OK：環境変数から読み込む

```python
import os
api_key = os.environ.get("API_KEY")  # コードにキーが含まれない
```

## .envファイルの使い方

### ステップ1：.envファイルを作る

プロジェクトのルートフォルダに `.env` というファイルを作ります。

```
API_KEY=sk-abc123xyz456
DATABASE_URL=postgresql://localhost:5432/mydb
DEBUG=true
```

ルールは簡単です。`変数名=値` の形で1行ずつ書くだけ。

### ステップ2：.envファイルを読み込む

Pythonの場合、`python-dotenv` というライブラリを使います。

```bash
pip install python-dotenv
```

`pip install` でエラーが出た場合は、[pip installのエラー対処法まとめ](/posts/python-pip-install-error/)を参考にしてください。

```python
from dotenv import load_dotenv
import os

load_dotenv()  # .envファイルを読み込む

api_key = os.environ.get("API_KEY")
print(api_key)  # sk-abc123xyz456
```

Node.jsの場合は `dotenv` パッケージを使います。

```bash
npm install dotenv
```

Node.jsのパッケージ管理については[npmとyarnの基本解説](/posts/npm-yarn-beginner/)で詳しく紹介しています。

```javascript
require('dotenv').config();

const apiKey = process.env.API_KEY;
console.log(apiKey);  // sk-abc123xyz456
```

{{< ad >}}

### ステップ3：.gitignoreに追加する（超重要）

`.env` ファイルをGitHubに上げないように、`.gitignore` に追加します。

```
.env
```

これを忘れると、APIキーが全世界に公開されます。

## よくある間違い

### .envファイルにスペースを入れる

```
# NG
API_KEY = sk-abc123xyz456

# OK
API_KEY=sk-abc123xyz456
```

`=` の前後にスペースを入れるとエラーになることがあります。

### .envファイルをクォートで囲む

```
# 基本的にクォートは不要
API_KEY=sk-abc123xyz456

# クォートが必要なケース（値にスペースが含まれる場合）
MESSAGE="Hello World"
```

### .gitignoreに追加し忘れる

一度GitHubに上げてしまったら、履歴に残ります。`.env` を削除しても、過去のコミットから見られてしまいます。

もし間違えて上げてしまったら、すぐにAPIキーを再発行してください。

## 環境変数の活用シーン

環境変数は、開発が進むにつれてさまざまな場面で使います。

### API連携

外部サービスの[APIを呼び出す](/posts/api-what-is-it/)ときに、APIキーを環境変数で管理するのが一般的です。たとえばOpenAIのAPIキーや、天気予報サービスのキーなどです。

### 開発環境と本番環境の切り替え

`DEBUG=true` のような環境変数を使って、開発中はエラーの詳細を表示し、本番では非表示にする、といった切り替えができます。

### Dockerとの組み合わせ

[Dockerで環境を構築する](/posts/docker-beginner/)ときにも、環境変数は頻繁に使います。`docker-compose.yml` の中で `.env` ファイルを読み込む設定ができるので、コンテナごとに異なる設定値を渡せます。

## よくある質問（FAQ）

### Q: .envファイルはプロジェクトごとに作るのですか？
A: はい、プロジェクトのルートフォルダにそれぞれ作ります。プロジェクトごとに使うAPIキーやデータベースの接続先が異なるため、個別に管理するのが基本です。

### Q: .envファイルの中身をチームメンバーに共有するにはどうすればいいですか？
A: `.env.example` というファイルを作り、値を空にした状態でGitHubに上げるのが一般的です。たとえば `API_KEY=` のように項目名だけ書いておき、実際の値はSlackやパスワードマネージャーで共有します。

### Q: 環境変数はターミナルからも設定できますか？
A: はい、できます。Windowsなら `set API_KEY=xxx`、Mac/Linuxなら `export API_KEY=xxx` で一時的に設定できます。ただし、ターミナルを閉じると消えてしまうので、永続的に使いたい場合は `.env` ファイルに書くのがおすすめです。

### Q: .envファイルに書ける値の種類に制限はありますか？
A: 基本的に文字列として扱われます。数値や `true`/`false` を書いても、プログラム側では文字列として読み込まれるので、必要に応じて型変換してください。たとえばPythonなら `int(os.environ.get("PORT"))` のように変換します。

### Q: 本番環境でも.envファイルを使いますか？
A: 本番環境では、ホスティングサービス（Heroku、AWS、Vercelなど）の管理画面から環境変数を設定するのが一般的です。`.env` ファイルは主にローカル開発用と考えてください。

## まとめ

- 環境変数は「コードと設定値を分離する」仕組み
- `.env` ファイルに `変数名=値` で書く
- `.gitignore` に `.env` を追加するのを絶対に忘れない
- APIキーやパスワードは絶対にコードに直接書かない

---
### あわせて読みたい
- [pip installでエラーが出たときの対処法まとめ](/posts/python-pip-install-error/)
- [GitHubアカウントを作ったけど何すればいい？最初の使い方ガイド](/posts/github-what-is-it/)

<!-- affiliate -->
## 関連リソース

Web開発の基礎をもっと学びたい方へ：

<!-- START MoshimoAffiliateEasyLink --><script type="text/javascript">(function(b,c,f,g,a,d,e){b.MoshimoAffiliateObject=a;b[a]=b[a]||function(){arguments.currentScript=c.currentScript||c.scripts[c.scripts.length-2];(b[a].q=b[a].q||[]).push(arguments)};c.getElementById(a)||(d=c.createElement(f),d.src=g,d.id=a,e=c.getElementsByTagName("body")[0],e.appendChild(d))})(window,document,"script","//dn.msmstatic.com/site/cardlink/bundle.js?20220329","msmaflink");msmaflink({"n":"Webを支える技術 ― HTTP、URI、HTML、そしてREST","b":"","t":"","d":"https:\/\/thumbnail.image.rakuten.co.jp","c_p":"","p":[""],"u":{"u":"https:\/\/search.rakuten.co.jp\/search\/mall\/Web%E3%82%92%E6%94%AF%E3%81%88%E3%82%8B%E6%8A%80%E8%A1%93%20HTTP%20REST\/","t":"rakuten","r_v":""},"v":"2.1","b_l":[{"id":1,"u_tx":"楽天市場で見る","u_bc":"#f76956","u_url":"https:\/\/search.rakuten.co.jp\/search\/mall\/Web%E3%82%92%E6%94%AF%E3%81%88%E3%82%8B%E6%8A%80%E8%A1%93%20HTTP%20REST\/","a_id":5490814,"p_id":54,"pl_id":27059,"pc_id":54,"s_n":"rakuten","u_so":1},{"u_bc":"#f79256","u_tx":"Amazonで見る","u_url":"https:\/\/www.amazon.co.jp\/s\/ref=nb_sb_noss_1?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&url=search-alias%3Daps&field-keywords=Web%E3%82%92%E6%94%AF%E3%81%88%E3%82%8B%E6%8A%80%E8%A1%93%20HTTP%20URI%20HTML%20REST","s_n":"amazon","u_so":2,"a_id":5490817,"p_id":170,"pc_id":185,"pl_id":27060,"id":2}],"eid":"pqhJD","s":"s"});</script><div id="msmaflink-pqhJD">リンク</div><!-- MoshimoAffiliateEasyLink END -->
<!-- /affiliate -->
