import { OWNER, REPO } from '$env/static/private';
import { error } from '@sveltejs/kit';
import { client } from '$lib/octokit/client.js';

export async function load({ params }) {
	const res = await client.projects.get({
		owner: OWNER,
		repo: REPO,
		project_id: Number(params.id)
	});

	console.log('-----');
	console.log(res.data);

	if (res) {
		return {
			project: res.data
		};
	}

	throw error(404, 'Not found');
}
