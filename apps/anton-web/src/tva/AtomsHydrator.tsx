import { useHydrateAtoms } from "jotai/react/utils";
import type { ReactNode } from "react";
import { useEffect, useMemo } from "react";
import { atom, useSetAtom, type WritableAtom } from "jotai";

const useRehydrateAtoms = (atomValues: any) => {
  useHydrateAtoms(atomValues);
  const rehydrate = useSetAtom(
    useMemo(
      () =>
        atom(null, (_get, set) => {
          for (const [a, v] of atomValues) {
            set(a, v);
          }
        }),
      [atomValues],
    ),
  );
  useEffect(() => rehydrate(), [rehydrate]);
};

/**
 * AtomsHydrator is a component that hydrates atoms with the provided values.
 * https://jotai.org/docs/utilities/ssr#usehydrateatoms
 * */
export const AtomsHydrator = ({
  atomValues,
  children,
}: {
  atomValues: Iterable<
    readonly [WritableAtom<unknown, [any], unknown>, unknown]
  >;
  children: ReactNode;
}) => {
  useRehydrateAtoms(atomValues);
  return children;
};
