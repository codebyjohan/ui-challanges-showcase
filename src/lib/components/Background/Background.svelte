<script lang="ts">
	import avifSrcSet from "./background.jpg?h=512;1024;2048;4096&format=avif&as=srcset&imageTools"
	import webpSrcSet from "./background.jpg?h=512;1024;2048;4096&format=webp&as=srcset&imageTools"
	import fallback from "./background.jpg?h=1024&url&imageTools"
	import placeholder from "./background.jpg?h=128&url&format=avif&imageTools"
</script>

<svelte:head>
	<link rel="preload" as="image" href={placeholder} type="image/jpg" />
</svelte:head>
<div>
	<!-- <img aria-hidden="true" alt="grayscale of a land" src={placeholder} /> -->
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
	}
</style>
