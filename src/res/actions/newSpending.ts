import CardsManager from "CardsManager";
import HistoryManager from "HistoryManager";
import { APIEmbed, EmbedBuilder, ModalSubmitInteraction } from "discord.js";
import { Colors } from "res/Colors";
import { ModalsId } from "res/modals/ModalsId";

const MONTHS: string[] = require("../../../months.json").MONTHS;

export default async function newSpending(i: ModalSubmitInteraction) {
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

  CardsManager.subCBAmount(Number(cbAmount));
  CardsManager.subLCAmount(Number(lcAmount));

  HistoryManager.setHistory(title, Number(cbAmount), Number(lcAmount));

  const successEmbed = new EmbedBuilder()
    .setColor(Colors.SUCCESS)
    .setDescription("✅ | Spending successfully added !");

  const monthHistory = HistoryManager.getHistory();

  const newCbAmount = CardsManager.getCBAmount();
  const newLcAmount = CardsManager.getLCAmount();
  const totalCb = HistoryManager.getTotalCBSpent(monthHistory);
  const totalLc = HistoryManager.getTotalLCSpent(monthHistory);

  const currentMonthString = MONTHS[new Date().getMonth()];

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
  i.reply({ embeds: [successEmbed], ephemeral: true });
}
