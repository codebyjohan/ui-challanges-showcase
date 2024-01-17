<script lang="ts">
	import { page } from "$app/stores"
	import HiddenInputs from "$utilities/HiddenInputs.svelte"
	const NAVIGATION_PANEL_KEY = "navigationPanel"
	const LINKS: { href: string; text: string }[] = [
		{ href: "challenge-1", text: "Challenge 1" },
		{ href: "challenge-2", text: "Challenge 2" },
		{ href: "challenge-3", text: "Challenge 3" },
	]
	let open = false
	$: open = $page.url.searchParams.get(NAVIGATION_PANEL_KEY) === "open"
</script>

<nav data-show-navigation={open}>
	<ul>
		{#each LINKS as link}
			<li><a href={link.href}>{link.text}</a></li>
		{/each}
	</ul>
</nav>

<form>
	<HiddenInputs filterKeys={[NAVIGATION_PANEL_KEY]} />
	{#if !open}
		<button name={NAVIGATION_PANEL_KEY} value="open">Open navigation</button>
	{:else}
		<button name={NAVIGATION_PANEL_KEY} value="close">Close navigation</button>
	{/if}
</form>
{#if open}
	panel content
{/if}
