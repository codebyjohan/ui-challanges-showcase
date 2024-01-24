<script lang="ts">
	import { onMount } from "svelte"

	interface PlData {
		intRank: string
		strTeam: string
		strTeamBadge: string
		intPlayed: string
		intGoalDifference: string
		intPoints: string
	}
	let teams: PlData[] = []

	onMount(async function () {
		const response = await fetch("https://www.thesportsdb.com/api/v1/json/3/lookuptable.php?l=4328&s=2023-2024")
		const data = await response.json()
		teams = data.table
	})
</script>

<div class="table-container">
	<table class="league-table">
		<caption>Premier League Table 2023/24</caption>
		<thead>
			<tr>
				<th>Pos</th>
				<th>Logo</th>
				<th>Club</th>
				<th>Games</th>
				<th>GD</th>
				<th>Points</th>
			</tr>
		</thead>

		<tbody>
			{#each teams as team}
				<tr>
					<td>{team.intRank}</td>
					<td><img src={team.strTeamBadge} alt="Logo" /></td>
					<td>{team.strTeam}</td>
					<td>{team.intPlayed}</td>
					<td>{team.intGoalDifference}</td>
					<td>{team.intPoints}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style>
	.table-container {
		overflow: auto;
		max-height: 95vh;
	}

	.league-table {
		border-collapse: collapse;
		overflow: scroll;
	}

	.league-table caption {
		font-size: 1.3em;
		font-weight: 600;
	}

	.league-table th {
		padding: 0.2em;
		border-bottom: 2px solid #000;
	}

	.league-table td {
		padding: 0.5em;
		border-bottom: 2px solid #3d3d3d;
	}
</style>
