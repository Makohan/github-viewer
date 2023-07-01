import { OWNER, REPO } from '$env/static/private';
import { client } from './client';

export const listIssuesForRepo = (label: string) =>
	client.issues.listForRepo({
		owner: OWNER,
		repo: REPO,
		labels: label
	});

export const listLabelsForRepo = () =>
	client.issues.listLabelsForRepo({
		owner: OWNER,
		repo: REPO
	});

export const getIssue = (issue_number: number) =>
	client.issues.get({
		owner: OWNER,
		repo: REPO,
		issue_number: issue_number
	});

export const listComments = (issue_number: number) =>
	client.issues.listComments({
		owner: OWNER,
		repo: REPO,
		issue_number: issue_number
	});
