---
title: "【OpenSSH】長いパスワードでログインできてしまう「sshole」が悪用中 Alpine・Dockerを使う人は確認を（手元のWindowsは対象外だった）"
date: 2026-11-16
tags: ["OpenSSH", "Linux", "Docker", "セキュリティ"]
description: "OpenSSHの脆弱性CVE-2026-123158（通称sshole）が実際に悪用されています。Alpine LinuxなどmuslというしくみのLinuxで、パスワードのないアカウントに、とても長いパスワードを送るとログインできてしまう不具合です。修正版は10.6p2。だれが対象か、手元のWindowsで確かめた結果、直し方をまとめました。"
answer: "OpenSSHの脆弱性 **CVE-2026-123158**（通称 **sshole**）が、**実際に悪用されています**。アメリカのCISAも2026年11月9日に、悪用中の脆弱性の一覧に加えました。対象は、**muslというしくみを使うLinux**（ほぼ**Alpine Linux**）で、**PAMを使わずにsshd（SSHのサーバー）を動かしている**場合です。この条件だと、**パスワードを持たないアカウント**（鍵だけでログインするアカウントなど）に、**257〜1024バイトのとても長いパスワード**を送るとログインできてしまいます。**Debian・Ubuntu・Red Hat・SUSEなどは対象外**です。修正版は**OpenSSH 10.6p2**で、Alpineは11月5日に修正したパッケージを出しています。手元のWindows（OpenSSH 9.5p2のクライアントだけ、SSHサーバーもWSLもなし）は対象外でした。"
checked: "2026-11-16"
faq:
  - q: "WindowsやMacでSSHを使っているだけでも危ないですか？"
    a: "問題があるのは、musl系のLinuxで動くSSHのサーバー（sshd）です。WindowsやMacから、ほかのサーバーにつなぐだけなら対象外です。"
  - q: "Ubuntuのサーバーは大丈夫ですか？"
    a: "Debian、Ubuntu、SUSE、Red Hat、CentOSは対象外と報告されています。これらはmuslではなくglibcというしくみを使っているためです。"
  - q: "Dockerを使っていますが、関係ありますか？"
    a: "Alpineをもとにしたイメージの中で、sshdを動かしている場合は対象になりえます。sshdを入れていないコンテナは対象外です。"
  - q: "すぐに更新できないときは？"
    a: "sshdの設定でPasswordAuthenticationをnoにして、パスワードでのログインを止めると、この攻撃は防げます。設定を変えたらsshdを再起動します。"
  - q: "どんな被害が出ていますか？"
    a: "おとりのサーバーに入られて、裏口のプログラムを入れられたり、仮想通貨の採掘やボットネットに使われたりした例が報告されています。管理者の権限まで取られた例もあります。"
draft: false
cover:
  image: "images/cover.png"
  alt: "OpenSSH sshole 長いパスワードでログインできてしまう脆弱性"
  relative: true
  hidden: false
---
## この記事で分かること
{{< chat name="初心者ちゃん" icon="/images/rin-icon.png" direction="left" >}}
「長いパスワードを打つだけでSSHにログインできる」ってニュースを見たの。そんなことってあるの？わたしもSSH使ってるんだけど…。
{{< /chat >}}
{{< chat name="全知全能くん" icon="/images/zenchi-icon.png" direction="right" >}}
ある条件のLinuxサーバーだけで起きる不具合なんだ。WindowsからSSHでつなぐだけなら関係ないよ。このパソコンでも確かめたから、だれが気をつければいいか説明するね。
{{< /chat >}}
![今回のポイント](images/point-overview.png)

こんなことが気になっていませんか？
- どんな不具合なの？
- 自分は対象なの？
- どうやって直すの？

