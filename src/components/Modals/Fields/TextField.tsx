import type { ComponentProps } from "react";

interface TextFieldProps extends ComponentProps<"input"> {
  title: string;
}

export function TextField({ title, className, ...props }: TextFieldProps) {
  return (
    <div className="mb-4">
      <div className="text-sm font-bold">{title}</div>
      <input
        type="text"
        className={`w-full rounded-lg border-2 border-gray-200 px-2 outline-hidden transition-colors focus:border-gray-400 ${className ?? ""}`}
        {...props}
      />
    </div>
  );
}
