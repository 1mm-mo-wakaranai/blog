---
title: "【Firefox】99件の脆弱性を修正 160.0.1かESR 153.7以上か確かめよう（手元のESRは更新済みだった）"
date: 2026-11-24
tags: ["Firefox", "セキュリティ", "初心者向け"]
description: "Mozillaは11月10日にFirefox 160を出し、99件の脆弱性を直しました。うち13件は、ブラウザの守り（サンドボックス）の外に出られるおそれがあるものです。11月17日には160.0.1も出ています。会社などで使うESR版は153.7が修正版です。手元のFirefoxで確かめた結果と、確かめ方・更新のしかたをまとめました。"
answer: "Mozillaは2026年11月10日、**Firefox 160**で**99件の脆弱性**を直しました。**57件が「高」**で、そのうち**13件は、ブラウザの守り（サンドボックス）の外に出られるおそれ**があるものです。いちばん深刻なCVE-2026-124853は深刻度9.6です。11月17日には、さらに2件を直した**160.0.1**も出ました。会社などで使う**ESR版は153.7**（古い系統は115.45）が修正版です。11月24日時点で、**実際の攻撃は報告されていません**。手元のWindows 11のFirefox（ESR版）は、**すでに153.7.0になっていました**。［メニュー］→［ヘルプ］→［Firefoxについて］で確かめ、［再起動］を押しましょう。"
checked: "2026-11-24"
faq:
  - q: "もう攻撃されていますか？"
    a: "11月24日時点で、Mozillaは今回の脆弱性が悪用されたとは報告していません。アメリカのCISAの悪用中の脆弱性の一覧にも入っていません。"
  - q: "どのバージョンなら大丈夫ですか？"
    a: "ふつうのFirefoxは160.0.1以上、ESR版は153.7以上、古いESRの115系は115.45以上です。"
  - q: "自分のFirefoxがESRかどうか分かりません"
    a: "［ヘルプ］→［Firefoxについて］を開くと、バージョンの横に「延長サポート版」や「ESR」と書かれていればESR版です。会社のパソコンに多いです。"
  - q: "Thunderbirdも関係ありますか？"
    a: "同じ部品を使っているため、Thunderbirdも160または153.7に更新すると直ります。"
  - q: "スマホのFirefoxは？"
    a: "Android版は160.0.1で、Android向けの不具合も1件直っています。iPhone版も160.0で3件が直っています。アプリストアで更新を確かめてください。"
draft: false
cover:
  image: "images/cover.png"
  alt: "Firefox 99件の脆弱性を修正 160.0.1かESR 153.7以上か確かめよう"
  relative: true
  hidden: false
---
## この記事で分かること
{{< chat name="初心者ちゃん" icon="/images/rin-icon.png" direction="left" >}}
ChromeとEdgeの更新は前に教えてもらったけど、Firefoxも大きな更新が出たって聞いたの。
{{< /chat >}}
{{< chat name="全知全能くん" icon="/images/zenchi-icon.png" direction="right" >}}
11月10日のFirefox 160で、99件も直っているんだ。会社でよく使う「ESR版」は番号がちがうから、そこに気をつけよう。このパソコンでも確かめたよ。
{{< /chat >}}
![今回の更新のポイント](images/point-overview.png)

こんなことが気になっていませんか？
- 何が直ったの？
- 自分のFirefoxは大丈夫？
- ESR版って何？

