import type { PageLoad } from "./$types"

type TeamsInfo = {
	strTeam: string
	strTeamBadge: string
	strStadiumLocation: string
	strStadium: string
	intStadiumCapacity: string
	strKeywords: string
	strKitColour1: string
	strKitColour2: string
	strTeamJersey: string
	strDescriptionEN: string
	strStadiumDescription: string
}[]

export const load = (async ({ fetch }) => {
	const response = await fetch(
		"https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?l=English%20Premier%20League",
	)
	const data = await response.json()
	const teams = data.teams as TeamsInfo

	return {
		teams,
	}
}) satisfies PageLoad
