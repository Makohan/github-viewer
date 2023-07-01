import { OWNER, REPO } from '$env/static/private';
import { client } from './client';

export const listProjectsForRepo = () =>
	client.projects.listForRepo({
		owner: OWNER,
		repo: REPO
	});

export const getProject = (project_id: number) =>
	client.projects.get({
		owner: OWNER,
		repo: REPO,
		project_id: project_id
	});
