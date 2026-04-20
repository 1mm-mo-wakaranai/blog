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

プログラミングをもっと学びたい方へ：

<!-- START MoshimoAffiliateEasyLink --><script type="text/javascript">(function(b,c,f,g,a,d,e){b.MoshimoAffiliateObject=a;b[a]=b[a]||function(){arguments.currentScript=c.currentScript||c.scripts[c.scripts.length-2];(b[a].q=b[a].q||[]).push(arguments)};c.getElementById(a)||(d=c.createElement(f),d.src=g,d.id=a,e=c.getElementsByTagName("body")[0],e.appendChild(d))})(window,document,"script","//dn.msmstatic.com/site/cardlink/bundle.js?20220329","msmaflink");msmaflink({"n":"実践Claude Code入門ー現場で活用するためのAIコーディングの思考法 [ 西見 公宏 ]","b":"","t":"","d":"https:\/\/thumbnail.image.rakuten.co.jp","c_p":"","p":["\/@0_mall\/book\/cabinet\/3540\/9784297153540_1_34.jpg"],"u":{"u":"https:\/\/item.rakuten.co.jp\/book\/18439208\/","t":"rakuten","r_v":""},"v":"2.1","b_l":[{"id":1,"u_tx":"楽天市場で見る","u_bc":"#f76956","u_url":"https:\/\/item.rakuten.co.jp\/book\/18439208\/","a_id":5490814,"p_id":54,"pl_id":27059,"pc_id":54,"s_n":"rakuten","u_so":1}],"eid":"a8XaY","s":"s"});</script><div id="msmaflink-a8XaY">リンク</div><!-- MoshimoAffiliateEasyLink END -->
<!-- /affiliate -->
