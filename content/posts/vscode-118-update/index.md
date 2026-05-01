---
title: "【VS Code】1.118の新機能まとめ ― リモート操作・セマンティック検索が全員に"
date: 2026-05-01
tags: ["VS Code", "開発環境", "初心者向け"]
description: "VS Code 1.118が4/29にリリース。Copilot CLIのリモート操作、セマンティック検索の全ユーザー開放、トークン効率改善など注目の新機能を解説します。"
draft: false
---

## この記事で解決すること

「VS Codeがまたアップデートされたけど、何が変わったの？」

2026年4月29日にリリースされたVS Code 1.118は、Copilotのエージェント機能とトークン効率に大きなアップデートがありました。初心者にも関係する変更点をまとめます。

{{< ad >}}

## 今回のアップデートの概要

VS Code 1.118の主な変更点は以下の6つです。

1. Copilot CLIセッションのリモート操作
2. セマンティック検索が全ユーザーに開放
3. GitHub全体のテキスト検索
4. チャット履歴からレポート生成（Chronicle）
5. トークン効率の大幅改善
6. TypeScript 7.0ベータ対応

VS Codeの基本操作に不安がある方は、先に[VS Codeの設定とショートカット10選](/posts/vscode-shortcuts-beginner/)を確認しておくと理解しやすくなります。

## Copilot CLIのリモート操作（実験的機能）

これまでCopilot CLIのセッションは、起動したPCの前にいないと操作できませんでした。AIが承認を求めて止まっても、席を外していたら作業がストップしていました。

1.118では、GitHub.comやGitHubモバイルアプリから、進行中のCopilot CLIセッションを監視・操作できるようになりました。

### 有効にする方法

1. VS Codeの設定で `github.copilot.chat.cli.remote.enabled` を有効にする
2. Copilot CLIのチャットで `/remote on` と入力

これで外出先からでもスマホでCopilotの進捗を確認し、承認や指示を出せます。

### こんな場面で便利

- 長時間かかるタスクをCopilotに任せて離席
- 移動中にスマホから進捗確認
- 承認待ちで止まっているタスクをすぐに再開

GitHub Copilotの基本的な使い方は[GitHub Copilot無料プランの使い方](/posts/github-copilot-free/)で解説しています。

## セマンティック検索が全ユーザーに開放

これまでGitHubやAzure DevOpsのリポジトリでしか使えなかった「セマンティック検索」が、すべてのワークスペースで使えるようになりました。

### セマンティック検索とは

通常の検索は、入力した文字列と完全に一致するコードしか見つけられません。セマンティック検索は「意味」で検索します。

たとえば「認証処理はどこ？」と聞くと、コード内に「認証」という文字がなくても、`login`、`signIn`、`verifyCredentials`、`OAuth` といった関連するコードを見つけてくれます。

### 使い方

特別な設定は不要です。Copilotに質問するだけで、自動的にセマンティック検索が使われます。

初回はインデックスの構築に数分かかることがあります。手動で構築したい場合は、コマンドパレット（`Ctrl+Shift+P`）から「Build Codebase semantic index」を実行してください。

## GitHub全体のテキスト検索

セマンティック検索とは逆に、正確な文字列で検索したい場面もあります。エラーメッセージやAPI名を他のリポジトリから探したいときです。

1.118では、`githubTextSearch` ツールが追加されました。GitHubのリポジトリや組織全体に対して、grep的な検索ができます。

今開いているプロジェクト以外のコードベースからも情報を引っ張ってこれるので、ライブラリの使い方を調べるときに便利です。

## Chronicle ― チャット履歴からレポート生成（実験的機能）

Copilotとのチャット履歴を活用する新機能「Chronicle」が追加されました。ローカルのSQLiteデータベースにチャット履歴を記録し、後から検索・要約できます。

### 使えるコマンド

| コマンド | 機能 |
|---|---|
| `/chronicle:standup` | 過去24時間の作業をスタンドアップレポートとして生成 |
| `/chronicle:tips` | 7日間の使い方を分析して改善のヒントを提示 |
| `/chronicle [質問]` | 「昨日どのファイルを編集した？」など自由に質問 |

### 有効にする方法

設定で `github.copilot.chat.localIndex.enabled` を有効にします。

朝のスタンドアップミーティングの準備が一瞬で終わるのは地味に助かります。Gitのコミット履歴の書き方については[Gitコミットメッセージの書き方](/posts/git-commit-message/)も参考になります。

## トークン効率の大幅改善

2026年6月1日からGitHub Copilotが使用量ベースの課金に移行します。それに合わせて、VS Codeのトークン効率が大幅に改善されました。

### 主な改善点

- **プロンプトキャッシュの最適化**: リクエストの93%以上がキャッシュから再利用される
- **ツール検索ツール**: 常時読み込むツールを約30個に絞り、残りは必要なときだけ読み込む。最大20%のトークン節約
- **エージェント検索ツール**: コード検索を専用の小型モデルに委任
- **エージェント実行ツール**: ターミナルコマンドの実行を専用モデルに委任
- **WebSocket対応**: OpenAIモデルが12%高速化

