import { Command } from "types/Command";

import { Hello } from "commands/Hello";
import { Load } from "commands/Load";
import { ResetHistory } from "commands/ResetHistory";

/** List of all the bot's commands */
export const commands: Command[] = [Hello, Load, ResetHistory];
