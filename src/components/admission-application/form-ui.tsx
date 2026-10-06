import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

const readOnlyFieldClass =
  "read-only:cursor-not-allowed read-only:border-slate-300 read-only:bg-slate-100 read-only:text-slate-600 read-only:focus:border-slate-300 read-only:focus:ring-0";

const disabledFieldClass =
  "disabled:cursor-not-allowed disabled:border-slate-300 disabled:bg-slate-100 disabled:text-slate-600 disabled:opacity-100";

export function SectionBar({
  id,
  title,
  hint,
}: {
  id: string;
  title: string;
  hint?: string;
}) {
  return (
    <div
      id={id}
      className="flex flex-wrap items-center justify-between gap-2 bg-[#1e4ba8] px-3 py-2 text-white sm:px-4"
    >
      <h2 className="text-[11px] font-bold uppercase tracking-[0.08em] sm:text-xs">
        {title}
      </h2>
      {hint ? (
        <p className="text-[10px] font-medium text-white/85 sm:text-[11px]">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

export function Field({
  label,
  htmlFor,
  required,
  error,
  tone = "default",
  className,
  children,
}: {
  label: string;
  htmlFor?: string;
  required?: boolean;
  error?: string;
  tone?: "default" | "accent";
  className?: string;
  children: ReactNode;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn("flex min-w-0 flex-col gap-1", className)}
    >
      <span
        className={cn(
          "text-[11px] font-semibold leading-tight sm:text-xs",
          error ? "text-red-700" : tone === "accent" ? "text-[#c2410c]" : "text-slate-700"
        )}
      >
        {label}
        {required ? <span className="text-red-600"> *</span> : null}
      </span>
      {children}
      {error ? (
        <p role="alert" className="text-[11px] font-medium text-red-600">
          {error}
        </p>
      ) : null}
    </label>
  );
}

export function BoxInput({
  className,
  invalid,
  ...props
}: ComponentProps<"input"> & { invalid?: boolean }) {
  return (
    <input
      {...props}
      aria-invalid={invalid || undefined}
      className={cn(
        "h-9 w-full min-w-0 rounded-sm border border-slate-400 bg-white px-2.5 text-sm text-slate-900 outline-none",
        "placeholder:text-slate-400 focus:border-[#1e4ba8] focus:ring-2 focus:ring-[#1e4ba8]/20",
        "uppercase",
        invalid && "border-red-500 focus:border-red-600 focus:ring-red-500/20",
        readOnlyFieldClass,
        disabledFieldClass,
        className
      )}
    />
  );
}

export function BoxSelect({
  className,
  invalid,
  children,
  ...props
}: ComponentProps<"select"> & { invalid?: boolean }) {
  return (
    <select
      {...props}
      aria-invalid={invalid || undefined}
      className={cn(
        "h-9 w-full min-w-0 rounded-sm border border-slate-400 bg-white px-2 text-sm text-slate-900 outline-none",
        "focus:border-[#1e4ba8] focus:ring-2 focus:ring-[#1e4ba8]/20",
        invalid && "border-red-500 focus:border-red-600 focus:ring-red-500/20",
        disabledFieldClass,
        className
      )}
    >
      {children}
    </select>
  );
}

export function DocumentTick({ checked }: { checked: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        "mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-[2px] border",
        checked
          ? "border-[#1e4ba8] bg-[#1e4ba8] text-white"
          : "border-slate-400 bg-white"
      )}
    >
      {checked ? (
        <svg viewBox="0 0 12 12" className="size-3" fill="none" aria-hidden>
          <path
            d="M2.5 6.2 5 8.7 9.5 3.5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : null}
    </span>
  );
}

export function Choice({
  type,
  name,
  value,
  checked,
  onChange,
  locked = false,
  children,
}: {
  type: "checkbox" | "radio";
  name: string;
  value: string;
  checked: boolean;
  onChange: () => void;
  locked?: boolean;
  children: ReactNode;
}) {
  return (
    <label
      className={cn(
        "inline-flex items-start gap-2 text-[13px] text-slate-800",
        locked ? "cursor-default" : "cursor-pointer"
      )}
      onClick={locked ? (event) => event.preventDefault() : undefined}
    >
      <input
        type={type}
        name={name}
        value={value}
        checked={checked}
        readOnly={locked}
        onChange={locked ? undefined : onChange}
        className="mt-0.5 size-3.5 shrink-0 accent-[#1e4ba8]"
        tabIndex={locked ? -1 : undefined}
      />
      <span>{children}</span>
    </label>
  );
}
