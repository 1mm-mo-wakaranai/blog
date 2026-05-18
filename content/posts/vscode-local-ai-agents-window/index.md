---
title: "【VS Code最新】Agents Windowでローカルai対応！自分のPCでAIモデルを動かす方法"
date: 2026-05-18
draft: false
tags: ["VS Code", "AI", "開発ツール", "ローカルAI"]
categories: ["プログラミング"]
description: "VS CodeのAgents Windowがローカルaiモデルに対応。クラウドに送らず自分のPCでAIを動かせるBYOLM機能の概要と設定方法を解説します。"
cover:
  image: "images/cover.png"
  alt: "VS Code Agents WindowローカルAI対応の解説記事カバー画像"
  relative: true
  hidden: false
---

## この記事で解決すること

「VS CodeでローカルAIモデルが使えるようになったって本当？」「コードをクラウドに送りたくないけどAI補完は使いたい」という方へ。

この記事では、VS Codeの新機能「Agents Window」でローカルAIモデルを使う方法を解説します。

## VS Code Agents Windowとは

VS Code Agents Windowは、VS Code Insidersに搭載された新しいコンパニオンアプリです。

通常のVS Codeとは別ウィンドウで動作し、AIエージェントに特化した環境を提供します。

| 項目 | 内容 |
|------|------|
| 搭載バージョン | VS Code 1.118〜（Insiders） |
| 特徴 | エージェント専用の軽量環境 |
| 新機能 | ローカルAIモデル対応（BYOLM） |
| 対応OS | Windows、macOS、Linux |

## BYOLM（Bring Your Own Language Model）とは

BYOLMは「自分のAIモデルを持ち込む」機能です。

これまでVS CodeのAI機能（GitHub Copilot等）は、クラウド上のAIモデルを使っていました。
BYOLMを使うと、自分のPC上で動くローカルAIモデルをVS Codeに接続できます。

### ローカルAIモデルのメリット

- **プライバシー**: コードがインターネットに送信されない
- **オフライン対応**: ネット接続なしでもAI補完が使える
- **レイテンシ**: ネットワーク遅延がないため応答が速い場合がある
- **コスト**: APIの従量課金が発生しない
- **データ主権**: 企業のセキュリティポリシーに準拠しやすい

### ローカルAIモデルのデメリット

- **性能**: クラウドの大規模モデル（GPT-5.5等）には劣る
- **PCスペック**: GPUメモリが必要（最低8GB VRAM推奨）
- **セットアップ**: 初期設定がやや複雑

## 対応しているローカルAIモデル

VS Code Agents Windowは、以下のようなローカルAIモデルと連携できます。

| モデル | 特徴 | 必要VRAM |
|--------|------|----------|
| Ollama経由のモデル | セットアップが簡単 | 4GB〜 |
| llama.cpp | 軽量で高速 | 4GB〜 |
| LM Studio | GUIで管理できる | 8GB〜 |

具体的なモデルとしては、以下が人気です。

- **CodeLlama**: Meta製のコーディング特化モデル
- **DeepSeek Coder**: コード生成に強い軽量モデル
- **Mistral**: 汎用的で高性能な中型モデル
- **Phi-3**: Microsoft製の軽量モデル

## セットアップ方法

### ステップ1: VS Code Insidersをインストール

Agents Windowは現在VS Code Insiders版で利用できます。

公式サイト（code.visualstudio.com/insiders）からダウンロードしてインストールします。
通常のVS Codeと共存できるので、既存の環境に影響はありません。

### ステップ2: ローカルAIモデルを準備

最も簡単な方法は**Ollama**を使うことです。

```powershell
# Ollamaのインストール（公式サイトからダウンロード）
# インストール後、コーディング向けモデルをダウンロード
ollama pull codellama:7b
```

モデルのダウンロードには数分〜数十分かかります（モデルサイズによる）。

### ステップ3: Ollamaサーバーを起動

```powershell
# Ollamaは通常インストール時に自動起動する
# 手動で起動する場合
ollama serve
```

デフォルトで `http://localhost:11434` でAPIが公開されます。

