<script lang="ts">
	import Score from "./Score.svelte"
	export let data

	let selectedAnswer: string = ""
	let currentQuestionIndex: number = 0
	let score: number = 0
	$: gameOver = currentQuestionIndex >= data.questions.length
	$: currentQuestion = data.questions[currentQuestionIndex]
</script>

<div class="quiz-container">
	<h1>Arsenal Quiz</h1>
	{#if currentQuestion && !gameOver}
		<h2>Fråga {currentQuestion.id} / {data.questions.length}</h2>
		<h3>{currentQuestion.qst}</h3>
		<form
			on:submit|preventDefault={() => {
				if (selectedAnswer === currentQuestion.correctanswer) {
					score += 1
				}

				currentQuestionIndex += 1
			}}>
			{#each currentQuestion.answers as answer}
				<label>
					<input
						on:change={() => {
							selectedAnswer = answer
						}}
						type="radio"
						required
						name="answer"
						checked={answer === selectedAnswer} />
					{answer}
				</label>
			{/each}
			<button>Svara</button>
		</form>
	{/if}

	<Score
		{score}
		{gameOver}
		reset={() => {
			selectedAnswer = ""
			currentQuestionIndex = 0
			score = 0
		}} />
</div>

<style>
	.quiz-container {
		min-width: 60vw;
		color: #fff;
		margin: auto;
		border-radius: 5px;
		background-color: #000000cc;
		padding: 10px;
		box-shadow: 0 0 10px 2px;
		text-align: center;
	}

	@media (max-width: 912px) {
		.quiz-container {
			min-width: 100vw;
		}
	}

	form {
		display: grid;
		grid-template-columns: repeat(2, auto);
		gap: 10px;
		margin: 20px 0;
	}

	button {
		grid-column: 1 / -1;
		width: 250px;
		margin-left: auto;
		margin-right: auto;
		padding: 15px;
		background-color: #b91515;
		font-weight: bold;
		border-radius: 10px;
		border: none;
		outline: none;
		cursor: pointer;
	}

	label {
		display: flex;
		justify-content: center;
		background-color: #b91515;
		padding: 15px;
		margin: 8px;
		border-radius: 20px;
		cursor: pointer;
	}

	input[type="radio"] {
		accent-color: #000;
		margin-right: 5px;
	}
</style>
