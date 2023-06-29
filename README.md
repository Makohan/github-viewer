# GitHub Issues Report

GitHub Issues Reportは、GitHubのIssueを閲覧するだけの機能を提供するシンプルなツールです。

## プロジェクトの詳細

このツールは、特定のGitHubリポジトリのIssueを効率的に閲覧することを目的としています。ユーザーが調査したいリポジトリの情報を環境変数として提供するだけで、Issueのリストを取得できます。

## インストール

まず、必要なパッケージをインストールします：
```bash
pnpm install
```

次に、開発サーバーを起動します：
```bash
pnpm dev
```

## 使用方法

まず、`.env.example`ファイルをコピーして新しい`.env`ファイルを作成します：
```bash
cp .env.example .env
```

次に、新しい`.env`ファイルを以下のように更新します：

```
OWNER=あなたのGitHubユーザー名
REPO=閲覧したいリポジトリ名
GITHUB_TOKEN=あなたのGitHubのトークン
```

以上で設定は完了です。次に`pnpm dev`を実行すると、設定したリポジトリのIssueを閲覧できます。
