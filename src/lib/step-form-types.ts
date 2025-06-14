export interface FormData {
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  agreement: boolean;
}

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

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^(070|080|090)-?\d{4}-?\d{4}$|^0\d{1,4}-?\d{1,4}-?\d{4}$/;
  return phoneRegex.test(phone.replace(/-/g, ''));
};

export const validateStep1 = (formData: FormData): ValidationErrors => {
  const errors: ValidationErrors = {};
  
  if (!formData.firstName.trim()) {
    errors.firstName = "姓を入力してください";
  }
  if (!formData.lastName.trim()) {
    errors.lastName = "名を入力してください";
  }
  
  return errors;
};

export const validateStep2 = (formData: FormData): ValidationErrors => {
  const errors: ValidationErrors = {};
  
  if (!formData.address.trim()) {
    errors.address = "住所を入力してください";
  }
  if (!formData.phone.trim()) {
    errors.phone = "電話番号を入力してください";
  } else if (!validatePhone(formData.phone)) {
    errors.phone = "正しい電話番号の形式で入力してください";
  }
  if (!formData.agreement) {
    errors.agreement = "利用規約への同意が必要です";
  }
  
  return errors;
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