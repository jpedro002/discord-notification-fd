const core = require("@actions/core");

async function run() {
  const eventName = process.env.GITHUB_EVENT_NAME
  core.setOutput("event-output", eventName);
  console.log(eventName);

}

run();