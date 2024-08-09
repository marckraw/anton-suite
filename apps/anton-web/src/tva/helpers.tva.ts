import type { TV } from "tailwind-variants";
import { createTV } from "tailwind-variants";

export const tv = createTV({
  twMerge: false,
});

/**
 * This function is used to trigger autocompletion for tailwind classes
 * It's lying a bit about the returned type, but it's just a autocompletion wrapper
 * */
// @ts-ignore - TV interface is telling us that it should not return the same object,
// but in this case we don't want this function to do any transformation, but we want all the element behave in types the same way as in TV type
export const themeConfig: TV = (object) => object;

export const deepMerge = <T>(target: T, source: any): T => {
  const output = { ...target };

  Object.keys(source).forEach((key) => {
    const sourceKey = key as keyof typeof source;
    const targetKey = key as keyof T;

    // @ts-ignore
    if (source[sourceKey] instanceof Object && targetKey in target) {
      output[targetKey] = deepMerge(
        target[targetKey] as any,
        source[sourceKey] as any,
      );
    } else {
      output[targetKey] =
        `${output[targetKey]} ${source[sourceKey]}` as T[keyof T];
    }
  });

  return output;
};
