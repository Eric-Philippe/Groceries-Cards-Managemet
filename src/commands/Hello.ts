import { CommandInteraction } from "discord.js";
import { Command } from "types/Command";

export const Hello: Command = {
  name: "hello",
  description: "Returns a greeting",
  run: async (interaction: CommandInteraction) => {
    const content = "Hello there!";

    await interaction.followUp({
      ephemeral: true,
      content,
    });
  },
};
