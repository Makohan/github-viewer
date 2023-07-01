<script lang="ts">
	import Spinner from '$lib/components/Spinner.svelte';
	import { marked } from 'marked';
	import dayjs from 'dayjs';

	export let data;

	const { issue } = data;
	const isOpen = issue.state === 'open';
	const daysAfterCreatedAt = dayjs(issue.created_at).diff(dayjs(), 'day');
</script>

<h1 class="text-xl font-bold">{issue.title}</h1>
<div>
	<div class="flex items-center pb-2 border-b gap-x-2">
		<div class="text-sm text-white px-2 rounded-3xl {isOpen ? 'bg-green-500' : 'bg-purple-500'}">
			{issue.state}
		</div>
		<div class="text-sm">
			{issue.user?.login}
			{daysAfterCreatedAt} 日前・{issue.comments} コメント
		</div>
	</div>
	{#if issue.body}
		<div class="pt-2 issue">{@html marked.parse(issue.body)}</div>
	{/if}
</div>

<div>
	{#await data.streamed.commentsPromise}
		<Spinner />
	{:then comments}
		{#each comments.data as comment}
			<div class="my-2 border rounded-lg">
				<div class="flex px-2 py-1 text-sm gap-x-2 bg-gray-50">
					<div>{comment.user?.login}</div>
					<div>{dayjs(comment.updated_at).format('YYYY-MM-DD hh:mm')}</div>
				</div>
				{#if comment.body}
					<div class="px-2 issue">{@html marked.parse(comment.body)}</div>
				{/if}
			</div>
		{/each}
	{:catch error}
		<div style="color: red">{error.message}</div>
	{/await}
</div>

<style>
	:global(.issue) {
		@apply text-xs;
	}
	:global(.issue h1, .issue h2, .issue h3, .issue h4, .issue h5, .issue h6) {
		@apply font-bold;
	}
	:global(.issue h1) {
		@apply text-xl border-b;
	}
	:global(.issue h2) {
		@apply text-lg border-b;
	}
	:global(.issue p) {
		@apply pb-2;
	}
	:global(.issue ul li) {
		@apply list-disc ml-4;
	}
</style>
