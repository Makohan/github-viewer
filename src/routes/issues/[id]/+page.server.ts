import { Octokit } from '@octokit/rest';
import { GITHUB_TOKEN, OWNER, REPO } from '$env/static/private';
import { error } from '@sveltejs/kit';
import { client } from '$lib/octokit/client.js';

export async function load({ params }) {
	const res = await client.issues.get({
		owner: OWNER,
		repo: REPO,
		issue_number: Number(params.id)
	});

	console.log('-----');
	console.log(res.data);

	const commentsPromise = client.issues.listComments({
		owner: OWNER,
		repo: REPO,
		issue_number: Number(params.id)
	});

	if (res) {
		return {
			issue: res.data,
			streamed: {
				commentsPromise
			}
		};
	}

	throw error(404, 'Not found');
}
