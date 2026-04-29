---
title: "【初心者向け】コマンドラインが怖い人へ ― 覚えるコマンド5つだけ"
date: 2026-04-16
tags: ["初心者向け", "開発環境", "エラー解決"]
description: "コマンドライン（ターミナル）が怖くて触れない初心者向けに、最低限これだけ知っておけば大丈夫という操作を解説します。"
draft: false
---

## この記事で解決すること

プログラミングを始めようとしたら「ターミナルを開いてください」と言われた。

黒い画面が出てきた。何を打てばいいか分からない。変なコマンドを打ったらPCが壊れそう。

その気持ち、よく分かります。この記事では「これだけ知っていれば怖くない」という操作だけに絞って説明します。


{{< ad >}}

## まず知っておくこと

- コマンドを間違えてもPCは壊れません
- 「コマンドが見つかりません」と言われるだけです
- いつでも閉じてやり直せます

ターミナル（コマンドライン）は、マウスの代わりにキーボードでPCを操作する道具です。やっていることはエクスプローラーと同じで、フォルダを開いたりファイルを見たりするだけです。

ターミナルは開発のあらゆる場面で使います。たとえば[Gitでコードを管理する](/posts/git-branch-beginner/)ときや、[npmでライブラリをインストールする](/posts/npm-yarn-beginner/)ときも、ターミナルでコマンドを打ちます。だからこそ、最低限の操作を知っておくと安心です。

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

この5つのコマンドに慣れてきたら、よく使うコマンドを[エイリアス（ショートカット）として登録する](/posts/terminal-alias-beginner/)と、さらに効率が上がります。

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

## コマンドラインを使う場面

「コマンドラインなんて本当に使うの？」と思うかもしれません。実は、プログラミング学習を進めると頻繁に使います。

### Gitでコードを管理するとき

チーム開発では[Gitのブランチ操作](/posts/git-branch-beginner/)をターミナルで行います。`git add`、`git commit`、`git push` といったコマンドは、開発者なら毎日使います。

### 開発サーバーを起動するとき

Webアプリを作っていると、`npm start` や `python app.py` のようなコマンドでサーバーを起動します。もし[localhostに接続できないエラー](/posts/localhost-refused/)が出たときも、ターミナルの表示を確認して原因を特定します。

### パッケージをインストールするとき

Pythonなら `pip install`、JavaScriptなら `npm install` でライブラリを追加します。[VS Codeのターミナル機能](/posts/vscode-shortcuts-beginner/)を使えば、エディタから離れずにコマンドを実行できて便利です。

## よくある質問（FAQ）

### Q: コマンドプロンプトとPowerShellはどちらを使えばいいですか？
A: Windows 10以降であれば、PowerShellを使うのがおすすめです。コマンドプロンプトでできることはPowerShellでもできますし、`ls` のようなLinux系のコマンドも使えます。どちらを使っても基本操作は同じなので、好みで選んで問題ありません。

### Q: ターミナルで日本語が文字化けします。どうすればいいですか？
A: 文字コードの設定が原因です。Windowsの場合、PowerShellで `chcp 65001` と入力するとUTF-8に切り替わり、文字化けが解消されることがあります。VS Codeの統合ターミナルを使うと、文字化けが起きにくいのでおすすめです。

### Q: コマンドラインとターミナルは違うものですか？
A: 実質的には同じものを指しています。Windowsでは「コマンドプロンプト」や「PowerShell」、Macでは「ターミナル」と呼ばれますが、どれも「キーボードでPCを操作するツール」です。文脈によって呼び方が変わるだけなので、混乱しなくて大丈夫です。

### Q: コマンドを覚えられません。毎回調べてもいいですか？
A: もちろん大丈夫です。プロの開発者でも、すべてのコマンドを暗記しているわけではありません。よく使うコマンドは自然と覚えますし、それ以外は調べながら使うのが普通です。慣れてきたら[ターミナルのエイリアス機能](/posts/terminal-alias-beginner/)を使って、よく使うコマンドを短縮登録すると便利です。

## まとめと次のステップ

覚えるのは5つだけ：
- `cd` / `pwd` → 今どこにいるか
- `dir` / `ls` → 中身を見る
- `cd フォルダ名` → 移動する
- `cd ..` → 戻る
- `cls` / `clear` → 画面をきれいにする

これだけ知っていれば、「ターミナルを開いてこのコマンドを実行してください」と言われても怖くありません。

---
### あわせて読みたい
- [VS Code最初に覚えるべき設定とショートカット10選](/posts/vscode-shortcuts-beginner/)
- [git pushでrejectedエラーが出たときの対処法](/posts/git-first-push-error/)

<!-- affiliate -->
## 関連リソース

コマンドラインをもっと学びたい方へ：

<!-- START MoshimoAffiliateEasyLink --><script type="text/javascript">(function(b,c,f,g,a,d,e){b.MoshimoAffiliateObject=a;b[a]=b[a]||function(){arguments.currentScript=c.currentScript||c.scripts[c.scripts.length-2];(b[a].q=b[a].q||[]).push(arguments)};c.getElementById(a)||(d=c.createElement(f),d.src=g,d.id=a,e=c.getElementsByTagName("body")[0],e.appendChild(d))})(window,document,"script","//dn.msmstatic.com/site/cardlink/bundle.js?20220329","msmaflink");msmaflink({"n":"新しいLinuxの教科書","b":"","t":"","d":"https:\/\/thumbnail.image.rakuten.co.jp","c_p":"","p":[""],"u":{"u":"https:\/\/search.rakuten.co.jp\/search\/mall\/%E6%96%B0%E3%81%97%E3%81%84Linux%E3%81%AE%E6%95%99%E7%A7%91%E6%9B%B8\/","t":"rakuten","r_v":""},"v":"2.1","b_l":[{"id":1,"u_tx":"楽天市場で見る","u_bc":"#f76956","u_url":"https:\/\/search.rakuten.co.jp\/search\/mall\/%E6%96%B0%E3%81%97%E3%81%84Linux%E3%81%AE%E6%95%99%E7%A7%91%E6%9B%B8\/","a_id":5490814,"p_id":54,"pl_id":27059,"pc_id":54,"s_n":"rakuten","u_so":1},{"u_bc":"#f79256","u_tx":"Amazonで見る","u_url":"https:\/\/www.amazon.co.jp\/s\/ref=nb_sb_noss_1?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&url=search-alias%3Daps&field-keywords=%E6%96%B0%E3%81%97%E3%81%84Linux%E3%81%AE%E6%95%99%E7%A7%91%E6%9B%B8","s_n":"amazon","u_so":2,"a_id":5490817,"p_id":170,"pc_id":185,"pl_id":27060,"id":2}],"eid":"lE6PR","s":"s"});</script><div id="msmaflink-lE6PR">リンク</div><!-- MoshimoAffiliateEasyLink END -->
<!-- /affiliate -->
