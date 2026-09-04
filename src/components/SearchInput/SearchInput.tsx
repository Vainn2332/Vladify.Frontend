import type { ComponentPropsWithRef } from "react";

export function SearchInput({
  className,
  ...props
}: ComponentPropsWithRef<"input">) {
  return (
    <input
      type="text"
      placeholder="Search"
      {...props}
      className={`rounded-2xl bg-white/85 py-1 text-center text-cyan-950 shadow-sm backdrop-blur-md transition-colors duration-200 outline-none hover:bg-white/70 focus:bg-white/70 ${className}`}
    />
  );
}
