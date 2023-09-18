const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;

/** See .env | .env.example */

if (!DISCORD_TOKEN || !CLIENT_ID || !GUILD_ID) {
  throw new Error("Missing environment variables.");
}

export { DISCORD_TOKEN, CLIENT_ID, GUILD_ID };
