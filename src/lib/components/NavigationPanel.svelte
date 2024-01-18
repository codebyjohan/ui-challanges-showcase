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

<form class="toggle-button-form">
	<HiddenInputs filterKeys={[NAVIGATION_PANEL_KEY]} />
	{#if !open}
		<button aria-hidden="true" tabindex="-1" name={NAVIGATION_PANEL_KEY} value="open">Open navigation</button>
	{:else}
		<button aria-hidden="true" tabindex="-1" name={NAVIGATION_PANEL_KEY} value="close">Close navigation</button>
	{/if}
</form>

<style>
	nav {
		translate: -100%;
		transition: translate 0.3s ease-in-out;
	}

	nav:focus-within,
	nav[data-show-navigation="true"] {
		translate: 0;
	}

	.toggle-button-form {
		z-index: 1;
		height: max-content;
		width: max-content;
	}
</style>
