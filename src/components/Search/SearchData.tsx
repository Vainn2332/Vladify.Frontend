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
      <div className="aspect-square w-5 overflow-hidden rounded-md bg-gray-300 sm:w-11 sm:rounded-lg">
        <img src={imageUrl} alt="searchDataImage" className="object-contain" />
      </div>
      <div className="flex flex-col overflow-hidden">
        <span className="truncate text-sm font-bold">{title}</span>
        <span className="truncate text-xs">{subtitle}</span>
      </div>
      {description && (
        <span className="ml-auto hidden text-gray-500 sm:text-sm">
          {description}
        </span>
      )}
    </div>
  );
}
