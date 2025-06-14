import { StepComponentProps } from "@/lib/step-form-types";
import { cn } from "@/lib/utils";

export function Confirmation({ 
  formData, 
  className 
}: StepComponentProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <div className="space-y-2">
        <h4 className="font-medium">入力内容確認</h4>
        <div className="space-y-2 p-4 bg-muted rounded-md" data-testid="confirmation-summary">
          <div className="grid grid-cols-3 gap-2">
            <span className="font-medium">氏名:</span>
            <span className="col-span-2" data-testid="confirmation-name">
              {formData.firstName} {formData.lastName}
            </span>
          </div>
          
          <div className="grid grid-cols-3 gap-2">
            <span className="font-medium">住所:</span>
            <span className="col-span-2" data-testid="confirmation-address">
              {formData.address}
            </span>
          </div>
          
          <div className="grid grid-cols-3 gap-2">
            <span className="font-medium">電話番号:</span>
            <span className="col-span-2" data-testid="confirmation-phone">
              {formData.phone}
            </span>
          </div>
          
          <div className="grid grid-cols-3 gap-2">
            <span className="font-medium">利用規約:</span>
            <span className="col-span-2" data-testid="confirmation-agreement">
              {formData.agreement ? (
                <span className="text-green-600 font-medium">✓ 同意済み</span>
              ) : (
                <span className="text-red-600 font-medium">✗ 未同意</span>
              )}
            </span>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground">
          上記の内容でよろしければ、送信ボタンを押してください。
        </p>
      </div>
    </div>
  );
}