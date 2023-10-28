const sendDiscordMessage = require("./utils/sendDiscordMessage");
const {main} = require("./utils/validateMerge");

const { DISCORD_WEBHOOK, DISCORD_PERSONALIZED_EMBED } = process.env;

sendDiscordMessage(DISCORD_WEBHOOK, DISCORD_PERSONALIZED_EMBED).catch(
	(error) => {
		console.error("Error sending Discord message:", error);
	}
);

main();
