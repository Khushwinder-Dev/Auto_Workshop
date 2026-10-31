"use client";

import React, { useState } from "react";
import { InputValidationTick, isValidEmail, isValidPhone, isValidText } from "@/components/ui/InputValidationTick";
import { VoiceMicButton, VoiceListeningBadge } from "@/components/ui/VoiceMicButton";

// ── Shared styles ─────────────────────────────────────────────────────────────
const inputBase = `
  peer w-full rounded-full border
  px-5 pt-5 pb-2
  text-sm sm:text-[15px]
  focus:outline-none
  transition-all duration-200
  disabled:opacity-50 disabled:cursor-not-allowed
`;

// ── FloatInput ────────────────────────────────────────────────────────────────
export interface FloatInputProps {
  type?: string;
  name: string;
  value: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  isArabic?: boolean;
  error?: string;
  hasError?: boolean;
  icon?: React.ReactNode;
  isListening?: boolean;
  onVoiceToggle?: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  variant?: "light" | "dark";
  size?: "default" | "sm";
  className?: string;
  containerClassName?: string;
  autoComplete?: string;
  min?: string | number;
  max?: string | number;
}

export function FloatInput({
  type = "text",
  name,
  value,
  label,
  placeholder = " ",
  required,
  disabled,
  isArabic = false,
  error,
  hasError,
  icon,
  isListening,
  onVoiceToggle,
  onChange,
  onFocus,
  onBlur,
  variant = "light",
  size = "default",
  className = "",
  containerClassName = "",
  autoComplete,
  min,
  max,
}: FloatInputProps) {
  const [focused, setFocused] = useState(false);
  const isDark = variant === "dark";
  const isSm = size === "sm";

  // Date and time inputs always show native controls, so label must stay lifted
  const lifted = focused || value.length > 0 || type === "date" || type === "time";
  const isInvalid = Boolean(error || hasError);

  const isValid =
    type === "email"
      ? isValidEmail(value)
      : type === "tel"
      ? isValidPhone(value)
      : type === "date"
      ? Boolean(value)
      : isValidText(value);

  const paddingClasses = onVoiceToggle
    ? isArabic
      ? isSm ? "pl-16 text-right" : "pl-20 text-right"
      : isSm ? "pr-16 text-left" : "pr-20 text-left"
    : isArabic
    ? isSm ? "pl-8 text-right" : "pl-11 text-right"
    : isSm ? "pr-8 text-left" : "pr-11 text-left";

  const heightPadding = isSm
    ? "h-11 px-4.5 pt-3.5 pb-1 text-xs sm:text-[13.5px]"
    : "px-5 pt-5 pb-2 text-sm sm:text-[15px]";

  const inputBaseClasses = `
    peer w-full rounded-full border
    ${heightPadding}
    focus:outline-none
    transition-all duration-200
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const colorClasses = isDark
    ? `bg-zinc-800/80 text-white ${
        isInvalid
          ? "border-red-500 ring-2 ring-red-500/20 focus:border-red-500 focus:ring-red-500/25"
          : lifted
          ? "border-zinc-600 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
          : "border-white/10 hover:border-zinc-600 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
      }`
    : `bg-white text-zinc-900 ${
        isInvalid
          ? "border-red-500 ring-2 ring-red-500/15 focus:border-red-500 focus:ring-red-500/20"
          : lifted
          ? "border-zinc-300 focus:border-red-600 focus:ring-2 focus:ring-red-600/20"
          : "border-zinc-300 hover:border-zinc-400 focus:border-red-600 focus:ring-2 focus:ring-red-600/20"
      }`;

  const labelBg = isDark ? "bg-zinc-900" : "bg-white";

  return (
    <div className={`w-full ${containerClassName}`}>
      <div className="relative w-full">
        <input
          type={type}
          name={name}
          value={value}
          required={required}
          disabled={disabled}
          autoComplete={autoComplete}
          min={min}
          max={max}
          onChange={onChange}
          onFocus={() => {
            setFocused(true);
            onFocus?.();
          }}
          onBlur={() => {
            setFocused(false);
            onBlur?.();
          }}
          dir={isArabic ? "rtl" : "ltr"}
          placeholder={placeholder}
          className={`${inputBaseClasses} ${paddingClasses} ${colorClasses} ${className}`}
        />
        <label
          className={`
            pointer-events-none absolute px-1.5
            ${isArabic ? (isSm ? "right-4.5" : "right-5") : (isSm ? "left-4.5" : "left-5")}
            transition-all duration-200
            ${
              lifted
                ? `-top-2 ${isSm ? "text-[10px]" : "text-[11px]"} font-semibold ${labelBg} ${
                    isInvalid
                      ? "text-red-500"
                      : isDark
                      ? "text-red-400"
                      : "text-red-600"
                  }`
                : `top-1/2 -translate-y-1/2 ${isSm ? "text-xs sm:text-[13px]" : "text-sm"} bg-transparent ${
                    isInvalid
                      ? "text-red-500 font-medium"
                      : isDark
                      ? "text-zinc-400"
                      : "text-zinc-400"
                  }`
            }
          `}
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>

        {/* Actions container: Mic button + Validation tick / icon */}
        <div
          className={`absolute top-1/2 -translate-y-1/2 flex items-center gap-1 z-10 ${
            isArabic ? "left-3" : "right-3"
          }`}
        >
          {onVoiceToggle && (focused || isListening) && (
            <VoiceMicButton
              isListening={!!isListening}
              onClick={onVoiceToggle}
              isArabic={isArabic}
              theme={variant}
              size="sm"
            />
          )}
          {isValid && !isInvalid ? (
            <InputValidationTick
              isValid={true}
              isArabic={isArabic}
              className="!static !translate-y-0 !left-auto !right-auto"
            />
          ) : icon ? (
            <div
              className={`pointer-events-none flex items-center justify-center transition-opacity duration-150 ${
                isDark ? "text-zinc-400" : "text-zinc-400"
              }`}
            >
              {icon}
            </div>
          ) : null}
        </div>
      </div>

      {isListening && <VoiceListeningBadge isArabic={isArabic} />}

      {error && (
        <p className="text-xs text-red-500 mt-1.5 px-4 font-normal text-start animate-in fade-in duration-150">
          {error}
        </p>
      )}
    </div>
  );
}

// ── FloatTextarea ─────────────────────────────────────────────────────────────
export interface FloatTextareaProps {
  name: string;
  value: string;
  label: string;
  rows?: number;
  required?: boolean;
  disabled?: boolean;
  isArabic?: boolean;
  error?: string;
  hasError?: boolean;
  isListening?: boolean;
  onVoiceToggle?: () => void;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  variant?: "light" | "dark";
  size?: "default" | "sm";
  className?: string;
  containerClassName?: string;
}

export function FloatTextarea({
  name,
  value,
  label,
  rows = 4,
  required,
  disabled,
  isArabic = false,
  error,
  hasError,
  isListening,
  onVoiceToggle,
  onChange,
  variant = "light",
  size = "default",
  className = "",
  containerClassName = "",
}: FloatTextareaProps) {
  const [focused, setFocused] = useState(false);
  const isDark = variant === "dark";
  const isSm = size === "sm";
  const lifted = focused || value.length > 0;
  const isInvalid = Boolean(error || hasError);

  const colorClasses = isDark
    ? `bg-zinc-800/80 text-white ${
        isInvalid
          ? "border-red-500 ring-2 ring-red-500/20 focus:border-red-500 focus:ring-red-500/25"
          : lifted
          ? "border-zinc-600 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
          : "border-white/10 hover:border-zinc-600 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
      }`
    : `bg-white text-zinc-900 ${
        isInvalid
          ? "border-red-500 ring-2 ring-red-500/15 focus:border-red-500 focus:ring-red-500/20"
          : lifted
          ? "border-zinc-300 focus:border-red-600 focus:ring-2 focus:ring-red-600/20"
          : "border-zinc-300 hover:border-zinc-400 focus:border-red-600 focus:ring-2 focus:ring-red-600/20"
      }`;

  const labelBg = isDark ? "bg-zinc-900" : "bg-white";

  return (
    <div className={`w-full ${containerClassName}`}>
      <div className="relative w-full">
        <textarea
          name={name}
          value={value}
          required={required}
          disabled={disabled}
          rows={rows}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          dir={isArabic ? "rtl" : "ltr"}
          placeholder=" "
          className={`
            peer w-full ${isSm ? "rounded-xl px-4.5 pt-4 pb-1.5 text-xs sm:text-[13px]" : "rounded-2xl px-5 pt-6 pb-2 text-sm sm:text-[15px]"} border
            focus:outline-none
            transition-all duration-200 resize-none
            disabled:opacity-50 disabled:cursor-not-allowed
            ${colorClasses}
            ${
              onVoiceToggle
                ? isArabic
                  ? "pl-12 text-right"
                  : "pr-12 text-left"
                : isArabic
                ? "text-right"
                : "text-left"
            }
            ${className}
          `}
        />
        <label
          className={`
            pointer-events-none absolute px-1.5
            ${isArabic ? (isSm ? "right-4" : "right-5") : (isSm ? "left-4" : "left-5")}
            transition-all duration-200
            ${
              lifted
                ? `-top-2 ${isSm ? "text-[10px]" : "text-[11px]"} font-semibold ${labelBg} ${
                    isInvalid
                      ? "text-red-500"
                      : isDark
                      ? "text-red-400"
                      : "text-red-600"
                  }`
                : `${isSm ? "top-3 text-xs sm:text-[13px]" : "top-4 text-sm"} bg-transparent ${
                    isInvalid
                      ? "text-red-500 font-medium"
                      : isDark
                      ? "text-zinc-400"
                      : "text-zinc-400"
                  }`
            }
          `}
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        {onVoiceToggle && (focused || isListening) && (
          <div className={`absolute top-3 z-10 ${isArabic ? "left-3" : "right-3"}`}>
            <VoiceMicButton
              isListening={!!isListening}
              onClick={onVoiceToggle}
              isArabic={isArabic}
              theme={variant}
              size="sm"
            />
          </div>
        )}
      </div>

      {isListening && <VoiceListeningBadge isArabic={isArabic} />}

      {error && (
        <p className="text-xs text-red-500 mt-1.5 px-4 font-normal text-start animate-in fade-in duration-150">
          {error}
        </p>
      )}
    </div>
  );
}

export { default as SearchableSelect } from "./SearchableSelect";
export type { SearchableSelectOption, SearchableSelectProps } from "./SearchableSelect";
export { VoiceMicButton, useVoiceInput, VoiceListeningBadge } from "./VoiceMicButton";
export type { VoiceFieldType, UseVoiceInputOptions, VoiceMicButtonProps } from "./VoiceMicButton";
export { InputValidationTick, isValidEmail, isValidPhone, isValidText, getFieldError, FormFieldError } from "./InputValidationTick";

