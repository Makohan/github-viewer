<script lang="ts">
	import Label from '$lib/components/Label.svelte';
	import dayjs from 'dayjs';

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

	function clickLabel(labelName: string | undefined) {
		selectedLabel = labelName;
		filter();
	}
</script>

<div class="w-32">
	<label for="countries" class="block mb-2 text-sm font-medium text-gray-900"
		>Select an option</label
	>
	<select
		bind:value={selectedLabel}
		on:change={filter}
		id="countries"
		class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
	>
		<option value="" />
		{#each labels as label}
			<option value={label.name}>{label.name}</option>
		{/each}
	</select>
</div>

<div class="mt-4">
	<div class="relative overflow-x-auto">
		<table class="w-full text-sm text-left text-gray-500">
			<thead class="text-xs text-gray-700 bg-gray-50">
				<tr>
					<th scope="col" class="px-6 py-3"> Title </th>
					<th scope="col" class="px-6 py-3"> Label </th>
					<th scope="col" class="px-6 py-3"> Assignee </th>
					<th scope="col" class="px-6 py-3"> UpdatedAt </th>
				</tr>
			</thead>
			<tbody>
				{#each issues as issue}
					<tr class="bg-white border-b">
						<th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
							<a href={`/issues/${issue.number}`}>{issue.title} </a>
						</th>
						<td class="px-6 py-4">
							{#each issue.labels as label}
								{@const labelName = typeof label === 'string' ? label : label.name}
								{@const labelColor = typeof label === 'string' ? undefined : label.color}
								<Label
									label={labelName}
									color={labelColor}
									on:click={() => clickLabel(labelName)}
								/>
							{/each}
						</td>
						<td class="px-6 py-4">
							{issue.assignee?.login || ''}
						</td>
						<td class="px-6 py-4">
							{dayjs(issue.updated_at).format('YYYY-MM-DD hh:mm')}
						</td>
					</tr>{/each}
			</tbody>
		</table>
	</div>
</div>
