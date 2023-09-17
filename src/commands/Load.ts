import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  CommandInteraction,
  EmbedBuilder,
} from "discord.js";

import { ButtonsId } from "res/buttons/ButtonsId";
import { Command } from "types/Command";

const MONTHS: string[] = require("../../months.json").MONTHS;

export const Load: Command = {
  name: "load",
  description: "Load the main message",
  run: async (interaction: CommandInteraction) => {
    const currentMonthString = MONTHS[new Date().getMonth()];

    const embed = new EmbedBuilder();
    embed
      .setAuthor({ name: "Last CB Refill : 0€ | Last LC Refill : 0€" })
      .setTitle("🛒 Groceries Spending : " + currentMonthString)
      .setColor("#c96420")
      .setThumbnail(
        "https://cdn.discordapp.com/attachments/579303130886569984/1153084602961887325/image.png"
      )
      .addFields([{ name: "\u200B", value: "\u200B" }])
      .addFields([
        {
          name: "💳 Carte Bleue",
          value: "``💸 0€``",
          inline: true,
        },
        {
          name: "🥪 Lunch Card",
          value: "``💸 0€``",
          inline: true,
        },
      ])
      .setDescription("History of the groceries spending : \n*- Empty* \n")
      .setFooter({ text: "Total spent CB : 0€ | Total spent LC : 0€" });

    const btnNewSpending = new ButtonBuilder()
      .setCustomId(ButtonsId.NEW_SPENDING)
      .setLabel("New Spending")
      .setStyle(ButtonStyle.Primary)
      .setEmoji("🛒");

    const btnSetupCardAmount = new ButtonBuilder()
      .setCustomId(ButtonsId.SETUP_CARD_AMOUNT)
      .setLabel("Refill Cards")
      .setStyle(ButtonStyle.Primary)
      .setEmoji("💳");

    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
      btnNewSpending,
      btnSetupCardAmount
    );

    await interaction.editReply({
      embeds: [embed],
      components: [row],
    });
  },
};
