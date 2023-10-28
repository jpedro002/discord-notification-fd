const github = require("@actions/github");

async function checkIfPushIsMerge() {
  const token = process.env.GITHUB_TOKEN;
  const octokit = github.getOctokit(token);
  const context = github.context;

  const { owner, repo } = context.repo;
  const { before, after } = context.payload;

  const commitComparison = await octokit.repos.compareCommits({
    owner,
    repo,
    base: before,
    head: after,
  });

  const commits = commitComparison.data.commits;

  for (const commit of commits) {
    if (commit.parents.length > 1) {
      return true;
    }
  }

  return false;
}

async function main() {
  const isMerge = await checkIfPushIsMerge();
  
  if (isMerge) {
    console.log("Este push foi gerado a partir de um merge.");
  } else {
    console.log("Este push não foi gerado a partir de um merge.");
  }
}

main();

module.exports = {
main
};
