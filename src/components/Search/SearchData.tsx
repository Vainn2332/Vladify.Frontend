interface SearchData {
  id: string;
  imageUrl: string;
  title: string;
  subtitle: string;
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
      className="hover:bg-primary/10 flex items-center gap-2 rounded-lg p-2 transition-colors duration-150 hover:cursor-pointer"
      onClick={(e) => {
        onClick(id);
        e.stopPropagation();
      }}
    >
      <div className="aspect-square w-8 shrink-0 overflow-hidden rounded-lg bg-gray-300 sm:w-11">
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex min-w-0 flex-col">
        <span className="truncate text-sm font-bold">{title}</span>
        <span className="truncate text-xs text-gray-500">{subtitle}</span>
      </div>
      {description && (
        <span className="ml-auto text-xs text-gray-500 sm:p-2 sm:text-sm">
          {description}
        </span>
      )}
    </div>
  );
}
