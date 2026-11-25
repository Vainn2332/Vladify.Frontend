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
    <div
      className={`p-2 py-1 font-bold hover:bg-white/70 ${className ?? ""} flex items-center gap-2 rounded-xl`}
    >
      {Icon && <Icon className="size-5" />}

      <button onClick={onClick} {...props} className="cursor-pointer">
        {text}
      </button>
    </div>
  );
}
