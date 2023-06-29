<script lang="ts">
	import { marked } from 'marked';

	export let data;

	const { issue } = data;
</script>

<h1>{issue.title}</h1>

<section>
	<p>{issue.user?.login} updated_at: {issue.updated_at}</p>
  {#if issue.body}
	<p>{@html marked.parse(issue.body)}</p>
  {/if}
</section>
---
<section>
  {#await data.streamed.commentsPromise}
    Loading...
  {:then comments}
    {#each comments.data as comment}
      <article>
        <p>{comment.user?.login} updated_at: {comment.updated_at}</p>
        {#if comment.body}
        <p>{@html marked.parse(comment.body)}</p>
        {/if}
      </article>
    {/each}
  {:catch error}
    <p style="color: red">{error.message}</p>
  {/await}
</section>
