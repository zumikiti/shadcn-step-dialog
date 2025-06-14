import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StepComponentProps } from "@/lib/step-form-types";
import { cn } from "@/lib/utils";

export function Step1PersonalInfo({ 
  formData, 
  errors, 
  onUpdateField, 
  className 
}: StepComponentProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <div className="space-y-2">
        <Label htmlFor="firstName">
          姓 <span className="text-red-500">*</span>
        </Label>
        <Input
          id="firstName"
          value={formData.firstName}
          onChange={(e) => onUpdateField("firstName", e.target.value)}
          placeholder="山田"
          className={errors.firstName ? "border-red-500" : ""}
          data-testid="firstName-input"
        />
        {errors.firstName && (
          <p className="text-red-500 text-sm" data-testid="firstName-error">
            {errors.firstName}
          </p>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="lastName">
          名 <span className="text-red-500">*</span>
        </Label>
        <Input
          id="lastName"
          value={formData.lastName}
          onChange={(e) => onUpdateField("lastName", e.target.value)}
          placeholder="太郎"
          className={errors.lastName ? "border-red-500" : ""}
          data-testid="lastName-input"
        />
        {errors.lastName && (
          <p className="text-red-500 text-sm" data-testid="lastName-error">
            {errors.lastName}
          </p>
        )}
      </div>
    </div>
  );
}