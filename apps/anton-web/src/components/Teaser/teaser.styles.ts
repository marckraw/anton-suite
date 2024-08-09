import { themeConfig } from "@/tva/helpers.tva";

export const teaserStyles = themeConfig({
  slots: {
    root: "w-full h-screen flex flex-col justify-center items-center",
    texts:
      "p-0 px-6 flex flex-col justify-center items-center max-w-[528px] w-full",
    paragraph: "pb-4",
  },
  variants: {},
});
