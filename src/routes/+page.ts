import type { PageLoad } from "./$types"
import { redirect } from "@sveltejs/kit"

export const load = (async () => {
	const NAMES = ["/calle/challenge-1","/johan/challenge-1","/nassim/challenge-1"]
	// TODO change to the first challange in the NavigationPanel list
	throw redirect(303, NAMES[Math.floor(Math.random()*NAMES.length)])
}) satisfies PageLoad
