"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface FormData {
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  agreement: boolean;
}

interface ValidationErrors {
  firstName?: string;
  lastName?: string;
  address?: string;
  phone?: string;
  agreement?: string;
}

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

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^(070|080|090)-?\d{4}-?\d{4}$|^0\d{1,4}-?\d{1,4}-?\d{4}$/;
    return phoneRegex.test(phone.replace(/-/g, ''));
  };

  const validateStep = (step: number): boolean => {
    const newErrors: ValidationErrors = {};
    
    if (step === 1) {
      if (!formData.firstName.trim()) {
        newErrors.firstName = "姓を入力してください";
      }
      if (!formData.lastName.trim()) {
        newErrors.lastName = "名を入力してください";
      }
    }
    
    if (step === 2) {
      if (!formData.address.trim()) {
        newErrors.address = "住所を入力してください";
      }
      if (!formData.phone.trim()) {
        newErrors.phone = "電話番号を入力してください";
      } else if (!validatePhone(formData.phone)) {
        newErrors.phone = "正しい電話番号の形式で入力してください";
      }
      if (!formData.agreement) {
        newErrors.agreement = "利用規約への同意が必要です";
      }
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
    setOpen(false);
    resetForm();
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
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">姓 <span className="text-red-500">*</span></Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => updateFormData("firstName", e.target.value)}
                placeholder="山田"
                className={errors.firstName ? "border-red-500" : ""}
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm">{errors.firstName}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">名 <span className="text-red-500">*</span></Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => updateFormData("lastName", e.target.value)}
                placeholder="太郎"
                className={errors.lastName ? "border-red-500" : ""}
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm">{errors.lastName}</p>
              )}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="address">住所 <span className="text-red-500">*</span></Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => updateFormData("address", e.target.value)}
                placeholder="東京都渋谷区..."
                className={errors.address ? "border-red-500" : ""}
              />
              {errors.address && (
                <p className="text-red-500 text-sm">{errors.address}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">電話番号 <span className="text-red-500">*</span></Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => updateFormData("phone", e.target.value)}
                placeholder="090-0000-0000"
                className={errors.phone ? "border-red-500" : ""}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone}</p>
              )}
              <p className="text-xs text-muted-foreground">
                携帯電話または固定電話の番号を入力してください
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="agreement"
                  checked={formData.agreement}
                  onCheckedChange={(checked) => updateFormData("agreement", !!checked)}
                />
                <Label htmlFor="agreement">利用規約に同意します <span className="text-red-500">*</span></Label>
              </div>
              {errors.agreement && (
                <p className="text-red-500 text-sm">{errors.agreement}</p>
              )}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium">入力内容確認</h4>
              <div className="space-y-2 p-4 bg-muted rounded-md">
                <div>
                  <span className="font-medium">氏名:</span> {formData.firstName} {formData.lastName}
                </div>
                <div>
                  <span className="font-medium">住所:</span> {formData.address}
                </div>
                <div>
                  <span className="font-medium">電話番号:</span> {formData.phone}
                </div>
                <div>
                  <span className="font-medium">利用規約:</span> {formData.agreement ? "同意済み" : "未同意"}
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
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

  const getStepDescription = () => {
    switch (currentStep) {
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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{getStepTitle()}</DialogTitle>
          <DialogDescription>{getStepDescription()}</DialogDescription>
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

        <DialogFooter className="flex justify-between">
          <div>
            {currentStep > 1 && (
              <Button variant="outline" onClick={prevStep} disabled={isLoading}>
                前へ
              </Button>
            )}
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={handleClose} disabled={isLoading}>
              キャンセル
            </Button>
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
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}