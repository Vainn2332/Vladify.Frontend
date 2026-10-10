interface SearchData {
  id: string;
  imageUrl: string;
  title: string;
  subtitle: string;
  onClick: (id: string) => void;
}

export function SearchData({
  id,
  imageUrl,
  title,
  subtitle,
  onClick,
}: SearchData) {
  return (
    <div
      className="flex items-center justify-center gap-4 text-inherit/80 hover:cursor-pointer"
      onClick={(e) => {
        onClick(id);
        e.stopPropagation();
      }}
    >
      <div className="aspect-square w-12 overflow-hidden rounded-lg bg-gray-300"></div>
      <img src={imageUrl} alt="searchDataImage" className="object-contain" />
      <div className="flex flex-col">
        <span className="text-sm font-bold">{title}</span>
        <span className="text-xs">{subtitle}</span>
      </div>
    </div>
  );
}
