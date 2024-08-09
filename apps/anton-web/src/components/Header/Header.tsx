"use client";
import { FC } from "react";
import { useAtom } from "jotai";
import { Navigation } from "@/components/Navigation/Navigation";
import { ModeToggle } from "@/components/ModeToggle";
import { ProfileMenu } from "@/components/ProfileMenu/ProfileMenu";
import { Logo } from "@/components/Logo/Logo";
import { themeConfig, tv } from "@/tva/helpers.tva";
import { rightPaneOpenAtom } from "@/store/store";

const headerStyles = themeConfig({
  slots: {
    root: "h-16 flex justify-between p-4 fixed top-0 w-full z-10",
    left: "flex gap-4",
    right: "flex gap-4",
  },
});

const Header: FC<any> = () => {
  const styles = tv(headerStyles);
  const { root, left, right } = styles();
  const [isRightPaneOpen, setIsRightPaneOpen] = useAtom(rightPaneOpenAtom);

  return (
    <div className={root()}>
      <div className={left()}>
        <Logo />
        <Navigation />
      </div>
      <div className={right()}>
        <button
          onClick={() => setIsRightPaneOpen(!isRightPaneOpen)}
          className="p-2 bg-blue-500 text-white rounded"
        >
          {isRightPaneOpen ? "Close Chat" : "Open Chat"}
        </button>
        <ModeToggle />
        <ProfileMenu />
      </div>
    </div>
  );
};

Header.displayName = "Header";
export { Header };
