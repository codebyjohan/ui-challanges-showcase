import type { PageLoad } from "./$types"

type Question = {
	id: number
	qst: string
	correctanswer: string
	answers: string[]
}[]

export const load = (async ({ fetch }) => {
	const response = await fetch("/questions.json")
	const data = await response.json()
	const questions = data as Question

	return {
		questions,
	}
}) satisfies PageLoad
