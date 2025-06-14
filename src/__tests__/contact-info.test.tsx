import { ContactInfo } from "@/components/step-form/contact-info";
import type { FormData, ValidationErrors } from "@/lib/step-form-types";
import { fireEvent, render, screen } from "@testing-library/react";

describe("ContactInfo", () => {
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

  it("should render all input fields", () => {
    render(
      <ContactInfo
        formData={mockFormData}
        errors={mockErrors}
        onUpdateField={mockOnUpdateField}
      />
    );

    expect(screen.getByTestId("address-input")).toBeInTheDocument();
    expect(screen.getByTestId("phone-input")).toBeInTheDocument();
    expect(screen.getByTestId("agreement-checkbox")).toBeInTheDocument();
  });

  it("should display field labels", () => {
    render(
      <ContactInfo
        formData={mockFormData}
        errors={mockErrors}
        onUpdateField={mockOnUpdateField}
      />
    );

    expect(screen.getByText("住所")).toBeInTheDocument();
    expect(screen.getByText("電話番号")).toBeInTheDocument();
    expect(screen.getByText("利用規約に同意します")).toBeInTheDocument();
  });

  it("should display form values", () => {
    const formDataWithValues: FormData = {
      ...mockFormData,
      address: "東京都渋谷区1-1-1",
      phone: "090-1234-5678",
      agreement: true,
    };

    render(
      <ContactInfo
        formData={formDataWithValues}
        errors={mockErrors}
        onUpdateField={mockOnUpdateField}
      />
    );

    const addressInput = screen.getByTestId(
      "address-input"
    ) as HTMLInputElement;
    const phoneInput = screen.getByTestId("phone-input") as HTMLInputElement;
    const agreementCheckbox = screen.getByTestId("agreement-checkbox");

    expect(addressInput.value).toBe("東京都渋谷区1-1-1");
    expect(phoneInput.value).toBe("090-1234-5678");
    expect(agreementCheckbox).toHaveAttribute("data-state", "checked");
  });

  it("should call onUpdateField when address changes", () => {
    render(
      <ContactInfo
        formData={mockFormData}
        errors={mockErrors}
        onUpdateField={mockOnUpdateField}
      />
    );

    const addressInput = screen.getByTestId("address-input");
    fireEvent.change(addressInput, { target: { value: "東京都新宿区" } });

    expect(mockOnUpdateField).toHaveBeenCalledWith("address", "東京都新宿区");
  });

  it("should call onUpdateField when phone changes", () => {
    render(
      <ContactInfo
        formData={mockFormData}
        errors={mockErrors}
        onUpdateField={mockOnUpdateField}
      />
    );

    const phoneInput = screen.getByTestId("phone-input");
    fireEvent.change(phoneInput, { target: { value: "090-9999-8888" } });

    expect(mockOnUpdateField).toHaveBeenCalledWith("phone", "090-9999-8888");
  });

  it("should call onUpdateField when agreement checkbox is clicked", () => {
    render(
      <ContactInfo
        formData={mockFormData}
        errors={mockErrors}
        onUpdateField={mockOnUpdateField}
      />
    );

    const agreementCheckbox = screen.getByTestId("agreement-checkbox");
    fireEvent.click(agreementCheckbox);

    expect(mockOnUpdateField).toHaveBeenCalledWith("agreement", true);
  });

  it("should display unchecked state when agreement is false", () => {
    render(
      <ContactInfo
        formData={mockFormData}
        errors={mockErrors}
        onUpdateField={mockOnUpdateField}
      />
    );

    const agreementCheckbox = screen.getByTestId("agreement-checkbox");
    expect(agreementCheckbox).toHaveAttribute("data-state", "unchecked");
  });

  it("should display error messages", () => {
    const errorsWithMessage: ValidationErrors = {
      address: "住所を入力してください",
      phone: "正しい電話番号の形式で入力してください（例: 090-1234-5678）",
      agreement: "利用規約への同意が必要です",
    };

    render(
      <ContactInfo
        formData={mockFormData}
        errors={errorsWithMessage}
        onUpdateField={mockOnUpdateField}
      />
    );

    expect(screen.getByTestId("address-error")).toHaveTextContent(
      "住所を入力してください"
    );
    expect(screen.getByTestId("phone-error")).toHaveTextContent(
      "正しい電話番号の形式で入力してください（例: 090-1234-5678）"
    );
    expect(screen.getByTestId("agreement-error")).toHaveTextContent(
      "利用規約への同意が必要です"
    );
  });

  it("should apply error styling to inputs with errors", () => {
    const errorsWithMessage: ValidationErrors = {
      address: "住所を入力してください",
      phone: "正しい電話番号の形式で入力してください（例: 090-1234-5678）",
    };

    render(
      <ContactInfo
        formData={mockFormData}
        errors={errorsWithMessage}
        onUpdateField={mockOnUpdateField}
      />
    );

    const addressInput = screen.getByTestId("address-input");
    const phoneInput = screen.getByTestId("phone-input");

    expect(addressInput).toHaveClass("border-red-500");
    expect(phoneInput).toHaveClass("border-red-500");
  });

  it("should display phone number help text", () => {
    render(
      <ContactInfo
        formData={mockFormData}
        errors={mockErrors}
        onUpdateField={mockOnUpdateField}
      />
    );

    expect(
      screen.getByText("携帯電話または固定電話の番号を入力してください")
    ).toBeInTheDocument();
  });

  it("should have correct placeholders", () => {
    render(
      <ContactInfo
        formData={mockFormData}
        errors={mockErrors}
        onUpdateField={mockOnUpdateField}
      />
    );

    const addressInput = screen.getByTestId("address-input");
    const phoneInput = screen.getByTestId("phone-input");

    expect(addressInput).toHaveAttribute("placeholder", "東京都渋谷区...");
    expect(phoneInput).toHaveAttribute("placeholder", "090-0000-0000");
  });
});
