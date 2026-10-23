interface CoverImageProps extends React.ComponentProps<"img"> {
  url: string;
  className?: string;
  alt: string;
}

export function CoverImage({ url, className, alt, ...props }: CoverImageProps) {
  return (
    <div className="">
      <img
        src={url}
        alt={alt}
        className={`from-card-cover-start via-card-cover-mid to-card-cover-end aspect-square max-w-30 rounded-lg border border-white bg-linear-to-br sm:max-w-40 ${className}`}
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
        {...props}
      ></img>
    </div>
  );
}
