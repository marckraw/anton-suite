import { cn } from "@/lib/utils";
import { FC, ReactNode } from "react";

interface BrandHighlightProps {
  children: ReactNode;
  bold?: boolean;
}

export const BrandHighlight: FC<BrandHighlightProps> = (props) => {
  const { children, bold } = props;

  return (
    <span className={cn("peakpursuit", "text-[--accent-color]")}>
      {children}
    </span>
  );
};
