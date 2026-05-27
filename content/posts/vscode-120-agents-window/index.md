---
title: "【VS Code 1.120】Agents Windowが安定版に！BYOKモデル管理・Markdownプレビュー改善まとめ"
date: 2026-05-22
tags: ["VS Code", "エディタ", "AIエージェント", "アップデート"]
description: "VS Code 1.120でAgents Windowが安定版に昇格。BYOKモデルの使用量確認やMarkdown差分プレビューなど、開発者に嬉しい新機能をまとめました"
draft: true
---

## この記事で分かること

{{< chat name="初心者ちゃん" icon="/images/rin-icon.png" direction="left" >}}
VS Codeがまたアップデートされたみたい。Agents Windowって何？使った方がいいの？
{{< /chat >}}

{{< chat name="全知全能くん" icon="/images/zenchi-icon.png" direction="right" >}}
AIエージェント（Copilot、Claude、Codexなど）を一元管理できるウィンドウだよ。1.120でついに安定版になったから、詳しく解説するね。
{{< /chat >}}

「VS Code 1.120で何が変わったの？」「Agents Windowって何ができるの？」という方へ。

この記事では、2026年5月にリリースされたVS Code 1.120の主要な新機能を解説します。

{{< ad >}}

## VS Code 1.120の概要

| 項目 | 内容 |
|------|------|
| バージョン | 1.120 |
| リリース時期 | 2026年5月 |
| 主要テーマ | Agents Window安定版、BYOKモデル管理、Markdown改善 |
| 前バージョン | 1.119 |

## 主要な新機能

### 1. Agents Windowが安定版（Stable）に

{{< chat name="初心者ちゃん" icon="/images/rin-icon.png" direction="left" >}}
Agents Windowってどこから開くの？今まで見たことないんだけど…
{{< /chat >}}

{{< chat name="全知全能くん" icon="/images/zenchi-icon.png" direction="right" >}}
コマンドパレット（Ctrl+Shift+P）で「Agents」と検索すると出てくるよ。GitHub Copilot、Claude、Codexなど複数のAIエージェントをまとめて管理できる画面なんだ。
{{< /chat >}}

Agents Windowは、VS Code内で動作する複数のAIエージェントを一元管理するためのUIです。

これまでInsiders版（プレビュー版）でのみ利用可能でしたが、1.120で安定版に昇格しました。

**Agents Windowでできること：**

- 複数のAIエージェント（Copilot、Claude、Codex等）のセッションを一覧表示
- ローカルエージェントとクラウドエージェントの切り替え
- 実行中のタスクの進捗確認
- エージェントへの指示の送信・中断

```
開き方: Ctrl+Shift+P → "Open Agents Window"
```

### 2. BYOKモデルの可視性とコントロール強化

{{< chat name="初心者ちゃん" icon="/images/rin-icon.png" direction="left" >}}
BYOKって何…？聞いたことない。
{{< /chat >}}

{{< chat name="全知全能くん" icon="/images/zenchi-icon.png" direction="right" >}}
「Bring Your Own Key」の略で、自分のAPIキーを使ってAIモデルを動かす仕組みだよ。OpenAIやAnthropicのAPIキーを登録して、VS Code内で直接使えるんだ。
{{< /chat >}}

BYOK（Bring Your Own Key）は、自分のAPIキーを使ってAIモデルにアクセスする機能です。1.120では以下が改善されました。

**トークン使用量の確認**

BYOKモデルを使った際のトークン消費量が、ステータスバーに表示されるようになりました。APIの利用料金を把握しやすくなります。

**Thinking Effort（思考量）の調整**

モデルの「考える深さ」を調整できるようになりました。

- **Low**: 高速だが浅い回答（簡単な質問向け）
- **Medium**: バランス型（通常の開発作業）
- **High**: 深い推論（複雑なバグ修正・設計判断）

設定画面から、タスクの種類に応じてデフォルトのThinking Effortを変更できます。

### 3. ターミナルコマンドのリスクバッジ

ターミナルでコマンドを実行する際、AIエージェントが提案するコマンドに「リスクバッジ」が表示されるようになりました。

| バッジ | 意味 |
|--------|------|
| 🟢 Safe | 読み取り専用。副作用なし |
| 🟡 Moderate | ファイル変更あり。確認推奨 |
| 🔴 Dangerous | 破壊的操作。必ず確認 |

例えば `rm -rf` や `git push --force` のようなコマンドには赤いバッジが付き、実行前に確認を求められます。

