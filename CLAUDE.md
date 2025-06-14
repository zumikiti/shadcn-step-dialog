# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Commands

- **開発サーバー起動**: `npm run dev` (http://localhost:3000でアクセス)
- **ビルド**: `npm run build`
- **本番サーバー起動**: `npm start`
- **リント**: `npm run lint`

## プロジェクト構成

このプロジェクトは**Next.js 15.3.3 + TypeScript + Tailwind CSS v4**を使用したモダンなWebアプリケーションです。

### 主要な技術スタック
- Next.js App Router
- TypeScript (厳格モード有効)
- Tailwind CSS v4 (PostCSS プラグイン使用)
- React 19
- Geist フォント

### ディレクトリ構造
- `src/app/`: App Routerのメインディレクトリ
  - `layout.tsx`: ルートレイアウト（フォント設定含む）
  - `page.tsx`: ホームページ
  - `globals.css`: グローバルスタイル（Tailwind + カスタムCSS変数）

### 重要な設定
- TypeScript: パスエイリアス `@/*` → `./src/*`
- Tailwind CSS: v4のインライン設定使用、カスタムCSS変数でテーマ定義
- フォント: GeistとGeist Monoを使用、CSS変数で管理
- ダークモード: CSS media queriesで自動切り替え

### shadcn/ui関連の想定
プロジェクト名から、shadcn/uiのステップダイアログコンポーネントを作成する目的と推測されます。コンポーネント追加時は既存のTailwind CSS v4設定との互換性を確認してください。