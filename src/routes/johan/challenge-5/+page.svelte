<script lang="ts">
	export let data
	let showJersey: boolean = false
	let moreInfo: boolean = false
	let options = ["Website", "Facebook", "Instagram"]
	let optionPlaceholder = "Arsenal Links"
	$: selectedRadio = ""
	$: selectedOption = ""
</script>

<section>
	{#each data.teams as team, i}
		{#if i === 0}
			<img src={team.strTeamBadge} alt="Arsenal logo" />
			<h1>{team.strTeam}</h1>
			<ul>
				<li>Location: {team.strStadiumLocation}</li>
				<li>Stadium: {team.strStadium}</li>
				<li>Capacity: {team.intStadiumCapacity}</li>
				<li>Nickname: {team.strKeywords}</li>
				<li>
					Hexcolor: {team.strKitColour1} & {team.strKitColour2}
				</li>
				<li>
					<label>
						Home Jersey
						<input type="checkbox" bind:checked={showJersey} />
					</label>
					{#if showJersey !== false}
						<img src={team.strTeamJersey} alt="Arsenal jersey" />
					{/if}
				</li>
				<li>
					<label>
						More info
						<input type="checkbox" bind:checked={moreInfo} /></label>
					{#if moreInfo !== false}
						<ul>
							<li>
								<label>
									Emirates Stadium <input type="radio" bind:group={selectedRadio} value="stadium" />
								</label>
								{#if selectedRadio === "stadium"}
									<dialog open>
										<h2>Emirates Stadium</h2>
										<p>{team.strStadiumDescription}</p>
										<form method="dialog">
											<button>Close</button>
										</form>
									</dialog>
								{/if}
							</li>
							<li>
								<label>
									History <input type="radio" bind:group={selectedRadio} value="history" />
								</label>
								{#if selectedRadio === "history"}
									<dialog open>
										<h2>History</h2>
										<p>{team.strDescriptionEN}</p>
										<form method="dialog">
											<button>Close</button>
										</form>
									</dialog>
								{/if}
							</li>
						</ul>
					{/if}
				</li>
			</ul>
			<div class="select-container">
				<select bind:value={selectedOption}>
					{#if optionPlaceholder}
						<option value="" selected disabled>{optionPlaceholder}</option>
					{/if}
					{#each options as value}
						<option {value}>{value}</option>
					{/each}
				</select>
				{#if selectedOption === "Website"}
					<a href="https://www.arsenal.com" target="_blank">Visit Arsenal official website</a>
				{:else if selectedOption === "Instagram"}
					<a href="https://www.instagram.com/arsenal" target="_blank">Visit Arsenal Instagram</a>
				{:else if selectedOption === "Facebook"}
					<a href="https://www.facebook.com/Arsenal" target="_blank">Visit Arsenal Facebook</a>
				{/if}
			</div>
		{/if}
	{/each}
</section>

<style>
	section {
		margin: 4em auto;
	}

	img {
		max-height: 200px;
		max-width: 200px;
	}

	ul {
		list-style-type: none;
	}

	a {
		color: #023474;
		margin-top: 10px;
	}

	dialog {
		width: 60%;
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		margin: auto;
		opacity: 0.9;
		box-shadow: 2px 2px 2px;
		opacity: 0.9;
		background-color: #023474;
		color: yellow;
		padding: 20px;
	}

	@media (max-width: 992px) {
		dialog {
			width: 80%;
			padding: 10px;
		}
	}

	@media (max-width: 768px) {
		dialog {
			width: 95%;
			max-height: 90%;
			overflow-y: scroll;
			padding: 5px;
		}
	}

	button {
		background-color: transparent;
		margin-top: 20px;
		padding: 10px;
		border: 2px solid yellow;
		border-radius: 10px;
		width: 150px;
	}

	input[type="checkbox"],
	input[type="radio"] {
		accent-color: #ef0107;
	}

	.select-container {
		display: grid;
		margin-top: 15px;
	}

	select {
		background-color: #023474;
		color: yellow;
		padding: 10px;
	}

	option {
		color: yellow;
	}
</style>
