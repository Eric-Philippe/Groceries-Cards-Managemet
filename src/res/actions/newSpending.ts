import { APIEmbed, EmbedBuilder, ModalSubmitInteraction } from "discord.js";

import CardsManager from "CardsManager";
import HistoryManager from "HistoryManager";

import { Colors } from "res/Colors";
import { ModalsId } from "res/modals/ModalsId";

const MONTHS: string[] = require("../../../months.json").MONTHS;

/**
 * @description Create a new spending
 * @param i - The interaction
 */
export default async function newSpending(i: ModalSubmitInteraction) {
  // Get the values of the modal inputs
  const title = i.fields.getTextInputValue(ModalsId.TITLE);
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

  // Substract the amount to the cards
  CardsManager.subCBAmount(Number(cbAmount));
  CardsManager.subLCAmount(Number(lcAmount));

  // Add the spending to the history
  HistoryManager.setHistory(title, Number(cbAmount), Number(lcAmount));

  // Load the updates values
  const monthHistory = HistoryManager.getHistory();
  const newCbAmount = CardsManager.getCBAmount();
  const newLcAmount = CardsManager.getLCAmount();
  const totalCb = HistoryManager.getTotalCBSpent(monthHistory);
  const totalLc = HistoryManager.getTotalLCSpent(monthHistory);

  // Get the current month
  const currentMonthString = MONTHS[new Date().getMonth()];

  // Draw the updated embed with the new values
  const oldEmbed = i.message?.embeds[0] as APIEmbed;
  const newEmbed = EmbedBuilder.from(oldEmbed);
  newEmbed
    .setAuthor({
      name: `Last CB Refill : ${newCbAmount + totalCb}€ | Last LC Refill : ${
        newLcAmount + totalLc
      }€`,
    })
    .setTitle(`🛒 Groceries Spending : ${currentMonthString}`)
    .setFields([
      { name: "\u200B", value: "\u200B" },
      {
        name: "💳 Carte Bleue",
        value: "``💸 " + newCbAmount + "€``",
        inline: true,
      },
      {
        name: "🥪 Lunch Card",
        value: "``💸 " + newLcAmount + "€``",
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
    .setDescription("✅ | Spending successfully added !");

  i.reply({ embeds: [successEmbed], ephemeral: true });
}
