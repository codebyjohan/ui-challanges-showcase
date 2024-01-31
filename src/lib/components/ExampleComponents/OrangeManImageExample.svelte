<script lang="ts">
	import orangeManAvigSrcset from "./orangeman.jpg?h=2479;1239;619&format=avif&as=srcset&imageTools"
	import fallback from "./orangeman.jpg?h=1239&url&imageTools"
</script>

<picture>
	<source srcset={orangeManAvigSrcset} type="image/avif" />
	<img src={fallback} alt="man with orange wedges on his face" width="256px" />
</picture>
