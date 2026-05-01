---
title: "【Node.js】v20のサポートが終了 ― 今すぐ確認すべきことと移行手順"
date: 2026-05-01
tags: ["Node.js", "初心者向け", "開発環境"]
description: "Node.js 20が2026年4月30日にサポート終了。自分のバージョンの確認方法、Node.js 22/24への移行手順、注意点を初心者向けに解説します。"
draft: false
---

## この記事で解決すること

「Node.jsのバージョンとか気にしたことないけど、大丈夫？」

2026年4月30日、Node.js 20のサポートが正式に終了しました。サポート終了後はセキュリティパッチが提供されなくなります。自分のNode.jsのバージョンを確認して、必要なら移行しましょう。

{{< ad >}}

## 何が起きたのか

Node.js 20は2023年4月にリリースされ、2023年10月にLTS（長期サポート）版になりました。約3年間のサポート期間を経て、2026年4月30日にEnd of Life（EOL）を迎えました。

### サポート終了で何が変わるのか

- セキュリティの脆弱性が見つかっても修正されない
- バグが見つかっても修正されない
- 新しいnpmパッケージがNode.js 20で動かなくなる可能性がある
- AWS LambdaやVercelなどのクラウドサービスがNode.js 20のサポートを順次終了する

つまり、Node.js 20を使い続けるとセキュリティリスクが高まり、いずれ動かなくなるパッケージも出てきます。

## 自分のバージョンを確認する

ターミナルで以下のコマンドを実行してください。

```bash
node -v
```

表示されたバージョンが `v20.x.x` なら、移行が必要です。

```bash
# 例: 移行が必要
v20.20.2

# 例: 移行不要（Node.js 22 LTS）
v22.15.0

# 例: 移行不要（Node.js 24 LTS）
v24.14.0
```

ターミナルの操作に不安がある方は[コマンドラインが怖い人へ ― 覚えるコマンド5つだけ](/posts/command-line-scary/)を先に読んでおくと安心です。

## どのバージョンに移行すべきか

### 推奨: Node.js 22（LTS）

現在のLTS（長期サポート）版はNode.js 22です。2028年4月までサポートされます。

- 安定性を重視する方向け
- ほとんどのnpmパッケージが対応済み
- 本番環境での利用に適している

### もう一つの選択肢: Node.js 24（LTS）

Node.js 24もLTS版として利用可能です。2028年4月までサポートされます。

- 最新の機能を使いたい方向け
- Node.js 22からの移行ガイドが公式に用意されている

### 避けるべき: Node.js 25（Current）

Node.js 25は「Current」版で、LTSではありません。6ヶ月でサポートが切れるため、本番環境には向きません。

## 移行手順

### 方法1: nvm（Node Version Manager）を使う（推奨）

nvmを使っている場合は、コマンド一つで切り替えられます。

```bash
# Node.js 22の最新版をインストール
nvm install 22

# デフォルトに設定
nvm alias default 22

# 確認
node -v
```

nvmをまだ使っていない方は、この機会に導入をおすすめします。複数のNode.jsバージョンを簡単に切り替えられるツールです。

### 方法2: 公式サイトからダウンロード

1. https://nodejs.org にアクセス
2. LTS版（推奨版）のダウンロードボタンをクリック
3. インストーラーを実行
4. ターミナルを再起動して `node -v` で確認

### 方法3: Voltaを使う

Voltaはnvmの代替ツールで、プロジェクトごとにNode.jsのバージョンを自動で切り替えてくれます。

```bash
# Voltaのインストール（Mac/Linux）
curl https://get.volta.sh | bash

# Node.js 22をインストール
volta install node@22

# 確認
node -v
```

## 移行後に確認すること

### 1. プロジェクトの動作確認

Node.jsのバージョンを上げたら、プロジェクトが正常に動くか確認してください。

```bash
# 依存パッケージを再インストール
rm -rf node_modules
npm install

# テストを実行（テストがある場合）
npm test

# 開発サーバーを起動して動作確認
npm run dev
```

npmの基本操作については[npm/yarn入門ガイド](/posts/npm-yarn-beginner/)で解説しています。

### 2. package.jsonのenginesフィールド

プロジェクトの `package.json` に `engines` フィールドがある場合は、対応バージョンを更新してください。

```json
{
  "engines": {
    "node": ">=22.0.0"
  }
}
```

JSONの書き方に不安がある方は[JSONとは？の解説記事](/posts/json-what-is-it/)も参考になります。

### 3. CI/CDの設定

GitHub ActionsなどのCI/CDでNode.jsのバージョンを指定している場合は、そちらも更新が必要です。

```yaml
# .github/workflows/test.yml の例
- uses: actions/setup-node@v4
  with:
    node-version: '22'
```

GitHubの基本については[GitHubとは？の解説記事](/posts/github-what-is-it/)で紹介しています。

