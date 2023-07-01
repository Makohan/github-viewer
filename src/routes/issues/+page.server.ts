import { listIssuesForRepo, listLabelsForRepo } from '$lib/octokit';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ url }) {
	const label = url.searchParams.get('label') || '';
	console.log('label', label);

	const res = await Promise.all([listIssuesForRepo(label), listLabelsForRepo()]);

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
