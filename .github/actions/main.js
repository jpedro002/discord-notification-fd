const sendDiscordMessage = require("./utils/sendDiscordMessage");
const github = require("@actions/github");

const context = github.context;

const { DISCORD_WEBHOOK, DISCORD_PERSONALIZED_EMBED } = process.env;

console.log(
	context.payload.action === "closed" &&
		context.payload.pull_request &&
		context.payload.pull_request.merged
);

sendDiscordMessage(DISCORD_WEBHOOK, DISCORD_PERSONALIZED_EMBED).catch(
	(error) => {
		console.error("Error sending Discord message:", error);
	}
);
