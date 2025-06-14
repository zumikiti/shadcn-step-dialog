# shadcn/ui Step Dialog

Next.js + TypeScript + shadcn/ui を使用した複数ステップフォームダイアログのデモプロジェクトです。

## 機能

### 🎯 ステップダイアログコンポーネント
- **3ステップフォーム**: 氏名入力 → 詳細情報入力 → 確認画面
- **プログレスインジケーター**: 現在のステップを視覚的に表示
- **ステップナビゲーション**: 前へ・次へボタンによる直感的な操作

### ✅ 高度なバリデーション機能
- **リアルタイムバリデーション**: 入力時にエラーを即座にクリア
- **詳細なエラーメッセージ**: 各フィールドに対応した具体的な指示
- **電話番号フォーマットチェック**: 携帯電話・固定電話の形式をサポート
- **必須フィールド表示**: アスタリスク（*）による視覚的な識別

### 🎨 優れたユーザーエクスペリエンス
- **ローディング状態**: 送信中の視覚的フィードバック
- **非同期処理**: リアルな送信体験のシミュレーション
- **エラーハンドリング**: 送信失敗時の適切な対応
- **レスポンシブデザイン**: モバイル・デスクトップ対応

### 🛠 技術スタック
- **Next.js 15.3.3** (App Router)
- **TypeScript** (厳格モード)
- **shadcn/ui** (Dialog, Button, Input, Label, Checkbox)
- **Tailwind CSS v4** (モダンスタイリング)
- **Radix UI** (アクセシブルなプリミティブ)

## クイックスタート

開発サーバーを起動:

```bash
npm run dev
# または
yarn dev
# または
pnpm dev
# または
bun dev
```

[http://localhost:3000](http://localhost:3000) でアプリケーションを確認できます。

## プロジェクト構成

```
src/
├── app/
│   ├── page.tsx          # メインページ（デモ画面）
│   ├── layout.tsx        # ルートレイアウト
│   └── globals.css       # グローバルスタイル
├── components/ui/
│   ├── step-dialog.tsx   # ステップダイアログコンポーネント
│   ├── dialog.tsx        # shadcn/ui Dialog
│   ├── button.tsx        # shadcn/ui Button
│   ├── input.tsx         # shadcn/ui Input
│   ├── label.tsx         # shadcn/ui Label
│   └── checkbox.tsx      # shadcn/ui Checkbox
└── lib/
    └── utils.ts          # ユーティリティ関数
```

## ステップダイアログの使用方法

```tsx
import { StepDialog } from "@/components/ui/step-dialog";
import { Button } from "@/components/ui/button";

export default function MyPage() {
  return (
    <StepDialog
      trigger={
        <Button>フォームを開く</Button>
      }
    />
  );
}
```

## 開発コマンド

```bash
# 開発サーバー起動
npm run dev

# 本番ビルド
npm run build

# 本番サーバー起動
npm start

# コード品質チェック
npm run lint
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
