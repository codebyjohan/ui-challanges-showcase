<script lang="ts">
	import { page } from "$app/stores"
	import HiddenInputs from "$utilities/HiddenInputs.svelte"
	const NAVIGATION_PANEL_KEY = "navigationPanel"
	const LINKS: { href: string; text: string }[] = [
		{ href: "/challenge-1", text: "Challenge 1" },
		{ href: "/challenge-2", text: "Challenge 2" },
		{ href: "/challenge-3", text: "Challenge 3" },
	]
	let open = false
	$: open = $page.url.searchParams.get(NAVIGATION_PANEL_KEY) === "open"
	$: path = $page.url.pathname
</script>

<nav class="glass" data-show-navigation={open}>
	<ul>
		{#each LINKS as link}
			<li class:active={path === link.href}><a href={link.href}>{link.text}</a></li>
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
		overflow-y: auto;
		overflow-x: hidden;
		display: flex;
		height: 100%;
		width: max-content;
		padding-top: 3em;
	}

	nav ul:first-child,
	nav ul:last-child {
		margin-top: auto;
		margin-bottom: auto;
	}

	nav:focus-within,
	nav[data-show-navigation="true"] {
		translate: 0;
	}

	nav ul {
		padding: 1em 0.8em;
		list-style-type: none;
	}

	nav ul li {
		background-color: #c14545b3;
		margin-bottom: 1em;
		padding: 0 1.5em;
		font-size: 1.6em;
		min-width: max-content;
	}

	nav ul li:last-of-type {
		margin-bottom: 0;
	}

	nav a {
		text-decoration: none;
	}

	.active {
		background-color: #c14545;
	}

	.toggle-button-form {
		z-index: 1;
		height: max-content;
		width: max-content;
	}

	.toggle-button-form button {
		padding: 1em;
		border-bottom-right-radius: 1em;
	}
</style>
