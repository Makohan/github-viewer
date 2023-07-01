<script lang="ts">
	export let label: string | undefined = undefined;
	export let color: string | null = null;
</script>

<button
	type="button"
	on:click
	style="color: #{color}; border-color: #{color}; background-color: #f0f8ff;">{label}</button
>
