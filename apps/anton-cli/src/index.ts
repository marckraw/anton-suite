#!/usr/bin/env node
import meow from 'meow';
import { pipe, prop } from "./utils/main.js";
import {chatDescription, mainDescription} from "./descriptions.js";
import {chat} from "./commands/chat.js";


const app = () => ({
    cli: meow(mainDescription, {
        importMeta: import.meta,
        booleanDefault: undefined,
    }),
    action: (cli) => cli.showHelp(),
});

app.chat = () => ({
    cli: meow(chatDescription, {
        importMeta: import.meta,
        booleanDefault: undefined,
    }),
    action: (cli) => {
        chat(cli);
    },
});

const getSubcommand = (cliObject, level) => pipe(prop("input"), prop(level), (name) => prop(name)(cliObject))(prop("cli")(cliObject()));
const cli = (cliObject, level = 0) => {
    const { cli: nextCli, action } = cliObject();
    const subCommand = getSubcommand(cliObject, level);
    return subCommand
        ? cli(subCommand, level + 1)
        : nextCli.flags.help
            ? nextCli.showHelp()
            : action(nextCli);
};
cli(app);