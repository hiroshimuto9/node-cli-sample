# My CLI Tool

## 概要

Node CLI Sample は、Node.js と TypeScript で作成されたコマンドラインツールです。このツールは、以下の機能を提供します。

- ユーザー認証 (ログイン)
- 開発サーバーの起動
- HTML と CSS ファイルを Liquid ファイルへ変換しビルド

## 技術スタック

- Node.js
- TypeScript
- Commander.js

## インストール

### 前提条件

- Node.js (バージョン 14 以上)
- npm (Node.js に同梱)

### 手順

1. リポジトリをクローンします。

   ```bash
   git clone [リポジトリ]
   cd node-cli-sample
   ```

2. 依存関係をインストールします。

   ```bash
   npm install
   ```

## 使用方法

### ログイン

ログインコマンドを使用して、ツールを使用するために必要な認証を行います。

```bash
npm run login -- --name="test" --email="test@test.com"
```

### 開発サーバーの起動

```bash
npm run dev
```

### ビルド

HTML と CSS ファイルをビルドして、Liquid ファイルに変換します。

```bash
npm run build
```
