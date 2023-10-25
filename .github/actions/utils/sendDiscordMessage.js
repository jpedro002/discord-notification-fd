const {  postMessage } = require("./api.js");
const fillDefaultEmbed = require("./fillEmbed.js")




const sendDiscordMessage = async (DISCORD_WEBHOOK,DISCORD_PERSONALIZED_EMBED) => {

	

	if (!DISCORD_WEBHOOK) {
		console.error("DISCORD_WEBHOOK is not defined");
		process.exit(1);
	} else if (
		DISCORD_PERSONALIZED_EMBED
	) {
		const parseEmbed = JSON.parse(DISCORD_PERSONALIZED_EMBED)
		const embedToSend = parseEmbed[0]
		console.log(embedToSend,"embed To Send");
		postMessage(DISCORD_WEBHOOK, embedToSend);
	} else {
		try {
			const data = await fillDefaultEmbed();
			await postMessage(DISCORD_WEBHOOK, data);
		} catch (error) {
			console.error("Error:", error);
		}
	}
}


module.exports = 
sendDiscordMessage
