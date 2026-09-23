import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface SSNInputProps {
  name?: string;
  placeholder?: string;
  formData: Record<string, any>;
  handleInputChange: (field: string, val: string) => void;
  allowPaste?: boolean;
}

export const SSNInput = ({
  name = "ssn",
  placeholder = "XXX-XX-XXXX",
  formData,
  handleInputChange,
  allowPaste = true,
}: SSNInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [ssnVisible, setSsnVisible] = useState(false);

  const formatSSN = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 9);
    if (digits.length <= 3) return digits;
    if (digits.length <= 5) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    return `${digits.slice(0, 3)}-${digits.slice(3, 5)}-${digits.slice(5)}`;
  };

  const maskSSN = (val: string) => {
    const digits = val.replace(/\D/g, "");
    if (!digits) return "";
    if (digits.length <= 3) return "X".repeat(digits.length);
    if (digits.length <= 5) return `XXX-${"X".repeat(digits.length - 3)}`;
    return "XXX-XX-XXXX";
  };

  const currentValue = formData[name] || "";

  return (
    <div className="relative">
      <input
        type="text"
        name={name}
        maxLength={11}
        inputMode="numeric"
        autoComplete="off"
        data-sensitive="true"
        onPaste={(e) => !allowPaste && e.preventDefault()}
        value={isFocused || ssnVisible ? currentValue : maskSSN(currentValue)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={(e) => handleInputChange(name, formatSSN(e.target.value))}
        placeholder={placeholder}
        className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-3.5 pr-10 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-emerald-500"
      />
      <button
        type="button"
        onClick={() => setSsnVisible(!ssnVisible)}
        className="absolute right-3 top-3 text-slate-500 hover:text-slate-300"
      >
        {ssnVisible ? (
          <EyeOff className="w-4 h-4" />
        ) : (
          <Eye className="w-4 h-4" />
        )}
      </button>
    </div>
  );
};
