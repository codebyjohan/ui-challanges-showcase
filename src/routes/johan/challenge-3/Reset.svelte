<script lang="ts">
	export let reset: () => void
</script>

<div class="reset-game">
	<button on:click={reset}>Starta Om</button>
</div>

<style>
	.reset-game {
		display: flex;
		justify-content: center;
		padding: 10px;
	}

	.reset-game button {
		padding: 5px;
		border: 2px solid #2c3e50;
		background-color: #f2fe96;
		font-size: 0.9em;
	}
</style>