この記事は、[Hackadayの週間セキュリティまとめ](https://hackaday.com/2026/11/13/this-week-in-security-four-digit-patch-tuesday-ssh-exploited-gitbook-breach-android-ghostmap/)（2026年11月13日）、[Ostorlabの解説](https://blog.ostorlab.co/es/openssh-musl-password-bypass-cve-2026-123158.html)などをもとにまとめています（2026年11月16日に確認）。

## 何が起きたの？
| 項目 | 内容 |
|------|------|
| 脆弱性 | **CVE-2026-123158**（通称 sshole、深刻度8.1） |
| 対象 | **muslを使うLinux**（ほぼAlpine Linux）で、**PAMなし**でsshdを動かしている場合 |
| 起きること | パスワードのないアカウントに、**257〜1024バイト**のパスワードでログインできる |
| 対象外 | Debian、Ubuntu、SUSE、Red Hat、CentOS など |
| 修正版 | **OpenSSH 10.6p2**（11月5日）。Alpineは同じ日に3.16〜edgeの全ブランチで修正 |
| 実際の攻撃 | **あり**（CISAが11月9日に一覧に追加） |

{{< ad >}}

### ことばの説明
- **sshd**：SSHで「つながれる側」のサーバーのプログラム
- **musl（マスル）**：Linuxの土台になる部品の1つ。Alpine Linuxが使っている。Ubuntuなどはglibcというちがうものを使う
- **PAM**：Linuxでログインのしかたをまとめて管理するしくみ
- **パスワードのないアカウント**：鍵だけでログインする設定のアカウントなど

### どんな攻撃が出ている？
報告によると、すでに次のような攻撃が見つかっています。

- 東南アジアのおとりのサーバーに入られ、**裏口のプログラム**を入れられた
- **ボットネット**や**仮想通貨の採掘**に使われた
- おとりのAlpineサーバーで、**管理者（root）の権限**まで取られた
- 9か国・13のIPアドレスから攻撃の試みがあった

{{< chat name="初心者ちゃん" icon="/images/rin-icon.png" direction="left" >}}
長いパスワードを送るだけで入れちゃうなんて、こわいね…。
{{< /chat >}}
{{< chat name="全知全能くん" icon="/images/zenchi-icon.png" direction="right" >}}
2016年からずっとあった不具合なんだって。Dockerの小さいイメージでよく使われるAlpineが中心だから、サーバーやコンテナを自分で立てている人は確かめておこう。
{{< /chat >}}

## 手元のパソコンを確かめてみた
2026年11月16日に、このWindows 11のパソコンで、SSHの版と、SSHサーバーやWSL（Windowsの中のLinux）があるかを確かめました。

```powershell
ssh -V
Get-Service sshd
Get-ChildItem "HKCU:\Software\Microsoft\Windows\CurrentVersion\Lxss"
```

結果は次の通りです。

```text
OpenSSH_for_Windows_9.5p2, LibreSSL 3.8.2
sshd service: なし
WSLのLinux: なし
```

- 入っているのは**Windows版OpenSSHのクライアント**（つなぐ側）だけ
- **SSHサーバー（sshd）は動いていない**
- **WSLのLinuxも入っていない**
- なので、このパソコンは**対象外**でした

## 対象か確かめる方法
![対象か確かめて直す流れ](images/step-check.png)

### ステップ1: OSを確かめる
サーバーやコンテナの中で、次のコマンドを打ちます。

```bash
cat /etc/os-release
```

「Alpine Linux」と出たら、対象の可能性があります。

### ステップ2: sshdが動いているか確かめる
```bash
ps aux | grep sshd
```

sshdが動いていなければ、対象外です。

### ステップ3: OpenSSHを更新する
Alpineなら、次のコマンドで更新して、sshdを再起動します。

```bash
apk update && apk upgrade openssh
rc-service sshd restart
```

Dockerなら、**新しいAlpineのイメージを取り直して**、コンテナを作り直します。

### ステップ4: すぐ更新できないときは
sshdの設定ファイル（`/etc/ssh/sshd_config`）に次の1行を入れ、sshdを再起動します。パスワードでのログインを止めると、この攻撃は防げます。

```text
PasswordAuthentication no
```

## ほかに気をつけたいこと
- OpenWrtは、ふつうはOpenSSHではなく**Dropbear**を使うので対象外。ただし、OpenSSHを入れている場合は確かめる
- **Buildroot・Yocto**など、muslを使う組み込み向けのLinuxも確かめる
- OpenSSHの開発チームは、AIで見つかった不具合を別の人も見つけることが増えたため、**修正をまとめずにこまめに出していく**としています

今月はChromeやWindowsの更新も出ています。[Chromeの悪用中の脆弱性の記事](/posts/chrome-157-zero-day-2026-11/)、[11月のWindows更新の記事](/posts/patch-tuesday-2026-11-outlook-zero-day/)もあわせて確かめてください。

{{< faq >}}

{{< chat name="初心者ちゃん" icon="/images/rin-icon.png" direction="left" >}}
WindowsからつなぐだけならOK。AlpineでSSHサーバーを動かしてたら、10.6p2に更新、だね！
{{< /chat >}}
{{< chat name="全知全能くん" icon="/images/zenchi-icon.png" direction="right" >}}
その通り。更新できないときは、パスワードログインを止めるだけでも守れるよ。
{{< /chat >}}

## まとめ
- OpenSSHの脆弱性CVE-2026-123158（sshole）が、実際に悪用されている
- 対象はmuslを使うLinux（ほぼAlpine）で、PAMなしでsshdを動かしている場合
- パスワードのないアカウントに、257〜1024バイトのパスワードでログインできてしまう
- 修正版はOpenSSH 10.6p2。すぐ直せないならPasswordAuthentication noにする
- 手元のWindowsは、クライアントだけでSSHサーバーもWSLもなく、対象外だった

---
### あわせて読みたい
- [【Chrome】今年8件目の悪用中の脆弱性 157.0.8103.50以上か確かめよう（手元は再起動待ちだった）](/posts/chrome-157-zero-day-2026-11/)
- [【11月のWindows更新】Outlookの脆弱性が悪用中 Windows Updateだけでは直らない（手元はOfficeが古いままだった）](/posts/patch-tuesday-2026-11-outlook-zero-day/)
