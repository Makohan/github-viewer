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

	function clickLabel(labelName: string) {
		selectedLabel = labelName;
		filter();
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
			<a href={`/issues/${issue.number}`}>{issue.title} </a>
			{#each issue.labels as label}
				<button
					type="button"
					on:click={() => clickLabel(label?.name)}
					style="color: #{label.color}; border-color: #{label.color}; background-color: #f0f8ff;"
					>{label?.name}</button
				>
			{/each}
			<span>{issue.assignee?.login || ''}</span>
		</ol>
	{/each}
</dl>
