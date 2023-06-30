import { client } from '$lib/octokit/client';
import { OWNER, REPO } from '$env/static/private';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ url }) {
	const label = url.searchParams.get('label') || '';
	console.log('label', label);

	// GitHub CLIでprojectsを取得する
	const res = await client.projects.listForRepo({
		owner: OWNER,
		repo: REPO
	});

	console.log(res);

	if (res) {
		return {
			projects: res.data
		};
	}

	throw error(404, 'Not found');
}
