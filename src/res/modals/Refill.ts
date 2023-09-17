import {
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} from "discord.js";

import { ModalsId } from "./ModalsId";

export default new ModalBuilder()
  .setCustomId(ModalsId.REFILL)
  .setTitle("💳 Refill the cards")
  .addComponents(
    new ActionRowBuilder<TextInputBuilder>().addComponents(
      new TextInputBuilder()
        .setCustomId(ModalsId.CB_CARD_AMOUNT)
        .setValue("0")
        .setPlaceholder("0")
        .setLabel("Carte Bleue")
        .setRequired(true)
        .setStyle(TextInputStyle.Short)
    ),
    new ActionRowBuilder<TextInputBuilder>().addComponents(
      new TextInputBuilder()
        .setCustomId(ModalsId.LC_CARD_AMOUNT)
        .setValue("0")
        .setPlaceholder("0")
        .setLabel("Lunch Card")
        .setRequired(true)
        .setStyle(TextInputStyle.Short)
    )
  );
