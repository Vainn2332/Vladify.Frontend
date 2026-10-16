import { useEffect, useId, useState, type ComponentProps } from "react";

interface FileFieldProps extends ComponentProps<"input"> {
  title: string;
  placeholder: string;
  preview?: boolean;
  invalidTypeMessage?: string;
}

// Mirrors the browser's `accept` syntax: ".mp3", "audio/*", "image/png"
function isAccepted(file: File, accept?: string) {
  if (!accept) return true;

  const name = file.name.toLowerCase();
  const type = file.type.toLowerCase();

  return accept
    .split(",")
    .map((token) => token.trim().toLowerCase())
    .filter(Boolean)
    .some((token) => {
      if (token.startsWith(".")) return name.endsWith(token);
      if (token.endsWith("/*")) return type.startsWith(token.slice(0, -1));
      return type === token;
    });
}

export function FileField({
  title,
  placeholder,
  preview = false,
  invalidTypeMessage = "Unsupported file format",
  accept,
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

    if (file && !isAccepted(file, accept)) {
      e.target.value = "";
      file = null;
      setError(invalidTypeMessage);
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
        accept={accept}
        className="hidden"
        onChange={handleChange}
        {...props}
      />
    </div>
  );
}
