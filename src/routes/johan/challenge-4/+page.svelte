<script lang="ts">
	import { bookStore } from "./bookStore"
	let title: string = ""
	let author: string = ""
	let clicked: boolean = false

	function submitBook() {
		clicked = true
		if (validTitle && validAuthor) {
			bookStore.addBook({ title, author })
			title = author = ""
			clicked = false
		}
	}

	$: validTitle = title.length > 0
	$: validAuthor = author.length > 0
</script>

<div class="container">
	<h1>Skapa din egna bok!</h1>
	<form on:submit|preventDefault>
		<label>
			Boktitel
			<input bind:value={title} placeholder="Boktitel" maxlength="30" />
		</label>
		{#if clicked && !validTitle}
			<p class="error-message">Välj en boktitel!</p>
		{/if}
		<label>
			Författare
			<input bind:value={author} placeholder="Författare" maxlength="20" />
		</label>
		{#if clicked && !validAuthor}
			<p class="error-message">Välj en författare!</p>
		{/if}
		<button on:click={submitBook}>Lägg till bok</button>
	</form>

	<div class="book-container">
		{#each $bookStore as book, i}
			<div class="book">
				<div class="cover">
					<div class="book-info">
						<h2>{book.title}</h2>
						<p>by: {book.author}</p>
					</div>
				</div>
				<button on:click={() => bookStore.removeBook(i)}>Radera</button>
			</div>
		{/each}
	</div>
</div>

<style>
	.container {
		margin: 4em auto;
	}

	h1 {
		text-align: center;
		padding-bottom: 20px;
	}

	h2 {
		max-width: 150px;
		text-transform: uppercase;
	}

	form {
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
	}

	label {
		display: grid;
		line-height: 1;
	}

	input,
	button {
		border: 1px solid #1d455e;
		padding: 5px;
		margin-top: 5px;
	}

	.error-message {
		color: red;
	}

	.book-container {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
		gap: 1.5em;
	}

	.book {
		width: 250px;
		height: 300px;
		background: #1d455e;
		margin-top: 50px;
		perspective: 1000px;
	}
	.book-info {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		width: 100%;
		height: 100%;
		word-break: break-word;
	}
	.cover {
		width: 210px;
		height: 300px;
		left: 40px;
		position: relative;
		transform: rotateY(-20deg);
		transform-origin: left;
		background-color: lightgray;
		border: 1px solid #1d455e;
	}
</style>
