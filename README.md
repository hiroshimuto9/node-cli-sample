# My CLI Tool

## 概要

このリポジトリには、Node.js で構築された CLI ツールと、Go で構築されたバックエンドサーバーが含まれています。
CLI ツールは、ログイン、開発サーバーの起動、およびプロジェクトのビルドのコマンドを提供します。バックエンドサーバーは認証を処理します。

- ユーザー認証 (ログイン)
- 開発サーバーの起動
- HTML と CSS ファイルを Liquid ファイルへ変換しビルド

## 技術スタック

- Node.js
- TypeScript
- Commander.js
- Go

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

### CLI セットアップ

1. `cli`ディレクトリに移動:

   ```sh
   cd cli
   ```

2. 依存関係をインストール:
   ```sh
   npm install
   ```

### サーバーセットアップ

1. `server`ディレクトリに移動:

   ```sh
   cd server
   ```

2. Go モジュールを初期化（未初期化の場合）:
   ```sh
   go mod tidy
   ```

## アプリケーションの実行

### サーバーの起動

1. `server`ディレクトリに移動:

   ```sh
   cd server
   ```

2. Go サーバーを実行:
   ```sh
   go run main.go
   ```

### CLI の使用

1. 新しいターミナルを開き、`cli`ディレクトリに移動:
   ```sh
   cd cli
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