### ステップ4: VS Codeで接続設定

VS Code Insidersを開き、設定（`Ctrl + ,`）で以下を検索します。

```json
{
  "chat.languageModel.localModels": [
    {
      "provider": "ollama",
      "model": "codellama:7b",
      "endpoint": "http://localhost:11434"
    }
  ]
}
```

設定後、チャットパネルでモデル選択時にローカルモデルが表示されます。

### ステップ5: Agents Windowで使う

コマンドパレット（`Ctrl + Shift + P`）から「Open Agents Window」を実行します。
Agents Window内でローカルモデルを選択してタスクを実行できます。

## クラウドモデルとの使い分け

ローカルモデルとクラウドモデルは、用途に応じて切り替えるのがおすすめです。

| 用途 | おすすめ |
|------|----------|
| 機密性の高いコード | ローカルモデル |
| 複雑なリファクタリング | クラウドモデル（GPT-5.5等） |
| オフライン環境 | ローカルモデル |
| 大規模プロジェクトの理解 | クラウドモデル |
| 簡単なコード補完 | ローカルモデル（十分な性能） |
| 新しいAPIの使い方を聞く | クラウドモデル（最新知識） |

VS Codeでは、タスクごとにモデルを切り替えられるため、両方を併用するのが現実的です。

## 必要なPCスペック

ローカルAIモデルを快適に動かすには、以下のスペックが目安です。

| 項目 | 最低要件 | 推奨 |
|------|----------|------|
| GPU VRAM | 4GB | 8GB以上 |
| RAM | 16GB | 32GB |
| ストレージ | SSD 10GB空き | SSD 50GB空き |
| GPU | NVIDIA GTX 1060相当 | NVIDIA RTX 3060以上 |

GPUがない場合でもCPUモードで動作しますが、応答速度が大幅に遅くなります。

## 注意点

### まだInsiders版のみ

この機能は現在VS Code Insiders版でのみ利用可能です。
安定版への搭載時期は未定ですが、数ヶ月以内に来る可能性が高いです。

### モデルの品質はまちまち

ローカルモデルはパラメータ数が小さいため、GPT-5.5やClaude 4のような大規模モデルと比べると精度が劣ります。

簡単なコード補完や定型的なタスクには十分ですが、複雑な設計判断を求めるタスクにはクラウドモデルを使いましょう。

### 企業利用の場合

企業のセキュリティポリシーでクラウドAIが使えない場合、ローカルモデルは有力な選択肢です。
ただし、IT部門と相談の上で導入してください。

## よくある質問（FAQ）

### Q: GitHub Copilotの契約は必要？

A: ローカルモデルのみを使う場合、Copilotの契約は不要です。ただし、Agents Windowの一部機能はCopilot契約が必要な場合があります。

### Q: MacBookでも動く？

A: はい。Apple Silicon（M1/M2/M3/M4）搭載のMacBookは、統合メモリを活用してローカルモデルを効率的に動かせます。16GB以上のメモリがあれば快適です。

### Q: どのモデルがおすすめ？

A: 初めてなら「Ollama + CodeLlama 7B」がおすすめです。セットアップが簡単で、コーディング用途に最適化されています。VRAMに余裕があれば13Bモデルも試してみてください。

### Q: 通常のVS Codeでも使える？

A: 現在はInsiders版のみです。安定版への搭載は今後のアップデートで予定されています。[VS Code 1.119の記事](/posts/vscode-119-update/)で最新のアップデート情報を確認できます。

## まとめ

- VS Code Agents WindowがローカルAIモデルに対応（BYOLM機能）
- コードをクラウドに送らずにAI補完が使える
- Ollama + CodeLlamaの組み合わせが初心者におすすめ
- クラウドモデルとの使い分けが現実的
- 現在はVS Code Insiders版で利用可能

---
### あわせて読みたい
- [VS Code 1.119アップデートまとめ！ブラウザタブ共有やAIエージェント強化](/posts/vscode-119-update/)
- [GitHub Copilot無料プランでできること・制限まとめ](/posts/github-copilot-free/)
