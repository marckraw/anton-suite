"use client";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { FC, useEffect, useState } from "react";
import { useAtom } from "jotai/index";
import {
  aboutDialogOpenAtom,
  commandMenuOpenAtom,
  settingsOpenAtom,
} from "@/store/store";

interface CommandMenuProps {
  open?: boolean;
}

const CommandMenu: FC<CommandMenuProps> = (props) => {
  const [, setSettingsOpen] = useAtom(settingsOpenAtom);
  const [, setAboutDialogOpen] = useAtom(aboutDialogOpenAtom);
  const [commandMenuOpen, setCommandMenuOpen] = useAtom(commandMenuOpenAtom);
  // const [open, setOpen] = useState(props.open ?? false)

  // Toggle the menu when ⌘K is pressed
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCommandMenuOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <CommandDialog open={commandMenuOpen} onOpenChange={setCommandMenuOpen}>
        <CommandInput />
        <CommandList>
          <CommandEmpty>No results found</CommandEmpty>
          <CommandGroup heading="Menu">
            <CommandItem>[TBD] Chat</CommandItem>
            <CommandItem>[TBD] History</CommandItem>
            <CommandItem
              onSelect={(currentValue) => {
                setSettingsOpen(true);
                setCommandMenuOpen(false);
              }}
            >
              Settings
            </CommandItem>
            <CommandItem>[TBD] Assistants</CommandItem>
            <CommandItem>[TBD] Models</CommandItem>
            <CommandItem>[TBD] Shortcuts</CommandItem>
            <CommandSeparator />
            <CommandItem>[TBD] New Chat</CommandItem>
            <CommandItem>[TBD] New Snippet</CommandItem>
            <CommandItem
              onSelect={() => {
                setAboutDialogOpen(true);
                setCommandMenuOpen(false);
              }}
            >
              About
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};

CommandMenu.displayName = "CommandMenu";
export { CommandMenu };