### 4. クラウドサービスの設定

以下のサービスを使っている場合は、Node.jsのランタイムバージョンを確認・更新してください。

| サービス | 確認場所 |
|---|---|
| AWS Lambda | 関数の設定 → ランタイム |
| Vercel | `package.json` の `engines` または管理画面 |
| Netlify | 環境変数 `NODE_VERSION` |
| Heroku | `package.json` の `engines` |
| GitHub Pages | GitHub Actionsのワークフロー |

## Node.js 20 → 22で変わること

Node.js 22にはいくつかの変更点があります。移行時に影響する可能性があるものを挙げます。

### 破壊的変更（注意が必要）

- `require()` でESモジュールを読み込む動作がデフォルトで有効に
- 一部の非推奨APIが削除
- V8エンジンのアップデートに伴う挙動変更

### 便利な新機能

- `fetch()` がグローバルで安定版に（実験的フラグ不要）
- テストランナーの改善
- パフォーマンスの向上

fetch APIの使い方については[JavaScript Fetch APIの使い方](/posts/javascript-fetch-api/)で解説しています。

## よくある質問（FAQ）

### Q: Node.js 20を使い続けるとどうなりますか？
A: すぐに動かなくなるわけではありませんが、セキュリティパッチが提供されなくなります。新しいnpmパッケージがNode.js 20をサポートしなくなる可能性もあります。できるだけ早く移行することをおすすめします。

### Q: 移行したらプロジェクトが動かなくなりませんか？
A: ほとんどのプロジェクトはそのまま動きます。ただし、一部のパッケージが互換性の問題を起こす可能性があるため、移行後にテストを実行して確認してください。

### Q: nvmとVoltaはどちらがいいですか？
A: nvmは歴史が長く情報が多いです。Voltaはプロジェクトごとの自動切り替えが便利です。チームで使う場合はVolta、個人で使う場合はどちらでもOKです。

### Q: Node.js 22と24、どちらを選ぶべきですか？
A: 安定性を重視するならNode.js 22がおすすめです。どちらも2028年4月までサポートされますが、Node.js 22のほうがnpmパッケージの対応状況が安定しています。

## まとめ

- Node.js 20は2026年4月30日にサポート終了
- `node -v` でバージョンを確認。v20.x.xなら移行が必要
- 移行先はNode.js 22（LTS）が推奨
- nvmを使えばコマンド一つで切り替え可能
- 移行後は `npm install` → テスト → CI/CD設定の更新を忘れずに

---
### あわせて読みたい
- [npm/yarnの違いと使い方 ― パッケージ管理の基本](/posts/npm-yarn-beginner/)
- [GitHubとは？アカウント作成から最初のリポジトリまで](/posts/github-what-is-it/)

<!-- affiliate -->
## 関連リソース

Node.jsをもっと学びたい方へ：

<!-- START MoshimoAffiliateEasyLink --><script type="text/javascript">(function(b,c,f,g,a,d,e){b.MoshimoAffiliateObject=a;b[a]=b[a]||function(){arguments.currentScript=c.currentScript||c.scripts[c.scripts.length-2];(b[a].q=b[a].q||[]).push(arguments)};c.getElementById(a)||(d=c.createElement(f),d.src=g,d.id=a,e=c.getElementsByTagName("body")[0],e.appendChild(d))})(window,document,"script","//dn.msmstatic.com/site/cardlink/bundle.js?20220329","msmaflink");msmaflink({"n":"Node.js 入門 サーバーサイドJavaScript","b":"","t":"","d":"https:\/\/thumbnail.image.rakuten.co.jp","c_p":"","p":[""],"u":{"u":"https:\/\/search.rakuten.co.jp\/search\/mall\/Node.js%20%E5%85%A5%E9%96%80\/","t":"rakuten","r_v":""},"v":"2.1","b_l":[{"id":1,"u_tx":"楽天市場で見る","u_bc":"#f76956","u_url":"https:\/\/search.rakuten.co.jp\/search\/mall\/Node.js%20%E5%85%A5%E9%96%80\/","a_id":5490814,"p_id":54,"pl_id":27059,"pc_id":54,"s_n":"rakuten","u_so":1},{"u_bc":"#f79256","u_tx":"Amazonで見る","u_url":"https:\/\/www.amazon.co.jp\/s\/ref=nb_sb_noss_1?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&url=search-alias%3Daps&field-keywords=Node.js%E5%85%A5%E9%96%80","s_n":"amazon","u_so":2,"a_id":5490817,"p_id":170,"pc_id":185,"pl_id":27060,"id":2}],"eid":"nJ20e","s":"s"});</script><div id="msmaflink-nJ20e">リンク</div><!-- MoshimoAffiliateEasyLink END -->
<!-- /affiliate -->
