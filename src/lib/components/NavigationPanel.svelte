<script lang="ts">
	import { page } from "$app/stores"
	import HiddenInputs from "$utilities/HiddenInputs.svelte"
	import { send, recieve } from "./transition"
	const NAVIGATION_PANEL_KEY = "navigationPanel"
	const LINKS_JOHAN: { href: string; text: string }[] = [
		{ href: "/johan/challenge-1", text: "Challenge 1" },
		{ href: "/johan/challenge-2", text: "Challenge 2" },
	]

	const LINKS_CALLE: { href: string; text: string }[] = [
		{ href: "/calle/challenge-1", text: "Challenge 1" },
		{ href: "/calle/challenge-2", text: "Challenge 2" },
	]
	let open = false
	let path = $page.url.pathname
	$: open = $page.url.searchParams.get(NAVIGATION_PANEL_KEY) === "open"
	$: {
		path = $page.url.pathname
		console.log(path)
	}
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
		<li>
			<span>Johan</span>
			<ul>
				{#each LINKS_JOHAN as link}
					<li class:active={path === link.href}>
						{#if path === link.href}
							<span in:send={{ key: "dot", duration: 500 }} out:recieve={{ key: "dot", duration: 500 }} class="dot"
								>></span
							>{/if}
						<a href={link.href}>{link.text}</a>
					</li>
				{/each}
			</ul>
		</li>

		<li>
			<span>Calle</span>
			<ul>
				{#each LINKS_CALLE as link}
					<li class:active={path === link.href}>
						{#if path === link.href}
							<span in:send={{ key: "dot", duration: 500 }} out:recieve={{ key: "dot", duration: 500 }} class="dot"
								>></span
							>{/if}
						<a href={link.href}>{link.text}</a>
					</li>
				{/each}
			</ul>
		</li>
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
