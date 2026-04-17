---
title: "【VS Code】最初に覚えるべき設定とショートカット10選"
date: 2026-04-11
tags: ["VS Code", "初心者向け", "開発環境"]
description: "VS Codeをインストールしたばかりの初心者向けに、最初に覚えるべき設定とショートカットを10個だけ厳選して紹介します。"
draft: false
---

## この記事で解決すること

「VS Codeをインストールしたけど、メモ帳と何が違うの？」

そう思っている人向けに、最初にやるべき設定と覚えるべき操作を10個だけに絞りました。全部覚えなくていいです。使いながら少しずつ身につければOK。

VS Code（Visual Studio Code）は、Microsoftが作った無料のコードエディタです。プログラミングをする人のほとんどが使っています。


{{< ad >}}

## 最初にやる設定（3つ）

### 1. 日本語化

VS Codeは初期状態だと英語です。

1. `Ctrl + Shift + X` を押す（拡張機能の画面が開く）
2. 検索欄に `Japanese` と入力
3. 「Japanese Language Pack for Visual Studio Code」をインストール
4. VS Codeを再起動

### 2. 自動保存をオンにする

ファイル → ユーザー設定 → 設定 を開いて、検索欄に `auto save` と入力。

「Files: Auto Save」を `afterDelay` に変更。

これで、編集するたびに自動で保存されます。保存し忘れて「変更が反映されない」と悩むことがなくなります。

### 3. テーマを変える（お好みで）

`Ctrl + K` → `Ctrl + T` でテーマ選択画面が開きます。

好きな見た目を選んでください。暗い画面（ダークテーマ）が目に優しくて人気です。

## 覚えるショートカット（7つ）

全部Windowsのキーです。Macの人は `Ctrl` を `Cmd` に読み替えてください。

### 4. ファイルを開く: `Ctrl + P`

フォルダ内のファイルをファイル名で検索して開けます。マウスでフォルダを辿るより圧倒的に速い。

### 5. 全体検索: `Ctrl + Shift + F`

プロジェクト内の全ファイルからテキストを検索します。「この変数どこで使ってたっけ？」というときに使います。

### 6. 行の複製: `Shift + Alt + ↓`

カーソルがある行をそのまま下にコピーします。似たコードを何行も書くときに便利。

### 7. 行の移動: `Alt + ↑` / `Alt + ↓`

カーソルがある行を上下に移動します。コードの順番を入れ替えたいときに、コピペより楽。

### 8. 複数カーソル: `Alt + クリック`

複数の場所に同時にカーソルを置いて、同時に編集できます。同じ変更を何箇所もするときに使います。

### 9. コメントアウト: `Ctrl + /`

選択した行をコメント（無効化）にします。もう一度押すと元に戻ります。

コメントアウトとは、コードを削除せずに一時的に無効にすることです。

### 10. ターミナルを開く: `` Ctrl + ` ``

VS Codeの中でターミナル（コマンドプロンプト）を開けます。別ウィンドウを行き来しなくて済みます。

`` ` `` はバッククォートと呼ばれるキーで、キーボード左上の `半角/全角` キーの隣にあります。

## おすすめ拡張機能（入れておくと便利）

最初から全部入れる必要はないです。必要になったときに入れればOK。

| 拡張機能 | 用途 |
|---|---|
| Prettier | コードを自動で整形してくれる |
| Live Server | HTMLファイルをブラウザでリアルタイムプレビュー |
| indent-rainbow | インデント（字下げ）に色がついて見やすくなる |

拡張機能は `Ctrl + Shift + X` で検索してインストールできます。

## まとめと次のステップ

- まず日本語化・自動保存・テーマの3つを設定
- ショートカットは使うものから少しずつ覚える
- 拡張機能は必要になったら入れる

全部一度に覚えようとしなくて大丈夫です。毎日コードを書いていれば、自然と手が覚えます。

<!-- affiliate -->
## 関連リソース

プログラミングを始めたい方へ：

<!-- START MoshimoAffiliateEasyLink --><script type="text/javascript">(function(b,c,f,g,a,d,e){b.MoshimoAffiliateObject=a;b[a]=b[a]||function(){arguments.currentScript=c.currentScript||c.scripts[c.scripts.length-2];(b[a].q=b[a].q||[]).push(arguments)};c.getElementById(a)||(d=c.createElement(f),d.src=g,d.id=a,e=c.getElementsByTagName("body")[0],e.appendChild(d))})(window,document,"script","//dn.msmstatic.com/site/cardlink/bundle.js?20220329","msmaflink");msmaflink({"n":"実践Claude Code入門ー現場で活用するためのAIコーディングの思考法 [ 西見 公宏 ]","b":"","t":"","d":"https:\/\/thumbnail.image.rakuten.co.jp","c_p":"","p":["\/@0_mall\/book\/cabinet\/3540\/9784297153540_1_34.jpg"],"u":{"u":"https:\/\/item.rakuten.co.jp\/book\/18439208\/","t":"rakuten","r_v":""},"v":"2.1","b_l":[{"id":1,"u_tx":"楽天市場で見る","u_bc":"#f76956","u_url":"https:\/\/item.rakuten.co.jp\/book\/18439208\/","a_id":5490814,"p_id":54,"pl_id":27059,"pc_id":54,"s_n":"rakuten","u_so":1}],"eid":"a8XaY","s":"s"});</script><div id="msmaflink-a8XaY">リンク</div><!-- MoshimoAffiliateEasyLink END -->
<!-- /affiliate -->
