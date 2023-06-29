<script lang="ts">
	import { marked } from 'marked';

	export let data;

	const { issue, comments } = data;
</script>

<h1>{issue.title}</h1>

<section>
	<p>{issue.user.login} updated_at: {issue.updated_at}</p>
	<p>{@html marked.parse(issue.body)}</p>
</section>
---
<section>
	{#each comments as comment}
		<article>
			<p>{comment.user.login} updated_at: {comment.updated_at}</p>
			<p>{@html marked.parse(comment.body)}</p>
		</article>
	{/each}
</section>
