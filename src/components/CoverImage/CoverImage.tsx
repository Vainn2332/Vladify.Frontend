interface CoverImageProps extends React.ComponentProps<"img"> {
  url: string;
  className?: string;
  size?: "xs" | "sm" | "md" | "lg";
  alt: string;
}

const sizes = {
  xs: "w-8 sm:w-12",
  sm: "w-16 sm:w-20",
  md: "w-20 sm:w-24",
  lg: "w-24 sm:w-32",
} as const;

export function CoverImage({
  url,
  className,
  size = "md",
  alt,
  ...props
}: CoverImageProps) {
  return (
    <div
      className={`from-card-cover-start via-card-cover-mid to-card-cover-end aspect-square shrink-0 self-start overflow-hidden rounded-lg border border-white bg-linear-to-br ${sizes[size]} ${className}`}
    >
      <img
        src={url}
        alt={alt}
        className="h-full w-full object-cover"
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
        {...props}
      ></img>
    </div>
  );
}
