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
      <div className="aspect-square w-11 overflow-hidden rounded-lg bg-gray-300">
        <img src={imageUrl} alt="searchDataImage" className="object-contain" />
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-bold">{title}</span>
        <span className="text-xs">{subtitle}</span>
      </div>
      {description && (
        <span className="ml-auto text-sm text-gray-500">{description}</span>
      )}
    </div>
  );
}
