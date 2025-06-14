// この例は実際のテストフレームワークを使用していません
// 実際のプロジェクトでは Jest + React Testing Library などを使用してください

import {
  FormData,
  validateStep1,
  validateStep2,
  validatePhone,
} from "@/lib/step-form-types";

// バリデーション関数のテスト例
describe("Step Form Validation", () => {
  describe("validateStep1", () => {
    it("should return no errors for valid input", () => {
      const formData: FormData = {
        firstName: "山田",
        lastName: "太郎",
        address: "",
        phone: "",
        agreement: false,
      };

      const errors = validateStep1(formData);
      expect(Object.keys(errors)).toHaveLength(0);
    });

    it("should return errors for empty firstName", () => {
      const formData: FormData = {
        firstName: "",
        lastName: "太郎",
        address: "",
        phone: "",
        agreement: false,
      };

      const errors = validateStep1(formData);
      expect(errors.firstName).toBe("姓を入力してください");
    });

    it("should return errors for empty lastName", () => {
      const formData: FormData = {
        firstName: "山田",
        lastName: "",
        address: "",
        phone: "",
        agreement: false,
      };

      const errors = validateStep1(formData);
      expect(errors.lastName).toBe("名を入力してください");
    });
  });

  describe("validateStep2", () => {
    it("should return no errors for valid input", () => {
      const formData: FormData = {
        firstName: "山田",
        lastName: "太郎",
        address: "東京都渋谷区1-1-1",
        phone: "090-1234-5678",
        agreement: true,
      };

      const errors = validateStep2(formData);
      expect(Object.keys(errors)).toHaveLength(0);
    });

    it("should return error for invalid phone number", () => {
      const formData: FormData = {
        firstName: "山田",
        lastName: "太郎",
        address: "東京都渋谷区1-1-1",
        phone: "123",
        agreement: true,
      };

      const errors = validateStep2(formData);
      expect(errors.phone).toBe("正しい電話番号の形式で入力してください");
    });

    it("should return error for missing agreement", () => {
      const formData: FormData = {
        firstName: "山田",
        lastName: "太郎",
        address: "東京都渋谷区1-1-1",
        phone: "090-1234-5678",
        agreement: false,
      };

      const errors = validateStep2(formData);
      expect(errors.agreement).toBe("利用規約への同意が必要です");
    });
  });

  describe("validatePhone", () => {
    it("should validate mobile phone numbers", () => {
      expect(validatePhone("090-1234-5678")).toBe(true);
      expect(validatePhone("080-1234-5678")).toBe(true);
      expect(validatePhone("070-1234-5678")).toBe(true);
      expect(validatePhone("09012345678")).toBe(true);
    });

    it("should validate landline phone numbers", () => {
      expect(validatePhone("03-1234-5678")).toBe(true);
      expect(validatePhone("06-1234-5678")).toBe(true);
      expect(validatePhone("0312345678")).toBe(true);
    });

    it("should reject invalid phone numbers", () => {
      expect(validatePhone("123")).toBe(false);
      expect(validatePhone("abc")).toBe(false);
      expect(validatePhone("")).toBe(false);
      expect(validatePhone("12-34-56")).toBe(false);
    });
  });
});

// コンポーネントテストの例（React Testing Libraryを使用）
/*
import { render, screen, fireEvent } from "@testing-library/react";
import { Step1PersonalInfo } from "@/components/step-form/step1-personal-info";
import { FormData, ValidationErrors } from "@/lib/step-form-types";

describe("Step1PersonalInfo", () => {
  const mockFormData: FormData = {
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
    agreement: false,
  };

  const mockErrors: ValidationErrors = {};
  const mockOnUpdateField = jest.fn();

  beforeEach(() => {
    mockOnUpdateField.mockClear();
  });

  it("should render input fields", () => {
    render(
      <Step1PersonalInfo
        formData={mockFormData}
        errors={mockErrors}
        onUpdateField={mockOnUpdateField}
      />
    );

    expect(screen.getByTestId("firstName-input")).toBeInTheDocument();
    expect(screen.getByTestId("lastName-input")).toBeInTheDocument();
  });

  it("should call onUpdateField when firstName changes", () => {
    render(
      <Step1PersonalInfo
        formData={mockFormData}
        errors={mockErrors}
        onUpdateField={mockOnUpdateField}
      />
    );

    const firstNameInput = screen.getByTestId("firstName-input");
    fireEvent.change(firstNameInput, { target: { value: "山田" } });

    expect(mockOnUpdateField).toHaveBeenCalledWith("firstName", "山田");
  });

  it("should display error messages", () => {
    const errorsWithMessage: ValidationErrors = {
      firstName: "姓を入力してください",
    };

    render(
      <Step1PersonalInfo
        formData={mockFormData}
        errors={errorsWithMessage}
        onUpdateField={mockOnUpdateField}
      />
    );

    expect(screen.getByTestId("firstName-error")).toHaveTextContent("姓を入力してください");
  });

  it("should apply error styling to input with error", () => {
    const errorsWithMessage: ValidationErrors = {
      firstName: "姓を入力してください",
    };

    render(
      <Step1PersonalInfo
        formData={mockFormData}
        errors={errorsWithMessage}
        onUpdateField={mockOnUpdateField}
      />
    );

    const firstNameInput = screen.getByTestId("firstName-input");
    expect(firstNameInput).toHaveClass("border-red-500");
  });
});
*/