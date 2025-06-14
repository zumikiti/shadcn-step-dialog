import { render, screen, fireEvent } from "@testing-library/react";
import { PersonalInfo } from "@/components/step-form/personal-info";
import { FormData, ValidationErrors } from "@/lib/step-form-types";

describe("PersonalInfo", () => {
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
      <PersonalInfo
        formData={mockFormData}
        errors={mockErrors}
        onUpdateField={mockOnUpdateField}
      />
    );

    expect(screen.getByTestId("firstName-input")).toBeInTheDocument();
    expect(screen.getByTestId("lastName-input")).toBeInTheDocument();
  });

  it("should display field labels", () => {
    render(
      <PersonalInfo
        formData={mockFormData}
        errors={mockErrors}
        onUpdateField={mockOnUpdateField}
      />
    );

    expect(screen.getByText("姓")).toBeInTheDocument();
    expect(screen.getByText("名")).toBeInTheDocument();
  });

  it("should display form values", () => {
    const formDataWithValues: FormData = {
      ...mockFormData,
      firstName: "山田",
      lastName: "太郎",
    };

    render(
      <PersonalInfo
        formData={formDataWithValues}
        errors={mockErrors}
        onUpdateField={mockOnUpdateField}
      />
    );

    const firstNameInput = screen.getByTestId("firstName-input") as HTMLInputElement;
    const lastNameInput = screen.getByTestId("lastName-input") as HTMLInputElement;

    expect(firstNameInput.value).toBe("山田");
    expect(lastNameInput.value).toBe("太郎");
  });

  it("should call onUpdateField when firstName changes", () => {
    render(
      <PersonalInfo
        formData={mockFormData}
        errors={mockErrors}
        onUpdateField={mockOnUpdateField}
      />
    );

    const firstNameInput = screen.getByTestId("firstName-input");
    fireEvent.change(firstNameInput, { target: { value: "山田" } });

    expect(mockOnUpdateField).toHaveBeenCalledWith("firstName", "山田");
  });

  it("should call onUpdateField when lastName changes", () => {
    render(
      <PersonalInfo
        formData={mockFormData}
        errors={mockErrors}
        onUpdateField={mockOnUpdateField}
      />
    );

    const lastNameInput = screen.getByTestId("lastName-input");
    fireEvent.change(lastNameInput, { target: { value: "太郎" } });

    expect(mockOnUpdateField).toHaveBeenCalledWith("lastName", "太郎");
  });

  it("should display error messages", () => {
    const errorsWithMessage: ValidationErrors = {
      firstName: "姓を入力してください",
      lastName: "名を入力してください",
    };

    render(
      <PersonalInfo
        formData={mockFormData}
        errors={errorsWithMessage}
        onUpdateField={mockOnUpdateField}
      />
    );

    expect(screen.getByTestId("firstName-error")).toHaveTextContent("姓を入力してください");
    expect(screen.getByTestId("lastName-error")).toHaveTextContent("名を入力してください");
  });

  it("should apply error styling to input with error", () => {
    const errorsWithMessage: ValidationErrors = {
      firstName: "姓を入力してください",
    };

    render(
      <PersonalInfo
        formData={mockFormData}
        errors={errorsWithMessage}
        onUpdateField={mockOnUpdateField}
      />
    );

    const firstNameInput = screen.getByTestId("firstName-input");
    expect(firstNameInput).toHaveClass("border-red-500");
  });

  it("should not display error messages when there are no errors", () => {
    render(
      <PersonalInfo
        formData={mockFormData}
        errors={mockErrors}
        onUpdateField={mockOnUpdateField}
      />
    );

    expect(screen.queryByTestId("firstName-error")).not.toBeInTheDocument();
    expect(screen.queryByTestId("lastName-error")).not.toBeInTheDocument();
  });

  it("should have correct placeholders", () => {
    render(
      <PersonalInfo
        formData={mockFormData}
        errors={mockErrors}
        onUpdateField={mockOnUpdateField}
      />
    );

    const firstNameInput = screen.getByTestId("firstName-input");
    const lastNameInput = screen.getByTestId("lastName-input");

    expect(firstNameInput).toHaveAttribute("placeholder", "山田");
    expect(lastNameInput).toHaveAttribute("placeholder", "太郎");
  });
});