# shadcn/ui Step Dialog

Next.js + TypeScript + shadcn/ui + Zod を使用した高度な複数ステップフォームダイアログのデモプロジェクトです。

## 機能

### 🎯 ステップダイアログコンポーネント
- **3ステップフォーム**: 氏名入力 → 詳細情報入力 → 確認画面
- **プログレスインジケーター**: 現在のステップを視覚的に表示
- **直感的なナビゲーション**: 最適化されたボタン配置（左端：キャンセル、右端：前へ・次へ）
- **モジュラー設計**: 各ステップが独立したコンポーネント

### ✅ Zodによるスキーマベースバリデーション
- **型安全バリデーション**: ランタイムとコンパイルタイムの型整合性
- **宣言的スキーマ**: formDataSchema、personalInfoSchema、contactInfoSchemaによる構造化
- **カスタムバリデーション**: 電話番号フォーマットの詳細チェック
- **日本語エラーメッセージ**: ユーザーフレンドリーなエラー表示
- **リアルタイムバリデーション**: 入力時のエラークリア機能

### 🏗️ 保守性とテスト性
- **コンポーネント分割**: PersonalInfo、ContactInfo、Confirmation
- **共通型定義**: step-form-types.tsによる一元管理
- **テスト対応**: data-testid属性とテストサンプルコード
- **包括的テスト例**: Zodスキーマとバリデーション関数のテストカバー

### 🚀 CI/CD & コード品質
- **GitHub Actions**: 自動テスト・ビルド・品質チェック
- **マルチNode.js対応**: Node.js 18.x/20.x での検証
- **4段階品質チェック**: ESLint → Biome → TypeScript → Jest
- **Codecov統合**: カバレッジレポートの自動生成・追跡
- **自動フォーマット**: BiomeとESLintによるコード統一

### 🎨 優れたユーザーエクスペリエンス
- **ローディング状態**: 送信中の視覚的フィードバック
- **非同期処理**: リアルな送信体験のシミュレーション
- **エラーハンドリング**: 送信失敗時の適切な対応
- **アクセシブルUI**: ボタン無効化とARIA属性
- **レスポンシブデザイン**: モバイル・デスクトップ対応

### 🛠 技術スタック
- **Next.js 15.3.3** (App Router)
- **TypeScript** (厳格モード)
- **Zod 3.25.64** (スキーマバリデーション)
- **Jest + React Testing Library** (ユニットテスト)
- **Biome 1.9.4** (高速フォーマッター・リンター)
- **GitHub Actions** (CI/CD自動化)
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
│   ├── page.tsx                    # メインページ（デモ画面）
│   ├── layout.tsx                  # ルートレイアウト
│   └── globals.css                 # グローバルスタイル
├── components/
│   ├── ui/
│   │   ├── step-dialog.tsx         # メインダイアログコンポーネント
│   │   ├── dialog.tsx              # shadcn/ui Dialog
│   │   ├── button.tsx              # shadcn/ui Button
│   │   ├── input.tsx               # shadcn/ui Input
│   │   ├── label.tsx               # shadcn/ui Label
│   │   └── checkbox.tsx            # shadcn/ui Checkbox
│   └── step-form/
│       ├── personal-info.tsx       # 個人情報: 氏名入力
│       ├── contact-info.tsx        # 連絡先情報: 住所・電話・同意
│       └── confirmation.tsx        # 確認画面
├── lib/
│   ├── step-form-types.ts          # Zodスキーマと型定義
│   └── utils.ts                    # ユーティリティ関数
└── __tests__/
    ├── step-form-validation.test.ts # バリデーション関数のテスト
    ├── personal-info.test.tsx      # PersonalInfoコンポーネントのテスト
    ├── contact-info.test.tsx       # ContactInfoコンポーネントのテスト
    └── confirmation.test.tsx       # Confirmationコンポーネントのテスト
```

## ステップダイアログの使用方法

### 基本的な使用方法

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

### Zodスキーマベースバリデーション

フォームバリデーションはZodスキーマで定義されています：

```typescript
// /src/lib/step-form-types.ts より抜粋
export const formDataSchema = z.object({
  firstName: z.string().min(1, "姓を入力してください"),
  lastName: z.string().min(1, "名を入力してください"),
  address: z.string().min(1, "住所を入力してください"),
  phone: phoneSchema, // カスタム電話番号バリデーション
  agreement: z.boolean().refine(val => val === true, {
    message: "利用規約への同意が必要です",
  }),
});

// コンポーネント別スキーマ
export const personalInfoSchema = formDataSchema.pick({
  firstName: true,
  lastName: true,
});
export const contactInfoSchema = formDataSchema.pick({
  address: true,
  phone: true,
  agreement: true,
});

// 型安全な自動生成型
export type FormData = z.infer<typeof formDataSchema>;
```

### カスタムステップコンポーネントの追加

新しいステップコンポーネントを作成する場合：

```tsx
import { StepComponentProps } from "@/lib/step-form-types";

export function MyCustomStep({ formData, errors, onUpdateField }: StepComponentProps) {
  return (
    <div className="space-y-4">
      {/* カスタムフィールド */}
    </div>
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
npm run lint           # ESLint実行
npm run lint:biome     # Biomeリンター実行
npm run check          # Biome包括チェック
npm run check:fix      # Biome自動修正

# コードフォーマット
npm run format         # 自動フォーマット
npm run format:check   # フォーマットチェック

# テスト実行
npm test               # 全テスト実行
npm run test:watch     # テスト監視モード
npm run test:coverage  # カバレッジ付きテスト
```

## テスト環境

### 🧪 Jest + React Testing Library

プロジェクトには包括的なテストスイートが含まれています：

#### バリデーションテスト (`step-form-validation.test.ts`)
- **Zodスキーマテスト**: formDataSchema、personalInfoSchema、contactInfoSchemaの直接テスト
- **バリデーション関数テスト**: validatePersonalInfo、validateContactInfo、validateFormDataのテスト
- **電話番号バリデーション**: 携帯電話・固定電話の形式チェック

#### コンポーネントテスト
- **PersonalInfo**: 氏名入力フィールドのレンダリング・入力・バリデーション
- **ContactInfo**: 住所・電話・同意チェックボックスの動作
- **Confirmation**: 確認画面のデータ表示とスタイリング

#### テスト実行
```bash
# 全テスト実行
npm test

# 監視モードでテスト実行
npm run test:watch

# カバレッジレポート生成
npm run test:coverage
```

#### テスト設定
- **Jest設定**: Next.js統合設定 (`jest.config.js`)
- **セットアップ**: Testing Library DOM拡張 (`jest.setup.js`)
- **モジュールマッピング**: `@/` エイリアスサポート
- **JSDOM環境**: ブラウザAPIシミュレーション

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
