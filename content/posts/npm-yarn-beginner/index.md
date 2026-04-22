---
title: "【初心者向け】npmとは？yarn との違いも含めて5分で解説"
date: 2026-04-20
tags: ["初心者向け", "開発環境"]
description: "npmとは何か、yarnとの違いは何かを初心者向けに解説。パッケージマネージャーの基本が5分で分かります。"
draft: false
---

## この記事で解決すること

「npm install って何をしているの？」「yarnって何？npmと何が違うの？」

JavaScriptの開発を始めると必ず出会う「npm」と「yarn」を、ゼロから解説します。

## npmとは

npmは「Node Package Manager」の略で、JavaScriptのライブラリ（パッケージ）を管理するツールです。

Pythonでいう `pip`、Rubyでいう `gem` と同じ役割です。

### 何ができるのか

- 他の人が作ったライブラリをインストールする
- プロジェクトで使っているライブラリの一覧を管理する
- ライブラリのバージョンを管理する

### 具体例

Webサイトにアニメーションを追加したいとき、自分でゼロから書く代わりに：

```bash
npm install animate.css
```

これだけで、世界中の開発者が使っている「animate.css」というライブラリがプロジェクトに追加されます。

{{< ad >}}

## package.jsonとは

`npm install` を実行すると、`package.json` というファイルにライブラリの情報が記録されます。

```json
{
  "name": "my-project",
  "dependencies": {
    "animate.css": "^4.1.1",
    "axios": "^1.6.0"
  }
}
```

これは「このプロジェクトはanimate.cssとaxiosを使っています」という設計図です。

チームで開発するとき、`package.json` を共有すれば、他の人も `npm install` するだけで同じ環境が作れます。

## node_modulesフォルダ

`npm install` すると `node_modules` というフォルダが作られます。ここにライブラリの実体が入ります。

このフォルダは非常に大きくなるので、GitHubには上げません。`.gitignore` に追加してください。

```
node_modules/
```

## yarnとは

yarnはnpmの代替ツールです。Facebookが開発しました。

やることはnpmとほぼ同じですが、以下の違いがあります。

| | npm | yarn |
|---|---|---|
| インストール速度 | 普通 | やや速い |
| コマンド | `npm install` | `yarn add` |
| ロックファイル | `package-lock.json` | `yarn.lock` |
| 標準搭載 | Node.jsに付属 | 別途インストール必要 |

### どっちを使えばいい？

初心者はnpmで十分です。Node.jsをインストールすれば自動で使えます。

プロジェクトに `yarn.lock` があればyarn、`package-lock.json` があればnpmを使ってください。混ぜるとトラブルの原因になります。

## よく使うコマンド

```bash
# ライブラリをインストール
npm install ライブラリ名

# package.jsonに書かれた全ライブラリをインストール
npm install

# ライブラリを削除
npm uninstall ライブラリ名

# プロジェクトを初期化（package.jsonを作る）
npm init -y
```

## まとめ

- npmはJavaScriptのライブラリを管理するツール
- `npm install` でライブラリを追加できる
- `package.json` がライブラリの設計図
- `node_modules` はGitHubに上げない
- yarnはnpmの代替。初心者はnpmでOK

---
### あわせて読みたい
- [JSONとは？5分で分かるデータ形式の基本](/posts/json-what-is-it/)
- [環境変数とは？.envファイルの使い方をゼロから解説](/posts/env-variables-beginner/)

<!-- affiliate -->
## 関連リソース

JavaScriptをもっと学びたい方へ：

<!-- START MoshimoAffiliateEasyLink --><script type="text/javascript">(function(b,c,f,g,a,d,e){b.MoshimoAffiliateObject=a;b[a]=b[a]||function(){arguments.currentScript=c.currentScript||c.scripts[c.scripts.length-2];(b[a].q=b[a].q||[]).push(arguments)};c.getElementById(a)||(d=c.createElement(f),d.src=g,d.id=a,e=c.getElementsByTagName("body")[0],e.appendChild(d))})(window,document,"script","//dn.msmstatic.com/site/cardlink/bundle.js?20220329","msmaflink");msmaflink({"n":"確かな力が身につくJavaScript「超」入門 第2版","b":"","t":"","d":"https:\/\/thumbnail.image.rakuten.co.jp","c_p":"","p":[""],"u":{"u":"https:\/\/search.rakuten.co.jp\/search\/mall\/JavaScript%20%E8%B6%85%E5%85%A5%E9%96%80%20%E7%AC%AC2%E7%89%88\/","t":"rakuten","r_v":""},"v":"2.1","b_l":[{"id":1,"u_tx":"楽天市場で見る","u_bc":"#f76956","u_url":"https:\/\/search.rakuten.co.jp\/search\/mall\/JavaScript%20%E8%B6%85%E5%85%A5%E9%96%80%20%E7%AC%AC2%E7%89%88\/","a_id":5490814,"p_id":54,"pl_id":27059,"pc_id":54,"s_n":"rakuten","u_so":1},{"u_bc":"#f79256","u_tx":"Amazonで見る","u_url":"https:\/\/www.amazon.co.jp\/s\/ref=nb_sb_noss_1?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&url=search-alias%3Daps&field-keywords=%E7%A2%BA%E3%81%8B%E3%81%AA%E5%8A%9B%E3%81%8C%E8%BA%AB%E3%81%AB%E3%81%A4%E3%81%8FJavaScript%E8%B6%85%E5%85%A5%E9%96%80%20%E7%AC%AC2%E7%89%88","s_n":"amazon","u_so":2,"a_id":5490817,"p_id":170,"pc_id":185,"pl_id":27060,"id":2}],"eid":"SZtcD","s":"s"});</script><div id="msmaflink-SZtcD">リンク</div><!-- MoshimoAffiliateEasyLink END -->
<!-- /affiliate -->
