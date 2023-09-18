import { Command } from "types/Command";

import { Hello } from "commands/Hello";
import { Load } from "commands/Load";
import { ResetHistory } from "commands/ResetHistory";

export const commands: Command[] = [Hello, Load, ResetHistory];
