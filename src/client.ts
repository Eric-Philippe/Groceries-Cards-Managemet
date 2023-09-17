import { Client, GatewayIntentBits } from "discord.js";

import { DISCORD_TOKEN } from "config";

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.login(DISCORD_TOKEN);

export default client;
