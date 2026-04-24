---
title: "【GitHub Copilot】無料プランでAIにコードを書いてもらう方法"
date: 2026-04-16
tags: ["Git", "初心者向け", "開発環境"]
description: "GitHub Copilotの無料プランの始め方と使い方を解説。VS Codeでコードを書くとAIが自動で続きを提案してくれます。"
draft: false
---

## この記事で解決すること

「GitHub Copilotって聞いたことあるけど、無料で使えるの？」

GitHub Copilotは、コードを書いているとAIが自動で続きを提案してくれるツールです。無料プランがあるので、誰でも試せます。


{{< ad >}}

## GitHub Copilotとは

VS Codeなどのエディタに入れる拡張機能で、コードを書き始めるとAIが「こう書きたいんじゃない？」と続きを提案してくれます。

例えば、こう書き始めると：

```python
# ファイルを読み込んで行数を数える
```

AIが自動でこう提案してくれます：

```python
def count_lines(filename):
    with open(filename, 'r') as f:
        return len(f.readlines())
```

Tabキーを押すだけで提案を採用できます。

## 無料プランでできること

| | 無料プラン | 有料プラン（月10ドル） |
|---|---|---|
| コード補完 | 月2,000回まで | 無制限 |
| チャット | 月50回まで | 無制限 |
| 対応エディタ | VS Code等 | VS Code等 |

月2,000回のコード補完は、個人の学習や小さなプロジェクトには十分な量です。

## 始め方

### ステップ1: GitHubアカウントを用意する

GitHubのアカウントが必要です。まだ持っていない方は：

👉 [GitHubのアカウント作成方法はこちら](/posts/github-what-is-it/)

### ステップ2: VS Codeに拡張機能をインストール

1. VS Codeを開く
2. `Ctrl + Shift + X` で拡張機能を開く
3. 「GitHub Copilot」と検索
4. 「GitHub Copilot」をインストール
5. GitHubアカウントでサインインを求められるので、許可する

### ステップ3: 使ってみる

新しいファイルを作って、コメントを書いてみてください。

```python
# 1から10までの合計を計算する
```

数秒待つと、灰色の文字で提案が表示されます。`Tab` キーを押すと採用、`Esc` キーを押すとスキップです。

## 便利な使い方

### コメントから関数を生成

日本語のコメントでやりたいことを書くと、関数を丸ごと提案してくれます。

```python
# リストの中から重複を削除して、昇順に並べ替える関数
```

### テストコードの自動生成

関数を書いた後に「テスト」とコメントすると、テストコードを提案してくれます。

```python
def add(a, b):
    return a + b

# addのテスト
```

### エラーの修正

コードにエラーがあるとき、Copilot Chatに聞けます。

1. `Ctrl + I` でCopilot Chatを開く
2. 「このコードのエラーを修正して」と入力

## 注意点

- Copilotの提案は必ず正しいとは限りません。内容を確認してから採用してください
- 機密情報（APIキーやパスワード）をコードに書くと、Copilotが学習データとして使う可能性があります
- 無料プランの回数制限は月初にリセットされます

## まとめ

- GitHub Copilotは無料プランで月2,000回のコード補完が使える
- VS Codeに拡張機能を入れるだけで始められる
- コメントを書くだけでAIがコードを提案してくれる
- 提案は必ず確認してから採用する

---
### あわせて読みたい
- [VS Code最初に覚えるべき設定とショートカット10選](/posts/vscode-shortcuts-beginner/)
- [GitHubアカウントを作ったけど何すればいい？最初の使い方ガイド](/posts/github-what-is-it/)

<!-- affiliate -->
## 関連リソース

GitHub Copilotをもっと活用したい方へ：

<!-- START MoshimoAffiliateEasyLink --><script type="text/javascript">(function(b,c,f,g,a,d,e){b.MoshimoAffiliateObject=a;b[a]=b[a]||function(){arguments.currentScript=c.currentScript||c.scripts[c.scripts.length-2];(b[a].q=b[a].q||[]).push(arguments)};c.getElementById(a)||(d=c.createElement(f),d.src=g,d.id=a,e=c.getElementsByTagName("body")[0],e.appendChild(d))})(window,document,"script","//dn.msmstatic.com/site/cardlink/bundle.js?20220329","msmaflink");msmaflink({"n":"GitHub Copilot とのペアプロ ― AIとの協働プログラミング入門","b":"","t":"","d":"https:\/\/thumbnail.image.rakuten.co.jp","c_p":"","p":[""],"u":{"u":"https:\/\/search.rakuten.co.jp\/search\/mall\/GitHub%20Copilot%20AI%20%E3%83%97%E3%83%AD%E3%82%B0%E3%83%A9%E3%83%9F%E3%83%B3%E3%82%B0\/","t":"rakuten","r_v":""},"v":"2.1","b_l":[{"id":1,"u_tx":"楽天市場で見る","u_bc":"#f76956","u_url":"https:\/\/search.rakuten.co.jp\/search\/mall\/GitHub%20Copilot%20AI%20%E3%83%97%E3%83%AD%E3%82%B0%E3%83%A9%E3%83%9F%E3%83%B3%E3%82%B0\/","a_id":5490814,"p_id":54,"pl_id":27059,"pc_id":54,"s_n":"rakuten","u_so":1},{"u_bc":"#f79256","u_tx":"Amazonで見る","u_url":"https:\/\/www.amazon.co.jp\/s\/ref=nb_sb_noss_1?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&url=search-alias%3Daps&field-keywords=GitHub%20Copilot%20AI%20%E3%83%97%E3%83%AD%E3%82%B0%E3%83%A9%E3%83%9F%E3%83%B3%E3%82%B0","s_n":"amazon","u_so":2,"a_id":5490817,"p_id":170,"pc_id":185,"pl_id":27060,"id":2}],"eid":"zeB90","s":"s"});</script><div id="msmaflink-zeB90">リンク</div><!-- MoshimoAffiliateEasyLink END -->
<!-- /affiliate -->
