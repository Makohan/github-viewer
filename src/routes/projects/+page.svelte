<script lang="ts">
	export let data;

	const { projects } = data;
	console.log(projects);
</script>

<h1>Project List</h1>

<dl>
	{#each projects as project}
		<ol>
			<a href={`/projects/${project.number}`}>{project}</a>
		</ol>
	{/each}
</dl>
