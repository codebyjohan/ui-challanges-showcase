<script lang="ts">
	import Background from "$components/Background/Background.svelte"
	import NavigationPanel from "$components/NavigationPanel.svelte"
	import "$lib/utilities/stylesheets/stylesheets.css"
</script>

<!-- <div class="grid-stack"> -->
<Background />
<NavigationPanel></NavigationPanel>
<slot />
<!-- </div> -->
