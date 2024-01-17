import type { PageLoad } from "./$types"
import { redirect } from "@sveltejs/kit"

export const load = (async () => {
	// TODO change to the first challange in the NavigationPanel list
	throw redirect(303, "/challenge-1")
}) satisfies PageLoad
