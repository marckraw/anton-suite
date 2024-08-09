import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

export const twMerge = extendTailwindMerge({
  extend: {},
});

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
