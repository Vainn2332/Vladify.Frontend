import { CoverImage } from "../CoverImage/CoverImage";

interface SearchData {
  id: string;
  imageUrl: string;
  title: string;
  subtitle?: string;
  description?: string;
  onClick: (id: string) => void;
}

export function SearchData({
  id,
  imageUrl,
  title,
  subtitle,
  description,
  onClick,
}: SearchData) {
  return (
    <div
      role="button"
      tabIndex={0}
      className="hover:bg-primary/10 flex items-center gap-2 rounded-lg p-2 transition-colors duration-150 hover:cursor-pointer"
      onClick={(e) => {
        onClick(id);
        e.stopPropagation();
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick(id);
        }
      }}
    >
      <CoverImage alt="song image" url={imageUrl} size="xs" />

      <div className="flex min-w-0 flex-col">
        <span className="truncate text-sm font-bold">{title}</span>
        {subtitle && (
          <span className="truncate text-xs text-gray-500">{subtitle}</span>
        )}
      </div>
      {description && (
        <span className="ml-auto text-xs text-gray-500 sm:p-2 sm:text-sm">
          {description}
        </span>
      )}
    </div>
  );
}
