import { error } from '@sveltejs/kit';
import { listProjectsForRepo } from '$lib/octokit/projects.js';

/** @type {import('./$types').PageServerLoad} */
export async function load({ url }) {
	const label = url.searchParams.get('label') || '';
	console.log('label', label);

	// GitHub CLIでprojectsを取得する
	const res = await listProjectsForRepo();

	console.log(res);

	if (res) {
		return {
			projects: res.data
		};
	}

	throw error(404, 'Not found');
}
