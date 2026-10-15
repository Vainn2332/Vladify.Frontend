import { useId, type ComponentProps } from "react";

interface FileFieldProps extends ComponentProps<"input"> {
  title: string;
  placeholder: string;
}

export function FileField({
  title,
  placeholder,
  className,
  ...props
}: FileFieldProps) {
  const id = useId();
  return (
    <div className="mb-4">
      <div className="text-sm font-bold">{title}</div>
      <label
        htmlFor={id}
        className={`mb-4 flex h-20 w-full cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-100/80 text-sm font-bold text-black/70 hover:bg-gray-200/80 ${className}`}
      >
        {placeholder}
      </label>
      <input id={id} type="file" className="hidden" {...props} />
    </div>
  );
}
