"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  PersonalInfo,
  ContactInfo,
  Confirmation,
} from "@/components/step-form";
import {
  FormData,
  ValidationErrors,
  validatePersonalInfo,
  validateContactInfo,
  getStepTitle,
  getStepDescription,
} from "@/lib/step-form-types";

interface StepDialogProps {
  trigger: React.ReactNode;
}

export function StepDialog({ trigger }: StepDialogProps) {
  const [open, setOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
    agreement: false,
  });
  const [errors, setErrors] = useState<ValidationErrors>({});

  const updateFormData = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateStep = (step: number): boolean => {
    let newErrors: ValidationErrors = {};
    
    if (step === 1) {
      newErrors = validatePersonalInfo(formData);
    } else if (step === 2) {
      newErrors = validateContactInfo(formData);
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep) && currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const resetForm = () => {
    setCurrentStep(1);
    setFormData({
      firstName: "",
      lastName: "",
      address: "",
      phone: "",
      agreement: false,
    });
    setErrors({});
    setIsLoading(false);
  };

  const handleClose = () => {
    resetForm();
    setOpen(false);
  };

  const handleSubmit = async () => {
    if (!validateStep(2)) return;
    
    setIsLoading(true);
    try {
      // シミュレートされた送信処理
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log("フォーム送信:", formData);
      alert("フォームが送信されました！");
      handleClose();
    } catch (error) {
      console.error("送信エラー:", error);
      alert("送信に失敗しました。もう一度お試しください。");
    } finally {
      setIsLoading(false);
    }
  };

  const renderStepContent = () => {
    const stepProps = {
      formData,
      errors,
      onUpdateField: updateFormData,
    };

    switch (currentStep) {
      case 1:
        return <PersonalInfo {...stepProps} />;
      case 2:
        return <ContactInfo {...stepProps} />;
      case 3:
        return <Confirmation {...stepProps} />;
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{getStepTitle(currentStep)}</DialogTitle>
          <DialogDescription>{getStepDescription(currentStep)}</DialogDescription>
        </DialogHeader>
        
        <div className="flex justify-center mb-4">
          <div className="flex items-center space-x-2">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step <= currentStep
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {step}
                </div>
                {step < 3 && (
                  <div
                    className={`w-8 h-0.5 ${
                      step < currentStep ? "bg-primary" : "bg-muted"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="py-4">
          {renderStepContent()}
        </div>

        {/* DialogFooter だと右側にボタンが寄ってしまうので、カスタムフッターを使用 */}
        <div className="flex justify-between items-center pt-4 border-t">
          {/* 左端：キャンセルボタン */}
          <Button variant="outline" onClick={handleClose} disabled={isLoading}>
            キャンセル
          </Button>
          
          {/* 右端：ナビゲーションボタン */}
          <div className="flex space-x-2">
            {currentStep > 1 && (
              <Button variant="outline" onClick={prevStep} disabled={isLoading}>
                前へ
              </Button>
            )}
            {currentStep < 3 ? (
              <Button onClick={nextStep} disabled={isLoading}>
                次へ
              </Button>
            ) : (
              <Button onClick={handleSubmit} disabled={isLoading}>
                {isLoading ? "送信中..." : "送信"}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
