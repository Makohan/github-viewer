import { error } from '@sveltejs/kit';
import { getIssue, listComments } from '$lib/octokit';

export async function load({ params }) {
	const res = await getIssue(Number(params.id));
	console.log(res.data);

	if (res) {
		return {
			issue: res.data,
			streamed: {
				commentsPromise: listComments(Number(params.id))
			}
		};
	}

	throw error(404, 'Not found');
}
