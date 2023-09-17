import { Events } from "discord.js";

import { commands } from "Commands";
import client from "client";
import db from "database";

import { Card } from "types/Card";
import CardsManager from "CardsManager";

import { ButtonsId } from "res/buttons/ButtonsId";

import NewSpendingModal from "res/modals/NewSpending";
import RefillModal from "res/modals/Refill";

client.once(Events.ClientReady, async (c) => {
  /**  [ "Carte Bleue", $ ], [ "Lunch Card", $ ] */
  const query = db.query("SELECT * FROM cards");
  const values: Card[] = query.all() as Card[];

  console.log(`Ready! Logged in as ${c.user.tag}`);
  console.log(`Carte Bleue - ${CardsManager.getCBAmount()}€`);
  console.log(`${values[1].id} - ${CardsManager.getLCAmount()}€`);

  client.application?.commands.set(commands);
});

client.on(Events.InteractionCreate, async (i) => {
  if (i.isCommand()) {
    const slashCommand = commands.find((c) => c.name === i.command?.name);

    if (!slashCommand) {
      i.followUp({ content: "Command not found" });
      return;
    }

    await i.deferReply();

    slashCommand.run(i);
  }

  if (i.isButton()) {
    switch (i.customId) {
      case ButtonsId.NEW_SPENDING:
        i.showModal(NewSpendingModal);
        break;
      case ButtonsId.SETUP_CARD_AMOUNT:
        i.showModal(RefillModal);
        break;
    }
  }
});
