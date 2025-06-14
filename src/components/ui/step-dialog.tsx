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

interface StepDialogProps {
  trigger: React.ReactNode;
}

export function StepDialog({ trigger }: StepDialogProps) {
  const [open, setOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
    agreement: false,
  });

  const updateFormData = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < 3) {
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
  };

  const handleClose = () => {
    setOpen(false);
    resetForm();
  };

  const handleSubmit = () => {
    console.log("フォーム送信:", formData);
    alert("フォームが送信されました！");
    handleClose();
  };

  const isStep1Valid = formData.firstName.trim() && formData.lastName.trim();
  const isStep2Valid = formData.address.trim() && formData.phone.trim() && formData.agreement;

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">姓</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => updateFormData("firstName", e.target.value)}
                placeholder="山田"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">名</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => updateFormData("lastName", e.target.value)}
                placeholder="太郎"
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="address">住所</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => updateFormData("address", e.target.value)}
                placeholder="東京都渋谷区..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">電話番号</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => updateFormData("phone", e.target.value)}
                placeholder="090-0000-0000"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="agreement"
                checked={formData.agreement}
                onCheckedChange={(checked) => updateFormData("agreement", !!checked)}
              />
              <Label htmlFor="agreement">利用規約に同意します</Label>
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
              <Button variant="outline" onClick={prevStep}>
                前へ
              </Button>
            )}
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={handleClose}>
              キャンセル
            </Button>
            {currentStep < 3 ? (
              <Button
                onClick={nextStep}
                disabled={
                  (currentStep === 1 && !isStep1Valid) ||
                  (currentStep === 2 && !isStep2Valid)
                }
              >
                次へ
              </Button>
            ) : (
              <Button onClick={handleSubmit}>
                送信
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}