import {
  type FormData,
  contactInfoSchema,
  formDataSchema,
  personalInfoSchema,
  validateContactInfo,
  validateFormData,
  validatePersonalInfo,
  validatePhone,
} from "@/lib/step-form-types";

describe("Zod Schema Validation", () => {
  describe("formDataSchema", () => {
    it("should validate complete valid form data", () => {
      const validData: FormData = {
        firstName: "山田",
        lastName: "太郎",
        address: "東京都渋谷区1-1-1",
        phone: "090-1234-5678",
        agreement: true,
      };

      const result = formDataSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it("should reject invalid form data", () => {
      const invalidData = {
        firstName: "",
        lastName: "太郎",
        address: "",
        phone: "invalid-phone",
        agreement: false,
      };

      const result = formDataSchema.safeParse(invalidData);
      expect(result.success).toBe(false);

      if (!result.success) {
        const errors = result.error.errors;
        expect(errors.some((err) => err.path[0] === "firstName")).toBe(true);
        expect(errors.some((err) => err.path[0] === "address")).toBe(true);
        expect(errors.some((err) => err.path[0] === "phone")).toBe(true);
        expect(errors.some((err) => err.path[0] === "agreement")).toBe(true);
      }
    });
  });

  describe("personalInfoSchema", () => {
    it("should validate personal info data", () => {
      const validPersonalInfo: { firstName: string; lastName: string } = {
        firstName: "山田",
        lastName: "太郎",
      };

      const result = personalInfoSchema.safeParse(validPersonalInfo);
      expect(result.success).toBe(true);
    });

    it("should reject invalid personal info data", () => {
      const invalidPersonalInfo = {
        firstName: "",
        lastName: "",
      };

      const result = personalInfoSchema.safeParse(invalidPersonalInfo);
      expect(result.success).toBe(false);
    });
  });

  describe("contactInfoSchema", () => {
    it("should validate contact info data", () => {
      const validContactInfo = {
        address: "東京都渋谷区1-1-1",
        phone: "090-1234-5678",
        agreement: true,
      };

      const result = contactInfoSchema.safeParse(validContactInfo);
      expect(result.success).toBe(true);
    });

    it("should reject invalid contact info data", () => {
      const invalidContactInfo = {
        address: "",
        phone: "123",
        agreement: false,
      };

      const result = contactInfoSchema.safeParse(invalidContactInfo);
      expect(result.success).toBe(false);
    });
  });
});

describe("Validation Functions", () => {
  describe("validatePersonalInfo", () => {
    it("should return no errors for valid input", () => {
      const formData: FormData = {
        firstName: "山田",
        lastName: "太郎",
        address: "",
        phone: "",
        agreement: false,
      };

      const errors = validatePersonalInfo(formData);
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

      const errors = validatePersonalInfo(formData);
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

      const errors = validatePersonalInfo(formData);
      expect(errors.lastName).toBe("名を入力してください");
    });

    it("should return errors for both empty fields", () => {
      const formData: FormData = {
        firstName: "",
        lastName: "",
        address: "東京都渋谷区1-1-1",
        phone: "090-1234-5678",
        agreement: true,
      };

      const errors = validatePersonalInfo(formData);
      expect(errors.firstName).toBe("姓を入力してください");
      expect(errors.lastName).toBe("名を入力してください");
    });
  });

  describe("validateContactInfo", () => {
    it("should return no errors for valid input", () => {
      const formData: FormData = {
        firstName: "山田",
        lastName: "太郎",
        address: "東京都渋谷区1-1-1",
        phone: "090-1234-5678",
        agreement: true,
      };

      const errors = validateContactInfo(formData);
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

      const errors = validateContactInfo(formData);
      expect(errors.phone).toBe(
        "正しい電話番号の形式で入力してください（例: 090-1234-5678）"
      );
    });

    it("should return error for missing agreement", () => {
      const formData: FormData = {
        firstName: "山田",
        lastName: "太郎",
        address: "東京都渋谷区1-1-1",
        phone: "090-1234-5678",
        agreement: false,
      };

      const errors = validateContactInfo(formData);
      expect(errors.agreement).toBe("利用規約への同意が必要です");
    });

    it("should return multiple errors for invalid input", () => {
      const formData: FormData = {
        firstName: "山田",
        lastName: "太郎",
        address: "",
        phone: "invalid",
        agreement: false,
      };

      const errors = validateContactInfo(formData);
      expect(errors.address).toBe("住所を入力してください");
      expect(errors.phone).toBe(
        "正しい電話番号の形式で入力してください（例: 090-1234-5678）"
      );
      expect(errors.agreement).toBe("利用規約への同意が必要です");
    });
  });

  describe("validateFormData", () => {
    it("should validate complete form data", () => {
      const formData: FormData = {
        firstName: "山田",
        lastName: "太郎",
        address: "東京都渋谷区1-1-1",
        phone: "090-1234-5678",
        agreement: true,
      };

      const errors = validateFormData(formData);
      expect(Object.keys(errors)).toHaveLength(0);
    });

    it("should return all field errors for invalid form data", () => {
      const formData: FormData = {
        firstName: "",
        lastName: "",
        address: "",
        phone: "invalid",
        agreement: false,
      };

      const errors = validateFormData(formData);
      expect(errors.firstName).toBe("姓を入力してください");
      expect(errors.lastName).toBe("名を入力してください");
      expect(errors.address).toBe("住所を入力してください");
      expect(errors.phone).toBe(
        "正しい電話番号の形式で入力してください（例: 090-1234-5678）"
      );
      expect(errors.agreement).toBe("利用規約への同意が必要です");
    });
  });

  describe("validatePhone (backward compatibility)", () => {
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
