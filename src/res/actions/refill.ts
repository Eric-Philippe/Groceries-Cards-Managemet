import { APIEmbed, EmbedBuilder, ModalSubmitInteraction } from "discord.js";

import CardsManager from "CardsManager";
import HistoryManager from "HistoryManager";

import { Colors } from "res/Colors";
import { ModalsId } from "res/modals/ModalsId";

const MONTHS: string[] = require("../../../months.json").MONTHS;

/**
 * @description Refill the cards
 * @param i - The interaction
 */
export default async function refill(i: ModalSubmitInteraction) {
  // Get the values of the modal inputs
  const cbAmount = i.fields.getTextInputValue(ModalsId.CB_CARD_AMOUNT);
  const lcAmount = i.fields.getTextInputValue(ModalsId.LC_CARD_AMOUNT);

  // If one of the two inputs is not a number
  if (isNaN(Number(cbAmount)) || isNaN(Number(lcAmount))) {
    const errorEmbed = new EmbedBuilder()
      .setColor(Colors.ERROR)
      .setDescription("❌ | Please enter a valid number !");
    i.reply({ embeds: [errorEmbed], ephemeral: true });
    return;
  }

  // Set the new values
  CardsManager.setCBAmount(Number(cbAmount));
  CardsManager.setLCAmount(Number(lcAmount));

  // Fetch the history of the groceries spending for the current month
  const monthHistory = HistoryManager.getHistory();

  const currentMonthString = MONTHS[new Date().getMonth()];

  // Draw the updated embed with the new values
  const oldEmbed = i.message?.embeds[0] as APIEmbed;
  const newEmbed = EmbedBuilder.from(oldEmbed);
  newEmbed
    .setAuthor({
      name: `Last CB Refill : ${cbAmount}€ | Last LC Refill : ${lcAmount}€`,
    })
    .setTitle(`🛒 Groceries Spending : ${currentMonthString}`)
    .setFields([
      { name: "\u200B", value: "\u200B" },
      {
        name: "💳 Carte Bleue",
        value: "``💸 " + cbAmount + "€``",
        inline: true,
      },
      {
        name: "🥪 Lunch Card",
        value: "``💸 " + lcAmount + "€``",
        inline: true,
      },
    ])
    .setDescription(
      "History of the groceries spending : \n" +
        HistoryManager.getFullHistoryToString(monthHistory)
    )
    .setFooter({
      text: `Total spent CB : ${HistoryManager.getTotalCBSpent(
        monthHistory
      )}€ | Total spent LC : ${HistoryManager.getTotalLCSpent(monthHistory)}€`,
    });

  await i.message?.edit({ embeds: [newEmbed] });

  const successEmbed = new EmbedBuilder()
    .setColor(Colors.SUCCESS)
    .setDescription("✅ | Card amounts successfully updated !");

  i.reply({ embeds: [successEmbed], ephemeral: true });
}
