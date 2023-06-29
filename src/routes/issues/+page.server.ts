import { client } from '$lib/octokit/client';
import { OWNER, REPO } from '$env/static/private';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ url }) {
	const label = url.searchParams.get('label') || '';
	console.log('label', label);

	// GitHub CLIでissuesを取得する
	const res = await Promise.all([client.issues.listForRepo({
		owner: OWNER,
		repo: REPO,
		labels: label
	}),client.issues.listLabelsForRepo({
		owner: OWNER,
		repo: REPO
	})]);

	console.log(res);

	if (res) {
		return {
			issues: res[0].data,
			labels: res[1].data,
			defaultLabel: label
		};
	}

	throw error(404, 'Not found');
}
