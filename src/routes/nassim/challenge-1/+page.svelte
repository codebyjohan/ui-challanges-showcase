<script lang="ts">
	import { send, receive } from "./crossfade"

	let playerHoldingPotato = 0

	function getRandomPlayer() {
		playerHoldingPotato = Math.floor(Math.random() * 5)
	}
</script>

<section>
	{#each [0, 1, 2, 3, 4] as player}
		<div>
			Player: {player}
			{#if player === playerHoldingPotato}
				<span in:send={{ key: "Potato", duration: 500 }} out:receive={{ key: "Potato", duration: 500 }}>🥔</span>
			{/if}
		</div>
	{/each}

	<button on:click={getRandomPlayer}>pass</button>
</section>

<style>
	span {
		position: absolute;
	}
	:global(html, ),
	:global(body) {
		overflow-x: hidden;
		height: 100%;
	}
	section {
		place-content: center;
		display: grid;
		grid-template-areas:
			" . . player1 . ."
			"player2 . button . player3 "
			". player4 . player5 .";
	}

	div:nth-last-of-type(1) {
		grid-area: player1;
	}
	div:nth-last-of-type(2) {
		grid-area: player2;
	}
	div:nth-last-of-type(3) {
		grid-area: player3;
	}
	div:nth-last-of-type(4) {
		grid-area: player4;
	}
	div:nth-last-of-type(5) {
		grid-area: player5;
	}

	button {
		grid-area: button;
	}
</style>
