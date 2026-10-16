import { useEffect, useId, useState, type ComponentProps } from "react";
import { isValidExtension } from "../../../utils/validators/isValidExtension";

interface FileFieldProps extends Omit<ComponentProps<"input">, "accept"> {
  title: string;
  placeholder: string;
  allowedExtensions: string[];
  preview?: boolean;
}

export function FileField({
  title,
  placeholder,
  allowedExtensions,
  preview = false,
  className,
  onChange,
  ...props
}: FileFieldProps) {
  const id = useId();
  const [fileName, setFileName] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let file = e.target.files?.[0] ?? null;

    if (file && !isValidExtension(file, allowedExtensions)) {
      e.target.value = "";
      file = null;
      setError(`Allowed formats: ${allowedExtensions.join(", ")}`);
    } else {
      setError(null);
    }

    setFileName(file?.name ?? null);
    setPreviewUrl(
      preview && file?.type.startsWith("image/")
        ? URL.createObjectURL(file)
        : null,
    );
    onChange?.(e);
  };

  return (
    <div className="mb-4">
      <div className="flex items-baseline justify-between gap-2">
        <div className="text-sm font-bold">{title}</div>
        {error && <div className="text-xs text-red-500">{error}</div>}
      </div>
      <label
        htmlFor={id}
        className={`mb-4 flex h-28 cursor-pointer items-center justify-center gap-3 rounded-xl border-2 border-dashed ${error ? "border-red-400" : "border-gray-300"} bg-gray-100/70 px-4 text-sm font-bold text-black/70 hover:bg-gray-200/80 ${className ?? ""}`}
      >
        {previewUrl && (
          <img
            src={previewUrl}
            alt=""
            className="size-20 shrink-0 rounded-lg object-cover"
          />
        )}
        <span className="truncate">{fileName ?? placeholder}</span>
      </label>
      <input
        id={id}
        type="file"
        accept={allowedExtensions.join(",")}
        className="hidden"
        onChange={handleChange}
        {...props}
      />
    </div>
  );
}
