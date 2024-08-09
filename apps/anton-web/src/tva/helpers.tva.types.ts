import type { TV } from "tailwind-variants";

// Use of the Parameters utility type to extract arguments
export type FunctionParameters = Parameters<TV>;
export type FirstParameterType = FunctionParameters[0];

export interface WithThemeConfig<T> {
  /**
   * themeConfig is used so consumer of the component can pass
   * custom themes for every slot of the component.
   *
   * It's typesafe and following the same structure as the component's theme.
   * Example:
   * themeConfig={{
   *   slots: {
   *     root: 'md:m-24 m-0 ps-[--spacing-spacing-m] border-s-4 border-solid',
   *     text: 'font-light text-2xl italic md:text-3xl',
   *     footer: 'mt-4',
   *   },
   *   variants: {
   *     inverse: {
   *       true: {
   *         root: 'bg-black text-white',
   *         text: 'text-green-300',
   *         citation: 'text-white bg-gray-700',
   *       },
   *       false: {
   *         root: 'bg-white text-black',
   *         text: 'text-green-700',
   *         citation: 'text-black bg-gray-100',
   *       },
   *     },
   *   },
   * }}
   * @default undefined
   */
  themeConfig?: T extends FirstParameterType ? T : FirstParameterType;
}

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// Types transformations for Tailwind Variants
// Transforming an array or a single key into a union type.
type ToUnion<K extends ReadonlyArray<keyof any> | keyof any> =
  K extends ReadonlyArray<keyof any> ? K[number] : K;
// Flexible approach to pick keys from slots for a single key or multiple keys,
// ensuring keys not present are still considered to potentially hold a string value.
type PickSlots<T, K extends ReadonlyArray<keyof any> | keyof any> = {
  [P in keyof T as P extends ToUnion<K> ? P : never]: T[P];
} & {
  [P in ToUnion<K>]?: string;
};
// Handling variants to ensure keys are typed correctly if present, for a single key or multiple keys,
// and ensuring keys not present are still considered to potentially hold a string value.
type HandleVariants<T, K extends ReadonlyArray<keyof any> | keyof any> = {
  [Variant in keyof T]: {
    [Condition in keyof T[Variant]]: {
      [Key in ToUnion<K>]: T[Variant][Condition] extends Record<Key, any>
        ? T[Variant][Condition][Key]
        : string;
    };
  };
};
// Combining the handling for slots and variants, accommodating both single and multiple keys,
// and ensuring all specified keys are treated as potentially holding a string value.
export type ExtractSpecificStyles<
  T extends { slots: any; variants: any },
  K extends ReadonlyArray<keyof any> | keyof any,
> = {
  slots: PickSlots<T["slots"], K>;
  variants: HandleVariants<T["variants"], K>;
};
