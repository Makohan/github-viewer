import { Octokit } from '@octokit/rest';
import { GITHUB_TOKEN } from '$env/static/private';

const octokit = new Octokit({
  auth: GITHUB_TOKEN
});

export const client = octokit.rest;