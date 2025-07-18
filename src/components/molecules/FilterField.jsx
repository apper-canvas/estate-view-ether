import Label from "@/components/atoms/Label";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import { cn } from "@/utils/cn";

const FilterField = ({ 
  label, 
  type = "text", 
  value, 
  onChange, 
  options = [], 
  placeholder,
  className 
}) => {
  return (
    <div className={cn("space-y-2", className)}>
      <Label>{label}</Label>
      {type === "select" ? (
        <Select value={value} onChange={(e) => onChange(e.target.value)}>
          <option value="">{placeholder || `Select ${label}`}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      ) : (
        <Input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      )}
    </div>
  );
};

export default FilterField;