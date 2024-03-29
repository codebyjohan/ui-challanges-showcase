<script lang="ts">
	import { crossfade } from "svelte/transition"
	import { page } from "$app/stores"

	import HiddenInputs from "$utilities/HiddenInputs.svelte"

	const NAVIGATION_PANEL_KEY = "navigationPanel"

	const [send, receive] = crossfade({})
	const CROSS_FADE_OPTIONS = { key: "dot", duration: 500 }

	type Link = { href: string; text: string }

	const LINKS: { Calle: Link[]; Johan: Link[]; Nassim: Link[] } = {
		Calle: [
			{ href: "/calle/challenge-1", text: "Challenge 1" },
			{ href: "/calle/challenge-2", text: "Challenge 2" },
		],
		Johan: [
			{ href: "/johan/challenge-1", text: "Challenge 1" },
			{ href: "/johan/challenge-2", text: "Challenge 2" },
			{ href: "/johan/challenge-3", text: "Challenge 3" },
			{ href: "/johan/challenge-4", text: "Challenge 4" },
			{ href: "/johan/challenge-5", text: "Challenge 5" },
			{ href: "/johan/challenge-6", text: "Challenge 6" },
		],
		Nassim: [
			{ href: "/nassim/challenge-1", text: "Challenge 1" },
			{ href: "/nassim/challenge-2", text: "Challenge 2" },
		],
	}

	$: open = $page.url.searchParams.get(NAVIGATION_PANEL_KEY) === "open"
	$: path = $page.url.pathname
</script>

<main class="grid-stack">
	{#if open}
		<form class="click-outside" aria-hidden="true">
			<button tabindex="-1" name={NAVIGATION_PANEL_KEY} value="close"></button>
		</form>
	{/if}
	<slot />
</main>

<nav class="glass" data-show-navigation={open}>
	<ul>
		{#each Object.entries(LINKS) as [name, links]}
			<li>
				<span>{name}</span>
				<ul>
					{#each links as link}
						<li class:active={path === link.href}>
							{#if path === link.href}
								<span in:send={CROSS_FADE_OPTIONS} out:receive={CROSS_FADE_OPTIONS} class="dot"> > </span>
							{/if}
							<a href={link.href}>{link.text}</a>
						</li>
					{/each}
				</ul>
			</li>
		{/each}
	</ul>
</nav>

<form class="toggle-button-form">
	<HiddenInputs filterKeys={[NAVIGATION_PANEL_KEY]} />
	<button aria-hidden="true" tabindex="-1" name={NAVIGATION_PANEL_KEY} value={open ? "close" : "open"}>
		{open ? "Close" : "Open"} navigation
	</button>
</form>

<style>
	main {
		overflow: auto;
		max-height: 100vh;
	}

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

	nav ul span {
		font-size: 1.5em;
		font-weight: 700;
		padding-left: 0.5em;
	}

	nav ul ul {
		padding: 1em 0.8em;
		list-style-type: none;
	}

	nav ul ul li {
		background-color: #c14545;
		margin-bottom: 1em;
		font-size: 1.6em;
		min-width: max-content;
		position: relative;
		display: grid;
		grid-template-columns: auto auto;
		max-width: 233px;
		width: 100vh;
	}

	nav ul li:last-of-type {
		margin-bottom: 0;
	}

	nav a {
		text-decoration: none;
		grid-column: 2;
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

	.click-outside {
		background-color: #00000050;
	}

	.click-outside button {
		width: 100%;
		height: 100%;
		background-color: transparent;
		cursor: auto;
	}
	.dot {
		position: absolute;
		grid-column: 1;
		align-self: flex-end;
		line-height: 1;
	}
	.active {
		font-weight: bold;
	}
</style>
