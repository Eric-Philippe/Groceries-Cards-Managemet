import CardsManager from "CardsManager";
import { APIEmbed, EmbedBuilder, ModalSubmitInteraction } from "discord.js";
import { Colors } from "res/Colors";
import { ModalsId } from "res/modals/ModalsId";

const MONTHS: string[] = require("../../../months.json").MONTHS;

export default async function refill(i: ModalSubmitInteraction) {
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

  CardsManager.setCBAmount(Number(cbAmount));
  CardsManager.setLCAmount(Number(lcAmount));

  const successEmbed = new EmbedBuilder()
    .setColor(Colors.SUCCESS)
    .setDescription("✅ | Card amounts successfully updated !");

  const currentMonthString = MONTHS[new Date().getMonth()];

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
        value: "``💸" + lcAmount + "€``",
        inline: true,
      },
    ])
    .setDescription("History of the groceries spending : \n*- Empty* \n")
    .setFooter({
      text: `Total spent CB : 0€ | Total spent LC : 0€`,
    });

  await i.message?.edit({ embeds: [newEmbed] });
  i.reply({ embeds: [successEmbed], ephemeral: true });
}
