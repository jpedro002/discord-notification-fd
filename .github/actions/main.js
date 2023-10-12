const sendDiscordMessage = require("./utils/sendDiscordMessage");

const { DISCORD_WEBHOOK, DISCORD_PERSONALIZED_EMBED } = process.env;

console.log(DISCORD_PERSONALIZED_EMBED);

sendDiscordMessage(DISCORD_WEBHOOK, DISCORD_PERSONALIZED_EMBED).catch(
	(error) => {
		console.error("Error sending Discord message:", error);
	}
);
