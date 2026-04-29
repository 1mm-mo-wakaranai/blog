---
title: "【初心者向け】よく使うコマンドを短縮する方法 ― エイリアスの設定"
date: 2026-04-22
tags: ["初心者向け", "開発環境"]
description: "長いコマンドを短い文字で実行できる「エイリアス」の設定方法を初心者向けに解説。毎日のターミナル作業が楽になります。"
draft: false
---

## この記事で解決すること

「毎回同じ長いコマンドを打つのが面倒」

エイリアス（alias）を設定すれば、長いコマンドを短い文字で実行できます。

## エイリアスとは

エイリアスは「コマンドのショートカット」です。

例えば、毎回 `git status` と打つ代わりに `gs` だけで実行できるようにする仕組みです。Gitの基本操作については[Gitブランチの使い方入門](/posts/git-branch-beginner/)で解説しています。

{{< ad >}}

## 設定方法

VS Codeのターミナル（`` Ctrl + ` `` で開けます）でもエイリアスは使えます。[VS Codeの設定とショートカット](/posts/vscode-shortcuts-beginner/)と組み合わせると、開発効率がさらに上がります。

### Mac / Linux の場合

ターミナルで以下を実行します。

```bash
# .bashrc または .zshrc を開く
nano ~/.zshrc
```

ファイルの末尾に以下を追加します。

```bash
# Git系
alias gs='git status'
alias ga='git add .'
alias gc='git commit -m'
alias gp='git push'
alias gl='git log --oneline'

# ディレクトリ移動
alias ..='cd ..'
alias ...='cd ../..'

# よく使うフォルダ
alias proj='cd ~/projects'
alias desk='cd ~/Desktop'
```

保存して、設定を反映します。

```bash
source ~/.zshrc
```

これで `gs` と打つだけで `git status` が実行されます。

### Windows（PowerShell）の場合

PowerShellのプロファイルを編集します。

```powershell
# プロファイルを開く
notepad $PROFILE
```

ファイルが存在しない場合は作成されます。以下を追加します。

```powershell
# Git系
function gs { git status }
function ga { git add . }
function gp { git push }

# ディレクトリ移動
function proj { Set-Location ~/projects }
```

保存してPowerShellを再起動すれば使えます。

## おすすめのエイリアス

### Git系（最も使う）

| エイリアス | 元のコマンド | 用途 |
|---|---|---|
| `gs` | `git status` | 変更状況の確認 |
| `ga` | `git add .` | 全ファイルをステージ |
| `gc "メッセージ"` | `git commit -m "メッセージ"` | コミット |
| `gp` | `git push` | プッシュ |
| `gl` | `git log --oneline` | ログを1行表示 |

### npm系

| エイリアス | 元のコマンド |
|---|---|
| `ni` | `npm install` |
| `nr` | `npm run` |
| `nd` | `npm run dev` |

### Python系

| エイリアス | 元のコマンド |
|---|---|
| `py` | `python` |
| `venv` | `python -m venv .venv` |
| `activate` | `source .venv/bin/activate` |

Python系のエイリアスは仮想環境の操作を短縮できて便利です。仮想環境の詳しい使い方は[Python仮想環境（venv）の使い方入門](/posts/python-venv-beginner/)で解説しています。

## 注意点

- 既存のコマンド名と被らないようにする（`ls` を別のものに上書きしない）
- チームで作業するときは、エイリアスに頼りすぎない（他の人のPCでは使えない）
- 設定ファイルはGitHubで管理しておくと、PCを変えても復元できる。[GitHubとは？](/posts/github-what-is-it/)を読んでおくと、設定ファイルの管理方法が分かります

## よくある質問（FAQ）

### Q: エイリアスを設定したのに使えません。

A: 設定ファイルを保存した後、`source ~/.zshrc`（Mac/Linux）を実行するか、ターミナルを再起動してください。PowerShellの場合は、PowerShellウィンドウを閉じて開き直す必要があります。

### Q: エイリアスと関数の違いは何ですか？

A: エイリアスは単純なコマンドの置き換えです。引数を途中に挟んだり、条件分岐を入れたりしたい場合は関数を使います。PowerShellではエイリアスの代わりに関数を使うのが一般的です。

### Q: 設定したエイリアスの一覧を確認するには？

A: Mac/Linuxでは `alias` コマンドを実行すると、現在設定されているエイリアスの一覧が表示されます。PowerShellでは `Get-Alias` で確認できます。

### Q: 一時的にエイリアスを無効にして元のコマンドを実行したいです。

A: コマンドの前にバックスラッシュを付けます。例えば `\ls` と打つと、エイリアスではなく元の `ls` コマンドが実行されます。

## まとめ

- エイリアスは「コマンドのショートカット」
- `.zshrc`（Mac/Linux）または `$PROFILE`（Windows）に設定する
- Git系のエイリアスが最も効果的
- 毎日使うコマンドから設定していくのがおすすめ

---

### あわせて読みたい
- [コマンドラインが怖い人へ ― 覚えるコマンド5つだけ](/posts/command-line-scary/)
- [git pushでrejectedエラーが出たときの対処法](/posts/git-first-push-error/)

<!-- affiliate -->
## 関連リソース

ターミナル操作をもっと学びたい方へ：

<!-- START MoshimoAffiliateEasyLink --><script type="text/javascript">(function(b,c,f,g,a,d,e){b.MoshimoAffiliateObject=a;b[a]=b[a]||function(){arguments.currentScript=c.currentScript||c.scripts[c.scripts.length-2];(b[a].q=b[a].q||[]).push(arguments)};c.getElementById(a)||(d=c.createElement(f),d.src=g,d.id=a,e=c.getElementsByTagName("body")[0],e.appendChild(d))})(window,document,"script","//dn.msmstatic.com/site/cardlink/bundle.js?20220329","msmaflink");msmaflink({"n":"新しいLinuxの教科書","b":"","t":"","d":"https:\/\/thumbnail.image.rakuten.co.jp","c_p":"","p":[""],"u":{"u":"https:\/\/search.rakuten.co.jp\/search\/mall\/%E6%96%B0%E3%81%97%E3%81%84Linux%E3%81%AE%E6%95%99%E7%A7%91%E6%9B%B8\/","t":"rakuten","r_v":""},"v":"2.1","b_l":[{"id":1,"u_tx":"楽天市場で見る","u_bc":"#f76956","u_url":"https:\/\/search.rakuten.co.jp\/search\/mall\/%E6%96%B0%E3%81%97%E3%81%84Linux%E3%81%AE%E6%95%99%E7%A7%91%E6%9B%B8\/","a_id":5490814,"p_id":54,"pl_id":27059,"pc_id":54,"s_n":"rakuten","u_so":1},{"u_bc":"#f79256","u_tx":"Amazonで見る","u_url":"https:\/\/www.amazon.co.jp\/s\/ref=nb_sb_noss_1?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&url=search-alias%3Daps&field-keywords=%E6%96%B0%E3%81%97%E3%81%84Linux%E3%81%AE%E6%95%99%E7%A7%91%E6%9B%B8","s_n":"amazon","u_so":2,"a_id":5490817,"p_id":170,"pc_id":185,"pl_id":27060,"id":2}],"eid":"P5aS4","s":"s"});</script><div id="msmaflink-P5aS4">リンク</div><!-- MoshimoAffiliateEasyLink END -->
<!-- /affiliate -->
