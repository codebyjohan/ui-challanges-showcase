<script lang="ts">
	// TODO: ändra till multiples av background.jpg height (h parameter)
	import avifSrcSet from "./background.jpg?h=702;1404;2808;5616&format=avif&as=srcset&imageTools"
	import webpSrcSet from "./background.jpg?h=702;1404;2808;5616&format=webp&as=srcset&imageTools"
	import fallback from "./background.jpg?h=1404&url&imageTools"
	import placeholder from "./background.jpg?h=128&url&format=avif&imageTools"
</script>

<svelte:head>
	<link rel="preload" as="image" href={placeholder} type="image/jpg" />
</svelte:head>

<div class="grid-stack">
	<!-- svelte-ignore a11y-missing-attribute this image is is only placeholder for visual users  -->
	<img aria-hidden="true" src={placeholder} />
	<picture>
		<source type="image/avif" srcset={avifSrcSet} />
		<source type="image/webp" srcset={webpSrcSet} />
		<img src={fallback} alt="grayscale of a land" />
	</picture>
</div>

<style>
	img {
		max-height: 100vh;
		max-width: 100vw;
		height: 100%;
		width: 100%;
	}

	div {
		background-color: #c4c4c4;
		opacity: 0.3;
		z-index: -1;
	}
</style>
