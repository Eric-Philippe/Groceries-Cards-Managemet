import {
  BaseCommandInteraction,
  ChatInputApplicationCommandData,
} from "discord.js";

export interface Command extends ChatInputApplicationCommandData {
  run: (interaction: BaseCommandInteraction) => void;
}
