<script lang="ts">
	export let data;

	const { issues, labels, defaultLabel } = data;

	let selectedLabel = defaultLabel;

	function filter() {
		if (selectedLabel === '') {
			location.href = '/issues';
		} else {
			location.href = `/issues?label=${selectedLabel}`;
		}
	}
</script>

<h1>List</h1>

<select bind:value={selectedLabel} on:change={filter}>
	<option value="" />
	{#each labels as label}
		<option value={label.name}>{label.name}</option>
	{/each}
</select>

<dl>
	{#each issues as issue}
		<ol>
			<a href={`/issues/${issue.number}`}>{issue.title}</a>
		</ol>
	{/each}
</dl>
