import { z } from "zod";

// 電話番号バリデーション用のカスタムスキーマ
const phoneSchema = z.string().refine(
  (value) => {
    const phoneRegex =
      /^(070|080|090)-?\d{4}-?\d{4}$|^0\d{1,4}-?\d{1,4}-?\d{4}$/;
    return phoneRegex.test(value.replace(/-/g, ""));
  },
  {
    message: "正しい電話番号の形式で入力してください（例: 090-1234-5678）",
  }
);

// フォームデータ全体のスキーマ
export const formDataSchema = z.object({
  firstName: z.string().min(1, "姓を入力してください"),
  lastName: z.string().min(1, "名を入力してください"),
  address: z.string().min(1, "住所を入力してください"),
  phone: phoneSchema,
  agreement: z.boolean().refine((val) => val === true, {
    message: "利用規約への同意が必要です",
  }),
});

// 個人情報のスキーマ（姓名のみ）
export const personalInfoSchema = formDataSchema.pick({
  firstName: true,
  lastName: true,
});

// 連絡先情報のスキーマ（住所、電話、同意）
export const contactInfoSchema = formDataSchema.pick({
  address: true,
  phone: true,
  agreement: true,
});

// 型定義をスキーマから自動生成
export type FormData = z.infer<typeof formDataSchema>;
export type PersonalInfoData = z.infer<typeof personalInfoSchema>;
export type ContactInfoData = z.infer<typeof contactInfoSchema>;

// バリデーションエラー型
export interface ValidationErrors {
  firstName?: string;
  lastName?: string;
  address?: string;
  phone?: string;
  agreement?: string;
}

export interface StepProps {
  formData: FormData;
  errors: ValidationErrors;
  onUpdateField: (field: keyof FormData, value: string | boolean) => void;
}

export interface StepComponentProps extends StepProps {
  className?: string;
}

// zodエラーをValidationErrorsに変換するヘルパー関数
const zodErrorToValidationErrors = (error: z.ZodError): ValidationErrors => {
  const errors: ValidationErrors = {};

  for (const err of error.errors) {
    const field = err.path[0] as keyof ValidationErrors;
    if (field) {
      errors[field] = err.message;
    }
  }

  return errors;
};

// 個人情報のバリデーション
export const validatePersonalInfo = (formData: FormData): ValidationErrors => {
  const result = personalInfoSchema.safeParse(formData);

  if (!result.success) {
    return zodErrorToValidationErrors(result.error);
  }

  return {};
};

// 連絡先情報のバリデーション
export const validateContactInfo = (formData: FormData): ValidationErrors => {
  const result = contactInfoSchema.safeParse(formData);

  if (!result.success) {
    return zodErrorToValidationErrors(result.error);
  }

  return {};
};

// フォーム全体のバリデーション
export const validateFormData = (formData: FormData): ValidationErrors => {
  const result = formDataSchema.safeParse(formData);

  if (!result.success) {
    return zodErrorToValidationErrors(result.error);
  }

  return {};
};

// 後方互換性のための関数（廃止予定）
export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^(070|080|090)-?\d{4}-?\d{4}$|^0\d{1,4}-?\d{1,4}-?\d{4}$/;
  return phoneRegex.test(phone.replace(/-/g, ""));
};

export const getStepTitle = (step: number): string => {
  switch (step) {
    case 1:
      return "ステップ 1: 基本情報";
    case 2:
      return "ステップ 2: 詳細情報";
    case 3:
      return "ステップ 3: 確認";
    default:
      return "";
  }
};

export const getStepDescription = (step: number): string => {
  switch (step) {
    case 1:
      return "お客様の氏名をご入力ください";
    case 2:
      return "住所と電話番号、利用規約への同意をお願いします";
    case 3:
      return "入力内容をご確認の上、送信してください";
    default:
      return "";
  }
};
