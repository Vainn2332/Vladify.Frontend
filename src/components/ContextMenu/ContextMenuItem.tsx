import type { LucideIcon } from "lucide-react";

interface ContextMenuItemProps extends React.ComponentProps<"button"> {
  text: string;
  icon?: LucideIcon;
  className?: string;
}
export function ContextMenuItem({
  text,
  onClick,
  icon: Icon,
  className,
  ...props
}: ContextMenuItemProps) {
  return (
    <button
      onClick={onClick}
      {...props}
      className={`flex cursor-pointer items-center gap-2 rounded-xl p-2 py-1 font-bold hover:bg-white/70 ${className ?? ""}`}
    >
      {Icon && <Icon className="size-5" />}

      <p>{text}</p>
    </button>
  );
}
