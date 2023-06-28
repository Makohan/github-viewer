<script lang="ts">
	import { marked } from 'marked';

	export let data;

	const { issue } = data;
</script>

<h1>{issue.title}</h1>
<p>{@html marked.parse(issue.body)}</p>
