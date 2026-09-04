import { type LucideIcon } from "lucide-react";

const ICON_SIZES = {
  sm: "h-3 w-3 sm:h-4 sm:w-4",
  md: "h-4 w-4 sm:h-5 sm:w-5",
  lg: "h-6 w-6 sm:h-8 sm:w-8",
} as const;

interface IconButtonProps extends React.ComponentProps<"button"> {
  icon: LucideIcon;
  size?: "sm" | "md" | "lg";
}

export function IconButton({
  icon: Icon,
  size = "md",
  ...props
}: IconButtonProps) {
  return (
    <button
      type="button"
      className="cursor-pointer hover:opacity-70"
      {...props}
    >
      <Icon className={`fill-current ${ICON_SIZES[size]}`} />
    </button>
  );
}
