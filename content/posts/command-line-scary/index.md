---
title: "「黒い画面」が怖い人へ ― コマンドラインの最初の一歩"
date: 2026-04-16
tags: ["初心者向け", "開発環境", "エラー解決"]
description: "コマンドライン（ターミナル）が怖くて触れない初心者向けに、最低限これだけ知っておけば大丈夫という操作を解説します。"
draft: false
---

## この記事で解決すること

プログラミングを始めようとしたら「ターミナルを開いてください」と言われた。

黒い画面が出てきた。何を打てばいいか分からない。変なコマンドを打ったらPCが壊れそう。

その気持ち、よく分かります。この記事では「これだけ知っていれば怖くない」という操作だけに絞って説明します。

## まず知っておくこと

- コマンドを間違えてもPCは壊れません
- 「コマンドが見つかりません」と言われるだけです
- いつでも閉じてやり直せます

ターミナル（コマンドライン）は、マウスの代わりにキーボードでPCを操作する道具です。やっていることはエクスプローラーと同じで、フォルダを開いたりファイルを見たりするだけです。

## ターミナルの開き方

### Windowsの場合

1. キーボードの `Windows` キーを押す
2. `cmd` と入力してEnter

「コマンドプロンプト」という黒い画面が開きます。

もしくは、PowerShellでもOKです：
1. `Windows` キーを押す
2. `powershell` と入力してEnter

### Macの場合

1. `Command + Space` を押す（Spotlight検索が開く）
2. `terminal` と入力してEnter

## 覚えるコマンドは5つだけ

### 1. 今どこにいるか確認する

```bash
# Windows
cd

# Mac / Linux
pwd
```

今自分がどのフォルダにいるかが表示されます。迷子になったらまずこれ。

`cd` は「current directory（今のフォルダ）」、`pwd` は「print working directory（作業フォルダを表示）」の略です。

### 2. フォルダの中身を見る

```bash
# Windows
dir

# Mac / Linux
ls
```

今いるフォルダにあるファイルやフォルダの一覧が表示されます。エクスプローラーで見ているのと同じ情報です。

### 3. フォルダに移動する

```bash
cd フォルダ名
```

例えば、デスクトップに移動したいなら：

```bash
cd Desktop
```

これはWindows、Mac、Linux共通です。

### 4. 一つ上のフォルダに戻る

```bash
cd ..
```

`..` は「一つ上」という意味です。フォルダを間違えて入ったときに使います。

### 5. 画面をきれいにする

```bash
cls    # Windows
clear  # Mac / Linux
```

画面がごちゃごちゃしてきたらこれでリセット。表示が消えるだけで、何かが削除されるわけではないので安心してください。

## 実際にやってみよう

以下の手順を順番にやってみてください。

```bash
# 1. 今どこにいるか確認
cd

# 2. 中身を見る
dir

# 3. デスクトップに移動
cd Desktop

# 4. 中身を見る
dir

# 5. 一つ上に戻る
cd ..

# 6. 画面をきれいにする
cls
```

どうですか？ 何も壊れなかったはずです。

## よくある不安と答え

### 「変なコマンドを打ったらどうなる？」

「'xxx' は、内部コマンドまたは外部コマンド...として認識されていません」と表示されるだけです。何も起きません。

### 「間違えてファイルを消しちゃわない？」

ファイルを消すコマンド（`del` や `rm`）は、自分で意図的に打たない限り実行されません。`cd` や `dir` でファイルが消えることはありません。

### 「矢印キーの↑を押すと前のコマンドが出てくる」

これは便利機能です。同じコマンドをもう一度打ちたいときに使えます。

## まとめと次のステップ

覚えるのは5つだけ：
- `cd` / `pwd` → 今どこにいるか
- `dir` / `ls` → 中身を見る
- `cd フォルダ名` → 移動する
- `cd ..` → 戻る
- `cls` / `clear` → 画面をきれいにする

これだけ知っていれば、「ターミナルを開いてこのコマンドを実行してください」と言われても怖くありません。

<!-- affiliate -->
## 関連リソース

プログラミングを始めたい方へ：

<!-- START MoshimoAffiliateEasyLink --><script type="text/javascript">(function(b,c,f,g,a,d,e){b.MoshimoAffiliateObject=a;b[a]=b[a]||function(){arguments.currentScript=c.currentScript||c.scripts[c.scripts.length-2];(b[a].q=b[a].q||[]).push(arguments)};c.getElementById(a)||(d=c.createElement(f),d.src=g,d.id=a,e=c.getElementsByTagName("body")[0],e.appendChild(d))})(window,document,"script","//dn.msmstatic.com/site/cardlink/bundle.js?20220329","msmaflink");msmaflink({"n":"実践Claude Code入門ー現場で活用するためのAIコーディングの思考法 [ 西見 公宏 ]","b":"","t":"","d":"https:\/\/thumbnail.image.rakuten.co.jp","c_p":"","p":["\/@0_mall\/book\/cabinet\/3540\/9784297153540_1_34.jpg"],"u":{"u":"https:\/\/item.rakuten.co.jp\/book\/18439208\/","t":"rakuten","r_v":""},"v":"2.1","b_l":[{"id":1,"u_tx":"楽天市場で見る","u_bc":"#f76956","u_url":"https:\/\/item.rakuten.co.jp\/book\/18439208\/","a_id":5490814,"p_id":54,"pl_id":27059,"pc_id":54,"s_n":"rakuten","u_so":1}],"eid":"a8XaY","s":"s"});</script><div id="msmaflink-a8XaY">リンク</div><!-- MoshimoAffiliateEasyLink END -->
<!-- /affiliate -->
