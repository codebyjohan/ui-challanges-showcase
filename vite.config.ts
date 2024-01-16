import browserslist from "browserslist"
import { browserslistToTargets } from "lightningcss"
import { defineConfig } from "vite"
import { imagetools } from "vite-imagetools"
import { sveltekit } from "@sveltejs/kit/vite"

export default defineConfig({
	build: {
		cssMinify: "lightningcss",
	},
	css: {
		lightningcss: {
			targets: browserslistToTargets(browserslist([">0.2%", "not dead"])),
		},
		transformer: "lightningcss",
	},
	plugins: [imagetools(), sveltekit()],
})
