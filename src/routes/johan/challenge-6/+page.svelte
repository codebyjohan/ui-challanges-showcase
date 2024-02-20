<script lang="ts">
	import { cubicOut } from "svelte/easing"
	let count = 0

	function customTransition(node: HTMLElement) {
		let defaultText = node.textContent
		return {
			duration: 10000,
			easing: cubicOut,
			css: (t: number, u: number) => {
				if (t <= 0.4) {
					return `transform: rotate(${u * -0.01}turn); opacity: ${t}; font-weight: 700; text-shadow: 1px 1px 1px`
				} else {
					return `opacity: 1;`
				}
			},
			tick: (t: number) => {
				if (t < 0.4) {
					node.textContent = "Räkna med..."
				} else {
					node.textContent = defaultText
				}
			},
		}
	}

	setInterval(() => {
		count++
	}, 2500)
</script>

<div class="container">
	<h1>Custom Transition</h1>
	{#key count}
		<div in:customTransition>
			<p>{count}</p>
		</div>
	{/key}
</div>

<style>
	.container {
		margin: 5em auto;
	}

	div {
		font-size: 2em;
		margin-top: 1.5em;
		text-align: center;
		overflow-x: hidden;
	}
</style>
