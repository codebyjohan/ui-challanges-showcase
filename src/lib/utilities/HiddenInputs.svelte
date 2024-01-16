<script lang="ts">
	import { page } from "$app/stores"
	export let filterKeys: string[] | undefined = undefined
	$: searchParams = $page.url.searchParams.entries()
</script>

{#each searchParams as parameter}
	{#if !filterKeys?.includes(parameter[0])}
		<input type="hidden" name={parameter[0]} value={parameter[1]} />
	{/if}
{/each}
