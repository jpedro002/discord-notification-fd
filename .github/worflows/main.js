const core = require("@actions/core");

async function run() {
  const eventName = process.env.GITHUB_EVENT_NAME
  console.log(eventName);
  core.setOutput("event-output", eventName);
}

run();