import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { StepComponentProps } from "@/lib/step-form-types";
import { cn } from "@/lib/utils";

export function Step2ContactInfo({ 
  formData, 
  errors, 
  onUpdateField, 
  className 
}: StepComponentProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <div className="space-y-2">
        <Label htmlFor="address">
          住所 <span className="text-red-500">*</span>
        </Label>
        <Input
          id="address"
          value={formData.address}
          onChange={(e) => onUpdateField("address", e.target.value)}
          placeholder="東京都渋谷区..."
          className={errors.address ? "border-red-500" : ""}
          data-testid="address-input"
        />
        {errors.address && (
          <p className="text-red-500 text-sm" data-testid="address-error">
            {errors.address}
          </p>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="phone">
          電話番号 <span className="text-red-500">*</span>
        </Label>
        <Input
          id="phone"
          value={formData.phone}
          onChange={(e) => onUpdateField("phone", e.target.value)}
          placeholder="090-0000-0000"
          className={errors.phone ? "border-red-500" : ""}
          data-testid="phone-input"
        />
        {errors.phone && (
          <p className="text-red-500 text-sm" data-testid="phone-error">
            {errors.phone}
          </p>
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
            onCheckedChange={(checked) => onUpdateField("agreement", !!checked)}
            data-testid="agreement-checkbox"
          />
          <Label htmlFor="agreement">
            利用規約に同意します <span className="text-red-500">*</span>
          </Label>
        </div>
        {errors.agreement && (
          <p className="text-red-500 text-sm" data-testid="agreement-error">
            {errors.agreement}
          </p>
        )}
      </div>
    </div>
  );
}