この記事は、MozillaのセキュリティアドバイザリーMFSA 2026-125・2026-127・2026-130を伝えた[CyberExpertsの記事](https://cyberexperts.com/2026-11-18-firefox-160-esr-153-7-sandbox-fixes/)と、Mozillaの公開しているバージョン情報をもとにまとめています（2026年11月24日に確認）。

## 何が直ったの？
| 版 | 公開日 | 直った脆弱性 |
|------|------|------|
| **Firefox 160** | 11月10日 | **99件**（高57件・中24件・低18件） |
| **Firefox 160.0.1** | 11月17日 | さらに**2件**（高。1件はAndroid版） |
| **Firefox ESR 153.7** | 11月10日 | **81件**（高51件） |
| Firefox ESR 115.45 | 11月10日 | 28件（すべて高） |

- 99件のうち**13件**は「**サンドボックスの外に出られる**」おそれがあるもの
- いちばん深刻な **CVE-2026-124853**（文字の表示の部分）は深刻度**9.6**
- 11月24日時点で、**実際の攻撃は報告なし**

{{< ad >}}

### サンドボックスって？
ブラウザは、Webページのプログラムを**安全な囲い（サンドボックス）**の中で動かして、パソコンを守っています。今回の13件は、その**囲いの外に出られる**おそれがあるものです。ほかの不具合と組み合わせられると、パソコンを乗っ取られるおそれがあります。

## 手元のFirefoxを確かめてみた
2026年11月24日に、このWindows 11のパソコンで、FirefoxのファイルのバージョンとMozillaが公開している最新版をくらべました。

```powershell
(Get-Item "$env:ProgramFiles\Mozilla Firefox\firefox.exe").VersionInfo.ProductVersion
(Invoke-RestMethod https://product-details.mozilla.org/1.0/firefox_versions.json) |
  Select-Object LATEST_FIREFOX_VERSION, FIREFOX_ESR
```

結果は次の通りです。

```text
153.7.0
LATEST_FIREFOX_VERSION  FIREFOX_ESR
----------------------  -----------
160.0.1                 153.7.0esr
```

- このパソコンのFirefoxは**ESR版**（会社が管理するパソコンなので）
- バージョンは **153.7.0**。ESRの**修正版になっていた**
- ファイルの日付は11月11日で、公開の翌日には自動で入っていたようです

{{< chat name="初心者ちゃん" icon="/images/rin-icon.png" direction="left" >}}
160じゃなくて153でも大丈夫なんだね。
{{< /chat >}}
{{< chat name="全知全能くん" icon="/images/zenchi-icon.png" direction="right" >}}
ESR版は、新しい機能を入れずに直しだけを長く届ける版なんだ。だから番号が小さくても、153.7なら直っているよ。
{{< /chat >}}

## 確かめ方と更新のしかた
![Firefoxを確かめて更新する流れ](images/step-update.png)

### ステップ1: 「Firefoxについて」を開く
右上の［**≡**］→［**ヘルプ**］→［**Firefoxについて**］を開きます。

### ステップ2: 更新を待つ
開くと、自動で更新を確かめてダウンロードします。

### ステップ3: 再起動する
［**再起動して Firefox を更新**］を押します。**再起動しないと、新しい版になりません**。

### ステップ4: バージョンを確かめる
- ふつうの版：**160.0.1 以上**
- ESR版（「延長サポート版」と書かれている）：**153.7 以上**
- 古いESR：**115.45 以上**

## Thunderbirdやスマホは？
- **Thunderbird**：同じ部品を使っているので、**160または153.7**に更新します
- **Android版Firefox**：Google Playで更新。160.0.1でAndroid向けの不具合も直っています
- **iPhone版Firefox**：App Storeで更新。160.0で3件が直っています

今月はほかのブラウザも更新が続いています。[Chromeの悪用中の脆弱性の記事](/posts/chrome-157-zero-day-2026-11/)もあわせて確かめてください。

{{< faq >}}

{{< chat name="初心者ちゃん" icon="/images/rin-icon.png" direction="left" >}}
Firefoxについてを開いて再起動。ふつうは160.0.1、ESRなら153.7以上、だね！
{{< /chat >}}
{{< chat name="全知全能くん" icon="/images/zenchi-icon.png" direction="right" >}}
その通り。Thunderbirdを使っている人は、そっちも忘れずにね。
{{< /chat >}}

## まとめ
- Firefox 160（11月10日）で99件、160.0.1（11月17日）でさらに2件の脆弱性が直った
- 13件はサンドボックスの外に出られるおそれ。いちばん深刻なものは深刻度9.6
- ESR版は153.7、古いESRは115.45が修正版
- 11月24日時点で、実際の攻撃は報告されていない
- 手元のFirefox（ESR版）は、すでに153.7.0になっていた

---
### あわせて読みたい
- [【Chrome】今年8件目の悪用中の脆弱性 157.0.8103.50以上か確かめよう（手元は再起動待ちだった）](/posts/chrome-157-zero-day-2026-11/)
- [【OpenSSH】長いパスワードでログインできてしまう「sshole」が悪用中 Alpine・Dockerを使う人は確認を（手元のWindowsは対象外だった）](/posts/openssh-sshole-alpine-2026-11/)