### 4. Markdown差分プレビュー

{{< chat name="初心者ちゃん" icon="/images/rin-icon.png" direction="left" >}}
Markdownの差分プレビューって、今までなかったの？
{{< /chat >}}

{{< chat name="全知全能くん" icon="/images/zenchi-icon.png" direction="right" >}}
差分表示自体はあったけど、生のMarkdown構文で表示されてたんだ。1.120からはレンダリングされた状態で差分が見られるようになったよ。見出しや太字がちゃんと反映された状態で比較できる。
{{< /chat >}}

AIエージェントがMarkdownファイルを編集した際、変更前後の差分がレンダリングされた状態で表示されるようになりました。

**Before（1.119まで）:**
```
- ## 古い見出し
+ ## 新しい見出し
```

**After（1.120から）:**
レンダリングされた見出しの状態で、変更箇所がハイライト表示されます。

READMEやドキュメントの編集時に、実際の見た目を確認しながらレビューできるようになりました。

### 5. エージェントセーフティ機能

AIエージェントが実行するアクションに対して、より細かいアクセス制御が可能になりました。

- ファイル書き込みの許可/拒否をフォルダ単位で設定
- 特定のコマンドの実行をブロック
- ネットワークアクセスの制限

設定ファイル（`.vscode/settings.json`）で制御できます。

## アップデート方法

VS Codeは通常、自動でアップデートされます。手動で確認する場合：

1. `Ctrl+Shift+P` でコマンドパレットを開く
2. 「Check for Updates」と入力して実行
3. アップデートがあればインストール

または、ヘルプ → 更新の確認 からも可能です。

VS Codeの基本的なショートカットについては[VS Codeショートカット入門](/posts/vscode-shortcuts-beginner/)も参考にしてください。

## 1.119からの変更点まとめ

| 機能 | 1.119 | 1.120 |
|------|-------|-------|
| Agents Window | プレビュー | **安定版** |
| BYOKトークン表示 | なし | **あり** |
| Thinking Effort調整 | なし | **あり** |
| リスクバッジ | なし | **あり** |
| Markdown差分プレビュー | 生テキスト | **レンダリング済み** |

## こんな人におすすめ

- GitHub Copilotを日常的に使っている人
- 複数のAIエージェントを使い分けたい人
- BYOKで自分のAPIキーを使っている人
- チーム開発でAIの利用を管理したい人

## よくある質問（FAQ）

### Q: Agents Windowを使うにはCopilotの有料プランが必要ですか？

A: Agents Window自体は無料で使えます。ただし、表示されるエージェント（Copilot等）の利用には各サービスのプランが必要です。

### Q: BYOKで使えるモデルは何ですか？

A: OpenAI（GPT-4o、GPT-5系）、Anthropic（Claude）、Google（Gemini）などのAPIキーを登録できます。対応モデルは順次追加されています。

### Q: 自動アップデートを無効にしている場合は？

A: VS Code公式サイトから最新版をダウンロードしてインストールしてください。設定で `update.mode` を `manual` にしている場合は手動更新が必要です。

### Q: 1.119の記事との違いは？

A: [VS Code 1.119の記事](/posts/vscode-119-update/)ではCopilot Enterprise機能やエージェント体験の改善を紹介しました。1.120はそれらが安定版になった「仕上げ」のリリースです。

{{< chat name="初心者ちゃん" icon="/images/rin-icon.png" direction="left" >}}
リスクバッジ便利そう…！危ないコマンドを間違えて実行しちゃうことあるから助かる。
{{< /chat >}}

{{< chat name="全知全能くん" icon="/images/zenchi-icon.png" direction="right" >}}
初心者にこそ嬉しい機能だよね。VS Codeは自動アップデートされるから、次回起動時には使えるようになってるはず。試してみて！
{{< /chat >}}

## まとめ

- VS Code 1.120でAgents Windowが安定版に昇格
- BYOKモデルのトークン使用量が可視化された
- Thinking Effort（思考の深さ）を調整可能に
- ターミナルコマンドにリスクバッジが表示される
- Markdown差分がレンダリング済みの状態でプレビュー可能に
- エージェントのアクセス制御が細かく設定できるように

---
### あわせて読みたい
- [VS Code 1.119アップデートまとめ](/posts/vscode-119-update/)
- [VS Codeショートカット入門](/posts/vscode-shortcuts-beginner/)
