<script lang="ts">
	import { confetti } from "@neoconfetti/svelte"
	import Reset from "./Reset.svelte"
	let gameBoard: string[] = new Array(9).fill("")
	let whoseTurn: string = "X"
	let winner: string | undefined = ""
	$: noWinner = gameBoard.every((square) => square !== "")

	function handlePlayersClick(i: number) {
		if (!gameBoard[i] && !winner) {
			gameBoard[i] = whoseTurn
			whoseTurn = whoseTurn === "X" ? "O" : "X"
			winner = gameOutcome(gameBoard)
		}
	}

	function gameOutcome(lines: string[]) {
		const winningCombos = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		]
		for (let x = 0; x < winningCombos.length; x++) {
			const [w, i, n] = winningCombos[x]
			if (lines[w] && lines[w] === lines[i] && lines[w] === lines[n]) {
				return lines[w]
			}
		}
	}

	const resetGame = () => {
		gameBoard = new Array(9).fill("")
		whoseTurn = "X"
		winner = ""
	}
</script>

<div class="container">
	<h1>Luffarschack</h1>
	{#if winner}
		<div class="confetti" use:confetti={{ stageWidth: innerWidth, stageHeight: innerHeight }} />
		<h2>Vinnare: {winner}</h2>
		<Reset reset={resetGame} />
	{:else if noWinner}
		<h2>Ingen vinnare!</h2>
		<Reset reset={resetGame} />
	{:else}
		<h2>Nästa spelare: {whoseTurn}</h2>
	{/if}
	<div class="game-board" style="opacity: {winner || noWinner ? '0.3' : '1'}">
		{#each gameBoard as _, i}
			<button on:click={() => handlePlayersClick(i)}><span>{gameBoard[i]}</span></button>
		{/each}
	</div>
</div>

<style>
	.container {
		margin: auto;
	}

	h1,
	h2 {
		text-align: center;
	}

	h1 {
		background-color: #34495e;
		color: #f2fe96;
		margin-bottom: 10px;
		padding-bottom: 5px;
		line-height: 1;
	}

	.game-board {
		display: grid;
		grid-template: repeat(3, 1fr) / repeat(3, 1fr);
		width: 550px;
		height: 550px;
		background-color: #34495e;
		border: 6px solid #2c3e50;
		border-radius: 10px;
	}

	@media (max-width: 608px) {
		.game-board {
			width: 360px;
			height: 360px;
		}
	}

	button {
		display: flex;
		justify-content: center;
		align-items: center;
		border: 6px solid #2c3e50;
		background-color: #f2fe96;
		color: #000;
		font-size: 4em;
	}

	button span {
		text-shadow:
			1px 1px hsl(67, 98%, 79%),
			2px 2px hsl(50, 50%, 40%),
			3px 3px hsl(50, 50%, 35%),
			4px 4px hsl(50, 50%, 34%),
			5px 5px hsl(50, 50%, 33%),
			6px 6px hsl(50, 50%, 32%),
			7px 7px hsl(50, 50%, 31%),
			8px 8px hsl(50, 50%, 30%),
			9px 9px hsl(50, 50%, 29%),
			10px 10px hsl(50, 50%, 28%);
	}

	button:hover {
		background-color: #f2fe96e6;
	}

	.confetti {
		position: fixed;
		width: 100%;
		height: 100%;
		left: 50%;
		top: 30%;
		pointer-events: none;
	}
</style>
