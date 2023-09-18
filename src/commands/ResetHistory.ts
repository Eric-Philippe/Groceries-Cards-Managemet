import HistoryManager from "HistoryManager";
import { CommandInteraction } from "discord.js";
import { Command } from "types/Command";

export const ResetHistory: Command = {
  name: "reset-history",
  description: "Reset the history of the groceries spending",
  run: async (interaction: CommandInteraction) => {
    HistoryManager.emptyHistory();

    interaction.editReply({
      content: "History successfully reset !",
    });
  },
};
