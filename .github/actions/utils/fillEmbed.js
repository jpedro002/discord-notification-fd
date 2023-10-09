const { getAuthorAvatar  } = require("./api.js");
const {DEFAULT_EMBED,DEFAULT_MESSAGES} = require("./data-embeds.js");
const github = require("@actions/github");
const context = github.context;

const {
	GITHUB_REPOSITORY,
	GITHUB_ACTOR,
	MENSAGE_ON_PUSH,
	MENSAGE_ON_PULL_REQUEST_OPENED,
	MENSAGE_ON_PULL_REQUEST_MERGED,
	MENSAGE_ON_ISSUE_OPENED,
} = process.env;



const fillDefaultEmbed = async () => {
	const githubActor = GITHUB_ACTOR;
	const avatarUrl = await getAuthorAvatar(githubActor);
	const color = Math.floor(Math.random() * 10000000) + 1;
	DEFAULT_EMBED.embeds[0].color = color;
	DEFAULT_EMBED.embeds[0].author.name = githubActor;
	DEFAULT_EMBED.embeds[0].author.icon_url = avatarUrl;
	DEFAULT_EMBED.embeds[0].title = `Repositório`;
	DEFAULT_EMBED.embeds[0].url = `https://github.com/${GITHUB_REPOSITORY}`;

	switch (context.eventName) {
		case "pull_request":
			if (context.payload.action === "opened") {
				DEFAULT_EMBED.embeds[0].description =
					MENSAGE_ON_PULL_REQUEST_OPENED || DEFAULT_MESSAGES.pr_opened;


			} else if (
				context.payload.pull_request &&
				context.payload.pull_request.merged
			) {
				DEFAULT_EMBED.embeds[0].description =
					MENSAGE_ON_PULL_REQUEST_MERGED || DEFAULT_MESSAGES.pr_acepted;
			}
			break;
		case "issues":
			DEFAULT_EMBED.embeds[0].description =
				MENSAGE_ON_ISSUE_OPENED || DEFAULT_MESSAGES.issue;
				DEFAULT_EMBED.embeds[0].footer.text = `Conteudo da issue ${context.payload.issue.body}` 
			break;
		case "push":
			DEFAULT_EMBED.embeds[0].description =
				MENSAGE_ON_PUSH || DEFAULT_MESSAGES.push;
			DEFAULT_EMBED.embeds[0].footer.text = `O commit que disparou a mensagem: ${
				context.payload.commits[context.payload.commits.length - 1].message
			}`;
			break;
		default:
			console.error("Event not supported");
			process.exit(1);
	}
	return DEFAULT_EMBED;
};

module.exports = fillDefaultEmbed
