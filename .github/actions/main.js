const sendDiscordMessage = require("./utils/sendDiscordMessage");
const github = require("@actions/github");

const context = github.context;

const { DISCORD_WEBHOOK, DISCORD_PERSONALIZED_EMBED } = process.env;

console.log(
	context.payload.action === "closed" &&
		context.payload.pull_request &&
		context.payload.pull_request.merged
);

const identifyMessage = "Merge pull request";
const mensagemDoCommitMaisRecente = context.payload.commits[context.payload.commits.length - 1].message;

if (mensagemDoCommitMaisRecente.toLowerCase().includes(identifyMessage.toLowerCase())) {
  console.log("é igual uhuulll");
  console.log(mensagemDoCommitMaisRecente);
} else {
  console.log("não é igual");
}

sendDiscordMessage(DISCORD_WEBHOOK, DISCORD_PERSONALIZED_EMBED).catch(
	(error) => {
		console.error("Error sending Discord message:", error);
	}
);