ユーザー側で特別な設定は不要です。アップデートするだけで自動的に効率が改善されます。

## TypeScript 7.0ベータ対応

TypeScript 7.0はネイティブコードで完全に書き直されたバージョンで、パフォーマンスが劇的に向上しています。

VS Codeの開発ビルド自体もTypeScript 7を使うようになり、型チェックが60秒→10秒に短縮されました。

試してみたい方は、VS Codeの拡張機能「TypeScript Native preview」をインストールするだけです。TypeScriptの基本については[TypeScript入門ガイド](/posts/typescript-beginner/)で解説しています。

## その他の変更点

### Git AI共著者の自動追加

Copilotがファイルを変更した場合、コミットにCopilotが共著者として自動追加されるようになりました。設定 `git.addAICoAuthor` で変更できます。

### Dev Containerのロックファイルがデフォルト有効に

Dev Container Featureのバージョンとチェックサムを記録するロックファイル（`devcontainer-lock.json`）がデフォルトで有効になりました。サプライチェーン攻撃への対策です。

### サンドボックスの読み取り権限強化

`$HOME`ディレクトリ全体への読み取りアクセスが自動で許可されなくなりました。コマンドが必要なファイルだけにアクセスするよう制限されています。

## よくある質問（FAQ）

### Q: アップデートはどうやればいいですか？
A: VS Codeは自動でアップデートされます。手動で確認したい場合は、メニューの「ヘルプ」→「更新の確認」から実行できます。

### Q: Copilot CLIのリモート操作は無料プランでも使えますか？
A: Copilot CLIの利用にはCopilotのサブスクリプションが必要です。無料プランでは月50回のチャットリクエストが含まれています。

### Q: セマンティック検索のインデックスはどのくらいの容量を使いますか？
A: プロジェクトの規模によりますが、通常は数十MB程度です。ローカルに保存されるため、ネットワーク帯域には影響しません。

### Q: トークン効率の改善は、自分で何か設定する必要がありますか？
A: ほとんどの改善は自動的に適用されます。一部の実験的機能（ツール検索ツールのGPTモデル対応など）は設定で有効にする必要があります。

## まとめ

- Copilot CLIをスマホからリモート操作できるようになった
- セマンティック検索が全ワークスペースで利用可能に
- トークン効率が大幅改善（6月の課金変更に備えて）
- Chronicle機能でチャット履歴からスタンドアップレポートを自動生成
- TypeScript 7.0ベータ対応で型チェックが6倍高速に

---
### あわせて読みたい
- [VS Codeの設定とショートカット10選](/posts/vscode-shortcuts-beginner/)
- [GitHub Copilot無料プランでAIにコードを書いてもらう方法](/posts/github-copilot-free/)

<!-- affiliate -->
## 関連リソース

VS Codeをもっと使いこなしたい方へ：

<!-- START MoshimoAffiliateEasyLink --><script type="text/javascript">(function(b,c,f,g,a,d,e){b.MoshimoAffiliateObject=a;b[a]=b[a]||function(){arguments.currentScript=c.currentScript||c.scripts[c.scripts.length-2];(b[a].q=b[a].q||[]).push(arguments)};c.getElementById(a)||(d=c.createElement(f),d.src=g,d.id=a,e=c.getElementsByTagName("body")[0],e.appendChild(d))})(window,document,"script","//dn.msmstatic.com/site/cardlink/bundle.js?20220329","msmaflink");msmaflink({"n":"Visual Studio Code完全入門 ― Webクリエイター&エンジニアの作業がはかどる新世代エディター","b":"","t":"","d":"https:\/\/thumbnail.image.rakuten.co.jp","c_p":"","p":[""],"u":{"u":"https:\/\/search.rakuten.co.jp\/search\/mall\/Visual%20Studio%20Code%20%E5%AE%8C%E5%85%A8%E5%85%A5%E9%96%80\/","t":"rakuten","r_v":""},"v":"2.1","b_l":[{"id":1,"u_tx":"楽天市場で見る","u_bc":"#f76956","u_url":"https:\/\/search.rakuten.co.jp\/search\/mall\/Visual%20Studio%20Code%20%E5%AE%8C%E5%85%A8%E5%85%A5%E9%96%80\/","a_id":5490814,"p_id":54,"pl_id":27059,"pc_id":54,"s_n":"rakuten","u_so":1},{"u_bc":"#f79256","u_tx":"Amazonで見る","u_url":"https:\/\/www.amazon.co.jp\/s\/ref=nb_sb_noss_1?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&url=search-alias%3Daps&field-keywords=Visual%20Studio%20Code%E5%AE%8C%E5%85%A8%E5%85%A5%E9%96%80","s_n":"amazon","u_so":2,"a_id":5490817,"p_id":170,"pc_id":185,"pl_id":27060,"id":2}],"eid":"vC118","s":"s"});</script><div id="msmaflink-vC118">リンク</div><!-- MoshimoAffiliateEasyLink END -->
<!-- /affiliate -->
