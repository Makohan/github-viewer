import { Octokit } from '@octokit/rest';
import { GITHUB_TOKEN, OWNER, REPO } from '$env/static/private';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ url }) {
	const octokit = new Octokit({
		auth: GITHUB_TOKEN
	});

	const label = url.searchParams.get('label') || '';
	console.log('label', label);

	// GitHub CLIでissuesを取得する
	const res = await octokit.rest.issues.listForRepo({
		owner: OWNER,
		repo: REPO,
		labels: label
	});

	const res2 = await octokit.rest.issues.listLabelsForRepo({
		owner: OWNER,
		repo: REPO
	});

	console.log(res.data[0]);

	if (res) {
		return {
			issues: res.data,
			labels: res2.data,
			defaultLabel: label
		};
	}

	throw error(404, 'Not found');
}
