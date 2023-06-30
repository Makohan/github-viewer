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

<h1
	class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl"
>
	Issue List
</h1>

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
						<th
							scope="row"
							class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
						>
							<a href={`/issues/${issue.number}`}>{issue.title} </a>
						</th>
						<td class="px-6 py-4">
							{#each issue.labels as label}
								<button
									type="button"
									on:click={() => clickLabel(label?.name)}
									style="color: #{label.color}; border-color: #{label.color}; background-color: #f0f8ff;"
									>{label?.name}</button
								>
							{/each}
						</td>
						<td class="px-6 py-4">
							{issue.assignee?.login || ''}
						</td>
						<td class="px-6 py-4">
							{issue.updated_at}
						</td>
					</tr>{/each}
			</tbody>
		</table>
	</div>
</div>
