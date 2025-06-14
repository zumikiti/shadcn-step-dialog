import { Confirmation } from "@/components/step-form/confirmation";
import type { FormData, ValidationErrors } from "@/lib/step-form-types";
import { render, screen } from "@testing-library/react";

describe("Confirmation", () => {
  const mockFormData: FormData = {
    firstName: "山田",
    lastName: "太郎",
    address: "東京都渋谷区1-1-1",
    phone: "090-1234-5678",
    agreement: true,
  };

  const mockErrors: ValidationErrors = {};
  const mockOnUpdateField = jest.fn();

  it("should render confirmation summary", () => {
    render(
      <Confirmation
        formData={mockFormData}
        errors={mockErrors}
        onUpdateField={mockOnUpdateField}
      />
    );

    expect(screen.getByTestId("confirmation-summary")).toBeInTheDocument();
  });

  it("should display form data correctly", () => {
    render(
      <Confirmation
        formData={mockFormData}
        errors={mockErrors}
        onUpdateField={mockOnUpdateField}
      />
    );

    // 氏名の確認
    expect(screen.getByTestId("confirmation-name")).toHaveTextContent(
      "山田 太郎"
    );

    // 住所の確認
    expect(screen.getByTestId("confirmation-address")).toHaveTextContent(
      "東京都渋谷区1-1-1"
    );

    // 電話番号の確認
    expect(screen.getByTestId("confirmation-phone")).toHaveTextContent(
      "090-1234-5678"
    );

    // 利用規約同意の確認
    expect(screen.getByTestId("confirmation-agreement")).toHaveTextContent(
      "✓ 同意済み"
    );
  });

  it("should display agreement as not agreed when false", () => {
    const formDataNotAgreed: FormData = {
      ...mockFormData,
      agreement: false,
    };

    render(
      <Confirmation
        formData={formDataNotAgreed}
        errors={mockErrors}
        onUpdateField={mockOnUpdateField}
      />
    );

    expect(screen.getByTestId("confirmation-agreement")).toHaveTextContent(
      "✗ 未同意"
    );
  });

  it("should display section headers", () => {
    render(
      <Confirmation
        formData={mockFormData}
        errors={mockErrors}
        onUpdateField={mockOnUpdateField}
      />
    );

    expect(screen.getByText("入力内容確認")).toBeInTheDocument();
    expect(screen.getByText("氏名:")).toBeInTheDocument();
    expect(screen.getByText("住所:")).toBeInTheDocument();
    expect(screen.getByText("電話番号:")).toBeInTheDocument();
    expect(screen.getByText("利用規約:")).toBeInTheDocument();
  });

  it("should display instruction text", () => {
    render(
      <Confirmation
        formData={mockFormData}
        errors={mockErrors}
        onUpdateField={mockOnUpdateField}
      />
    );

    expect(
      screen.getByText("上記の内容でよろしければ、送信ボタンを押してください。")
    ).toBeInTheDocument();
  });

  it("should handle empty form data gracefully", () => {
    const emptyFormData: FormData = {
      firstName: "",
      lastName: "",
      address: "",
      phone: "",
      agreement: false,
    };

    render(
      <Confirmation
        formData={emptyFormData}
        errors={mockErrors}
        onUpdateField={mockOnUpdateField}
      />
    );

    expect(screen.getByTestId("confirmation-name")).toHaveTextContent("");
    expect(screen.getByTestId("confirmation-address")).toHaveTextContent("");
    expect(screen.getByTestId("confirmation-phone")).toHaveTextContent("");
    expect(screen.getByTestId("confirmation-agreement")).toHaveTextContent(
      "✗ 未同意"
    );
  });

  it("should apply correct styling for agreement status", () => {
    render(
      <Confirmation
        formData={mockFormData}
        errors={mockErrors}
        onUpdateField={mockOnUpdateField}
      />
    );

    const agreementElement = screen.getByTestId("confirmation-agreement")
      .firstChild as HTMLElement;
    expect(agreementElement).toHaveClass("text-green-600");
    expect(agreementElement).toHaveClass("font-medium");
  });

  it("should apply correct styling for non-agreement status", () => {
    const formDataNotAgreed: FormData = {
      ...mockFormData,
      agreement: false,
    };

    render(
      <Confirmation
        formData={formDataNotAgreed}
        errors={mockErrors}
        onUpdateField={mockOnUpdateField}
      />
    );

    const agreementElement = screen.getByTestId("confirmation-agreement")
      .firstChild as HTMLElement;
    expect(agreementElement).toHaveClass("text-red-600");
    expect(agreementElement).toHaveClass("font-medium");
  });
});
