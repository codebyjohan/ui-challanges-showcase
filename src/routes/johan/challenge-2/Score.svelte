<script lang="ts">
	import { confetti } from "@neoconfetti/svelte"
	export let score: number
	export let gameOver: boolean
	export let reset: () => void
</script>

<h2 class="score">Dina poäng: {score}</h2>
{#if gameOver}
	<div>
		<h2>Quizet är slut!</h2>
		<button on:click={reset}>Starta Om</button>
	</div>
{/if}

{#if score === 10}
	<div class="confetti" use:confetti={{ stageWidth: innerWidth, stageHeight: innerHeight }} />
{/if}

<style>
	.confetti {
		position: fixed;
		width: 100%;
		height: 100%;
		left: 50%;
		top: 30%;
		pointer-events: none;
	}

	div h2 {
		padding-bottom: 5px;
	}

	button {
		padding: 10px;
		background-color: #b91515;
		color: #fff;
		font-weight: bold;
		border-radius: 10px;
		border: none;
		outline: none;
		cursor: pointer;
	}
</style>
