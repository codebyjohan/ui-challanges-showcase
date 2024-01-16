<script>
	import { page } from "$app/stores"
	import HiddenInputs from "./HiddenInputs.svelte"
	const NAVIGATION_PANEL_KEY = "navigationPanel"
	let open = false
	$: open = $page.url.searchParams.get(NAVIGATION_PANEL_KEY) === "open"
</script>

<form>
	<HiddenInputs filterKeys={NAVIGATION_PANEL_KEY} />
	{#if !open}
		<button name={NAVIGATION_PANEL_KEY} value="open">Open navigation</button>
	{:else}
		<button name={NAVIGATION_PANEL_KEY} value="close">Close navigation</button>
	{/if}
</form>
{#if open}
	panel content
{/if}
