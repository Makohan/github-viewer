import { Octokit } from '@octokit/rest';
import { GITHUB_TOKEN, OWNER, REPO } from '$env/static/private';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const octokit = new Octokit({
		auth: GITHUB_TOKEN
	});

	const res = await octokit.rest.issues.get({
		owner: OWNER,
		repo: REPO,
		issue_number: Number(params.id)
	});

	console.log('-----');
	console.log(res.data);

	if (res) {
		return {
			issue: res.data
		};
	}

	throw error(404, 'Not found');
}
