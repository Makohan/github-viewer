<script lang="ts">
	import Spinner from '$lib/components/Spinner.svelte';
	import { marked } from 'marked';
	import dayjs from 'dayjs';

	export let data;

	const { issue } = data;
	const isOpen = issue.state === 'open';
	const daysAfterCreatedAt = dayjs(issue.created_at).diff(dayjs(), 'day');
</script>

<h1 class="font-bold text-xl">{issue.title}</h1>
<div>
	<div class="flex items-center gap-x-2 border-b pb-2">
		<div class="text-sm text-white px-2 rounded-3xl {isOpen ? 'bg-green-500' : 'bg-purple-500'}">
			{issue.state}
		</div>
		<div class="text-sm">
			{issue.user?.login}
			{daysAfterCreatedAt} 日前・{issue.comments} コメント
		</div>
	</div>
	{#if issue.body}
		<div class="pt-2 marked">{@html marked.parse(issue.body)}</div>
	{/if}
</div>

<div>
	{#await data.streamed.commentsPromise}
		<Spinner />
	{:then comments}
		{#each comments.data as comment}
			<div class="border rounded-lg my-2">
				<div class="flex gap-x-2 text-sm bg-gray-50 py-1 px-2">
					<div>{comment.user?.login}</div>
					<div>{dayjs(comment.updated_at).format('YYYY-MM-DD hh:mm')}</div>
				</div>
				{#if comment.body}
					<div class="px-2 marked">{@html marked.parse(comment.body)}</div>
				{/if}
			</div>
		{/each}
	{:catch error}
		<div style="color: red">{error.message}</div>
	{/await}
</div>

<style>
	:global(.marked) {
		@apply text-xs;
	}
	:global(.marked h1, .marked h2, .marked h3, .marked h4, .marked h5, .marked h6) {
		@apply font-bold;
	}
	:global(.marked h1) {
		@apply text-xl border-b;
	}
	:global(.marked h2) {
		@apply text-lg border-b;
	}
	:global(.marked p) {
		@apply pb-2;
	}
	:global(.marked ul li) {
		@apply list-disc ml-4;
	}
</style>
