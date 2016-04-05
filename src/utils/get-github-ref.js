import axios from "axios";

export default async function getGithubRef (lambda) {
    const {org, repo} = lambda.github;
    const result = await axios.get(
        `https://api.github.com/repos/${org}/${repo}/git/refs/heads/master`
    );
    const commit = result.data.object.sha;
    return `${org}/${repo}@${commit}`;
}
