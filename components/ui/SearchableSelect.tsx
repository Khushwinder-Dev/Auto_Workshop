"use client";

import React, { useState, useRef, useEffect, useId } from "react";
import { Search, ChevronDown, Check } from "lucide-react";
import { VoiceMicButton, useVoiceInput } from "@/components/ui/VoiceMicButton";

export interface SearchableSelectOption {
  value: string;
  label: string;
  labelAr?: string;
}

export interface SearchableSelectProps {
  name?: string;
  value: string;
  options: SearchableSelectOption[];
  label: string;
  placeholder?: string;
  searchPlaceholder?: string;
  required?: boolean;
  disabled?: boolean;
  isArabic?: boolean;
  className?: string;
  variant?: "rounded-full" | "rounded-xl";
  theme?: "light" | "dark";
  size?: "default" | "sm";
  error?: string;
  hasError?: boolean;
  onChange: (value: string) => void;
}

export default function SearchableSelect({
  name,
  value,
  options,
  label,
  placeholder,
  searchPlaceholder,
  required = false,
  disabled = false,
  isArabic = false,
  className = "",
  variant = "rounded-full",
  theme = "light",
  size = "default",
  error,
  hasError,
  onChange,
}: SearchableSelectProps) {
  const isInvalid = Boolean(error || hasError);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const id = useId();

  const voice = useVoiceInput({
    isArabic,
    onResult: (_fieldName, text) => {
      setSearchQuery(text);
    },
  });

  // Find currently selected option
  const selectedOption = options.find((opt) => opt.value === value);

  const getOptionLabel = (opt: SearchableSelectOption) => {
    if (isArabic && opt.labelAr) return opt.labelAr;
    return opt.label;
  };

  const displaySelectedText = selectedOption ? getOptionLabel(selectedOption) : "";

  // Filter options based on query
  const filteredOptions = options.filter((opt) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    const enMatch = opt.label.toLowerCase().includes(q);
    const arMatch = opt.labelAr ? opt.labelAr.toLowerCase().includes(q) : false;
    const valMatch = opt.value.toLowerCase().includes(q);
    return enMatch || arMatch || valMatch;
  });

  // Handle outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setSearchQuery("");
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  // Focus search input when opened
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setSearchQuery("");
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleSelect = (val: string) => {
    onChange(val);
    setIsOpen(false);
    setSearchQuery("");
  };

  const isLifted = isOpen || Boolean(value);

  const roundedClass = variant === "rounded-full" ? "rounded-full" : "rounded-xl";
  const heightPadding =
    size === "sm"
      ? "h-11 px-5 pt-4 pb-1 text-xs sm:text-[13px]"
      : "px-5 pt-5 pb-2 text-sm sm:text-[15px]";

  const defaultSearchPlaceholder = isArabic ? "بحث في الخيارات..." : "Search options...";

  const isDark = theme === "dark";

  return (
    <div
      ref={containerRef}
      className={`relative w-full text-left select-none ${className}`}
      dir={isArabic ? "rtl" : "ltr"}
    >
      {/* Hidden input for standard form submission & required validation */}
      {name && (
        <input
          type="hidden"
          name={name}
          value={value}
          required={required}
        />
      )}

      {/* Trigger Button */}
      <button
        type="button"
        id={id}
        disabled={disabled}
        onClick={() => {
          if (!disabled) setIsOpen((prev) => !prev);
        }}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`w-full border ${roundedClass} ${heightPadding} transition-all duration-200 cursor-pointer text-left flex items-center justify-between ${
          isDark
            ? `bg-zinc-800/80 text-white ${
                isOpen
                  ? isInvalid
                    ? "border-red-500 ring-2 ring-red-500/20"
                    : "border-red-500 ring-2 ring-red-500/20"
                  : isInvalid
                  ? "border-red-500 ring-2 ring-red-500/15"
                  : isLifted
                  ? "border-zinc-600"
                  : "border-white/10 hover:border-zinc-500"
              } ${disabled ? "opacity-50 cursor-not-allowed bg-zinc-900" : ""}`
            : `bg-white text-zinc-900 ${
                isOpen
                  ? isInvalid
                    ? "border-red-500 ring-2 ring-red-500/20 shadow-xs"
                    : "border-red-600 ring-2 ring-red-600/20 shadow-xs"
                  : isInvalid
                  ? "border-red-500 ring-2 ring-red-500/15"
                  : isLifted
                  ? "border-zinc-300"
                  : "border-zinc-300 hover:border-zinc-400"
              } ${disabled ? "opacity-50 cursor-not-allowed bg-zinc-50" : ""}`
        } ${isArabic ? "text-right" : "text-left"}`}
      >
        <span
          className={`block truncate ${
            selectedOption
              ? isDark ? "text-white font-medium" : "text-zinc-900 font-medium"
              : "text-transparent"
          }`}
        >
          {displaySelectedText || placeholder || "Select"}
        </span>

        {/* Right side icons: Green checkmark if selected + Chevron */}
        <div className={`flex items-center gap-1.5 shrink-0 ${isArabic ? "mr-2" : "ml-2"}`}>
          {Boolean(selectedOption) && (
            <Check className="w-3.5 h-3.5 text-emerald-500 stroke-[2.5] animate-in fade-in zoom-in-75 duration-150" />
          )}
          <ChevronDown
            className={`w-4 h-4 text-zinc-400 shrink-0 transition-transform duration-200 ${
              isOpen ? "rotate-180 text-red-600" : ""
            }`}
          />
        </div>
      </button>

      {/* Floating Label */}
      <label
        htmlFor={id}
        onClick={() => {
          if (!disabled) setIsOpen(true);
        }}
        className={`absolute px-1 transition-all duration-200 cursor-pointer pointer-events-none ${
          isArabic ? "right-5" : "left-5"
        } ${
          isDark
            ? isLifted
              ? size === "sm"
                ? `-top-2 text-[10.5px] font-semibold bg-zinc-900 ${isInvalid ? "text-red-400" : "text-red-400"}`
                : `-top-2.5 text-[11px] font-semibold bg-zinc-900 ${isInvalid ? "text-red-400" : "text-red-400"}`
              : `top-1/2 -translate-y-1/2 text-sm bg-transparent ${isInvalid ? "text-red-400 font-medium" : "text-zinc-400"}`
            : isLifted
            ? size === "sm"
              ? `-top-2 text-[10.5px] font-semibold bg-white ${isInvalid ? "text-red-500" : "text-red-600"}`
              : `-top-2.5 text-[11px] font-semibold bg-white ${isInvalid ? "text-red-500" : "text-red-600"}`
            : `top-1/2 -translate-y-1/2 text-sm bg-transparent ${isInvalid ? "text-red-500 font-medium" : "text-zinc-400"}`
        }`}
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className={`absolute left-0 right-0 z-50 mt-1.5 border rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 ${
            isDark
              ? "bg-zinc-900 border-zinc-700 text-white"
              : "bg-white border-zinc-200 text-zinc-900"
          }`}
          style={{ minWidth: "100%" }}
        >
          {/* Search Box Header */}
          <div
            className={`p-2.5 border-b ${
              isDark ? "border-zinc-800 bg-zinc-950/60" : "border-zinc-100 bg-zinc-50/80"
            }`}
          >
            <div className="relative flex items-center">
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onFocus={() => voice.setFocusedField("selectSearch")}
                onBlur={() => voice.setFocusedField(null)}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={searchPlaceholder || defaultSearchPlaceholder}
                className={`w-full border rounded-xl py-2 text-xs sm:text-sm outline-none transition-all placeholder:text-zinc-400 ${
                  isDark
                    ? "bg-zinc-800 border-zinc-700 text-white focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                    : "bg-white border-zinc-300 text-zinc-900 focus:border-red-600 focus:ring-2 focus:ring-red-600/15"
                } ${isArabic ? "pr-3 pl-16 text-right" : "pl-3 pr-16 text-left"}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && filteredOptions.length > 0) {
                    e.preventDefault();
                    handleSelect(filteredOptions[0].value);
                  }
                }}
              />
              <div
                className={`absolute top-1/2 -translate-y-1/2 flex items-center gap-1 ${
                  isArabic ? "left-2" : "right-2"
                }`}
              >
                {voice.isFieldActive("selectSearch") && (
                  <VoiceMicButton
                    isListening={voice.listeningField === "selectSearch"}
                    onClick={() => voice.toggleListening("selectSearch", "text")}
                    isArabic={isArabic}
                    theme={theme}
                    size="sm"
                  />
                )}
                <Search className="w-4 h-4 text-zinc-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Options List */}
          <ul
            ref={listRef}
            role="listbox"
            tabIndex={-1}
            className={`max-h-60 overflow-y-auto py-1.5 divide-y scrollbar-thin ${
              isDark ? "divide-zinc-800/60" : "divide-zinc-100"
            }`}
          >
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt) => {
                const isSelected = opt.value === value;
                return (
                  <li
                    key={opt.value}
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleSelect(opt.value)}
                    className={`px-4 py-2.5 text-xs sm:text-sm cursor-pointer transition-colors flex items-center justify-between ${
                      isSelected
                        ? isDark
                          ? "bg-zinc-800 text-white font-semibold"
                          : "bg-red-50/80 text-red-900 font-semibold"
                        : isDark
                        ? "text-zinc-200 hover:bg-zinc-800/70 hover:text-red-400"
                        : "text-zinc-700 hover:bg-red-50/60 hover:text-red-600"
                    } ${isArabic ? "text-right" : "text-left"}`}
                  >
                    <span className="truncate">{getOptionLabel(opt)}</span>
                    {isSelected && (
                      <Check
                        className={`w-4 h-4 text-red-600 shrink-0 ${
                          isArabic ? "mr-2" : "ml-2"
                        }`}
                      />
                    )}
                  </li>
                );
              })
            ) : (
              <li className="px-4 py-6 text-center text-xs sm:text-sm text-zinc-400">
                {isArabic ? "لا توجد نتائج مطابقة" : "No options found"}
              </li>
            )}
          </ul>
        </div>
      )}

      {/* Inline Error Message */}
      {error && (
        <p className="text-xs text-red-500 mt-1.5 px-4 font-normal text-start animate-in fade-in duration-150">
          {error}
        </p>
      )}
    </div>
  );
}

