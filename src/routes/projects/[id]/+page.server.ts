import { getProject } from '$lib/octokit/projects.js';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const res = await getProject(Number(params.id));

	console.log(res.data);

	if (res) {
		return {
			project: res.data
		};
	}

	throw error(404, 'Not found');
}
